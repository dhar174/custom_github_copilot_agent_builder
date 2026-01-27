"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.__internal = void 0;
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const js_yaml_1 = require("js-yaml");
const merge_1 = require("./config/merge");
const engine_1 = require("./apply/engine");
const manifest_1 = require("./pack/manifest");
const source_1 = require("./pack/source");
const summary_1 = require("./pr/summary");
const update_1 = require("./pr/update");
const snapshot_1 = require("./sense/snapshot");
const DEFAULTS = {
    components: [],
    apply: false,
    permissionsMode: 'default',
    strict: false,
};
const PACK_MANIFEST = {
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
function parseBoolean(input, fallback) {
    if (input === undefined || input === '')
        return fallback;
    return input.toLowerCase() === 'true';
}
function parseComponents(input) {
    if (!input)
        return PACK_MANIFEST.components.map((c) => c.name);
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
        const parsed = (0, js_yaml_1.load)(raw);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            return parsed;
        }
        core.warning(`Config file at ${configPath} did not contain an object; ignoring.`);
        return {};
    }
    catch (error) {
        core.warning(`Failed to read or parse config file at ${configPath}: ${error instanceof Error ? error.message : String(error)}`);
        return {};
    }
}
async function run() {
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
        const mergeResult = (0, merge_1.mergeConfig)(defaults, fileConfig, {
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
        // --- Phase 1: Sense ---
        core.info('--- Phase 1: Sensing Repository ---');
        // We assume CWD is the target repo roots
        const snapshot = await (0, snapshot_1.createSnapshot)(process.cwd(), mergeResult.config.repo, 'main');
        core.info(`Detected signals: ${JSON.stringify(snapshot.signals, null, 2)}`);
        core.info(`Existing AI Config: ${JSON.stringify(snapshot.aiConfig, null, 2)}`);
        mergeResult.warnings.forEach((w) => {
            core.warning(`Warning (${w.code}): ${w.field}`);
        });
        if (mergeResult.unknownFields.length > 0 && mergeResult.config.strict) {
            core.setFailed(`Unknown fields present: ${mergeResult.unknownFields.join(', ')}`);
            return;
        }
        const selection = (0, manifest_1.validateSelection)(PACK_MANIFEST, mergeResult.config.components);
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
        const source = (0, source_1.loadPackSource)(packRoot, summary.components);
        source.warnings.forEach((warning) => core.warning(warning));
        const applyResult = (0, engine_1.applyPackFiles)(process.cwd(), source.files, {
            mode: summary.apply ? 'apply' : 'dry-run',
            refreshOnly: true,
        });
        applyResult.warnings.forEach((warning) => core.warning(warning));
        if (summary.apply) {
            core.info('Apply mode: managed sections updated for selected files.');
        }
        else {
            core.info('Dry-run mode: computed change set without writing files.');
        }
        core.info(`Change summary: added=${applyResult.summary.added}, updated=${applyResult.summary.updated}, unchanged=${applyResult.summary.unchanged}, skipped=${applyResult.summary.skipped}`);
        if (summary.apply) {
            const token = mergeResult.config.overrideToken || process.env.GITHUB_TOKEN;
            if (token && typeof token === 'string') {
                const [owner, name] = mergeResult.config.repo.split('/');
                const runId = process.env.GITHUB_RUN_ID || '0';
                const effectiveManifest = {
                    ...PACK_MANIFEST,
                    version: summary.packVersion !== 'latest' ? summary.packVersion : PACK_MANIFEST.version
                };
                const prBody = (0, summary_1.buildPrBody)(applyResult, effectiveManifest, {
                    runId,
                    repo: mergeResult.config.repo
                });
                const prResult = await (0, update_1.upsertPr)({
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
            }
            else {
                core.info('Skipping PR governance: No token provided.');
            }
        }
        core.info(`Pack applier configuration ready for ${summary.repo}`);
        core.setOutput('summary', JSON.stringify({ ...summary, changes: applyResult.summary }));
    }
    catch (error) {
        core.setFailed(error instanceof Error ? error.message : String(error));
    }
}
// For unit testing, export helpers
exports.__internal = {
    parseBoolean,
    parseComponents,
    DEFAULTS,
    PACK_MANIFEST,
};
run();
