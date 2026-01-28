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
      { mode: 'apply', strategy: 'refresh' },
    );

    expect(result.summary.added).toBe(1);
    expect(fs.existsSync(path.join(dir, 'docs/alpha.md'))).toBe(true);
  });

  it('writes unmanaged files as-is when new', () => {
    const dir = createTempDir();
    const result = applyPackFiles(
      dir,
      [{ path: 'docs/plain.txt', content: 'hello world' }],
      { mode: 'apply', strategy: 'refresh' },
    );

    expect(result.summary.added).toBe(1);
    const written = fs.readFileSync(path.join(dir, 'docs/plain.txt'), 'utf8');
    expect(written).toBe('hello world');
  });

  it('does not write file in dry-run mode', () => {
    const dir = createTempDir();
    const result = applyPackFiles(
      dir,
      [{ path: 'docs/beta.md', content: 'beta content', managedId: 'beta' }],
      { mode: 'dry-run', strategy: 'refresh' },
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
      [{ path: 'docs/gamma.md', content: 'new content' }],
      { mode: 'dry-run', strategy: 'refresh' },
    );

    expect(result.summary.skipped).toBe(1);
    expect(result.noChanges).toBe(true);
  });

  it('skips existing files in safe mode', () => {
    const dir = createTempDir();
    const target = path.join(dir, 'docs/delta.md');
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, 'existing', 'utf8');

    const result = applyPackFiles(
      dir,
      [{ path: 'docs/delta.md', content: 'new content', managedId: 'delta' }],
      { mode: 'apply', strategy: 'safe' },
    );

    expect(result.summary.skipped).toBe(1);
    expect(fs.readFileSync(target, 'utf8')).toBe('existing');
  });

  it('overwrites content in overwrite mode', () => {
    const dir = createTempDir();
    const target = path.join(dir, 'docs/eps.md');
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, 'old', 'utf8');

    const result = applyPackFiles(
      dir,
      [{ path: 'docs/eps.md', content: 'new', managedId: 'eps' }],
      { mode: 'apply', strategy: 'overwrite' },
    );

    expect(result.summary.updated).toBe(1);
    expect(fs.readFileSync(target, 'utf8')).toBe('new');
  });

  it('is idempotent for managed content in refresh mode', () => {
    const dir = createTempDir();
    const files = [{ path: 'docs/managed.md', content: 'managed content', managedId: 'managed' }];

    applyPackFiles(dir, files, { mode: 'apply', strategy: 'refresh' });
    const second = applyPackFiles(dir, files, { mode: 'dry-run', strategy: 'refresh' });

    expect(second.summary.unchanged).toBe(1);
    expect(second.noChanges).toBe(true);
  });
});
