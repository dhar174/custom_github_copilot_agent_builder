# GitHub Copilot Workflow Quick Reference

## Quick Start Guide

### 1. Development Workflow
```
Plan → Design → Implement → Test → Review → Document
```

#### Planning Phase
- **Agent**: `@planner`
- **Prompts**: `/breakdown-plan`, `/breakdown-epic-pm`
- **Output**: Project structure, task breakdown, milestones

#### Design Phase
- **Agent**: `@arch`, `@api-architect`
- **Prompts**: `/architecture-blueprint-generator`, `/breakdown-epic-arch`
- **Output**: Architecture diagrams, API specs, data models

#### Implementation Phase
- **Agents**: Language-specific (e.g., `@CSharpExpert`, `@typescript-expert`)
- **Instructions**: Auto-applied based on file type
- **Output**: Working code following best practices

#### Testing Phase
- **Agents**: `@playwright-tester`, `@test-specialist`
- **Prompts**: `/generate-unit-tests`, `/breakdown-test`
- **Output**: Test suites, test cases

#### Review Phase
- **Agents**: `@address-comments`, `@janitor`
- **Prompts**: `/code-review-checklist`
- **Output**: Code improvements, refactoring suggestions

#### Documentation Phase
- **Agents**: `@se-technical-writer`
- **Prompts**: `/comment-code-generate-a-tutorial`, `/generate-api-docs`
- **Output**: README files, API documentation, tutorials

---

## Common Workflows

### Full-Stack Web Application

```mermaid
graph TD
    A[Project Planning] -->|@planner| B[Architecture Design]
    B -->|@arch| C[Frontend Development]
    B -->|@arch| D[Backend Development]
    C -->|Frontend agents| E[Testing]
    D -->|Backend agents| E
    E -->|@playwright-tester| F[Code Review]
    F -->|@janitor| G[Documentation]
    G -->|@se-technical-writer| H[Deployment]
```

**Step-by-step**:
1. `@planner` - Create project plan
2. `/architecture-blueprint-generator` - Design architecture
3. Frontend: Use `@angular`, `@react-expert`, or `@vue-expert`
4. Backend: Use `@CSharpExpert`, `@laravel-expert-agent`, etc.
5. `@playwright-tester` - E2E testing
6. `/code-review-checklist` - Review code
7. `@se-technical-writer` - Generate docs

### Cloud Infrastructure Setup

```
1. @azure-principal-architect - Plan infrastructure
2. /terraform-resource-generator - Generate IaC
3. @azure-iac-generator - Implement resources
4. /containerize-aspnetcore - Containerize app
5. @azure-devops-pipelines - CI/CD setup
```

### Database Development

```
1. @postgresql-dba - Design schema
2. /generate-migration-scripts - Create migrations
3. @mongodb-performance-advisor - Optimize queries
4. /database-seed-generator - Generate seed data
```

### API Development

```
1. @api-architect - Design API
2. /aspnet-minimal-api-openapi - Generate OpenAPI
3. Language-specific agent - Implement endpoints
4. /generate-api-docs - Document API
5. /generate-integration-tests - Test API
```

---

## Workflow Patterns

### Pattern 1: Iterative Development
```
Plan → Implement small feature → Test → Review → Repeat
```
Use: `@planner` → Language agent → `@playwright-tester` → `@janitor`

### Pattern 2: Test-Driven Development
```
Write test → Implement to pass → Refactor → Repeat
```
Use: `/generate-unit-tests` → Language agent → `@janitor`

### Pattern 3: Documentation-Driven Development
```
Write specs → Implement → Document implementation → Repeat
```
Use: `@prd` → Language agent → `@se-technical-writer`

### Pattern 4: Refactoring Workflow
```
Analyze code → Plan refactor → Implement → Test → Document
```
Use: `@janitor` → `/refactoring-plan` → Language agent → Test agents

---

## Agent Combinations

### Web Development Stack
- **Planning**: `@planner`, `@prd`
- **Design**: `@se-ux-ui-designer`, `@arch`
- **Frontend**: `@angular`, `@react-expert`, `@vue-expert`
- **Backend**: `@CSharpExpert`, `@laravel-expert-agent`, `@typescript-expert`
- **Testing**: `@playwright-tester`, `@test-specialist`
- **Review**: `@janitor`, `@address-comments`

### Cloud & DevOps Stack
- **Architecture**: `@azure-principal-architect`, `@aws-expert`
- **IaC**: `@terraform-expert`, `@azure-iac-generator`
- **Containers**: Use `/containerize-*` prompts
- **CI/CD**: `@azure-devops-pipelines`, `@github-actions-expert`

### Data & Analytics Stack
- **Databases**: `@postgresql-dba`, `@mongodb-performance-advisor`
- **Data Processing**: `@data-engineer`, `@etl-specialist`
- **Analytics**: `@kusto-assistant`, `@elasticsearch-observability`

---

## Pro Tips

### 1. Chain Agents for Complex Tasks
```
@planner → @arch → Language agent → @playwright-tester → @se-technical-writer
```

### 2. Use Context-Specific Instructions
Instructions are automatically applied based on file types. No manual invocation needed!

### 3. Combine Agents with Prompts
```
@api-architect /aspnet-minimal-api-openapi
```

### 4. Leverage Specialized Agents
Instead of generic coding, use specialized agents:
- Database work → `@postgresql-dba`
- Cloud → `@azure-principal-architect`
- Testing → `@playwright-tester`

### 5. Iterate with Feedback
```
1. Generate with agent
2. Review output
3. Refine with same or different agent
4. Repeat until satisfied
```

---

## Troubleshooting

### Issue: Agent not responding correctly
**Solution**: Be specific in your request. Include context about what you want.

### Issue: Code doesn't follow project standards
**Solution**: Check if appropriate instructions are in `.github/instructions/`. They auto-apply.

### Issue: Need multiple perspectives
**Solution**: Use multiple agents sequentially:
```
@arch (design) → @CSharpExpert (implement) → @janitor (review)
```

### Issue: Output too generic
**Solution**: Use specialized agents instead of general ones. For example:
- ❌ Generic agent for Azure
- ✅ `@azure-principal-architect` for Azure architecture

---

## Getting Started Checklist

- [ ] Install VS Code Insiders
- [ ] Install GitHub Copilot extension
- [ ] Clone this repository
- [ ] Open a project in VS Code
- [ ] Try `@planner` to create a plan
- [ ] Use language-specific agents for implementation
- [ ] Run `/code-review-checklist` before commits
- [ ] Generate documentation with `@se-technical-writer`

---

## Resources

- Full catalog: See `COPILOT_RESOURCES.md`
- Agent list: `.github/agents/`
- Prompt list: `.github/prompts/`
- Instructions list: `.github/instructions/`

---

*Quick Reference for effective GitHub Copilot usage*
