import { describe, expect, test } from 'vitest';
import { Planner, validatePlanManifest } from './planner';
import { RepoSnapshot } from '../sense/types';
import { DEFAULT_MANAGED_POLICY, PlanManifest } from './types';

function makeSnapshot(partial?: Partial<RepoSnapshot>): RepoSnapshot {
  return {
    repoName: 'owner/repo',
    defaultBranch: 'main',
    structure: [],
    signals: {
      languages: ['typescript'],
      frameworks: ['react'],
      packageManagers: ['npm'],
      buildTools: ['tsc'],
      isMonorepo: false,
      hasTestFolder: true,
      hasDocsFolder: true,
      riskFlags: [],
      ...(partial?.signals ?? {}),
    },
    aiConfig: {
      hasCopilotInstructions: false,
      instructionFiles: [],
      agentFiles: [],
      promptFiles: [],
      hasMcpConfig: false,
      ...(partial?.aiConfig ?? {}),
    },
    conventions: {
      hasSpecs: true,
      hasContext: true,
      hasMemory: true,
      hasDecisionLog: false,
      ...(partial?.conventions ?? {}),
    },
    ...(partial ?? {}),
  };
}

describe('Planner fallback', () => {
  test('produces deterministic plan and selections', async () => {
    const planner = new Planner({ useFallbackOnly: true });
    const snapshot = makeSnapshot();
    const { plan, source } = await planner.generatePlan(snapshot);

    expect(source).toBe('fallback');
    expect(plan.selection.basePack).toBe(true);
    expect(plan.selection.stackPacks).toEqual(expect.arrayContaining(['node-typescript', 'react']));
    expect(plan.managedPolicy).toEqual(DEFAULT_MANAGED_POLICY);
    expect(plan.files.some(f => f.path === '.github/copilot-instructions.md')).toBe(true);
    expect(plan.acceptanceCriteria.length).toBeGreaterThan(0);
  });

  test('marks existing assets as update actions', async () => {
    const planner = new Planner({ useFallbackOnly: true });
    const snapshot = makeSnapshot({
      aiConfig: {
        hasCopilotInstructions: true,
        instructionFiles: ['backend.instructions.md'],
        agentFiles: ['planner.agent.md'],
        promptFiles: ['chat.prompt.md'],
        hasMcpConfig: true,
      },
    });
    const { plan } = await planner.generatePlan(snapshot);

    const copilot = plan.files.find(f => f.path === '.github/copilot-instructions.md');
    expect(copilot?.action).toBe('update');
    expect(plan.files).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: '.github/instructions/backend.instructions.md', action: 'update' }),
        expect.objectContaining({ path: '.github/prompts/chat.prompt.md', action: 'update' }),
      ]),
    );
  });
});

describe('validatePlanManifest', () => {
  test('returns errors for missing required fields', () => {
    const badPlan = {
      repoProfile: { purpose: '', stack: [], commands: {} },
      selection: { basePack: true, stackPacks: [], components: [] },
      files: [{ path: '', action: 'create', reason: '' }],
      managedPolicy: { marker: '', blockStart: '', blockEnd: '' },
      acceptanceCriteria: [],
      questions: [],
    } as unknown as PlanManifest;

    const result = validatePlanManifest(badPlan);
    expect(result.ok).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
