import * as fs from 'fs';
import * as path from 'path';
import { RepoSnapshot, DirectoryNode, RepoSignals, ExistingAiConfig, ExistingConventions } from './types';

// Helper to safely read a directory
function readDirSafe(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch (e) {
    return [];
  }
}

// Helper to check if file exists
function exists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

// Build directory tree with limited depth
function buildTree(currentPath: string, depth: number, maxDepth: number): DirectoryNode[] {
  if (depth > maxDepth) return [];

  const items = readDirSafe(currentPath);
  const nodes: DirectoryNode[] = [];

  for (const item of items) {
    if (item.startsWith('.')) continue; // Skip hidden rules mostly, but we might care about .github

    const fullPath = path.join(currentPath, item);
    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      nodes.push({
        name: item,
        type: 'directory',
        children: buildTree(fullPath, depth + 1, maxDepth),
      });
    } else {
      nodes.push({
        name: item,
        type: 'file',
      });
    }
  }
  return nodes;
}

function detectSignals(rootPath: string): RepoSignals {
  const rootFiles = readDirSafe(rootPath);
  const signals: RepoSignals = {
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
      if (deps['react']) signals.frameworks.push('react');
      if (deps['next']) signals.frameworks.push('next.js');
      if (deps['@nestjs/core']) signals.frameworks.push('nestjs');
    } catch {
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

function detectAiConfig(rootPath: string): ExistingAiConfig {
  const githubDir = path.join(rootPath, '.github');
  const instructionsDir = path.join(githubDir, 'instructions');
  const agentsDir = path.join(githubDir, 'agents');
  const promptsDir = path.join(githubDir, 'prompts');

  const config: ExistingAiConfig = {
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

function detectConventions(rootPath: string): ExistingConventions {
  return {
    hasSpecs: exists(path.join(rootPath, 'specs')) || exists(path.join(rootPath, 'docs/specs')),
    hasContext: exists(path.join(rootPath, '.context.md')) || exists(path.join(rootPath, 'docs/context')),
    hasMemory: exists(path.join(rootPath, '.memory.md')) || exists(path.join(rootPath, 'docs/memory')),
    hasDecisionLog: exists(path.join(rootPath, 'decision-log.md')) || exists(path.join(rootPath, 'docs/agentops/decision-log.md')),
  };
}

export async function createSnapshot(rootPath: string, repo: string, defaultBranch: string): Promise<RepoSnapshot> {
  return {
    repoName: repo,
    defaultBranch,
    structure: buildTree(rootPath, 0, 2),
    signals: detectSignals(rootPath),
    aiConfig: detectAiConfig(rootPath),
    conventions: detectConventions(rootPath),
  };
}
