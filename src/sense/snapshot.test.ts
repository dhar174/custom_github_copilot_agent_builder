import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'fs';
import * as path from 'path';
import * as os from 'os';
import { describe, test, expect, afterEach } from 'vitest';
import { createSnapshot } from './snapshot';

const tempDirs: string[] = [];

afterEach(() => {
  while (tempDirs.length) {
    const dir = tempDirs.pop();
    if (dir) rmSync(dir, { recursive: true, force: true });
  }
});

function makeRepo(setup: (root: string) => void): string {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'agentops-sense-'));
  tempDirs.push(dir);
  setup(dir);
  return dir;
}

describe('createSnapshot', () => {
  test('is deterministic for identical inputs', async () => {
    const repo = makeRepo(root => {
      writeFileSync(
        path.join(root, 'package.json'),
        JSON.stringify({ name: 'demo', version: '1.0.0', dependencies: { react: '1.0.0' }, scripts: { tsc: 'tsc' } })
      );
      writeFileSync(path.join(root, 'pnpm-lock.yaml'), 'lockfileVersion: 9');
      writeFileSync(path.join(root, 'tsconfig.json'), '{}');
      mkdirSync(path.join(root, '.github'));
      mkdirSync(path.join(root, '.github', 'workflows'));
      writeFileSync(path.join(root, '.prompt.yml'), 'name: sample');
      writeFileSync(path.join(root, '.gitignore'), 'node_modules');
      mkdirSync(path.join(root, '.git')); // should be ignored
      mkdirSync(path.join(root, 'packages')); // monorepo hint
      mkdirSync(path.join(root, 'tests'));
      mkdirSync(path.join(root, 'docs'));
    });

    const snap1 = await createSnapshot(repo, 'owner/repo', 'main');
    const snap2 = await createSnapshot(repo, 'owner/repo', 'main');

    expect(snap1).toEqual(snap2);
    const names = snap1.structure.map(n => n.name);
    expect(names).toContain('.github');
    expect(names).not.toContain('.git');
    expect(snap1.signals.packageManagers).toContain('pnpm');
    expect(snap1.signals.frameworks).toContain('react');
    expect(snap1.signals.buildTools).toEqual(expect.arrayContaining(['tsc']));
    expect(snap1.signals.isMonorepo).toBe(true);
    expect(snap1.signals.riskFlags).toEqual(expect.arrayContaining(['monorepo-structure', 'ci-workflows']));
    expect(snap1.signals.hasTestFolder).toBe(true);
    expect(snap1.signals.hasDocsFolder).toBe(true);
    expect(snap1.aiConfig.promptFiles).toEqual(expect.arrayContaining(['.prompt.yml']));
  });

  test('enforces depth limit and keeps .github content', async () => {
    const repo = makeRepo(root => {
      mkdirSync(path.join(root, '.github'));
      writeFileSync(path.join(root, '.github', 'copilot-instructions.md'), '# hi');
      mkdirSync(path.join(root, 'a'));
      mkdirSync(path.join(root, 'a', 'b'));
      mkdirSync(path.join(root, 'a', 'b', 'c')); // should be trimmed entirely
    });

    const snap = await createSnapshot(repo, 'owner/repo', 'main');
    const a = snap.structure.find(n => n.name === 'a');
    expect(a?.children?.some(n => n.name === 'b')).toBe(true);
    const b = a?.children?.find(n => n.name === 'b');
    expect(b?.children?.length ?? 0).toBe(0); // depth trimmed beyond maxDepth
    const gh = snap.structure.find(n => n.name === '.github');
    expect(gh).toBeTruthy();
  });

  test('detects AI config prompts in .github/prompts and root', async () => {
    const repo = makeRepo(root => {
      mkdirSync(path.join(root, '.github'));
      mkdirSync(path.join(root, '.github', 'prompts'));
      writeFileSync(path.join(root, '.github', 'prompts', 'chat.prompt.md'), '---\nname: chat\n---');
      writeFileSync(path.join(root, 'release.prompt.yaml'), 'name: release');
      mkdirSync(path.join(root, '.github', 'skills'));
      mkdirSync(path.join(root, '.github', 'skills', 'agentic-eval'));
      writeFileSync(path.join(root, '.github', 'skills', 'agentic-eval', 'SKILL.md'), '# skill');
      writeFileSync(path.join(root, '.tool-versions'), 'nodejs 20.10.0');
      writeFileSync(path.join(root, '.nvmrc'), '18');
    });

    const snap = await createSnapshot(repo, 'owner/repo', 'main');
    expect(snap.aiConfig.promptFiles).toEqual(
      expect.arrayContaining(['chat.prompt.md', 'release.prompt.yaml', path.join('agentic-eval', 'SKILL.md')])
    );
    expect(snap.signals.riskFlags).toEqual(expect.arrayContaining(['tool-versions', 'node-version-file']));
  });

  test('flags protected branch workflows as risk', async () => {
    const repo = makeRepo(root => {
      mkdirSync(path.join(root, '.github'));
      mkdirSync(path.join(root, '.github', 'workflows'));
      writeFileSync(path.join(root, '.github', 'workflows', 'branch-protection.yml'), 'name: Branch Protection');
    });

    const snap = await createSnapshot(repo, 'owner/repo', 'main');
    expect(snap.signals.riskFlags).toEqual(
      expect.arrayContaining(['ci-workflows', 'protected-branches-workflow'])
    );
  });
});
