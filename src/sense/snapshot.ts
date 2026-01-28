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

// Build directory tree with limited depth, deterministic ordering
function buildTree(currentPath: string, depth: number, maxDepth: number): DirectoryNode[] {
  if (depth > maxDepth) return [];

  const items = readDirSafe(currentPath)
    .filter(item => item !== '.git') // keep .github, skip .git only
    .sort(); // determinism
  const nodes: DirectoryNode[] = [];

  for (const item of items) {
    const fullPath = path.join(currentPath, item);
    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      if (depth >= maxDepth) {
        // Do not descend or include nodes beyond the max depth
        continue;
      }
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
  const signals: RepoSignals = {
    languages: [],
    frameworks: [],
    packageManagers: [],
    buildTools: [],
    isMonorepo: false,
    hasTestFolder: false,
    hasDocsFolder: false,
    riskFlags: [],
  };

  const pkgJsonPath = path.join(rootPath, 'package.json');
  const lockPnpm = path.join(rootPath, 'pnpm-lock.yaml');
  const lockYarn = path.join(rootPath, 'yarn.lock');
  const lockNpm = path.join(rootPath, 'package-lock.json');
  const lockBun = path.join(rootPath, 'bun.lockb');
  const pyproject = path.join(rootPath, 'pyproject.toml');
  const toolVersions = path.join(rootPath, '.tool-versions');
  const nvmrc = path.join(rootPath, '.nvmrc');
  const workflowsDir = path.join(rootPath, '.github', 'workflows');

  // Basic Language Detection
  if (exists(pkgJsonPath)) signals.languages.push('typescript/javascript');
  if (exists(path.join(rootPath, 'tsconfig.json'))) signals.languages.push('typescript');
  if (exists(path.join(rootPath, 'requirements.txt')) || exists(pyproject)) signals.languages.push('python');
  if (exists(path.join(rootPath, 'go.mod'))) signals.languages.push('go');
  if (exists(path.join(rootPath, 'pom.xml')) || exists(path.join(rootPath, 'build.gradle'))) signals.languages.push('java');

  // Package manager detection
  if (exists(lockPnpm)) signals.packageManagers.push('pnpm');
  if (exists(lockYarn)) signals.packageManagers.push('yarn');
  if (exists(lockNpm)) signals.packageManagers.push('npm');
  if (exists(lockBun)) signals.packageManagers.push('bun');
  if (signals.packageManagers.length === 0 && exists(pkgJsonPath)) signals.packageManagers.push('npm');
  // Python managers from pyproject
  if (exists(pyproject)) {
    try {
      const content = fs.readFileSync(pyproject, 'utf8');
      if (content.includes('[tool.poetry]')) signals.packageManagers.push('poetry');
      if (content.includes('[tool.pdm]')) signals.packageManagers.push('pdm');
    } catch {
      /* ignore */
    }
  }

  // Framework & build tool detection via package.json
  if (exists(pkgJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const scripts = pkg.scripts || {};
      if (deps['react']) signals.frameworks.push('react');
      if (deps['next']) signals.frameworks.push('next.js');
      if (deps['@nestjs/core']) signals.frameworks.push('nestjs');
      if (deps['@angular/core']) signals.frameworks.push('angular');
      if (deps['vue']) signals.frameworks.push('vue');

      if (deps['typescript'] || scripts['tsc']) signals.buildTools.push('tsc');
      if (deps['vite'] || scripts['vite']) signals.buildTools.push('vite');
      if (deps['webpack'] || scripts['webpack']) signals.buildTools.push('webpack');
      if (deps['turbo'] || scripts['turbo']) signals.buildTools.push('turbo');
      if (deps['@nrwl/workspace'] || deps['nx'] || scripts['nx']) signals.buildTools.push('nx');
    } catch {
      // ignore
    }
  }

  // Structure Detection
  const hasPackagesDir = exists(path.join(rootPath, 'packages'));
  const hasWorkspacesFile = exists(path.join(rootPath, 'pnpm-workspace.yaml')) || exists(path.join(rootPath, 'pnpm-workspace.yml'));
  const hasYarnWorkspaces = (() => {
    if (!exists(pkgJsonPath)) return false;
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
      return Boolean(pkg.workspaces);
    } catch {
      return false;
    }
  })();

  signals.isMonorepo = hasPackagesDir || hasWorkspacesFile || hasYarnWorkspaces;
  if (signals.isMonorepo) signals.riskFlags.push('monorepo-structure');

  if (exists(path.join(rootPath, 'test')) || exists(path.join(rootPath, 'tests'))) signals.hasTestFolder = true;
  if (exists(path.join(rootPath, 'docs'))) signals.hasDocsFolder = true;

  if (exists(workflowsDir)) {
    signals.riskFlags.push('ci-workflows');
    const workflowFiles = readDirSafe(workflowsDir);
    const hasBranchProtection = workflowFiles.some(file => {
      const lower = file.toLowerCase();
      return lower.includes('branch') && lower.includes('protect');
    });
    if (hasBranchProtection) signals.riskFlags.push('protected-branches-workflow');
  }
  if (exists(toolVersions)) signals.riskFlags.push('tool-versions');
  if (exists(nvmrc)) signals.riskFlags.push('node-version-file');

  // Sort for determinism
  signals.languages = Array.from(new Set(signals.languages)).sort();
  signals.frameworks = Array.from(new Set(signals.frameworks)).sort();
  signals.packageManagers = Array.from(new Set(signals.packageManagers)).sort();
  signals.buildTools = Array.from(new Set(signals.buildTools)).sort();
  signals.riskFlags = Array.from(new Set(signals.riskFlags)).sort();

  return signals;
}

