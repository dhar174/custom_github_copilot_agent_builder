import * as fs from 'fs';
import * as path from 'path';
import { applyManagedSections, formatLineEndings } from './managed-sections';
import { ApplyChange, ApplyOptions, ApplyResult, PackFile, ApplyStrategy } from './types';

function detectLineEnding(content: string | null): 'lf' | 'crlf' {
  if (content && content.includes('\r\n')) {
    return 'crlf';
  }
  return 'lf';
}

export function applyPackFiles(
  basePath: string,
  files: PackFile[],
  options: ApplyOptions,
): ApplyResult {
  const ordered = [...files].sort((a, b) => a.path.localeCompare(b.path));
  const changes: ApplyChange[] = [];
  const warnings: string[] = [];
  const strategy: ApplyStrategy = options.strategy ?? 'refresh';

  for (const file of ordered) {
    const targetPath = path.join(basePath, file.path);
    const existing = fs.existsSync(targetPath) ? fs.readFileSync(targetPath, 'utf8') : null;
    const lineEnding = options.lineEnding ?? detectLineEnding(existing);

    if (strategy === 'safe' && existing) {
      changes.push({ path: file.path, status: 'skipped', reason: 'safe mode: file exists' });
      continue;
    }

    if (strategy === 'overwrite') {
      const status = existing ? 'updated' : 'added';
      changes.push({ path: file.path, status });
      if (options.mode === 'apply') {
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.writeFileSync(targetPath, formatLineEndings(file.content, lineEnding), 'utf8');
      }
      continue;
    }

    // refresh mode (default)
    const { content, status, reason } = applyManagedSections(
      existing,
      [{ id: file.managedId ?? file.path, content: file.content }],
      { refreshOnly: true },
    );

    changes.push({ path: file.path, status, reason });

    if ((status === 'updated' || status === 'added') && options.mode === 'apply') {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, formatLineEndings(content, lineEnding), 'utf8');
    }
  }

  const summary = changes.reduce(
    (acc, change) => {
      acc[change.status] += 1;
      if (change.status === 'skipped' && change.reason) {
        warnings.push(`${change.path}: ${change.reason}`);
      }
      return acc;
    },
    { added: 0, updated: 0, unchanged: 0, skipped: 0 },
  );

  return {
    changes,
    summary,
    noChanges: summary.added + summary.updated === 0,
    warnings,
  };
}
