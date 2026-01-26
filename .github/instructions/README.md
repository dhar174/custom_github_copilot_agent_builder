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

## Creating New Instructions

When adding path-specific instructions:
1. Identify the specific path or component
2. Determine what makes it unique
3. Document relevant patterns and conventions
4. Provide clear examples
5. Test with GitHub Copilot to verify effectiveness
