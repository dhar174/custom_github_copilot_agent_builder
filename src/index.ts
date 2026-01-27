import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { mergeConfig } from './config/merge';
import { applyPackFiles } from './apply/engine';
import { validateSelection, PackManifest } from './pack/manifest';
import { loadPackSource } from './pack/source';
import { buildPrBody } from './pr/summary';
import { upsertPr } from './pr/update';
import { createSnapshot } from './sense/snapshot';
import { Planner } from './plan/planner';

const DEFAULTS: Record<string, unknown> = {
  components: [],
  apply: false,
  permissionsMode: 'default',
  strict: false,
};

const PACK_MANIFEST: PackManifest = {
  name: 'AgentOps Pack (Standard)',
  version: '0.1.0',
  components: [
    { name: 'instructions' },
    { name: 'agents', requires: ['instructions'] },
    { name: 'prompts', requires: ['instructions'] },
    { name: 'skills', requires: ['prompts'] },
    { name: 'repo-profile' },
    { name: 'mcp' },
    { name: 'decision-log' },
    { name: 'specs' },
    { name: 'context' },
    { name: 'memory' },
  ],
};

function parseBoolean(input: string | undefined, fallback: boolean): boolean {
  if (input === undefined || input === '') return fallback;
  return input.toLowerCase() === 'true';
}

