export interface RepoSnapshot {
  repoName: string;
  defaultBranch: string;
  structure: DirectoryNode[];
  signals: RepoSignals;
  aiConfig: ExistingAiConfig;
  conventions: ExistingConventions;
}

export interface DirectoryNode {
  name: string;
  type: 'file' | 'directory';
  children?: DirectoryNode[]; // Limited depth
}

export interface RepoSignals {
  languages: string[];
  frameworks: string[];
  packageManagers: string[];
  buildTools: string[];
  isMonorepo: boolean;
  hasTestFolder: boolean;
  hasDocsFolder: boolean;
}

export interface ExistingAiConfig {
  hasCopilotInstructions: boolean;
  instructionFiles: string[];
  agentFiles: string[];
  promptFiles: string[];
  hasMcpConfig: boolean;
}

export interface ExistingConventions {
  hasSpecs: boolean;
  hasContext: boolean;
  hasMemory: boolean;
  hasDecisionLog: boolean;
}
