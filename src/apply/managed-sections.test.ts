import { describe, expect, it } from 'vitest';
import { applyManagedSections, renderManagedFile } from './managed-sections';

const sampleSections = [
  { id: 'alpha', content: 'Alpha content' },
  { id: 'beta', content: 'Beta content' },
];

describe('renderManagedFile', () => {
  it('renders managed sections in sorted order', () => {
    const content = renderManagedFile(sampleSections);
    expect(content.indexOf('alpha')).toBeLessThan(content.indexOf('beta'));
    expect(content).toContain('<!-- agentops:begin alpha -->');
  });
});

describe('applyManagedSections', () => {
  it('adds managed file when no target exists', () => {
    const result = applyManagedSections(null, sampleSections, {});
    expect(result.status).toBe('added');
    expect(result.content).toContain('agentops:begin alpha');
  });

  it('skips files without managed markers', () => {
    const result = applyManagedSections('plain content', sampleSections, {});
    expect(result.status).toBe('skipped');
    expect(result.reason).toContain('No managed markers');
  });

  it('updates managed sections when markers exist', () => {
    const existing = [
      'header',
      '<!-- agentops:begin alpha -->',
      'Old content',
      '<!-- agentops:end alpha -->',
      'footer',
    ].join('\n');

    const result = applyManagedSections(existing, [{ id: 'alpha', content: 'New content' }], {});
    expect(result.status).toBe('updated');
    expect(result.content).toContain('New content');
  });

  it('skips when managed markers exist but no matching ids', () => {
    const existing = [
      '<!-- agentops:begin gamma -->',
      'Gamma content',
      '<!-- agentops:end gamma -->',
    ].join('\n');

    const result = applyManagedSections(existing, [{ id: 'alpha', content: 'Alpha content' }], {});
    expect(result.status).toBe('skipped');
    expect(result.reason).toContain('no matching section');
  });

  it('skips when begin marker lacks matching end marker', () => {
    const existing = [
      'Header',
      '<!-- agentops:begin alpha -->',
      'Alpha content without end',
    ].join('\n');

    const result = applyManagedSections(existing, [{ id: 'alpha', content: 'New content' }], {});
    expect(result.status).toBe('skipped');
    expect(result.reason).toContain('malformed');
  });
});