function parseComponents(input: string | undefined): string[] {
  if (!input) return PACK_MANIFEST.components.map((c) => c.name);
  return input
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function loadConfigFile(configPath: string): Record<string, unknown> {
  const resolvedPath = path.isAbsolute(configPath)
    ? configPath
    : path.join(process.cwd(), configPath);

  if (!fs.existsSync(resolvedPath)) {
    core.info(`Config file not found at ${configPath}; continuing with inputs + defaults.`);
    return {};
  }

  try {
    const raw = fs.readFileSync(resolvedPath, 'utf8');
    const parsed = loadYaml(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }

    core.warning(`Config file at ${configPath} did not contain an object; ignoring.`);
    return {};
  } catch (error) {
    core.warning(
      `Failed to read or parse config file at ${configPath}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return {};
  }
}

async function run(): Promise<void> {
  try {
    const repo = core.getInput('repo', { required: true });
    const packVersion = core.getInput('pack_version');
    const packRoot = core.getInput('pack_root') || process.cwd();
    const packComponents = parseComponents(core.getInput('pack_components'));
    const configPath = core.getInput('config_path') || '.github/agentops-pack.yml';
    const apply = parseBoolean(core.getInput('apply'), false);
    const overrideToken = core.getInput('override_token') || undefined;
    const permissionsMode = core.getInput('permissions_mode') || 'default';
    const strict = parseBoolean(core.getInput('strict'), false);

    const defaults = { ...DEFAULTS, repo, packVersion, configPath };
    const fileConfig = loadConfigFile(configPath);

    const mergeResult = mergeConfig(
      defaults,
      fileConfig,
      {
        components: packComponents,
        apply,
        overrideToken,
        permissionsMode,
        strict,
      },
    );

    if (mergeResult.errors.length > 0 || !mergeResult.config) {
      const message = mergeResult.errors.map((e) => `${e.field}: ${e.message}`).join('; ');
      core.setFailed(`Config validation failed: ${message}`);
      return;
    }

    // --- Phase 1: Sense ---
    core.info('--- Phase 1: Sensing Repository ---');
    // We assume CWD is the target repo roots
    const snapshot = await createSnapshot(process.cwd(), mergeResult.config.repo, 'main'); 
    core.info(`Detected signals: ${JSON.stringify(snapshot.signals, null, 2)}`);
    core.info(`Existing AI Config: ${JSON.stringify(snapshot.aiConfig, null, 2)}`);

    // --- Phase 2: Plan ---
    core.info('--- Phase 2: Planning (Agentic) ---');
    const llmToken = core.getInput('llm_token') || process.env.GH_PAT || process.env.GITHUB_TOKEN; // Github Models usually needs PAT or GITHUB_TOKEN if enabled
    const planner = new Planner(llmToken || '', 'gpt-4o'); 
    
    let plan;
    try {
        if (!process.env.SKIP_LLM) { // Escape hatch for tests/stubbing
             plan = await planner.generatePlan(snapshot);
             core.info(`Generated Plan: ${JSON.stringify(plan, null, 2)}`);
        } else {
             core.info('Skipping LLM (SKIP_LLM set), using static legacy plan.');
        }
    } catch (e) {
        core.warning(`LLM Planning failed: ${e instanceof Error ? e.message : String(e)}. Falling back to static templates.`);
    }

    mergeResult.warnings.forEach((w) => {
      core.warning(`Warning (${w.code}): ${w.field}`);
    });

    if (mergeResult.unknownFields.length > 0 && mergeResult.config.strict) {
      core.setFailed(`Unknown fields present: ${mergeResult.unknownFields.join(', ')}`);
      return;
    }

    const selection = validateSelection(PACK_MANIFEST, mergeResult.config.components);
    selection.warnings.forEach((w) => core.warning(w));
    if (selection.errors.length > 0) {
      core.setFailed(`Component selection failed: ${selection.errors.join('; ')}`);
      return;
    }

    const summary = {
      repo: mergeResult.config.repo,
      packVersion: mergeResult.config.packVersion || 'latest',
      components: selection.resolved ?? [],
      apply: mergeResult.config.apply,
      permissionsMode: mergeResult.config.permissionsMode,
      unknownFields: mergeResult.unknownFields,
    };

    const source = loadPackSource(packRoot, summary.components);
    source.warnings.forEach((warning) => core.warning(warning));

    const applyResult = applyPackFiles(process.cwd(), source.files, {
      mode: summary.apply ? 'apply' : 'dry-run',
      refreshOnly: true,
    });

    applyResult.warnings.forEach((warning) => core.warning(warning));

    if (summary.apply) {
      core.info('Apply mode: managed sections updated for selected files.');
    } else {
      core.info('Dry-run mode: computed change set without writing files.');
    }

    core.info(
      `Change summary: added=${applyResult.summary.added}, updated=${applyResult.summary.updated}, unchanged=${applyResult.summary.unchanged}, skipped=${applyResult.summary.skipped}`,
    );

    if (summary.apply) {
      const token = mergeResult.config.overrideToken || process.env.GITHUB_TOKEN;
      if (token && typeof token === 'string') {
        const [owner, name] = mergeResult.config.repo.split('/');
        const runId = process.env.GITHUB_RUN_ID || '0';

        const effectiveManifest = {
            ...PACK_MANIFEST,
            version: summary.packVersion !== 'latest' ? summary.packVersion : PACK_MANIFEST.version
        };

        const prBody = buildPrBody(applyResult, effectiveManifest, {
            runId,
            repo: mergeResult.config.repo
        });

        const prResult = await upsertPr({
            token,
            owner,
            repo: name
        }, {
            branch: `agentops/pack-${effectiveManifest.version}`,
            title: `chore(agentops): apply pack ${effectiveManifest.version}`,
            commitMessage: `chore(agentops): apply pack ${effectiveManifest.version}`,
            body: prBody
        });
        
        if (prResult.prNumber > 0) {
            core.info(`PR Governance: ${prResult.created ? 'Created' : 'Updated'} PR #${prResult.prNumber} (${prResult.url})`);
            core.setOutput('pr_number', prResult.prNumber);
            core.setOutput('pr_url', prResult.url);
        }
      } else {
        core.info('Skipping PR governance: No token provided.');
      }
    }

    core.info(`Pack applier configuration ready for ${summary.repo}`);
    core.setOutput('summary', JSON.stringify({ ...summary, changes: applyResult.summary }));
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

// For unit testing, export helpers
export const __internal = {
  parseBoolean,
  parseComponents,
  DEFAULTS,
  PACK_MANIFEST,
};

run();
