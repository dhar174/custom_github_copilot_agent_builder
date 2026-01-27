# Workflow Cheatsheet: awesome-copilot Resources

Quick reference for common development workflows using the integrated awesome-copilot resources.

## Development Lifecycle Workflows

### 🎯 Planning Phase

| Task | Agent | Prompt | Instructions |
|------|-------|--------|--------------|
| Project Planning | `plan.agent.md` | `breakdown-plan.prompt.md` | - |
| Architecture Design | `architect.agent.md` | `architecture-blueprint-generator.prompt.md` | - |
| Requirements Spec | - | `create-specification.prompt.md` | - |
| Implementation Plan | `implementation-plan.agent.md` | `create-implementation-plan.prompt.md` | - |
| Technical Spike | `research-technical-spike.agent.md` | `create-technical-spike.prompt.md` | - |

### 💻 Implementation Phase

| Stack | Agent | Key Instructions | Testing Prompts |
|-------|-------|------------------|-----------------|
| **C# / .NET** | `CSharpExpert.agent.md` | `csharp.instructions.md`<br>`aspnet-rest-apis.instructions.md` | `csharp-xunit.prompt.md`<br>`csharp-nunit.prompt.md` |
| **Python** | `python-mcp-expert.agent.md` | `python.instructions.md`<br>`langchain-python.instructions.md` | `pytest-coverage.prompt.md` |
| **TypeScript** | `typescript-mcp-expert.agent.md` | `typescript-5-es2022.instructions.md` | `javascript-typescript-jest.prompt.md` |
| **React** | `expert-react-frontend-engineer.agent.md` | `react.instructions.md` | `playwright-generate-test.prompt.md` |
| **Next.js** | `expert-nextjs-developer.agent.md` | `nextjs.instructions.md` | `playwright-generate-test.prompt.md` |
| **Angular** | - | `angular.instructions.md` | `playwright-generate-test.prompt.md` |

### 🧪 Testing Phase

| Type | Agent | Prompts | Notes |
|------|-------|---------|-------|
| **TDD Red** | `tdd-red.agent.md` | Framework-specific test prompts | Write failing test first |
| **TDD Green** | `tdd-green.agent.md` | - | Minimal code to pass |
| **TDD Refactor** | `tdd-refactor.agent.md` | - | Improve without breaking |
| **E2E Testing** | `playwright-tester.agent.md` | `playwright-generate-test.prompt.md`<br>`playwright-explore-website.prompt.md` | Full user flows |
| **Mutation Testing** | `stryker-mutation-testing.agent.md` | - | Test quality check |

### 📝 Documentation Phase

| Document Type | Prompts | Agent | Output |
|--------------|---------|-------|---------|
| README | `create-readme.prompt.md` | - | Project overview |
| Code Comments | `add-educational-comments.prompt.md` | - | Inline documentation |
| API Docs | `create-oo-component-documentation.prompt.md` | - | Component documentation |
| ADRs | `create-architectural-decision-record.prompt.md` | `adr-generator.agent.md` | Architecture decisions |
| Tutorials | `comment-code-generate-a-tutorial.prompt.md` | - | Learning materials |

### 🚀 Deployment Phase

| Platform | Agent | Prompts | Instructions |
|----------|-------|---------|--------------|
| **Azure** | `azure-principal-architect.agent.md` | `az-cost-optimize.prompt.md` | `azure-devops-pipelines.instructions.md` |
| **Docker** | - | `containerize-aspnetcore.prompt.md`<br>`multi-stage-dockerfile.prompt.md` | `containerization-docker-best-practices.instructions.md` |
| **Kubernetes** | `kubernetes.agent.md` | - | `kubernetes.instructions.md` |
| **GitHub Actions** | `github-actions-expert.agent.md` | `create-github-action-workflow-specification.prompt.md` | `github-actions-ci-cd-best-practices.instructions.md` |

## Technology-Specific Workflows

### ☁️ Cloud Infrastructure (Azure)

```
1. Architecture:  azure-principal-architect.agent.md
2. IaC Planning:  bicep-plan.agent.md or terraform-azure-planning.agent.md
3. Generate IaC:  azure-iac-generator.agent.md
4. Implement:     bicep-implement.agent.md or terraform-azure-implement.agent.md
5. Review:        terraform-iac-reviewer.agent.md
6. Cost Check:    az-cost-optimize.prompt.md
7. Deploy:        devops-expert.agent.md
```

**Instructions Auto-Applied:**
- `azure-verified-modules-bicep.instructions.md` (.bicep files)
- `terraform-azure.instructions.md` (.tf files)

### 🌐 Web Application (Full Stack)

**Frontend (React/Next.js):**
```
1. Plan:          plan.agent.md
2. Architecture:  architect.agent.md
3. Implement:     expert-nextjs-developer.agent.md or expert-react-frontend-engineer.agent.md
4. E2E Tests:     playwright-tester.agent.md + playwright-generate-test.prompt.md
5. Clean Up:      clean-code.agent.md
```

