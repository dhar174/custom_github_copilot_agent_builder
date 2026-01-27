"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const manifest_1 = require("./manifest");
const manifest = {
    name: 'test',
    version: '0.0.0',
    components: [
        { name: 'instructions' },
        { name: 'prompts', requires: ['instructions'] },
        { name: 'skills', requires: ['prompts'] },
    ],
};
(0, vitest_1.describe)('validateSelection', () => {
    (0, vitest_1.it)('returns warnings on empty selection', () => {
        const result = (0, manifest_1.validateSelection)(manifest, []);
        (0, vitest_1.expect)(result.emptySelection).toBe(true);
        (0, vitest_1.expect)(result.warnings.length).toBeGreaterThan(0);
    });
    (0, vitest_1.it)('resolves dependencies in order', () => {
        const result = (0, manifest_1.validateSelection)(manifest, ['skills']);
        (0, vitest_1.expect)(result.errors).toHaveLength(0);
        (0, vitest_1.expect)(result.resolved).toEqual(['instructions', 'prompts', 'skills']);
    });
    (0, vitest_1.it)('flags unknown components', () => {
        const result = (0, manifest_1.validateSelection)(manifest, ['missing']);
        (0, vitest_1.expect)(result.errors).toHaveLength(1);
    });
    (0, vitest_1.it)('detects cycles', () => {
        const cyclicManifest = {
            name: 'cyclic',
            version: '0.0.0',
            components: [
                { name: 'a', requires: ['b'] },
                { name: 'b', requires: ['a'] },
            ],
        };
        const result = (0, manifest_1.validateSelection)(cyclicManifest, ['a']);
        (0, vitest_1.expect)(result.errors.some((e) => e.includes('Circular'))).toBe(true);
    });
});
