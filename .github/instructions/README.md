# Instructions

This directory contains path-specific instructions for GitHub Copilot.

## Purpose

Store path-specific instruction files that customize GitHub Copilot behavior for different areas of the codebase.

## Structure

Instruction files can be organized to match the repository structure:
- By directory or path
- By component or feature
- By language or framework

## Instruction File Format

Path-specific instruction files should be clear and focused:

```markdown
# Instructions for [Path/Component]

## Context
Brief description of this path or component.

## Code Style
Specific code style guidelines for this area.

## Patterns
Common patterns used in this area.

## Conventions
Naming conventions and other standards.

## Tools and Libraries
Relevant tools and libraries for this area.

## Examples
Example code or usage patterns.
```

## How Path-Specific Instructions Work

Path-specific instructions:
- Override or supplement repo-wide instructions
- Apply only to files within specific paths
- Help Copilot provide more relevant suggestions
- Customize behavior for different project areas

## Best Practices

1. **Stay Focused**: Keep instructions relevant to the specific path
2. **Be Consistent**: Align with repo-wide instructions when possible
3. **Include Examples**: Show concrete examples of patterns
4. **Update Regularly**: Keep instructions current with code changes
5. **Avoid Duplication**: Don't repeat repo-wide instructions

## Available Instruction Files

| File | Description |
|------|-------------|
| [agent-skills.instructions.md](agent-skills.instructions.md) | Guidelines for creating high-quality Agent Skills for GitHub Copilot |
| [agents.instructions.md](agents.instructions.md) | Guidelines for creating custom agent files for GitHub Copilot |
| [code-review-generic.instructions.md](code-review-generic.instructions.md) | Generic code review instructions that can be customized for any project |
| [codexer.instructions.md](codexer.instructions.md) | Advanced Python research assistant with Context 7 MCP integration |
| [containerization-docker-best-practices.instructions.md](containerization-docker-best-practices.instructions.md) | Best practices for creating optimized, secure Docker images and containers |
| [copilot-sdk-nodejs.instructions.md](copilot-sdk-nodejs.instructions.md) | Guidance on building Node.js/TypeScript applications using GitHub Copilot SDK |
| [copilot-sdk-python.instructions.md](copilot-sdk-python.instructions.md) | Guidance on building Python applications using GitHub Copilot SDK |
| [copilot-thought-logging.instructions.md](copilot-thought-logging.instructions.md) | Process tracking instructions for Copilot with editable workflow documentation |
| [genaiscript.instructions.md](genaiscript.instructions.md) | AI-powered script generation guidelines |
| [github-actions-ci-cd-best-practices.instructions.md](github-actions-ci-cd-best-practices.instructions.md) | Comprehensive CI/CD pipeline best practices using GitHub Actions |
| [instructions.instructions.md](instructions.instructions.md) | Guidelines for creating high-quality custom instruction files |
| [langchain-python.instructions.md](langchain-python.instructions.md) | Instructions for using LangChain with Python |
| [markdown.instructions.md](markdown.instructions.md) | Documentation and content creation standards |
| [memory-bank.instructions.md](memory-bank.instructions.md) | Memory Bank system for persistent project context and knowledge |
| [performance-optimization.instructions.md](performance-optimization.instructions.md) | Comprehensive performance optimization for all languages and frameworks |
| [prompt.instructions.md](prompt.instructions.md) | Guidelines for creating high-quality prompt files |
| [shell.instructions.md](shell.instructions.md) | Shell scripting best practices and conventions |
| [spec-driven-workflow-v1.instructions.md](spec-driven-workflow-v1.instructions.md) | Specification-Driven Workflow for structured software development |
| [taming-copilot.instructions.md](taming-copilot.instructions.md) | Guidelines to keep Copilot under control and prevent unwanted changes |
| [task-implementation.instructions.md](task-implementation.instructions.md) | Instructions for implementing task plans with progressive tracking |
| [tasksync.instructions.md](tasksync.instructions.md) | TaskSync V4 - Terminal-based task management for continuous agent operation |
| [update-code-from-shorthand.instructions.md](update-code-from-shorthand.instructions.md) | Update code files from shorthand notation |
| [update-docs-on-code-change.instructions.md](update-docs-on-code-change.instructions.md) | Automatically update documentation when application code changes |

## Creating New Instructions

When adding path-specific instructions:
1. Identify the specific path or component
2. Determine what makes it unique
3. Document relevant patterns and conventions
4. Provide clear examples
5. Test with GitHub Copilot to verify effectiveness
