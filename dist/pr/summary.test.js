"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const summary_1 = require("./summary");
(0, vitest_1.describe)('buildPrBody', () => {
    const result = {
        changes: [
            { path: 'src/file1.ts', status: 'added' },
            { path: 'src/file2.ts', status: 'updated' },
            { path: 'ignored.ts', status: 'skipped' },
        ],
        summary: { added: 1, updated: 1, unchanged: 0, skipped: 1 },
        warnings: ['Warning 1'],
        noChanges: false,
    };
    const manifest = {
        name: 'test-pack',
        version: '1.0.0',
        components: [],
    };
    const context = { runId: '123', repo: 'owner/repo' };
    (0, vitest_1.it)('includes pack version', () => {
        const body = (0, summary_1.buildPrBody)(result, manifest, context);
        (0, vitest_1.expect)(body).toContain('AgentOps Pack: test-pack v1.0.0');
    });
    (0, vitest_1.it)('includes changed files', () => {
        const body = (0, summary_1.buildPrBody)(result, manifest, context);
        (0, vitest_1.expect)(body).toContain('src/file1.ts');
        (0, vitest_1.expect)(body).toContain('src/file2.ts');
        (0, vitest_1.expect)(body).not.toContain('ignored.ts');
    });
    (0, vitest_1.it)('includes warnings', () => {
        const body = (0, summary_1.buildPrBody)(result, manifest, context);
        (0, vitest_1.expect)(body).toContain('Warning 1');
    });
    (0, vitest_1.it)('includes run ID context', () => {
        const body = (0, summary_1.buildPrBody)(result, manifest, context);
        (0, vitest_1.expect)(body).toContain('Run ID: 123');
    });
});
