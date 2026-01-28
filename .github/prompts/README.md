# Prompts

This directory contains reusable prompt templates for GitHub Copilot.

## Purpose

Store `.prompt.md` files that define reusable prompts for common tasks and workflows.

## Prompt File Format

Prompt files should follow this format:

```markdown
# Prompt: [Prompt Name]

## Description
Brief description of what this prompt does and when to use it.

## Parameters
List of parameters that can be customized:
- `{parameter1}`: Description of parameter
- `{parameter2}`: Description of parameter

## Template

```
[Your prompt template here with {parameter} placeholders]
```

## Example Usage

### Example 1
**Parameters**:
- `parameter1`: value1
- `parameter2`: value2

**Rendered Prompt**:
```
[The prompt with actual values substituted]
```

**Expected Result**:
Description of what this prompt should accomplish.

## Tips
- Tips for using this prompt effectively
- Common variations
- Best practices
```

## Types of Prompts

### Task Prompts
Prompts for specific development tasks:
- Code generation
- Refactoring
- Bug fixing
- Documentation

### Review Prompts
Prompts for code review and analysis:
- Security review
- Performance analysis
- Code quality checks
- Architecture review

### Documentation Prompts
Prompts for documentation tasks:
- API documentation
- README generation
- Tutorial creation
- Comment generation

### Testing Prompts
Prompts for testing-related tasks:
- Test case generation
- Test data creation
- Coverage analysis
- Test documentation

## Creating Reusable Prompts

When creating a new prompt:

1. **Identify Common Pattern**: Find a task you do repeatedly
2. **Extract Variables**: Identify parts that change between uses
3. **Write Template**: Create a template with parameter placeholders
4. **Add Examples**: Show realistic usage examples
5. **Document Purpose**: Explain when and how to use it
6. **Test Thoroughly**: Verify it works in different scenarios

## Available Prompt Templates

