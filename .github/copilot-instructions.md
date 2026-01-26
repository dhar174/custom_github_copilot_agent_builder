# GitHub Copilot Instructions

## Repository-Wide Instructions

This file contains repository-wide instructions for GitHub Copilot to improve code suggestions and agent behavior across the entire project.

## Code Style and Conventions

### General Guidelines
- Write clear, self-documenting code
- Follow language-specific best practices
- Prioritize readability and maintainability
- Use meaningful variable and function names

### Documentation
- Use Markdown for all documentation files
- Keep documentation up-to-date with code changes
- Include examples where appropriate
- Follow the established documentation structure

### Custom Agents
- Define custom agents in `.agent.md` files within `.github/agents/`
- Include clear purpose and capabilities for each agent
- Document agent usage patterns
- Test agents before committing

## File Organization

### Documentation Structure
- `docs/specs/`: Technical specifications
- `docs/context/`: Context-specific documentation
- `docs/memory/`: Persistent memory and learnings

### GitHub Copilot Configuration
- `.github/copilot-instructions.md`: This file (repo-wide instructions)
- `.github/instructions/`: Path-specific instructions
- `.github/agents/`: Custom agent definitions
- `.github/prompts/`: Reusable prompt templates

## Custom Agent Guidelines

When creating or modifying custom agents:

1. **Purpose**: Clearly define the agent's purpose and scope
2. **Capabilities**: List specific capabilities and tools available
3. **Examples**: Provide usage examples
4. **Limitations**: Document known limitations
5. **Testing**: Include test scenarios

## Prompt Guidelines

When creating prompt files (`.prompt.md`):

1. **Structure**: Use clear section headers
2. **Parameters**: Document any variables or parameters
3. **Context**: Include necessary context
4. **Examples**: Show example usage
5. **Expected Output**: Describe expected results

## Memory and Context Guidelines

### Context Files (`.context.md`)
- Keep context focused and relevant
- Update regularly
- Remove outdated information
- Link to related files

### Memory Files (`.memory.md`)
- Record important learnings
- Document patterns and insights
- Track decisions
- Include timestamps

## Best Practices

1. **Incremental Changes**: Make small, focused changes
2. **Testing**: Test changes before committing
3. **Documentation**: Update documentation with code changes
4. **Review**: Review changes for clarity and correctness
5. **Consistency**: Follow established patterns

## Special Instructions for Copilot

- Prefer solutions that align with existing patterns in the repository
- When suggesting custom agents, reference examples from `.github/agents/`
- For documentation, follow the formats defined in this repository
- Consider the repository structure when suggesting file placements
- Suggest improvements to custom agents when relevant
