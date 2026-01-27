import { describe, expect, it } from 'vitest';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { loadPackSource } from './source';

describe('loadPackSource', () => {
  it('warns when no source files found for component', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'agentops-pack-'));
    const result = loadPackSource(dir, ['repo-profile']);

    expect(result.files).toHaveLength(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('loads files from matching component paths', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'agentops-pack-'));
    const filePath = path.join(dir, 'repo-profile.md');
    fs.writeFileSync(filePath, 'profile', 'utf8');

    const result = loadPackSource(dir, ['repo-profile']);
    expect(result.files).toHaveLength(1);
    expect(result.files[0].path).toBe('repo-profile.md');
  });
});
