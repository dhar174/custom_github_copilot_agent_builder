# Repository Profile

## Project Overview

This repository provides a framework for building customized, optimized GitHub Copilot agents using custom repo-wide instructions, path-specific instructions, and specialized agent files.

## Key Features

- **Custom Instructions**: Repo-wide and path-specific instructions for GitHub Copilot
- **Custom Agents**: Specialist teammates and sub-agents defined in `.agent.md` files
- **Prompt Files**: Reusable prompts in `.prompt.md` files
- **Context Management**: `.context.md` files for maintaining context
- **Memory Management**: `.memory.md` files for storing important information

## Repository Structure

```
custom_github_copilot_agent_builder/
  README.md
  AGENTS.md
  repo-profile.md
  mcp.md
  decision-log.md
  docs/
    specs/
    context/
    memory/
  .github/
    copilot-instructions.md
    instructions/
    agents/
    prompts/
```

## Technology Stack

- GitHub Copilot
- Markdown documentation
- Custom agent definitions

## Getting Started

1. Review the `AGENTS.md` file to understand available custom agents
2. Check `copilot-instructions.md` for repo-wide Copilot configuration
3. Explore the `docs/` directory for specifications and context
4. Review the `decision-log.md` for architectural decisions

## Contributing

Contributions are welcome! Please follow the established patterns for creating custom agents and documentation.