**Backend (ASP.NET Core):**
```
1. API Design:    api-architect.agent.md
2. Implement:     CSharpExpert.agent.md (follows aspnet-rest-apis.instructions.md)
3. Unit Tests:    csharp-xunit.prompt.md
4. Review:        code-review-generic.instructions.md (auto)
```

**Deployment:**
```
1. Container:     containerize-aspnetcore.prompt.md
2. Kubernetes:    kubernetes.agent.md
3. CI/CD:         github-actions-expert.agent.md
```

### 🤖 AI/ML Integration

```
1. Safety Review: ai-prompt-engineering-safety-review.prompt.md
2. LangChain:     langchain-python.agent.md (follows langchain-python.instructions.md)
3. Dataverse:     dataverse-python-quickstart.prompt.md
4. Agents:        declarative-agents.prompt.md
5. SDK:           copilot-sdk-python.instructions.md (auto for SDK code)
```

### 🔧 MCP Server Development

**Any Language:**
```
1. Choose language-specific generator:
   - csharp-mcp-server-generator.prompt.md
   - typescript-mcp-server-generator.prompt.md
   - python-mcp-server-generator.prompt.md
   - go-mcp-server-generator.prompt.md
   - java-mcp-server-generator.prompt.md
   - rust-mcp-server-generator.prompt.md

2. Use expert agent:
   - csharp-mcp-expert.agent.md
   - typescript-mcp-expert.agent.md
   - python-mcp-expert.agent.md
   - go-mcp-expert.agent.md

3. Follow instructions (auto-applied):
   - *-mcp-server.instructions.md
```

## Code Quality Workflows

### 🔍 Code Review Workflow

```
1. Initial Review:  clean-code.agent.md
2. Security:        security.agent.md
3. Performance:     (language-specific optimization prompts)
4. Standards:       code-review-generic.instructions.md (auto)
5. Challenge:       devils-advocate.agent.md
```

### 🎨 Refactoring Workflow

```
1. Identify:        clean-code.agent.md
2. Plan:            implementation-plan.agent.md
3. Test First:      tdd-red.agent.md (write tests for current behavior)
4. Refactor:        (language-specific agent)
5. Verify:          tdd-green.agent.md (tests still pass)
6. Clean:           tdd-refactor.agent.md
```

### 🐛 Debugging Workflow

```
1. Analyze:         debugger.agent.md or debug.agent.md
2. Think:           critical-thinking.agent.md
3. Root Cause:      Thinking-Beast-Mode.agent.md (deep analysis)
4. Fix:             (language-specific agent)
5. Test:            tdd-* agents
```

## Advanced Patterns

### 🎭 Multi-Agent Orchestration

**Complex Feature Development:**
```
plan.agent.md
  ↓
architect.agent.md
  ↓
(language-specific expert)
  ↓
tdd-red/green/refactor cycle
  ↓
clean-code.agent.md
  ↓
documentation prompts
```

### 🔄 Iterative Quality Loop

```
1. Implement: (language expert agent)
2. Review: clean-code.agent.md
3. Challenge: devils-advocate.agent.md
4. Refine: (language expert agent)
5. Document: (documentation prompts)
6. Repeat until satisfied
```

### 🧠 Deep Thinking for Complex Problems

```
1. Analyze: critical-thinking.agent.md
2. Deep Dive: Thinking-Beast-Mode.agent.md
3. Challenge: devils-advocate.agent.md
4. Synthesize: Ultimate-Transparent-Thinking-Beast-Mode.agent.md
5. Document: create-architectural-decision-record.prompt.md
```

## Quick Command Reference

### Agents (via Copilot Chat)
```bash
@workspace /agent <agent-name>

# Examples
@workspace /agent plan
@workspace /agent CSharpExpert
@workspace /agent azure-principal-architect
@workspace /agent tdd-red
```

### Prompts (via Command Palette)
```
Ctrl+Shift+P → "GitHub Copilot: Run Prompt" → Select prompt

# Or in Copilot Chat
/prompt <prompt-name>
```

### Instructions (Automatic)
Instructions are automatically applied based on:
- File extension (.cs, .py, .ts, .bicep, .tf, etc.)
- File path patterns
- Project context

No manual invocation needed!

## Cheatsheet Legend

- 🎯 Planning & Design
- 💻 Implementation & Coding
- 🧪 Testing & Quality
- 📝 Documentation
- 🚀 Deployment & DevOps
- ☁️ Cloud & Infrastructure
- 🌐 Web Development
- 🤖 AI/ML
- 🔍 Code Review
- 🔧 Tools & Utilities
- 🧠 Deep Analysis

## Tips

1. **Start with plan/architect agents** for new features
2. **Use TDD agents** for test-driven development
3. **Combine agents + prompts** for complete workflows
4. **Instructions auto-apply** based on file type
5. **Use thinking agents** for complex decisions
6. **Document as you go** with documentation prompts
7. **Review with multiple agents** for quality

---

For complete details, see `AWESOME_COPILOT_INTEGRATION_SUMMARY.md`
