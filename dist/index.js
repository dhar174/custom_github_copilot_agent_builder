"use strict";
const core = require('@actions/core');
const fs = require('fs');
const path = require('path');
const loadYaml = require('js-yaml').load;
const mergeConfig = require('../src/config/merge');
const manifest = require('../src/pack/manifest');

const DEFAULTS = {
  components: [],
  apply: false,
  permissionsMode: 'default',
  strict: false,
};

const PACK_MANIFEST = {
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

function parseBoolean(input, fallback) {
  if (input === undefined || input === '') return fallback;
  return input.toLowerCase() === 'true';
}

function parseComponents(input) {
  if (!input) return [];
  return input
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function loadConfigFile(configPath) {
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
      return parsed;
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

async function run() {
  try {
    const repo = core.getInput('repo', { required: true });
    const packVersion = core.getInput('pack_version');
    const packComponents = parseComponents(core.getInput('pack_components'));
    const configPath = core.getInput('config_path') || '.github/agentops-pack.yml';
    const apply = parseBoolean(core.getInput('apply'), false);
    const overrideToken = core.getInput('override_token') || undefined;
    const permissionsMode = core.getInput('permissions_mode') || 'default';
    const strict = parseBoolean(core.getInput('strict'), false);

    const defaults = { ...DEFAULTS, repo, packVersion, configPath };
    const fileConfig = loadConfigFile(configPath);

    const mergeResult = mergeConfig.mergeConfig(defaults, fileConfig, {
      components: packComponents,
      apply,
      overrideToken,
      permissionsMode,
      strict,
    });

    if (mergeResult.errors.length > 0 || !mergeResult.config) {
      const message = mergeResult.errors.map((e) => `${e.field}: ${e.message}`).join('; ');
      core.setFailed(`Config validation failed: ${message}`);
      return;
    }

    mergeResult.warnings.forEach((w) => {
      core.warning(`Warning (${w.code}): ${w.field}`);
    });

    if (mergeResult.unknownFields.length > 0 && mergeResult.config.strict) {
      core.setFailed(`Unknown fields present: ${mergeResult.unknownFields.join(', ')}`);
      return;
    }

    const selection = manifest.validateSelection(PACK_MANIFEST, mergeResult.config.components);
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

    if (summary.apply) {
      core.info('Apply mode requested; apply engine not yet implemented in this bolt.');
    } else {
      core.info('Dry-run mode: configuration and selection prepared; no files will be written.');
    }

    core.info(`Pack applier configuration ready for ${summary.repo}`);
    core.setOutput('summary', JSON.stringify(summary));
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

run();
