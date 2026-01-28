# Custom Agents

This directory contains custom agent definitions for specialized AI assistants.

## Purpose

Store `.agent.md` files that define custom agents with specialized capabilities and knowledge.

## Agent File Format

Custom agent files should follow this format:

```markdown
# Agent: [Agent Name]

## Purpose
Clear description of what this agent does and when to use it.

## Capabilities
- List of specific capabilities
- Tools available to the agent
- Areas of expertise
- Limitations

## Instructions
Detailed instructions for the agent's behavior and decision-making.

## Examples

### Example 1: [Scenario]
**Input**: [Example input]
**Output**: [Expected output]
**Explanation**: [Why this is the expected output]

### Example 2: [Scenario]
**Input**: [Example input]
**Output**: [Expected output]
**Explanation**: [Why this is the expected output]

## Usage Guidelines
How to effectively use this agent and when to invoke it.

## Configuration
Any specific configuration or settings for this agent.
```

## Types of Agents

### Specialist Agents
- Focus on specific domains or technologies
- Deep expertise in a particular area
- Handle complex domain-specific tasks

### Sub-Agents
- Assist with specific subtasks
- Can be invoked by other agents
- Handle well-defined, focused tasks

### Workflow Agents
- Orchestrate multi-step processes
- Coordinate between different tools
- Manage complex workflows

## Creating Custom Agents

When creating a new custom agent:

1. **Define Purpose**: Clearly state what problem the agent solves
2. **Specify Capabilities**: List what the agent can and cannot do
3. **Provide Instructions**: Give clear, detailed instructions
4. **Include Examples**: Show concrete usage examples
5. **Test Thoroughly**: Verify the agent works as expected
6. **Document Limitations**: Be clear about what the agent cannot handle

## Best Practices

1. **Single Responsibility**: Each agent should have a focused purpose
2. **Clear Instructions**: Write explicit, unambiguous instructions
3. **Good Examples**: Provide diverse, realistic examples
4. **Version Control**: Track changes to agent definitions
5. **Regular Updates**: Keep agents current with evolving needs
6. **Test Coverage**: Test agents with various scenarios

## Available Custom Agents

