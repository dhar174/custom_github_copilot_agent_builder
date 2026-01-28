import { describe, expect, it } from 'vitest';
import { buildPrBody } from './summary';
import { ApplyResult } from '../apply/types';
import { PackManifest } from '../pack/manifest';

describe('buildPrBody', () => {
  const result: ApplyResult = {
    changes: [
      { path: 'src/file1.ts', status: 'added' },
      { path: 'src/file2.ts', status: 'updated' },
      { path: 'ignored.ts', status: 'skipped' },
    ],
    summary: { added: 1, updated: 1, unchanged: 0, skipped: 1 },
    warnings: ['Warning 1'],
    noChanges: false,
  };

  const manifest: PackManifest = {
    name: 'test-pack',
    version: '1.0.0',
    components: [],
  };

  const context = { runId: '123', repo: 'owner/repo' };

  it('includes pack version', () => {
    const body = buildPrBody(result, manifest, context);
    expect(body).toContain('AgentOps Pack: test-pack v1.0.0');
  });

  it('includes changed files', () => {
    const body = buildPrBody(result, manifest, context);
    expect(body).toContain('src/file1.ts');
    expect(body).toContain('src/file2.ts');
    expect(body).not.toContain('ignored.ts');
  });

  it('includes warnings', () => {
    const body = buildPrBody(result, manifest, context);
    expect(body).toContain('Warning 1');
  });

  it('includes run ID context', () => {
    const body = buildPrBody(result, manifest, context);
    expect(body).toContain('Run ID: 123');
  });

  it('sorts signals deterministically', () => {
    const body = buildPrBody(result, manifest, {
      ...context,
      signals: { z: 'zeta', a: 'alpha' },
    });

    const signalsSection = body.split('### Detected Signals')[1];
    expect(signalsSection.indexOf('a')).toBeLessThan(signalsSection.indexOf('z'));
  });

  it('renders questions with checkboxes', () => {
    const body = buildPrBody(result, manifest, {
      ...context,
      questions: ['Question A', 'Question B'],
    });

    expect(body).toContain('Questions & Assumptions');
    expect(body).toContain('- [ ] Question A');
    expect(body).toContain('- [ ] Question B');
  });

  it('renders no-change message when no applicable file changes', () => {
    const body = buildPrBody(
      {
        ...result,
        changes: [
          { path: 'ignored.ts', status: 'skipped' },
          { path: 'noop.ts', status: 'unchanged' },
        ],
        summary: { added: 0, updated: 0, unchanged: 1, skipped: 1 },
        warnings: [],
        noChanges: true,
      },
      manifest,
      context,
    );

    expect(body).toContain('_No file changes_');
  });

  it('is deterministic for identical inputs', () => {
    const body1 = buildPrBody(result, manifest, context);
    const body2 = buildPrBody(result, manifest, context);
    expect(body1).toBe(body2);
  });
});
