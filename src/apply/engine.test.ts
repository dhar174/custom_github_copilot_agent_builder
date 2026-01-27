import { describe, expect, it } from 'vitest';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { applyPackFiles } from './engine';

function createTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'agentops-apply-'));
}

describe('applyPackFiles', () => {
  it('reports added and writes file in apply mode', () => {
    const dir = createTempDir();
    const result = applyPackFiles(
      dir,
      [{ path: 'docs/alpha.md', content: 'alpha content', managedId: 'alpha' }],
      { mode: 'apply' },
    );

    expect(result.summary.added).toBe(1);
    expect(fs.existsSync(path.join(dir, 'docs/alpha.md'))).toBe(true);
  });

  it('does not write file in dry-run mode', () => {
    const dir = createTempDir();
    const result = applyPackFiles(
      dir,
      [{ path: 'docs/beta.md', content: 'beta content', managedId: 'beta' }],
      { mode: 'dry-run' },
    );

    expect(result.summary.added).toBe(1);
    expect(fs.existsSync(path.join(dir, 'docs/beta.md'))).toBe(false);
  });

  it('skips files without managed markers when existing content present', () => {
    const dir = createTempDir();
    const target = path.join(dir, 'docs/gamma.md');
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, 'plain content', 'utf8');

    const result = applyPackFiles(
      dir,
      [{ path: 'docs/gamma.md', content: 'new content', managedId: 'gamma' }],
      { mode: 'dry-run' },
    );

    expect(result.summary.skipped).toBe(1);
    expect(result.noChanges).toBe(true);
  });
});
