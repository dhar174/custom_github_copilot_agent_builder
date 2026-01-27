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
