import { describe, expect, it } from 'vitest';
import { mergeConfig } from './merge';

describe('mergeConfig', () => {
  it('applies precedence: defaults < file < inputs', () => {
    const defaults = { repo: 'foo/bar', apply: false };
    const fileConfig = { apply: true, packVersion: 'v1' };
    const inputs = { apply: false, packVersion: 'v2', components: ['a'] };

    const result = mergeConfig(defaults, fileConfig, inputs);
    expect(result.errors).toHaveLength(0);
    expect(result.config?.apply).toBe(false);
    expect(result.config?.packVersion).toBe('v2');
    expect(result.config?.components).toEqual(['a']);
  });

  it('surfaces validation errors', () => {
    const result = mergeConfig({}, {}, { apply: 'bad' as unknown as boolean });
    expect(result.errors).not.toHaveLength(0);
  });
});
