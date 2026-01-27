"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const schema_1 = require("./schema");
(0, vitest_1.describe)('normalizeRawConfig', () => {
    (0, vitest_1.it)('warns on unknown fields and redacts secret-like keys', () => {
        const result = (0, schema_1.normalizeRawConfig)({ repo: 'foo/bar', weirdKey: 'value', override_token: 'secret' });
        (0, vitest_1.expect)(result.warnings).toHaveLength(1);
        (0, vitest_1.expect)(result.warnings[0].field).toBe('weirdKey');
        (0, vitest_1.expect)(result.redacted.overrideToken).toBe('***');
    });
});
(0, vitest_1.describe)('validateConfig', () => {
    (0, vitest_1.it)('fails when repo is missing', () => {
        const result = (0, schema_1.validateConfig)({});
        (0, vitest_1.expect)(result.errors).toHaveLength(1);
        (0, vitest_1.expect)(result.errors[0].field).toBe('repo');
    });
    (0, vitest_1.it)('applies defaults for optional fields', () => {
        const result = (0, schema_1.validateConfig)({ repo: 'foo/bar' });
        (0, vitest_1.expect)(result.errors).toHaveLength(0);
        (0, vitest_1.expect)(result.config?.components).toEqual([]);
        (0, vitest_1.expect)(result.config?.apply).toBe(false);
        (0, vitest_1.expect)(result.config?.permissionsMode).toBe('default');
        (0, vitest_1.expect)(result.config?.strict).toBe(false);
    });
    (0, vitest_1.it)('fails on wrong types', () => {
        const result = (0, schema_1.validateConfig)({ repo: 'foo/bar', apply: 'yes' });
        (0, vitest_1.expect)(result.errors).toHaveLength(1);
        (0, vitest_1.expect)(result.errors[0].field).toBe('apply');
    });
});
