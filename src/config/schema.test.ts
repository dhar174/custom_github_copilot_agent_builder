import { describe, expect, it } from 'vitest';
import { normalizeRawConfig, validateConfig } from './schema';

describe('normalizeRawConfig', () => {
  it('warns on unknown fields and redacts secret-like keys', () => {
    const result = normalizeRawConfig({ repo: 'foo/bar', weirdKey: 'value', override_token: 'secret' });
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0].field).toBe('weirdKey');
    expect(result.redacted.overrideToken).toBe('***');
  });
});

describe('validateConfig', () => {
  it('fails when repo is missing', () => {
    const result = validateConfig({});
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe('repo');
  });

  it('applies defaults for optional fields', () => {
    const result = validateConfig({ repo: 'foo/bar' });
    expect(result.errors).toHaveLength(0);
    expect(result.config?.components).toEqual([]);
    expect(result.config?.apply).toBe(false);
    expect(result.config?.permissionsMode).toBe('default');
    expect(result.config?.strict).toBe(false);
  });

  it('fails on wrong types', () => {
    const result = validateConfig({ repo: 'foo/bar', apply: 'yes' as unknown as boolean });
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].field).toBe('apply');
  });
});
