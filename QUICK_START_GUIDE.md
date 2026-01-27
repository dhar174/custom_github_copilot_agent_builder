# Quick Start Guide: Using awesome-copilot Resources

## What Was Added?

**323 new resources** from the [GitHub awesome-copilot repository](https://github.com/github/awesome-copilot):

- 🤖 **105 Agents** - Expert AI assistants for specialized tasks
- 📝 **74 Prompts** - Reusable templates for common workflows  
- 📋 **144 Instructions** - Coding standards and best practices

All files are located in `.github/` folders and automatically discovered by GitHub Copilot.

## Quick Access

### Most Useful Agents to Start With

```
# General Development
@workspace /agent clean-code          # Code quality improvements
@workspace /agent debugger            # Debugging assistance
@workspace /agent critical-thinking   # Problem analysis

# Architecture & Planning
@workspace /agent architect           # System architecture
@workspace /agent plan                # Project planning
@workspace /agent api-architect       # API design

# Cloud & Infrastructure
@workspace /agent azure-principal-architect     # Azure architecture
@workspace /agent terraform                     # Terraform IaC
@workspace /agent kubernetes                    # Kubernetes

# Testing
@workspace /agent tdd-red             # Write failing test
@workspace /agent tdd-green           # Make test pass
@workspace /agent tdd-refactor        # Refactor code
@workspace /agent playwright-tester   # E2E testing

# Language Experts
@workspace /agent CSharpExpert        # C# development
@workspace /agent python-mcp-expert   # Python development
@workspace /agent typescript-mcp-expert # TypeScript development
```

### Most Useful Prompts

Access via Command Palette (`Ctrl+Shift+P`) → "GitHub Copilot: Run Prompt"

```
# Documentation
- create-readme                       # Generate README
- add-educational-comments            # Add code comments
- create-architectural-decision-record # Create ADR

# Architecture
- architecture-blueprint-generator    # Architecture diagrams
- breakdown-plan                      # Break down features

# Testing
- csharp-xunit                        # XUnit test generation
- csharp-nunit                        # NUnit test generation
- playwright-generate-test            # E2E test generation

# Cloud
- az-cost-optimize                    # Azure cost analysis
- containerize-aspnetcore             # Containerize apps

# Code Generation
- create-specification                # Requirements docs
- create-implementation-plan          # Implementation plan
- conventional-commit                 # Git commit messages
```

### Key Instructions (Auto-Applied)

Instructions automatically apply based on file type:

```
# Languages
csharp.instructions.md               # .cs files
python.instructions.md               # .py files
typescript-5-es2022.instructions.md  # .ts files

# Frameworks
angular.instructions.md              # Angular projects
react.instructions.md                # React projects
nextjs.instructions.md               # Next.js projects
blazor.instructions.md               # Blazor projects

# Cloud/Infrastructure
azure-verified-modules-bicep.instructions.md  # .bicep files
terraform.instructions.md                      # .tf files
kubernetes.instructions.md                     # k8s yamls

# Testing
playwright-best-practices.instructions.md      # Playwright tests
```

## Common Workflows

### 1. Start a New Feature

```bash
# Step 1: Plan
@workspace /agent plan "Create user authentication"

# Step 2: Design architecture
Run prompt: architecture-blueprint-generator

# Step 3: Create specification
Run prompt: create-specification

# Step 4: Break down into tasks
Run prompt: breakdown-plan

# Step 5: Create implementation plan
Run prompt: create-implementation-plan
```

### 2. Test-Driven Development

```bash
# Red: Write failing test
@workspace /agent tdd-red "User login validation"

# Green: Make it pass
@workspace /agent tdd-green

# Refactor: Improve code
@workspace /agent tdd-refactor
```

### 3. Azure Infrastructure

```bash
# Step 1: Plan architecture
@workspace /agent azure-principal-architect "E-commerce platform"

# Step 2: Generate IaC
@workspace /agent azure-iac-generator

# Step 3: Optimize costs
Run prompt: az-cost-optimize

# Step 4: Review
@workspace /agent terraform-iac-reviewer
```

### 4. Code Quality Review

```bash
# Step 1: Clean code review
@workspace /agent clean-code

# Step 2: Security review
@workspace /agent security

# Step 3: Performance review
Run prompt: sql-optimization  # or language-specific prompt
```

### 5. Documentation Generation

```bash
# README
Run prompt: create-readme

# Code comments
Run prompt: add-educational-comments

# API docs
Run prompt: create-oo-component-documentation

# Architecture decisions
Run prompt: create-architectural-decision-record
```

## Tips for Maximum Productivity

### 1. Combine Resources

**Example: Azure Development**
```bash
Agent: azure-principal-architect
Instructions: azure-verified-modules-bicep.instructions.md (auto-applied)
Prompt: az-cost-optimize
```

### 2. Language-Specific Stacks

**C# Development:**
- Agent: `CSharpExpert`
- Instructions: `csharp.instructions.md`
- Prompts: `csharp-*.prompt.md`

**Python Development:**
- Agent: `python-mcp-expert`
- Instructions: `python.instructions.md`
- Prompts: `python-mcp-server-generator.prompt.md`

### 3. Quality Gates

Build quality checks into your workflow:

```bash
1. Code: @workspace /agent clean-code
2. Test: @workspace /agent tdd-* (red/green/refactor)
3. Security: @workspace /agent security
4. Review: Use code-review-generic.instructions.md
5. Document: Run documentation prompts
```

### 4. Progressive Refinement

Start broad, then get specific:

```
1. @workspace /agent plan              # High-level plan
2. @workspace /agent architect         # Architecture design
3. @workspace /agent CSharpExpert      # Language-specific implementation
4. @workspace /agent clean-code        # Quality refinement
```

## Where to Find More Information

- **Complete Details:** See `AWESOME_COPILOT_INTEGRATION_SUMMARY.md`
- **All Agents:** Browse `.github/agents/`
- **All Prompts:** Browse `.github/prompts/`
- **All Instructions:** Browse `.github/instructions/`

## Troubleshooting

### Can't see agents/prompts?

1. Make sure you have GitHub Copilot extension installed
2. Reload VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"
3. Check Copilot is enabled: Click Copilot icon in bottom right

### Which agent/prompt should I use?

1. **For planning:** Use `plan.agent.md` or `architect.agent.md`
2. **For coding:** Use language-specific experts (CSharpExpert, python-mcp-expert, etc.)
3. **For testing:** Use `tdd-*` agents or test framework prompts
4. **For documentation:** Use documentation prompts
5. **For review:** Use `clean-code.agent.md` or `critical-thinking.agent.md`

### How do I know what each resource does?

Each file has a description at the top in YAML frontmatter:

```yaml
---
description: 'What this agent/prompt/instruction does'
---
```

Open the file to see full details!

## Next Steps

1. ✅ **Try a few agents:** Start with `plan`, `architect`, or language-specific experts
2. ✅ **Run some prompts:** Try documentation or testing prompts
3. ✅ **Read the full summary:** See `AWESOME_COPILOT_INTEGRATION_SUMMARY.md` for complete workflows
4. ✅ **Customize:** Fork and modify resources to fit your team's needs

## Resources

- **awesome-copilot:** https://github.com/github/awesome-copilot
- **Copilot Docs:** https://docs.github.com/copilot
- **VS Code Copilot:** https://code.visualstudio.com/docs/copilot/copilot-chat

---

**Quick Tip:** Type `@workspace /agent` and press space to see all available agents!
