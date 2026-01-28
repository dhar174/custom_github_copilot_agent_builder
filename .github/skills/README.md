# Agent Skills

This directory contains Agent Skills for GitHub Copilot - specialized capabilities that extend Copilot's functionality with bundled instructions, scripts, and resources.

## Purpose

Agent Skills are self-contained packages that provide domain-specific knowledge and capabilities to GitHub Copilot. Each skill includes:

- Detailed instructions and guidelines
- Optional scripts for automation
- Reference materials and documentation
- Assets and resources

## Available Skills

| Skill | Description |
|-------|-------------|
| [agentic-eval](agentic-eval/) | Evaluation framework for agentic systems |
| [image-manipulation-image-magick](image-manipulation-image-magick/) | Process and manipulate images using ImageMagick |
| [make-skill-template](make-skill-template/) | Create new Agent Skills from prompts or templates |
| [mcp-cli](mcp-cli/) | Interface for MCP (Model Context Protocol) servers via CLI |
| [prd](prd/) | Generate high-quality Product Requirements Documents |
| [refactor](refactor/) | Surgical code refactoring to improve maintainability |
| [web-design-reviewer](web-design-reviewer/) | Visual inspection and design issue identification for websites |
| [webapp-testing](webapp-testing/) | Toolkit for interacting with and testing local web applications |

## Skill Structure

Each skill follows this directory structure:

```
skill-name/
├── SKILL.md              # Main skill definition with frontmatter
├── scripts/              # Optional: automation scripts
├── references/           # Optional: reference documentation
└── assets/              # Optional: images, templates, etc.
```

## Using Skills

Skills are automatically loaded by GitHub Copilot when:
1. The skill's trigger conditions match the current context
2. You explicitly reference the skill by name
3. The task falls within the skill's domain

## Creating New Skills

To create a new skill:

1. Use the [make-skill-template](make-skill-template/) skill
2. Follow the guidelines in [agent-skills.instructions.md](../instructions/agent-skills.instructions.md)
3. Include proper frontmatter in SKILL.md
4. Test the skill with relevant use cases
5. Document examples and limitations

## Skill Frontmatter

Each SKILL.md file includes YAML frontmatter:

```yaml
---
name: skill-name
description: Brief description
triggers:
  - "keyword or phrase"
  - "another trigger"
capabilities:
  - Capability 1
  - Capability 2
---
```

## Best Practices

1. **Single Responsibility**: Each skill should focus on one domain
2. **Clear Documentation**: Include examples and usage guidelines
3. **Self-Contained**: Bundle all necessary resources within the skill
4. **Trigger Precision**: Use specific trigger phrases to avoid false activations
5. **Test Thoroughly**: Verify skill behavior in various contexts
6. **Version Control**: Track changes and iterations

## Contributing

When adding or modifying skills:
- Follow the established structure
- Include comprehensive documentation
- Test with real-world scenarios
- Update this README with new skills

