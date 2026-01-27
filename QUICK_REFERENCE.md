# Quick Reference Card

## Most Useful Resources by Category

### 🎯 Planning & Architecture
| Agent/Prompt | Use Case | Command |
|--------------|----------|---------|
| @planner | Create implementation plans | `@planner Plan a REST API` |
| @task-planner | Break down tasks | `@task-planner Split this epic` |
| @arch | Software architecture | `@arch Design microservices` |
| /architecture-blueprint-generator | Generate architecture docs | `/architecture-blueprint-generator` |

### 💻 Code Generation
| Agent/Prompt | Use Case | Command |
|--------------|----------|---------|
| @code-generator | General code generation | `@code-generator Create CRUD API` |
| /react-component-generator | React components | `/react-component-generator` |
| /aspnet-minimal-api-openapi | ASP.NET APIs | `/aspnet-minimal-api-openapi` |
| @CSharpExpert | C# expertise | `@CSharpExpert Optimize LINQ` |
| @laravel-expert-agent | Laravel PHP | `@laravel-expert-agent` |

### 🧪 Testing
| Agent/Prompt | Use Case | Command |
|--------------|----------|---------|
| @tdd-red | Write failing tests | `@tdd-red Test login feature` |
| @tdd-green | Implement passing code | `@tdd-green Fix failing tests` |
| @tdd-refactor | Refactor code | `@tdd-refactor Clean up tests` |
| @playwright-tester | E2E testing | `@playwright-tester Test checkout` |
| /generate-unit-tests-with-coverage | Unit tests | `/generate-unit-tests-with-coverage` |

### ☁️ Cloud & Infrastructure
| Agent/Prompt | Use Case | Command |
|--------------|----------|---------|
| @azure-principal-architect | Azure architecture | `@azure-principal-architect` |
| @terraform-azure-implement | Terraform code | `@terraform-azure-implement` |
| @kubernetes-cluster-operator | K8s operations | `@kubernetes-cluster-operator` |
| /infra-generator-avm-bicep | Azure Bicep IaC | `/infra-generator-avm-bicep` |
| /az-cost-optimize | Cost optimization | `/az-cost-optimize` |

### 🗄️ Database
| Agent/Prompt | Use Case | Command |
|--------------|----------|---------|
| @postgresql-dba | PostgreSQL admin | `@postgresql-dba Optimize query` |
| @mongodb-performance-advisor | MongoDB optimization | `@mongodb-performance-advisor` |
| @neon-optimization-analyzer | Neon database | `@neon-optimization-analyzer` |
| @elasticsearch-observability | Elasticsearch | `@elasticsearch-observability` |

### 📝 Documentation
| Agent/Prompt | Use Case | Command |
|--------------|----------|---------|
| @se-technical-writer | Technical writing | `@se-technical-writer Document API` |
| @adr-generator | Architecture decisions | `@adr-generator Create ADR` |
| /add-educational-comments | Add comments | `/add-educational-comments` |
| /generate-release-notes | Release notes | `/generate-release-notes` |

### 🔍 Code Review & Quality
| Agent/Prompt | Use Case | Command |
|--------------|----------|---------|
| @code-review | Code reviews | `@code-review Review this PR` |
| @janitor | Code cleanup | `@janitor Clean up codebase` |
| @wg-code-sentinel | Quality guardian | `@wg-code-sentinel` |
| /code-review-generic | Generic review | `/code-review-generic` |

### 🤖 AI & MCP Development
| Agent/Prompt | Use Case | Command |
|--------------|----------|---------|
| @swift-mcp-expert | Swift MCP servers | `@swift-mcp-expert` |
| @typescript-mcp-expert | TypeScript MCP servers | `@typescript-mcp-expert` |
| @prompt-builder | Prompt engineering | `@prompt-builder` |
| /swift-mcp-server-generator | Generate Swift MCP | `/swift-mcp-server-generator` |
| /typescript-mcp-server-generator | Generate TS MCP | `/typescript-mcp-server-generator` |

### 🎨 UX/UI & Accessibility
| Agent/Prompt | Use Case | Command |
|--------------|----------|---------|
| @se-ux-ui-designer | UI/UX design | `@se-ux-ui-designer` |
| @accessibility | Accessibility | `@accessibility Check WCAG` |

### 🔐 Security
| Agent/Prompt | Use Case | Command |
|--------------|----------|---------|
| @se-security-reviewer | Security review | `@se-security-reviewer` |
| @stackhawk-security-onboarding | Security scanning | `@stackhawk-security-onboarding` |
| /ai-prompt-engineering-safety-review | AI safety | `/ai-prompt-engineering-safety-review` |

## Common Workflows

### New Feature Development
```
1. @planner Plan feature
2. @task-planner Break down tasks
3. @code-generator Implement
4. /generate-unit-tests-with-coverage
5. @code-review Review
6. @se-technical-writer Document
```

### TDD Workflow
```
1. @tdd-red Write failing test
2. @tdd-green Implement code
3. @tdd-refactor Improve code
```

### Cloud Deployment
```
1. @azure-principal-architect Design
2. @terraform-azure-implement Code
3. @terraform-iac-reviewer Review
4. /az-cost-optimize Optimize
```

### Database Optimization
```
1. @postgresql-dba Analyze
2. @mongodb-performance-advisor Optimize
3. Review performance metrics
```

## Instructions by Technology

### Frontend
- angular.instructions.md
- nextjs.instructions.md
- react-testing.instructions.md
- svelte.instructions.md
- vuejs3.instructions.md

### Backend
- aspnet-rest-apis.instructions.md
- express.instructions.md
- fastapi.instructions.md
- laravel.instructions.md
- nestjs.instructions.md
- springboot.instructions.md

### Cloud
- azure-devops-pipelines.instructions.md
- azure-functions-typescript.instructions.md
- bicep-code-best-practices.instructions.md
- github-actions-ci-cd-best-practices.instructions.md
- kubernetes.instructions.md
- terraform-azure.instructions.md

### Database
- elasticsearch.instructions.md
- mongodb.instructions.md
- neo4j.instructions.md
- postgresql.instructions.md
- prisma.instructions.md

### Languages
- csharp.instructions.md
- go.instructions.md
- java.instructions.md
- kotlin.instructions.md
- python.instructions.md
- rust.instructions.md
- typescript-5-es2022.instructions.md

## Discovery Commands

```
/suggest-awesome-github-copilot-prompts
/suggest-awesome-github-copilot-agents
/suggest-awesome-github-copilot-instructions
```

## Tips

💡 **Tip 1:** Instructions apply automatically based on file type
💡 **Tip 2:** Use `/` to discover all available prompts
💡 **Tip 3:** Use `@` to see all available agents
💡 **Tip 4:** Chain agents for complex workflows
💡 **Tip 5:** Start with `@planner` for any new feature

## File Locations

- **Prompts:** `.github/prompts/*.prompt.md`
- **Instructions:** `.github/instructions/*.instructions.md`
- **Agents:** `.github/agents/*.agent.md`

## Documentation

- **AWESOME_COPILOT_RESOURCES.md** - Comprehensive guide
- **RESOURCE_CATALOG.md** - Complete resource listing
- **IMPLEMENTATION_GUIDE.md** - Usage examples
- **QUICK_REFERENCE.md** - This file

## Get Started

1. Open project in VS Code Insiders
2. Open Copilot Chat
3. Try: `@planner Help me understand these resources`
4. Explore and experiment!

---

**Total Resources: 448**
- 137 Prompts
- 163 Instructions
- 148 Agents