function detectAiConfig(rootPath: string): ExistingAiConfig {
  const githubDir = path.join(rootPath, '.github');
  const instructionsDir = path.join(githubDir, 'instructions');
  const agentsDir = path.join(githubDir, 'agents');
  const promptsDir = path.join(githubDir, 'prompts');
  const skillsDir = path.join(githubDir, 'skills');
  const rootFiles = readDirSafe(rootPath);

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
    config.promptFiles = readDirSafe(promptsDir).filter(f => f.endsWith('.prompt.md') || f.endsWith('.prompt.yml') || f.endsWith('.prompt.yaml'));
  }

  // also capture top-level GitHub Models prompts (common pattern)
  const promptYamls = rootFiles.filter(f => f.endsWith('.prompt.yml') || f.endsWith('.prompt.yaml'));
  config.promptFiles.push(...promptYamls);

  if (exists(skillsDir)) {
    const skillDirs = readDirSafe(skillsDir).sort();
    for (const dir of skillDirs) {
      const full = path.join(skillsDir, dir);
      try {
        const stat = fs.statSync(full);
        if (!stat.isDirectory()) continue;
        const skillFiles = readDirSafe(full).filter(f => f === 'SKILL.md').map(f => path.join(dir, f));
        config.promptFiles.push(...skillFiles);
      } catch {
        continue;
      }
    }
  }

  // ensure deterministic ordering
  config.instructionFiles = Array.from(new Set(config.instructionFiles)).sort();
  config.agentFiles = Array.from(new Set(config.agentFiles)).sort();
  config.promptFiles = Array.from(new Set(config.promptFiles)).sort();

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

function sortNodes(nodes: DirectoryNode[]): DirectoryNode[] {
  return nodes
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(node =>
      node.type === 'directory' && node.children
        ? { ...node, children: sortNodes(node.children) }
        : node
    );
}

export async function createSnapshot(rootPath: string, repo: string, defaultBranch: string): Promise<RepoSnapshot> {
  const structure = sortNodes(buildTree(rootPath, 0, 2));
  return {
    repoName: repo,
    defaultBranch,
    structure,
    signals: detectSignals(rootPath),
    aiConfig: detectAiConfig(rootPath),
    conventions: detectConventions(rootPath),
  };
}
