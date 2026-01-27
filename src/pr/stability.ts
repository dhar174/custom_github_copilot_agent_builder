import { ApplyChange } from '../apply/types';

export function sortFileList(files: ApplyChange[]): ApplyChange[] {
  return [...files].sort((a, b) => a.path.localeCompare(b.path));
}

// Normalizes line endings to LF
export function normalizeLineEndings(content: string): string {
  return content.replace(/\r\n/g, '\n');
}

// remove volatile fields like timestamps
export function stripTimestamps(content: string): string {
  // Regex to strip "Run ID: 12345"
  return content.replace(/Run ID: \d+/g, 'Run ID: <stripped>');
}