| Prompt | Description |
|--------|-------------|
| [add-educational-comments.prompt.md](add-educational-comments.prompt.md) | Add educational comments to code |
| [architecture-blueprint-generator.prompt.md](architecture-blueprint-generator.prompt.md) | Generate architecture blueprints |
| [boost-prompt.prompt.md](boost-prompt.prompt.md) | Enhance and boost prompt effectiveness |
| [breakdown-epic-arch.prompt.md](breakdown-epic-arch.prompt.md) | Break down epics from architecture perspective |
| [breakdown-epic-pm.prompt.md](breakdown-epic-pm.prompt.md) | Break down epics from product management perspective |
| [breakdown-feature-implementation.prompt.md](breakdown-feature-implementation.prompt.md) | Break down features into implementation tasks |
| [breakdown-feature-prd.prompt.md](breakdown-feature-prd.prompt.md) | Break down features into PRD components |
| [breakdown-plan.prompt.md](breakdown-plan.prompt.md) | Break down plans into actionable items |
| [breakdown-test.prompt.md](breakdown-test.prompt.md) | Break down testing requirements |
| [code-exemplars-blueprint-generator.prompt.md](code-exemplars-blueprint-generator.prompt.md) | Generate code exemplar blueprints |
| [comment-code-generate-a-tutorial.prompt.md](comment-code-generate-a-tutorial.prompt.md) | Generate tutorials from commented code |
| [copilot-instructions-blueprint-generator.prompt.md](copilot-instructions-blueprint-generator.prompt.md) | Generate Copilot instruction blueprints |
| [create-agentsmd.prompt.md](create-agentsmd.prompt.md) | Create AGENTS.md documentation |
| [create-architectural-decision-record.prompt.md](create-architectural-decision-record.prompt.md) | Create Architecture Decision Records |
| [create-github-action-workflow-specification.prompt.md](create-github-action-workflow-specification.prompt.md) | Create GitHub Actions workflow specifications |
| [create-github-issue-feature-from-specification.prompt.md](create-github-issue-feature-from-specification.prompt.md) | Create GitHub issues from specifications |
| [create-github-issues-feature-from-implementation-plan.prompt.md](create-github-issues-feature-from-implementation-plan.prompt.md) | Create GitHub issues from implementation plans |
| [create-github-issues-for-unmet-specification-requirements.prompt.md](create-github-issues-for-unmet-specification-requirements.prompt.md) | Create issues for unmet requirements |
| [create-github-pull-request-from-specification.prompt.md](create-github-pull-request-from-specification.prompt.md) | Create pull requests from specifications |
| [create-implementation-plan.prompt.md](create-implementation-plan.prompt.md) | Create detailed implementation plans |
| [create-llms.prompt.md](create-llms.prompt.md) | Create LLM configurations |
| [create-oo-component-documentation.prompt.md](create-oo-component-documentation.prompt.md) | Create object-oriented component documentation |
| [create-readme.prompt.md](create-readme.prompt.md) | Create README files |
| [create-specification.prompt.md](create-specification.prompt.md) | Create technical specifications |
| [create-technical-spike.prompt.md](create-technical-spike.prompt.md) | Create technical spike documentation |
| [create-tldr-page.prompt.md](create-tldr-page.prompt.md) | Create TL;DR summary pages |
| [devops-rollout-plan.prompt.md](devops-rollout-plan.prompt.md) | Create DevOps rollout plans |
| [documentation-writer.prompt.md](documentation-writer.prompt.md) | Write comprehensive documentation |
| [finalize-agent-prompt.prompt.md](finalize-agent-prompt.prompt.md) | Finalize and optimize agent prompts |
| [first-ask.prompt.md](first-ask.prompt.md) | Initial project discovery questions |
| [folder-structure-blueprint-generator.prompt.md](folder-structure-blueprint-generator.prompt.md) | Generate folder structure blueprints |
| [gen-specs-as-issues.prompt.md](gen-specs-as-issues.prompt.md) | Generate specifications as GitHub issues |
| [git-flow-branch-creator.prompt.md](git-flow-branch-creator.prompt.md) | Create Git flow branches |
| [github-copilot-starter.prompt.md](github-copilot-starter.prompt.md) | GitHub Copilot starter guide |
| [mcp-create-adaptive-cards.prompt.md](mcp-create-adaptive-cards.prompt.md) | Create MCP adaptive cards |
| [mcp-deploy-manage-agents.prompt.md](mcp-deploy-manage-agents.prompt.md) | Deploy and manage MCP agents |
| [memory-merger.prompt.md](memory-merger.prompt.md) | Merge memory and context files |
| [model-recommendation.prompt.md](model-recommendation.prompt.md) | Recommend AI models for tasks |
| [playwright-explore-website.prompt.md](playwright-explore-website.prompt.md) | Explore websites with Playwright |
| [playwright-generate-test.prompt.md](playwright-generate-test.prompt.md) | Generate Playwright tests |
| [prd-creation.prompt.md](prd-creation.prompt.md) | Create Product Requirements Documents |
| [project-workflow-analysis-blueprint-generator.prompt.md](project-workflow-analysis-blueprint-generator.prompt.md) | Generate project workflow analysis blueprints |
| [prompt-builder.prompt.md](prompt-builder.prompt.md) | Build custom prompts |
| [pytest-coverage.prompt.md](pytest-coverage.prompt.md) | Analyze pytest coverage |
| [readme-blueprint-generator.prompt.md](readme-blueprint-generator.prompt.md) | Generate README blueprints |
| [remember.prompt.md](remember.prompt.md) | Store and retrieve project memory |
| [repo-story-time.prompt.md](repo-story-time.prompt.md) | Generate repository story narratives |
| [review-and-refactor.prompt.md](review-and-refactor.prompt.md) | Review and refactor code |
| [structured-autonomy-generate.prompt.md](structured-autonomy-generate.prompt.md) | Generate structured autonomy workflows |
| [structured-autonomy-implement.prompt.md](structured-autonomy-implement.prompt.md) | Implement structured autonomy |
| [structured-autonomy-plan.prompt.md](structured-autonomy-plan.prompt.md) | Plan structured autonomy approach |
| [suggest-awesome-github-copilot-agents.prompt.md](suggest-awesome-github-copilot-agents.prompt.md) | Suggest useful Copilot agents |
| [suggest-awesome-github-copilot-collections.prompt.md](suggest-awesome-github-copilot-collections.prompt.md) | Suggest Copilot agent collections |
| [suggest-awesome-github-copilot-instructions.prompt.md](suggest-awesome-github-copilot-instructions.prompt.md) | Suggest useful Copilot instructions |
| [suggest-awesome-github-copilot-prompts.prompt.md](suggest-awesome-github-copilot-prompts.prompt.md) | Suggest useful Copilot prompts |
| [task-execution.prompt.md](task-execution.prompt.md) | Execute tasks systematically |
| [task-generation.prompt.md](task-generation.prompt.md) | Generate task lists and plans |
| [technology-stack-blueprint-generator.prompt.md](technology-stack-blueprint-generator.prompt.md) | Generate technology stack blueprints |
| [update-implementation-plan.prompt.md](update-implementation-plan.prompt.md) | Update implementation plans |
| [update-llms.prompt.md](update-llms.prompt.md) | Update LLM configurations |
| [update-markdown-file-index.prompt.md](update-markdown-file-index.prompt.md) | Update markdown file indexes |
| [update-oo-component-documentation.prompt.md](update-oo-component-documentation.prompt.md) | Update object-oriented component documentation |
| [update-specification.prompt.md](update-specification.prompt.md) | Update technical specifications |
| [write-coding-standards-from-file.prompt.md](write-coding-standards-from-file.prompt.md) | Write coding standards from existing files |

## Best Practices

1. **Clear Parameters**: Use descriptive parameter names
2. **Flexible Design**: Make prompts adaptable to variations
3. **Good Defaults**: Consider providing default values
4. **Complete Examples**: Show full usage examples
5. **Version Control**: Track prompt evolution
6. **Regular Updates**: Keep prompts current with best practices

## Prompt Naming Conventions

- Use descriptive names: `code-review.prompt.md`, `test-generator.prompt.md`
- Follow kebab-case for filenames
- Use `.prompt.md` extension
- Keep names concise but clear

## Using Prompts

Prompts can be used:
- Directly with GitHub Copilot
- As templates for custom agents
- As starting points for new prompts
- For consistent task execution
- To share best practices across the team
