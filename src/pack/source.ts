import * as fs from 'fs';
import * as path from 'path';
import { PackFile } from '../apply/types';

export interface PackSourceResult {
  files: PackFile[];
  warnings: string[];
}

const COMPONENT_PATHS: Record<string, string[]> = {
  instructions: ['.github/copilot-instructions.md', '.github/instructions'],
  agents: ['.github/agents'],
  prompts: ['.github/prompts'],
  skills: ['.copilot/skills', 'docs/specs/skills'],
  'repo-profile': ['repo-profile.md'],
  mcp: ['mcp.md'],
  'decision-log': ['decision-log.md'],
  specs: ['docs/specs'],
  context: ['docs/context'],
  memory: ['docs/memory'],
};

function collectFiles(root: string, relativePath: string): string[] {
  const absolute = path.join(root, relativePath);
  if (!fs.existsSync(absolute)) return [];

  const stat = fs.statSync(absolute);
  if (stat.isFile()) {
    return [relativePath.replace(/\\/g, '/')];
  }

  const entries = fs.readdirSync(absolute, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(relativePath, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(root, entryPath));
    } else if (entry.isFile()) {
      files.push(entryPath.replace(/\\/g, '/'));
    }
  }

  return files;
}

export function loadPackSource(sourceRoot: string, components: string[]): PackSourceResult {
  const warnings: string[] = [];
  const files: PackFile[] = [];

  for (const component of components) {
    const paths = COMPONENT_PATHS[component];
    if (!paths) {
      warnings.push(`Unknown component mapping for ${component}`);
      continue;
    }

    let matched = false;
    for (const relative of paths) {
      const collected = collectFiles(sourceRoot, relative);
      if (collected.length === 0) continue;

      matched = true;
      for (const filePath of collected) {
        const absolute = path.join(sourceRoot, filePath);
        const content = fs.readFileSync(absolute, 'utf8');
        files.push({ path: filePath, content });
      }
    }

    if (!matched) {
      warnings.push(`No source files found for component ${component}`);
    }
  }

  return { files, warnings };
}
