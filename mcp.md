# Model Context Protocol (MCP)

## Overview

The Model Context Protocol (MCP) defines how context is shared and maintained across different components of the custom GitHub Copilot agent framework.

## Context Management

### Repository Context
The repository-level context is maintained through:
- `repo-profile.md`: High-level repository information
- `.github/copilot-instructions.md`: Repo-wide Copilot instructions
- `docs/context/`: Context-specific documentation

### Path-Specific Context
Context can be customized for specific paths using:
- Path-specific instruction files in `.github/instructions/`
- `.context.md` files in relevant directories

## Memory Management

### Persistent Memory
The framework supports persistent memory through:
- `docs/memory/`: Stored memory and learnings
- `.memory.md` files: Path-specific memory

### Working Memory
Working memory is managed through:
- Active context windows
- Recent file access patterns
- Current task context

## Agent Communication

### Agent-to-Agent Protocol
Custom agents can communicate through:
- Shared context files
- Memory files
- Structured data exchange

### Agent-to-User Protocol
Agents interact with users through:
- GitHub Copilot interface
- Markdown-formatted responses
- Interactive prompts

## Best Practices

1. **Keep Context Focused**: Only include relevant context for the current task
2. **Update Memory**: Regularly update memory files with important learnings
3. **Use Structured Format**: Follow consistent formatting for context and memory files
4. **Version Control**: Track changes to context and memory files
5. **Clean Up**: Remove outdated context periodically

## Context File Formats

### .context.md Format
```markdown
# Context: [Title]

## Current State
[Description of current state]

## Relevant Information
[Key information for this context]

## Related Files
- [List of related files]
```

### .memory.md Format
```markdown
# Memory: [Title]

## Learnings
[Important learnings to remember]

## Decisions
[Key decisions made]

## Patterns
[Patterns observed]
```
