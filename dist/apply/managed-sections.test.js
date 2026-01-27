"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const managed_sections_1 = require("./managed-sections");
const sampleSections = [
    { id: 'alpha', content: 'Alpha content' },
    { id: 'beta', content: 'Beta content' },
];
(0, vitest_1.describe)('renderManagedFile', () => {
    (0, vitest_1.it)('renders managed sections in sorted order', () => {
        const content = (0, managed_sections_1.renderManagedFile)(sampleSections);
        (0, vitest_1.expect)(content.indexOf('alpha')).toBeLessThan(content.indexOf('beta'));
        (0, vitest_1.expect)(content).toContain('<!-- agentops:begin alpha -->');
    });
});
(0, vitest_1.describe)('applyManagedSections', () => {
    (0, vitest_1.it)('adds managed file when no target exists', () => {
        const result = (0, managed_sections_1.applyManagedSections)(null, sampleSections, {});
        (0, vitest_1.expect)(result.status).toBe('added');
        (0, vitest_1.expect)(result.content).toContain('agentops:begin alpha');
    });
    (0, vitest_1.it)('skips files without managed markers', () => {
        const result = (0, managed_sections_1.applyManagedSections)('plain content', sampleSections, {});
        (0, vitest_1.expect)(result.status).toBe('skipped');
        (0, vitest_1.expect)(result.reason).toContain('No managed markers');
    });
    (0, vitest_1.it)('updates managed sections when markers exist', () => {
        const existing = [
            'header',
            '<!-- agentops:begin alpha -->',
            'Old content',
            '<!-- agentops:end alpha -->',
            'footer',
        ].join('\n');
        const result = (0, managed_sections_1.applyManagedSections)(existing, [{ id: 'alpha', content: 'New content' }], {});
        (0, vitest_1.expect)(result.status).toBe('updated');
        (0, vitest_1.expect)(result.content).toContain('New content');
    });
    (0, vitest_1.it)('skips when managed markers exist but no matching ids', () => {
        const existing = [
            '<!-- agentops:begin gamma -->',
            'Gamma content',
            '<!-- agentops:end gamma -->',
        ].join('\n');
        const result = (0, managed_sections_1.applyManagedSections)(existing, [{ id: 'alpha', content: 'Alpha content' }], {});
        (0, vitest_1.expect)(result.status).toBe('skipped');
        (0, vitest_1.expect)(result.reason).toContain('no matching section');
    });
});
