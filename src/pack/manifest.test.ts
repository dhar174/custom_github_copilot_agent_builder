import { describe, expect, it } from 'vitest';
import { validateSelection, PackManifest } from './manifest';

const manifest: PackManifest = {
  components: [
    { name: 'instructions' },
    { name: 'prompts', requires: ['instructions'] },
    { name: 'skills', requires: ['prompts'] },
  ],
};

describe('validateSelection', () => {
  it('returns warnings on empty selection', () => {
    const result = validateSelection(manifest, []);
    expect(result.emptySelection).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('resolves dependencies in order', () => {
    const result = validateSelection(manifest, ['skills']);
    expect(result.errors).toHaveLength(0);
    expect(result.resolved).toEqual(['instructions', 'prompts', 'skills']);
  });

  it('flags unknown components', () => {
    const result = validateSelection(manifest, ['missing']);
    expect(result.errors).toHaveLength(1);
  });

  it('detects cycles', () => {
    const cyclicManifest: PackManifest = {
      components: [
        { name: 'a', requires: ['b'] },
        { name: 'b', requires: ['a'] },
      ],
    };
    const result = validateSelection(cyclicManifest, ['a']);
    expect(result.errors.some((e) => e.includes('Circular'))).toBe(true);
  });
});
