"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Planner = void 0;
const openai_1 = __importDefault(require("openai"));
const core = __importStar(require("@actions/core"));
class Planner {
    constructor(token, model = 'gpt-4o') {
        this.client = new openai_1.default({
            apiKey: token,
            baseURL: 'https://models.inference.ai.azure.com', // GitHub Models Endpoint
        });
        this.model = model;
    }
    async generatePlan(snapshot) {
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
            if (!content)
                throw new Error('Empty response from Planner LLM');
            const plan = JSON.parse(content);
            return plan;
        }
        catch (error) {
            core.error('Failed to generate plan via LLM');
            throw error;
        }
    }
}
exports.Planner = Planner;
