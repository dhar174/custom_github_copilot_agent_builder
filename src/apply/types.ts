export type ApplyMode = 'dry-run' | 'apply';
export type ApplyStrategy = 'safe' | 'refresh' | 'overwrite';

export interface ManagedSection {
  id: string;
  content: string;
}

export interface PackFile {
  path: string;
  content: string;
  managedId?: string;
}

export interface ApplyOptions {
  mode: ApplyMode;
  strategy?: ApplyStrategy; // default: refresh
  lineEnding?: 'lf' | 'crlf';
}

export type ChangeStatus = 'added' | 'updated' | 'unchanged' | 'skipped';

export interface ApplyChange {
  path: string;
  status: ChangeStatus;
  reason?: string;
}

export interface ApplySummary {
  added: number;
  updated: number;
  unchanged: number;
  skipped: number;
}

export interface ApplyResult {
  changes: ApplyChange[];
  summary: ApplySummary;
  noChanges: boolean;
  warnings: string[];
}