| Agent | Purpose |
|-------|--------|
| [address-comments.agent.md](address-comments.agent.md) | Address and resolve code review comments |
| [adr-generator.agent.md](adr-generator.agent.md) | Generate Architecture Decision Records |
| [api-architect.agent.md](api-architect.agent.md) | Design and architect API structures |
| [api-designer.agent.md](api-designer.agent.md) | Design API endpoints and contracts |
| [architect.agent.md](architect.agent.md) | Software architecture design and guidance |
| [clean-code.agent.md](clean-code.agent.md) | Clean code principles and refactoring |
| [context7.agent.md](context7.agent.md) | Context-aware development assistance |
| [critical-thinking.agent.md](critical-thinking.agent.md) | Critical analysis and problem-solving |
| [custom-agent-foundry.agent.md](custom-agent-foundry.agent.md) | Create and customize new agents |
| [debug.agent.md](debug.agent.md) | Debugging assistance and troubleshooting |
| [debugger.agent.md](debugger.agent.md) | Interactive debugging support |
| [demonstrate-understanding.agent.md](demonstrate-understanding.agent.md) | Verify and demonstrate code understanding |
| [devils-advocate.agent.md](devils-advocate.agent.md) | Challenge assumptions and identify risks |
| [devops-expert.agent.md](devops-expert.agent.md) | DevOps practices and tooling |
| [expert-nextjs-developer.agent.md](expert-nextjs-developer.agent.md) | Next.js development expertise |
| [github-actions-expert.agent.md](github-actions-expert.agent.md) | GitHub Actions workflows and CI/CD |
| [gpt-5-beast-mode.agent.md](gpt-5-beast-mode.agent.md) | Advanced problem-solving mode |
| [hlbpa.agent.md](hlbpa.agent.md) | High-Level Business Process Analysis |
| [implementation-plan.agent.md](implementation-plan.agent.md) | Create detailed implementation plans |
| [janitor.agent.md](janitor.agent.md) | Code cleanup and maintenance |
| [mentor.agent.md](mentor.agent.md) | Mentoring and teaching assistance |
| [meta-agentic-project-scaffold.agent.md](meta-agentic-project-scaffold.agent.md) | Scaffold meta-agentic projects |
| [migration-specialist.agent.md](migration-specialist.agent.md) | Code migration and modernization |
| [modernization.agent.md](modernization.agent.md) | Legacy code modernization |
| [openapi-to-application.agent.md](openapi-to-application.agent.md) | Generate applications from OpenAPI specs |
| [performance-analyzer.agent.md](performance-analyzer.agent.md) | Performance analysis and optimization |
| [plan.agent.md](plan.agent.md) | Project planning and task breakdown |
| [playwright-tester.agent.md](playwright-tester.agent.md) | Playwright test automation |
| [prd-creation.agent.md](prd-creation.agent.md) | Create Product Requirements Documents |
| [prd.agent.md](prd.agent.md) | Product requirements analysis |
| [principal-software-engineer.agent.md](principal-software-engineer.agent.md) | Senior-level engineering guidance |
| [prompt-builder.agent.md](prompt-builder.agent.md) | Build and optimize prompts |
| [prompt-engineer.agent.md](prompt-engineer.agent.md) | Prompt engineering expertise |
| [refine-issue.agent.md](refine-issue.agent.md) | Refine and improve GitHub issues |
| [research-technical-spike.agent.md](research-technical-spike.agent.md) | Technical research and spike creation |
| [se-gitops-ci-specialist.agent.md](se-gitops-ci-specialist.agent.md) | GitOps and CI/CD specialization |
| [search-ai-optimization-expert.agent.md](search-ai-optimization-expert.agent.md) | Search AI and optimization |
| [security-reviewer.agent.md](security-reviewer.agent.md) | Security review and analysis |
| [simple-app-idea-generator.agent.md](simple-app-idea-generator.agent.md) | Generate simple application ideas |
| [software-engineer-agent-v1.agent.md](software-engineer-agent-v1.agent.md) | General software engineering assistant |
| [specification.agent.md](specification.agent.md) | Technical specification creation |
| [specsmd-construction-agent.agent.md](specsmd-construction-agent.agent.md) | SpecsMD construction phase agent |
| [specsmd-inception-agent.agent.md](specsmd-inception-agent.agent.md) | SpecsMD inception phase agent |
| [specsmd-master-agent.agent.md](specsmd-master-agent.agent.md) | SpecsMD master orchestration agent |
| [specsmd-operations-agent.agent.md](specsmd-operations-agent.agent.md) | SpecsMD operations agent |
| [task-planner.agent.md](task-planner.agent.md) | Task planning and breakdown |
| [task-researcher.agent.md](task-researcher.agent.md) | Research tasks and gather information |
| [tech-debt-remediation-plan.agent.md](tech-debt-remediation-plan.agent.md) | Technical debt analysis and planning |
| [technical-content-evaluator.agent.md](technical-content-evaluator.agent.md) | Evaluate technical content quality |
| [test-writer.agent.md](test-writer.agent.md) | Test case and test code creation |
| [Thinking-Beast-Mode.agent.md](Thinking-Beast-Mode.agent.md) | Enhanced reasoning and analysis |
| [Ultimate-Transparent-Thinking-Beast-Mode.agent.md](Ultimate-Transparent-Thinking-Beast-Mode.agent.md) | Maximum transparency reasoning mode |
| [WinFormsExpert.agent.md](WinFormsExpert.agent.md) | Windows Forms development expertise |

## Agent Naming Conventions

- Use descriptive names: `python-expert.agent.md`, `testing-assistant.agent.md`
- Follow kebab-case for filenames
- Use `.agent.md` extension
- Keep names concise but meaningful
