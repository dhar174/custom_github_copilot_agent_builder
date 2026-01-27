import { ManagedSection } from './types';

const MARKER_PREFIX = '<!-- agentops:';

function buildBlock(id: string, content: string): string {
  return `<!-- agentops:begin ${id} -->\n${content}\n<!-- agentops:end ${id} -->`;
}

function normalizeLineEndings(content: string): string {
  return content.replace(/\r\n/g, '\n');
}

export function renderManagedFile(sections: ManagedSection[]): string {
  const ordered = [...sections].sort((a, b) => a.id.localeCompare(b.id));
  return ordered.map((section) => buildBlock(section.id, section.content.trimEnd())).join('\n\n');
}

export function applyManagedSections(
  targetContent: string | null,
  sections: ManagedSection[],
  options: { refreshOnly?: boolean },
): { content: string; status: 'added' | 'updated' | 'unchanged' | 'skipped'; reason?: string } {
  if (!targetContent) {
    return { content: renderManagedFile(sections), status: 'added' };
  }

  const normalized = normalizeLineEndings(targetContent);
  const hasMarkers = normalized.includes(MARKER_PREFIX);

  if (!hasMarkers) {
    return {
      content: normalized,
      status: 'skipped',
      reason: 'No managed markers present; skipping file to avoid overwrites.',
    };
  }

  let updated = normalized;
  let replacements = 0;

  for (const section of sections) {
    const pattern = new RegExp(
      `<!-- agentops:begin ${section.id} -->[\\s\\S]*?<!-- agentops:end ${section.id} -->`,
      'g',
    );
    if (pattern.test(updated)) {
      updated = updated.replace(pattern, buildBlock(section.id, section.content.trimEnd()));
      replacements += 1;
    }
  }

  if (replacements === 0) {
    return {
      content: normalized,
      status: 'skipped',
      reason: 'Managed markers found, but no matching section IDs to update.',
    };
  }

  if (updated === normalized) {
    return { content: normalized, status: 'unchanged' };
  }

  return { content: updated, status: 'updated' };
}

export function formatLineEndings(content: string, lineEnding: 'lf' | 'crlf'): string {
  return lineEnding === 'crlf' ? content.replace(/\n/g, '\r\n') : content;
}
