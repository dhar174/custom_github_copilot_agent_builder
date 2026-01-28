import { RepoSnapshot } from '../sense/types';

export interface PlanManifest {
  repoProfile: {
    purpose: string;
    stack: string[];
    commands: Record<string, string>;
  };
  selection: {
    basePack: boolean;
    stackPacks: string[];
    components: string[];
  };
  files: PlanFileAction[];
  managedPolicy: {
    marker: string;
    blockStart: string;
    blockEnd: string;
  };
  acceptanceCriteria: string[];
  questions: string[];
}

export interface PlanFileAction {
  path: string;
  action: 'create' | 'update' | 'delete' | 'ignore';
  reason: string;
  templateId?: string;
  refinementPrompt?: string; // If needing refinement
}

export const DEFAULT_MANAGED_POLICY = {
  marker: '<!-- agentops-managed: true -->',
  blockStart: '<!-- agentops:begin',
  blockEnd: '<!-- agentops:end',
};

export interface ValidationError {
  path?: string;
  message: string;
}

export interface PlanValidationResult {
  ok: boolean;
  errors: ValidationError[];
}

export interface PlannerConfig {
  model?: string;
  token?: string;
  useFallbackOnly?: boolean;
}

export interface PlannerOutput {
  plan: PlanManifest;
  source: 'llm' | 'fallback';
}
