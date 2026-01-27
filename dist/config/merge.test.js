"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const merge_1 = require("./merge");
(0, vitest_1.describe)('mergeConfig', () => {
    (0, vitest_1.it)('applies precedence: defaults < file < inputs', () => {
        const defaults = { repo: 'foo/bar', apply: false };
        const fileConfig = { apply: true, packVersion: 'v1' };
        const inputs = { apply: false, packVersion: 'v2', components: ['a'] };
        const result = (0, merge_1.mergeConfig)(defaults, fileConfig, inputs);
        (0, vitest_1.expect)(result.errors).toHaveLength(0);
        (0, vitest_1.expect)(result.config?.apply).toBe(false);
        (0, vitest_1.expect)(result.config?.packVersion).toBe('v2');
        (0, vitest_1.expect)(result.config?.components).toEqual(['a']);
    });
    (0, vitest_1.it)('surfaces validation errors', () => {
        const result = (0, merge_1.mergeConfig)({}, {}, { apply: 'bad' });
        (0, vitest_1.expect)(result.errors).not.toHaveLength(0);
    });
});
