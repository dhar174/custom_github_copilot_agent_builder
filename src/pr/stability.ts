import { ApplyChange } from '../apply/types';

export function sortFileList(files: ApplyChange[]): ApplyChange[] {
  return [...files].sort((a, b) => a.path.localeCompare(b.path));
}

export function deterministicSort<T>(items: T[], keySelector: (item: T) => string): T[] {
  return [...items].sort((a, b) => keySelector(a).localeCompare(keySelector(b)));
}

export function sortMapKeys<T>(map: Record<string, T>): Record<string, T> {
  const sorted: Record<string, T> = {};
  Object.keys(map)
    .sort()
    .forEach((key) => {
      sorted[key] = map[key];
    });
  return sorted;
}

// Normalizes content for stable diffs
export function stabilizeContent(content: string): string {
  // Normalize line endings to LF
  let stable = content.replace(/\r\n/g, '\n');

  // Strip volatile fields like timestamps
  // Example: "Run ID: 12345" or "<!-- Generated at: ... -->"
  stable = stable.replace(/Run ID: \d+/g, 'Run ID: <stripped>');
  stable = stable.replace(/<!-- Generated at: .* -->/g, '<!-- Generated at: [TIMESTAMP] -->');

  return stable;
}

// Backward compatibility (deprecated)
export function normalizeLineEndings(content: string): string {
  return content.replace(/\r\n/g, '\n');
}

export function stripTimestamps(content: string): string {
  return content.replace(/Run ID: \d+/g, 'Run ID: <stripped>');
}
