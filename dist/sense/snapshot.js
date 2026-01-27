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
exports.createSnapshot = createSnapshot;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Helper to safely read a directory
function readDirSafe(dir) {
    try {
        return fs.readdirSync(dir);
    }
    catch (e) {
        return [];
    }
}
// Helper to check if file exists
function exists(filePath) {
    return fs.existsSync(filePath);
}
// Build directory tree with limited depth
function buildTree(currentPath, depth, maxDepth) {
    if (depth > maxDepth)
        return [];
    const items = readDirSafe(currentPath);
    const nodes = [];
    for (const item of items) {
        if (item.startsWith('.'))
            continue; // Skip hidden rules mostly, but we might care about .github
        const fullPath = path.join(currentPath, item);
        let stat;
        try {
            stat = fs.statSync(fullPath);
        }
        catch {
            continue;
        }
        if (stat.isDirectory()) {
            nodes.push({
                name: item,
                type: 'directory',
                children: buildTree(fullPath, depth + 1, maxDepth),
            });
        }
        else {
            nodes.push({
                name: item,
                type: 'file',
            });
        }
    }
    return nodes;
}
function detectSignals(rootPath) {
    const rootFiles = readDirSafe(rootPath);
    const signals = {
        languages: [],
        frameworks: [],
        packageManagers: [],
        buildTools: [],
        isMonorepo: false,
        hasTestFolder: false,
        hasDocsFolder: false,
    };
    // Basic Language Detection
    if (exists(path.join(rootPath, 'package.json'))) {
        signals.languages.push('typescript/javascript');
        signals.packageManagers.push('npm'); // or yarn/pnpm check
    }
    if (exists(path.join(rootPath, 'requirements.txt')) || exists(path.join(rootPath, 'pyproject.toml'))) {
        signals.languages.push('python');
    }
    if (exists(path.join(rootPath, 'go.mod'))) {
        signals.languages.push('go');
    }
    if (exists(path.join(rootPath, 'pom.xml')) || exists(path.join(rootPath, 'build.gradle'))) {
        signals.languages.push('java');
    }
    // Framework Detection (naive scan of package.json if exists)
    if (exists(path.join(rootPath, 'package.json'))) {
        try {
            const pkg = JSON.parse(fs.readFileSync(path.join(rootPath, 'package.json'), 'utf8'));
            const deps = { ...pkg.dependencies, ...pkg.devDependencies };
            if (deps['react'])
                signals.frameworks.push('react');
            if (deps['next'])
                signals.frameworks.push('next.js');
            if (deps['@nestjs/core'])
                signals.frameworks.push('nestjs');
        }
        catch {
            // ignore
        }
    }
    // Structure Detection
    if (exists(path.join(rootPath, 'packages')) || exists(path.join(rootPath, 'workspaces'))) {
        signals.isMonorepo = true;
    }
    if (exists(path.join(rootPath, 'test')) || exists(path.join(rootPath, 'tests'))) {
        signals.hasTestFolder = true;
    }
    if (exists(path.join(rootPath, 'docs'))) {
        signals.hasDocsFolder = true;
    }
    return signals;
}
function detectAiConfig(rootPath) {
    const githubDir = path.join(rootPath, '.github');
    const instructionsDir = path.join(githubDir, 'instructions');
    const agentsDir = path.join(githubDir, 'agents');
    const promptsDir = path.join(githubDir, 'prompts');
    const config = {
        hasCopilotInstructions: exists(path.join(githubDir, 'copilot-instructions.md')),
        instructionFiles: [],
        agentFiles: [],
        promptFiles: [],
        hasMcpConfig: exists(path.join(rootPath, 'mcp.md')) || exists(path.join(rootPath, 'docs/agentops/mcp.md')),
    };
    if (exists(instructionsDir)) {
        config.instructionFiles = readDirSafe(instructionsDir).filter(f => f.endsWith('.instructions.md'));
    }
    if (exists(agentsDir)) {
        config.agentFiles = readDirSafe(agentsDir).filter(f => f.endsWith('.agent.md'));
    }
    if (exists(promptsDir)) {
        config.promptFiles = readDirSafe(promptsDir).filter(f => f.endsWith('.prompt.md'));
    }
    return config;
}
function detectConventions(rootPath) {
    return {
        hasSpecs: exists(path.join(rootPath, 'specs')) || exists(path.join(rootPath, 'docs/specs')),
        hasContext: exists(path.join(rootPath, '.context.md')) || exists(path.join(rootPath, 'docs/context')),
        hasMemory: exists(path.join(rootPath, '.memory.md')) || exists(path.join(rootPath, 'docs/memory')),
        hasDecisionLog: exists(path.join(rootPath, 'decision-log.md')) || exists(path.join(rootPath, 'docs/agentops/decision-log.md')),
    };
}
async function createSnapshot(rootPath, repo, defaultBranch) {
    return {
        repoName: repo,
        defaultBranch,
        structure: buildTree(rootPath, 0, 2),
        signals: detectSignals(rootPath),
        aiConfig: detectAiConfig(rootPath),
        conventions: detectConventions(rootPath),
    };
}
