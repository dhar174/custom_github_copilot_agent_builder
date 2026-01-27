import OpenAI from 'openai';
import { RepoSnapshot } from '../sense/types';
import { PlanManifest } from './types';
import * as core from '@actions/core';

export class Planner {
  private client: OpenAI;
  private model: string;

  constructor(token: string, model: string = 'gpt-4o') {
    this.client = new OpenAI({
      apiKey: token,
      baseURL: 'https://models.inference.ai.azure.com', // GitHub Models Endpoint
    });
    this.model = model;
  }

  async generatePlan(snapshot: RepoSnapshot): Promise<PlanManifest> {
    const systemPrompt = `
You are the AgentOps Planner Agent. Your goal is to analyze a software repository and prescribe a customized "AgentOps Pack" (Copilot Instructions, Agents, Prompts, Docs).

Your input is a JSON "RepoSnapshot".
Your output must be a valid JSON "PlanManifest".

**Rules:**
1. Analyze the 'signals' (languages, frameworks) to determine the 'stack'.
2. Recommend the 'basePack' (Core AgentOps files) and relevant 'stackPacks' (e.g. 'node-typescript', 'python-flask').
3. List the files to create.
   - Core files: AGENTS.md, repo-profile.md, mcp.md, decision-log.md
   - GitHub Copilot: .github/copilot-instructions.md
   - Agents: .github/agents/planner.agent.md, .github/agents/implementer.agent.md (Suggest names based on our standards)
4. Do NOT hallucinate paths. Use standard locations.
5. If 'aiConfig' shows existing files, mark action as 'update' or 'ignore' based on policy.

**JSON Schema for Output:**
{
  "repoProfile": { "purpose": "string", "stack": ["string"], "commands": { "build": "string", "test": "string" } },
  "selection": { "basePack": true, "stackPacks": ["string"], "components": ["string"] },
  "files": [ { "path": "string", "action": "create|update|ignore", "reason": "string", "templateId": "string" } ],
  "managedPolicy": { "marker": "<!-- agentops-managed: true -->", "blockStart": "<!-- BEGIN: agentops-managed -->", "blockEnd": "<!-- END: agentops-managed -->" },
  "acceptanceCriteria": ["string"],
  "questions": ["string"]
}
`;

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(snapshot, null, 2) }
        ],
        response_format: { type: 'json_object' }
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error('Empty response from Planner LLM');

      const plan = JSON.parse(content) as PlanManifest;
      return plan;
    } catch (error) {
      core.error('Failed to generate plan via LLM');
      throw error;
    }
  }
}
