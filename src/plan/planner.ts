import OpenAI from 'openai';
import * as core from '@actions/core';
import { RepoSnapshot } from '../sense/types';
import {
  DEFAULT_MANAGED_POLICY,
  PlanManifest,
  PlanValidationResult,
  PlanFileAction,
  PlannerConfig,
  PlannerOutput,
  ValidationError,
} from './types';

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort();
}

function inferStackPacks(snapshot: RepoSnapshot): string[] {
  const { signals } = snapshot;
  const packs: string[] = [];
  if (signals.languages.includes('typescript') || signals.languages.includes('typescript/javascript')) {
    packs.push('node-typescript');
  }
  if (signals.languages.includes('python')) {
    packs.push('python');
  }
  if (signals.frameworks.includes('react')) packs.push('react');
  if (signals.frameworks.includes('next.js')) packs.push('nextjs');
  if (signals.frameworks.includes('nestjs')) packs.push('nestjs');
  return uniqueSorted(packs);
}

function defaultFiles(snapshot: RepoSnapshot): PlanFileAction[] {
  const files: PlanFileAction[] = [];
  const ai = snapshot.aiConfig;

  const decide = (path: string, exists: boolean, reason: string, templateId?: string): PlanFileAction => ({
    path,
    action: exists ? 'update' : 'create',
    reason,
    templateId,
  });

  files.push(decide('AGENTS.md', snapshot.structure.length > 0, 'Add/refresh agent catalog'));
  files.push(decide('repo-profile.md', false, 'Document repository profile'));
  files.push(decide('mcp.md', snapshot.aiConfig.hasMcpConfig, 'Document MCP servers'));
  files.push(decide('decision-log.md', false, 'Track architectural decisions'));
  files.push(decide('.github/copilot-instructions.md', ai.hasCopilotInstructions, 'Repo-wide instructions'));

  files.push(
    decide('.github/agents/planner.agent.md', ai.agentFiles.includes('planner.agent.md'), 'Planner agent profile'),
  );
  files.push(
    decide(
      '.github/agents/implementer.agent.md',
      ai.agentFiles.includes('implementer.agent.md'),
      'Implementer agent profile',
    ),
  );
  files.push(
    decide('.github/agents/reviewer.agent.md', ai.agentFiles.includes('reviewer.agent.md'), 'Reviewer agent profile'),
  );

  // Path-specific instructions/prompt templates
  for (const instr of ai.instructionFiles) {
    files.push({ path: `.github/instructions/${instr}`, action: 'update', reason: 'Refresh instruction file' });
  }
  for (const prompt of ai.promptFiles) {
    if (prompt.endsWith('.prompt.md') || prompt.endsWith('.prompt.yml') || prompt.endsWith('.prompt.yaml')) {
      files.push({ path: prompt.startsWith('.') ? prompt : pathJoin('.github/prompts', prompt), action: 'update', reason: 'Refresh prompt' });
    }
  }

  return files;
}

function pathJoin(prefix: string, maybeRelative: string): string {
  return maybeRelative.startsWith(prefix) ? maybeRelative : `${prefix}/${maybeRelative}`;
}

export function validatePlanManifest(plan: PlanManifest): PlanValidationResult {
  const errors: ValidationError[] = [];

  if (!plan.repoProfile?.purpose) errors.push({ message: 'repoProfile.purpose is required' });
  if (!Array.isArray(plan.repoProfile?.stack)) errors.push({ message: 'repoProfile.stack must be an array' });
  if (!plan.managedPolicy?.marker) errors.push({ message: 'managedPolicy.marker is required' });
  if (!plan.managedPolicy?.blockStart || !plan.managedPolicy?.blockEnd) {
    errors.push({ message: 'managedPolicy.blockStart and blockEnd are required' });
  }
  if (!Array.isArray(plan.files)) errors.push({ message: 'files must be an array' });
  plan.files?.forEach((file, idx) => {
    if (!file.path) errors.push({ path: `files[${idx}]`, message: 'path is required' });
    if (!file.action) errors.push({ path: `files[${idx}]`, message: 'action is required' });
    if (!file.reason) errors.push({ path: `files[${idx}]`, message: 'reason is required' });
  });

  return { ok: errors.length === 0, errors };
}

function fallbackPlan(snapshot: RepoSnapshot): PlanManifest {
  const stacks = inferStackPacks(snapshot);
  const files = defaultFiles(snapshot);

  return {
    repoProfile: {
      purpose: 'Bootstrap AgentOps framework',
      stack: stacks,
      commands: {},
    },
    selection: {
      basePack: true,
      stackPacks: stacks,
      components: ['instructions', 'agents', 'prompts', 'governance'],
    },
    files,
    managedPolicy: DEFAULT_MANAGED_POLICY,
    acceptanceCriteria: [
      'Idempotent outputs',
      'Managed markers applied',
      'Refresh respects human edits',
    ],
    questions: ['Confirm stack packs and instructions scope?'],
  };
}

export class Planner {
  private client: OpenAI | null;
  private model: string;

  constructor(private readonly config: PlannerConfig = {}) {
    this.model = config.model ?? 'gpt-4o';
    this.client = config.token
      ? new OpenAI({
          apiKey: config.token,
          baseURL: 'https://models.inference.ai.azure.com',
        })
      : null;
  }

  async generatePlan(snapshot: RepoSnapshot): Promise<PlannerOutput> {
    if (!this.client || this.config.useFallbackOnly) {
      const plan = fallbackPlan(snapshot);
      return { plan, source: 'fallback' };
    }

    const systemPrompt = `You are the AgentOps Planner Agent. Analyze the RepoSnapshot and produce PlanManifest JSON. Follow the provided schema and do not invent non-standard paths.`;

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(snapshot, null, 2) },
        ],
        response_format: { type: 'json_object' },
        temperature: 0,
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error('Empty response from Planner LLM');

      const plan = JSON.parse(content) as PlanManifest;
      const validation = validatePlanManifest(plan);
      if (!validation.ok) {
        throw new Error(`Planner produced invalid manifest: ${validation.errors.map((e) => e.message).join('; ')}`);
      }
      return { plan, source: 'llm' };
    } catch (error) {
      core.warning(`Planner LLM failed, falling back. ${error}`);
      const plan = fallbackPlan(snapshot);
      return { plan, source: 'fallback' };
    }
  }
}
