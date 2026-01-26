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

## Agent Naming Conventions

- Use descriptive names: `python-expert.agent.md`, `testing-assistant.agent.md`
- Follow kebab-case for filenames
- Use `.agent.md` extension
- Keep names concise but meaningful
