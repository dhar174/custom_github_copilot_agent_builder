# Awesome GitHub Copilot Integration Summary

## Overview

This document summarizes the integration of prompts, instructions, and agents from the [GitHub awesome-copilot repository](https://github.com/github/awesome-copilot) into this project. All resources have been downloaded as-is without modification and placed in their respective directories.

## Downloaded Resources

### Agents (105 new files)
**Location:** `.github/agents/`
**Total Count:** 149 agent files (44 existing + 105 new)

Agents are specialized AI assistants that provide expert guidance for specific tasks, technologies, or methodologies. They act as domain experts you can invoke for focused assistance.

### Prompts (74 new files)
**Location:** `.github/prompts/`
**Total Count:** 138 prompt files (64 existing + 74 new)

Prompts are reusable templates for common development tasks. They provide structured workflows for activities like documentation generation, code analysis, and project setup.

### Instructions (144 new files)
**Location:** `.github/instructions/`
**Total Count:** 165 instruction files (21 existing + 144 new)

Instructions define coding standards, best practices, and conventions for specific languages, frameworks, and technologies. They guide Copilot's code generation behavior.

## Installation Links (VS Code Insiders)

To use these resources in VS Code Insiders, use the following installation commands:

```bash
# For agents
code-insiders --install-extension GitHub.copilot

# Agents are automatically discovered from .github/agents/

# For prompts
# Prompts are automatically discovered from .github/prompts/

# For instructions
# Instructions are automatically discovered from .github/instructions/
```

## Resource Categories

### 1. Cloud & Infrastructure

#### Agents
- **azure-principal-architect.agent.md** - Azure architecture and best practices expert
- **azure-iac-generator.agent.md** - Azure Infrastructure as Code generation
- **azure-iac-exporter.agent.md** - Export Azure resources to IaC
- **azure-saas-architect.agent.md** - Azure SaaS architecture patterns
- **azure-verified-modules-bicep.agent.md** - Azure Verified Modules for Bicep
- **azure-verified-modules-terraform.agent.md** - Azure Verified Modules for Terraform
- **bicep-plan.agent.md** - Bicep infrastructure planning
- **bicep-implement.agent.md** - Bicep infrastructure implementation
- **terraform.agent.md** - Terraform IaC expert
- **terraform-azure-planning.agent.md** - Terraform Azure planning
- **terraform-azure-implement.agent.md** - Terraform Azure implementation
- **terraform-iac-reviewer.agent.md** - Terraform code review
- **kubernetes-kubectl-expert.agent.md** - Kubernetes kubectl commands
- **kubernetes.agent.md** - Kubernetes deployment and management

#### Prompts
- **az-cost-optimize.prompt.md** - Azure cost optimization analysis
- **azure-resource-health-diagnose.prompt.md** - Azure resource health diagnostics
- **cosmosdb-datamodeling.prompt.md** - Cosmos DB data modeling
- **containerize-aspnetcore.prompt.md** - Containerize ASP.NET Core apps
- **containerize-aspnet-framework.prompt.md** - Containerize ASP.NET Framework apps

#### Instructions
- **azure-devops-pipelines.instructions.md** - Azure DevOps pipeline best practices
- **azure-functions-typescript.instructions.md** - Azure Functions with TypeScript
- **azure-logic-apps-power-automate.instructions.md** - Logic Apps and Power Automate
- **azure-verified-modules-bicep.instructions.md** - AVM Bicep standards
- **azure-verified-modules-terraform.instructions.md** - AVM Terraform standards
- **bicep-code-best-practices.instructions.md** - Bicep coding standards
- **terraform.instructions.md** - Terraform best practices
- **terraform-azure.instructions.md** - Terraform for Azure
- **containerization-docker-best-practices.instructions.md** - Docker best practices
- **kubernetes.instructions.md** - Kubernetes standards

### 2. Web Development

#### Agents
- **expert-nextjs-developer.agent.md** (existing) - Next.js expert
- **react.agent.md** - React development expert
- **nextjs.agent.md** - Next.js development patterns
- **nuxt.agent.md** - Nuxt.js framework expert
- **svelte-5.agent.md** - Svelte 5 development
- **remix.agent.md** - Remix framework expert
- **electron-angular-native.agent.md** - Electron with Angular
- **drupal-expert.agent.md** - Drupal CMS expert
- **aem-frontend-specialist.agent.md** - Adobe Experience Manager frontend

#### Prompts
- **aspnet-minimal-api-openapi.prompt.md** - ASP.NET Minimal APIs with OpenAPI
- **create-spring-boot-java-project.prompt.md** - Spring Boot Java project setup
- **create-spring-boot-kotlin-project.prompt.md** - Spring Boot Kotlin project setup

#### Instructions
- **angular.instructions.md** - Angular best practices
- **astro.instructions.md** - Astro framework standards
- **blazor.instructions.md** - Blazor development
- **nextjs.instructions.md** - Next.js conventions
- **nuxt3.instructions.md** - Nuxt 3 standards
- **react.instructions.md** - React best practices
- **remix.instructions.md** - Remix framework patterns
- **svelte.instructions.md** - Svelte development
- **vuejs3.instructions.md** - Vue.js 3 patterns
- **aspnet-rest-apis.instructions.md** - ASP.NET REST API patterns

### 3. Programming Languages

#### Agents
- **CSharpExpert.agent.md** - C# programming expert
- **WinFormsExpert.agent.md** - Windows Forms development
- **python-mcp-expert.agent.md** - Python MCP development
- **typescript-mcp-expert.agent.md** - TypeScript MCP development
- **csharp-mcp-expert.agent.md** - C# MCP development
- **swift-mcp-expert.agent.md** - Swift MCP development
- **golang.agent.md** - Go programming expert
- **java.agent.md** - Java development expert
- **rust.agent.md** - Rust programming expert
- **clojure-interactive-programming.agent.md** - Clojure interactive development

#### Prompts
- **csharp-async.prompt.md** - C# async patterns
- **csharp-docs.prompt.md** - C# documentation generation
- **csharp-mcp-server-generator.prompt.md** - Generate C# MCP servers
- **typescript-mcp-server-generator.prompt.md** - Generate TypeScript MCP servers
- **swift-mcp-server-generator.prompt.md** - Generate Swift MCP servers
- **python-mcp-server-generator.prompt.md** - Generate Python MCP servers
- **golang-mcp-server-generator.prompt.md** - Generate Go MCP servers
- **java-mcp-server-generator.prompt.md** - Generate Java MCP servers
- **rust-mcp-server-generator.prompt.md** - Generate Rust MCP servers

#### Instructions
- **csharp.instructions.md** (existing) - C# coding standards
- **csharp-ja.instructions.md** - C# standards (Japanese)
- **csharp-ko.instructions.md** - C# standards (Korean)
- **csharp-mcp-server.instructions.md** - C# MCP server development
- **typescript-5-es2022.instructions.md** - TypeScript 5 with ES2022
- **typescript-mcp-server.instructions.md** - TypeScript MCP servers
- **python.instructions.md** - Python best practices
- **golang.instructions.md** - Go programming standards
- **java.instructions.md** - Java coding conventions
- **rust.instructions.md** - Rust development standards
- **clojure.instructions.md** - Clojure best practices
- **dart-n-flutter.instructions.md** - Dart and Flutter development

### 4. Testing & Quality

#### Agents
- **tdd-red.agent.md** - TDD Red phase (write failing test)
- **tdd-green.agent.md** - TDD Green phase (make test pass)
- **tdd-refactor.agent.md** - TDD Refactor phase
- **diffblue-cover.agent.md** - Diffblue Cover testing
- **stryker-mutation-testing.agent.md** - Mutation testing expert

#### Prompts
- **csharp-mstest.prompt.md** - MSTest test generation
- **csharp-nunit.prompt.md** - NUnit test generation
- **csharp-xunit.prompt.md** - XUnit test generation
- **csharp-tunit.prompt.md** - TUnit test generation
- **pytest-coverage.prompt.md** (existing) - Pytest coverage analysis
- **sql-code-review.prompt.md** - SQL code review
- **sql-optimization.prompt.md** - SQL query optimization

#### Instructions
- **code-review-generic.instructions.md** (existing) - Code review guidelines
- **playwright-best-practices.instructions.md** - Playwright testing
- **stryker-mutation-testing.instructions.md** - Mutation testing setup

### 5. AI & ML Integration

#### Agents
- **amplitude-experiment-implementation.agent.md** - Amplitude experimentation
- **apify-integration-expert.agent.md** - Apify web scraping
- **comet-opik.agent.md** - Comet ML and Opik integration
- **langchain-js.agent.md** - LangChain JavaScript
- **langchain-python.agent.md** - LangChain Python
- **search-ai-optimization-expert.agent.md** (existing) - AI search optimization

#### Prompts
- **ai-prompt-engineering-safety-review.prompt.md** - AI prompt safety review
- **dataverse-python-quickstart.prompt.md** - Dataverse Python quickstart
- **dataverse-python-production-code.prompt.md** - Production Dataverse code
- **dataverse-python-advanced-patterns.prompt.md** - Advanced Dataverse patterns
- **dataverse-python-usecase-builder.prompt.md** - Dataverse use case builder
- **declarative-agents.prompt.md** - Declarative agent creation

#### Instructions
- **ai-prompt-engineering-safety-best-practices.instructions.md** - AI safety
- **copilot-sdk-csharp.instructions.md** - Copilot SDK C#
- **copilot-sdk-nodejs.instructions.md** - Copilot SDK Node.js
- **copilot-sdk-python.instructions.md** - Copilot SDK Python
- **copilot-sdk-go.instructions.md** - Copilot SDK Go
- **dataverse-python.instructions.md** - Dataverse Python SDK
- **dataverse-python-sdk.instructions.md** - Dataverse SDK details
- **dataverse-python-api-reference.instructions.md** - Dataverse API reference
- **dataverse-python-best-practices.instructions.md** - Dataverse best practices
- **langchain-python.instructions.md** (existing) - LangChain Python

### 6. Architecture & Design

#### Agents
- **api-architect.agent.md** - API architecture expert
- **arch.agent.md** - Software architecture expert
- **architect.agent.md** (existing) - System architecture
- **blueprint-mode.agent.md** - Blueprint generation mode
- **blueprint-mode-codex.agent.md** - Advanced blueprint generation
- **microservices-architect.agent.md** - Microservices architecture
- **soa.agent.md** - Service-Oriented Architecture

#### Prompts
- **architecture-blueprint-generator.prompt.md** (existing) - Architecture blueprints
- **create-architectural-decision-record.prompt.md** (existing) - ADR generation
- **typespec-create-api-plugin.prompt.md** - TypeSpec API plugin
- **typespec-api-operations.prompt.md** - TypeSpec operations
- **typespec-create-agent.prompt.md** - TypeSpec agent creation

#### Instructions
- **microservices-patterns.instructions.md** - Microservices patterns
- **rest-api-design.instructions.md** - REST API design
- **grpc.instructions.md** - gRPC best practices
- **graphql.instructions.md** - GraphQL standards
- **typespec-m365-copilot.instructions.md** - TypeSpec for M365 Copilot

### 7. DevOps & Automation

#### Agents
- **devops-expert.agent.md** (existing) - DevOps best practices
- **github-actions-expert.agent.md** (existing) - GitHub Actions expert
- **se-gitops-ci-specialist.agent.md** (existing) - GitOps CI/CD specialist
- **gitlab.agent.md** - GitLab CI/CD expert
- **jenkins.agent.md** - Jenkins automation
- **github-copilot-extension-publisher.agent.md** - Copilot extension publishing

#### Prompts
- **create-github-action-workflow-specification.prompt.md** (existing) - GitHub Actions workflow
- **devops-rollout-plan.prompt.md** (existing) - DevOps rollout planning
- **git-flow-branch-creator.prompt.md** (existing) - Git flow branching
- **conventional-commit.prompt.md** - Conventional commits

#### Instructions
- **github-actions-ci-cd-best-practices.instructions.md** (existing) - GitHub Actions CI/CD
- **gitlab-cicd.instructions.md** - GitLab CI/CD
- **jenkins.instructions.md** - Jenkins pipelines

### 8. Documentation & Content

#### Agents
- **technical-content-evaluator.agent.md** (existing) - Technical content evaluation

#### Prompts
- **add-educational-comments.prompt.md** (existing) - Add code comments
- **comment-code-generate-a-tutorial.prompt.md** (existing) - Generate tutorials
- **create-readme.prompt.md** (existing) - README generation
- **create-llms.prompt.md** (existing) - LLM documentation
- **create-tldr-page.prompt.md** (existing) - TLDR page generation
- **create-oo-component-documentation.prompt.md** (existing) - OO documentation
- **convert-plaintext-to-md.prompt.md** - Convert text to Markdown
- **tldr-prompt.prompt.md** - TLDR summaries

#### Instructions
- **markdown.instructions.md** (existing) - Markdown standards
- **documentation-best-practices.instructions.md** - Documentation guidelines

### 9. Mobile Development

#### Agents
- **dotnet-maui.agent.md** - .NET MAUI development
- **react-native.agent.md** - React Native mobile apps
- **ios-swift.agent.md** - iOS Swift development
- **macos-swift.agent.md** - macOS Swift development

#### Instructions
- **dart-n-flutter.instructions.md** - Flutter development
- **react-native.instructions.md** - React Native standards
- **ios-swift.instructions.md** - iOS Swift best practices

### 10. Database & Data

#### Agents
- **nosql-expert.agent.md** - NoSQL database expert
- **postgresql.agent.md** - PostgreSQL database
- **sql-server.agent.md** - SQL Server expert

#### Prompts
- **cosmosdb-datamodeling.prompt.md** - Cosmos DB modeling
- **sql-code-review.prompt.md** - SQL review
- **sql-optimization.prompt.md** - SQL optimization

#### Instructions
- **postgresql.instructions.md** - PostgreSQL best practices
- **mongodb.instructions.md** - MongoDB standards
- **sql-server.instructions.md** - SQL Server conventions

### 11. Security & Compliance

#### Agents
- **security.agent.md** - Security expert
- **soc2-gdpr.agent.md** - SOC2 and GDPR compliance

#### Prompts
- **ai-prompt-engineering-safety-review.prompt.md** - AI safety review

#### Instructions
- **ai-prompt-engineering-safety-best-practices.instructions.md** - AI safety
- **security-best-practices.instructions.md** - Security standards

### 12. Specialized Tools & Frameworks

#### Agents
- **cast-imaging-impact-analysis.agent.md** - CAST Imaging impact analysis
- **cast-imaging-software-discovery.agent.md** - Software discovery
- **cast-imaging-structural-quality-advisor.agent.md** - Code quality analysis
- **dynatrace-expert.agent.md** - Dynatrace observability
- **elasticsearch-observability.agent.md** - Elasticsearch observability
- **obsidian-vault-navigator.agent.md** - Obsidian knowledge management

#### Instructions
- **obsidian.instructions.md** - Obsidian best practices
- **elasticsearch.instructions.md** - Elasticsearch patterns

## Workflow Patterns Enabled

### 1. Complete Development Lifecycle

**Plan → Design → Implement → Test → Deploy → Monitor**

- **Planning Phase:**
  - Use `plan.agent.md` for project planning
  - Use `implementation-plan.agent.md` for implementation planning
  - Use `breakdown-plan.prompt.md` for breaking down work
  - Use `architecture-blueprint-generator.prompt.md` for architecture

- **Design Phase:**
  - Use `architect.agent.md` for architectural decisions
  - Use `api-architect.agent.md` for API design
  - Use `create-architectural-decision-record.prompt.md` for ADRs

- **Implementation Phase:**
  - Use language-specific agents (CSharpExpert, python, golang, etc.)
  - Use framework-specific instructions (react, angular, nextjs, etc.)
  - Use `clean-code.agent.md` for code quality

- **Testing Phase:**
  - Use `tdd-red.agent.md`, `tdd-green.agent.md`, `tdd-refactor.agent.md` for TDD
  - Use test framework prompts (xunit, nunit, pytest, etc.)
  - Use `playwright-tester.agent.md` for E2E testing

- **Deployment Phase:**
  - Use `devops-expert.agent.md` for deployment strategies
  - Use `github-actions-expert.agent.md` for CI/CD
  - Use infrastructure agents (terraform, bicep, kubernetes)

- **Monitoring Phase:**
  - Use `dynatrace-expert.agent.md` or `elasticsearch-observability.agent.md`
  - Use cost optimization prompts for cloud resources

### 2. Cloud Infrastructure Management

**Azure/AWS/GCP Infrastructure as Code**

1. **Planning:**
   - Use `azure-principal-architect.agent.md` for Azure architecture
   - Use `terraform-azure-planning.agent.md` or `bicep-plan.agent.md`

2. **Implementation:**
   - Use `azure-iac-generator.agent.md` to generate IaC
   - Use `terraform-azure-implement.agent.md` or `bicep-implement.agent.md`
   - Follow `azure-verified-modules-bicep.instructions.md` standards

3. **Review & Optimize:**
   - Use `terraform-iac-reviewer.agent.md` for code review
   - Use `az-cost-optimize.prompt.md` for cost analysis

4. **Deployment:**
   - Use `devops-expert.agent.md` for deployment strategies
   - Use `azure-devops-pipelines.instructions.md` for CI/CD

### 3. Test-Driven Development (TDD)

**Red-Green-Refactor Cycle**

1. **Red Phase (Write Failing Test):**
   - Invoke `tdd-red.agent.md`
   - Use language-specific test prompts (csharp-xunit, pytest, etc.)

2. **Green Phase (Make Test Pass):**
   - Invoke `tdd-green.agent.md`
   - Write minimal code to pass the test

3. **Refactor Phase (Improve Code):**
   - Invoke `tdd-refactor.agent.md`
   - Use `clean-code.agent.md` for quality improvements

### 4. Microservices Development

**Design → Implement → Test → Deploy Microservices**

1. **Architecture:**
   - Use `microservices-architect.agent.md` for patterns
   - Use `api-architect.agent.md` for API design
   - Follow `microservices-patterns.instructions.md`

2. **Implementation:**
   - Use framework-specific agents (nextjs, spring-boot, etc.)
   - Use `rest-api-design.instructions.md` or `grpc.instructions.md`

3. **Containerization:**
   - Use `containerize-aspnetcore.prompt.md` or similar
   - Follow `containerization-docker-best-practices.instructions.md`

4. **Orchestration:**
   - Use `kubernetes.agent.md` for deployment
   - Follow `kubernetes.instructions.md` standards

### 5. AI/ML Integration

**Build AI-Powered Applications**

1. **Planning:**
   - Use `ai-prompt-engineering-safety-review.prompt.md` for safety
   - Follow `ai-prompt-engineering-safety-best-practices.instructions.md`

2. **Implementation:**
   - Use `langchain-python.agent.md` or `langchain-js.agent.md`
   - Follow `langchain-python.instructions.md` standards
   - Use `dataverse-python-*` prompts for data operations

3. **Integration:**
   - Use `copilot-sdk-*` instructions for SDK integration
   - Use `declarative-agents.prompt.md` for agent creation

### 6. Documentation Generation

**Automated Documentation Workflow**

1. **Code Documentation:**
   - Use `add-educational-comments.prompt.md` for inline comments
   - Use `csharp-docs.prompt.md` or similar for API docs
   - Use `create-oo-component-documentation.prompt.md` for components

2. **Project Documentation:**
   - Use `create-readme.prompt.md` for README files
   - Use `create-llms.prompt.md` for LLM documentation
   - Use `create-tldr-page.prompt.md` for summaries

3. **Architecture Documentation:**
   - Use `create-architectural-decision-record.prompt.md` for ADRs
   - Use `architecture-blueprint-generator.prompt.md` for diagrams

### 7. Modernization & Migration

**Legacy System Modernization**

1. **Assessment:**
   - Use `modernization.agent.md` for assessment
   - Use `arm-migration.agent.md` for ARM migrations
   - Use `cast-imaging-*` agents for impact analysis

2. **Conversion:**
   - Use `dotnet-upgrade.agent.md` for .NET upgrades
   - Use `convert-*` prompts for specific migrations
   - Follow framework-specific instructions

3. **Containerization:**
   - Use containerization prompts
   - Follow Docker best practices

### 8. MCP Server Development

**Model Context Protocol Server Creation**

1. **Generation:**
   - Use `*-mcp-server-generator.prompt.md` for your language
   - Choose from: csharp, typescript, python, swift, golang, java, rust

2. **Implementation:**
   - Use `*-mcp-expert.agent.md` for language-specific guidance
   - Follow `*-mcp-server.instructions.md` standards

3. **Testing & Deployment:**
   - Use language-specific testing agents and prompts
   - Follow DevOps best practices

### 9. Security & Compliance

**Security-First Development**

1. **Design:**
   - Use `security.agent.md` for security architecture
   - Follow `security-best-practices.instructions.md`

2. **Implementation:**
   - Use `ai-prompt-engineering-safety-review.prompt.md` for AI code
   - Follow language-specific security guidelines

3. **Compliance:**
   - Use `soc2-gdpr.agent.md` for compliance requirements
   - Document security decisions in ADRs

### 10. Thinking & Problem-Solving

**Deep Analysis Modes**

- **4.1-Beast.agent.md** - Advanced reasoning
- **Thinking-Beast-Mode.agent.md** - Deep thinking mode
- **Ultimate-Transparent-Thinking-Beast-Mode.agent.md** - Maximum transparency
- **critical-thinking.agent.md** - Critical analysis
- **devils-advocate.agent.md** - Challenge assumptions

Use these for complex architectural decisions, debugging, or understanding complex systems.

## Usage Guidance

### How to Use Agents

Agents are invoked through the GitHub Copilot Chat interface:

1. **In VS Code:**
   ```
   @workspace /agent <agent-name>
   ```
   Example: `@workspace /agent azure-principal-architect`

2. **Agents provide:**
   - Expert domain knowledge
   - Specialized workflows
   - Best practice guidance
   - Tool-specific expertise

### How to Use Prompts

Prompts are reusable templates for common tasks:

1. **Access prompts through:**
   - Command Palette: `Ctrl+Shift+P` → "GitHub Copilot: Run Prompt"
   - Or through Copilot Chat

2. **Prompts provide:**
   - Structured workflows
   - Template generation
   - Automated analysis
   - Documentation creation

### How to Use Instructions

Instructions automatically guide Copilot's behavior:

1. **Instructions are automatically applied based on:**
   - File extensions (.cs, .py, .js, .bicep, etc.)
   - File paths (matching applyTo patterns)
   - Project context

2. **Instructions provide:**
   - Coding standards
   - Framework conventions
   - Best practices
   - Language-specific patterns

## Recommended Workflows for App Development

### Starting a New Project

1. **Initial Planning:**
   - Use `plan.agent.md` to create project structure
   - Use `architecture-blueprint-generator.prompt.md` for architecture
   - Use `create-specification.prompt.md` for requirements

2. **Technology Selection:**
   - Choose framework agents (nextjs, react, angular, etc.)
   - Review framework instructions for best practices
   - Set up appropriate testing frameworks

3. **Infrastructure Setup:**
   - Use IaC agents (terraform, bicep) for cloud resources
   - Use `azure-verified-modules-*` for production-ready modules
   - Set up CI/CD with `github-actions-expert.agent.md`

### During Development

1. **Feature Implementation:**
   - Use TDD workflow (red-green-refactor agents)
   - Follow language-specific instructions
   - Use `clean-code.agent.md` for quality

2. **Code Review:**
   - Use `code-review-generic.instructions.md` standards
   - Use language-specific review prompts
   - Use security agents for security review

3. **Documentation:**
   - Use documentation prompts as you code
   - Generate ADRs for important decisions
   - Keep README updated

### Before Deployment

1. **Testing:**
   - Run mutation testing with `stryker-mutation-testing.agent.md`
   - Use E2E testing with `playwright-tester.agent.md`
   - Review test coverage

2. **Security:**
   - Use `security.agent.md` for security review
   - Check AI prompts with safety review prompt
   - Review compliance requirements

3. **Deployment:**
   - Use `devops-expert.agent.md` for strategy
   - Containerize with appropriate prompts
   - Set up monitoring with observability agents

## Tips for Effective Usage

### 1. Combine Multiple Resources

- Use an agent for expert guidance
- Follow instructions for standards
- Use prompts for specific tasks

**Example:** 
```
Agent: azure-principal-architect.agent.md
Instructions: azure-verified-modules-bicep.instructions.md
Prompt: az-cost-optimize.prompt.md
```

### 2. Progressive Workflow

Start broad, then narrow:
1. Use planning agents for overview
2. Use architecture agents for design
3. Use implementation agents for coding
4. Use testing agents for validation

### 3. Language-Specific Stacks

Build language-specific stacks:

**C# Stack:**
- Agent: CSharpExpert.agent.md
- Instructions: csharp.instructions.md
- Prompts: csharp-*.prompt.md (async, docs, tests)

**Python Stack:**
- Agent: python-mcp-expert.agent.md
- Instructions: python.instructions.md, langchain-python.instructions.md
- Prompts: dataverse-python-*.prompt.md

### 4. Domain-Specific Workflows

**Cloud Development:**
- Azure: azure-* agents + azure-* instructions + azure prompts
- Multi-cloud: Use terraform-* agents for provider-agnostic IaC

**Web Development:**
- Framework agent + framework instructions + testing prompts
- Use containerization prompts for deployment

**AI/ML Development:**
- LangChain agents + Copilot SDK instructions + data prompts
- Use safety review prompts for responsible AI

### 5. Quality Gates

Build quality into workflow:
1. **Code Quality:** clean-code.agent.md
2. **Testing:** TDD agents + test prompts
3. **Security:** security.agent.md + safety prompts
4. **Performance:** Optimization agents and prompts
5. **Documentation:** Documentation prompts at each stage

## Project Management Recommendations

### 1. Establish Standards

- **Before coding:** Choose your framework instructions
- **Define workflows:** Document which agents/prompts to use for each task
- **Create templates:** Use blueprint generators for consistency

### 2. Team Onboarding

- **New team members:** Share this summary document
- **Role-specific guides:** Create role-based workflow guides
  - Developers: Implementation agents + test prompts
  - Architects: Architecture agents + design prompts
  - DevOps: Infrastructure agents + deployment prompts

### 3. Continuous Improvement

- **Regular reviews:** Review and update instruction files
- **Workflow optimization:** Identify and document effective workflows
- **Knowledge sharing:** Document successful agent/prompt combinations

### 4. Quality Metrics

Track usage and effectiveness:
- Which agents/prompts are most used?
- Which workflows produce best results?
- Where are quality issues occurring?
- Are instructions being followed?

### 5. Documentation Strategy

Use documentation prompts throughout:
- **Daily:** Code comments, function docs
- **Weekly:** Component documentation, README updates
- **Monthly:** Architecture documentation, ADRs
- **Release:** Release notes, migration guides

## Advanced Patterns

### 1. Agent Chaining

Chain agents for complex workflows:
```
plan.agent.md 
  → architect.agent.md 
  → azure-principal-architect.agent.md 
  → bicep-implement.agent.md 
  → terraform-iac-reviewer.agent.md
```

### 2. Prompt Sequences

Create prompt sequences for workflows:
```
create-specification.prompt.md
  → breakdown-plan.prompt.md
  → create-implementation-plan.prompt.md
  → create-github-issues-feature-from-implementation-plan.prompt.md
```

### 3. Instruction Layering

Layer instructions for comprehensive guidance:
```
Base: csharp.instructions.md
Framework: aspnet-rest-apis.instructions.md
Testing: code-review-generic.instructions.md
Security: security-best-practices.instructions.md
```

### 4. Context-Aware Development

Use context to automatically apply resources:
- File extensions trigger instructions
- Project structure suggests agents
- Task type recommends prompts

### 5. Feedback Loops

Create feedback mechanisms:
- Use thinking agents to review solutions
- Use devils-advocate to challenge designs
- Use critical-thinking for complex decisions

## Conclusion

This integration provides a comprehensive toolkit for modern software development, covering:

- **323 total resources** (149 agents, 138 prompts, 165 instructions)
- **12 major categories** of development activities
- **10+ complete workflow patterns** for common tasks
- **Full development lifecycle** support from planning to deployment

### Key Benefits

1. **Consistency:** Instructions ensure standard practices
2. **Efficiency:** Prompts automate repetitive tasks
3. **Expertise:** Agents provide domain-specific knowledge
4. **Quality:** Built-in quality gates and best practices
5. **Scalability:** Workflows that grow with your project

### Next Steps

1. **Explore the resources:** Browse agents, prompts, and instructions
2. **Try workflows:** Start with simple workflows and expand
3. **Customize:** Adapt resources to your team's needs
4. **Share knowledge:** Document what works for your team
5. **Iterate:** Continuously improve your workflows

### Support & Resources

- **awesome-copilot repository:** https://github.com/github/awesome-copilot
- **GitHub Copilot documentation:** https://docs.github.com/copilot
- **VS Code Copilot Chat:** https://code.visualstudio.com/docs/copilot/copilot-chat

## File Manifest

### Downloaded Agents (105 files)
- 4.1-Beast.agent.md
- CSharpExpert.agent.md
- Thinking-Beast-Mode.agent.md
- Ultimate-Transparent-Thinking-Beast-Mode.agent.md
- WinFormsExpert.agent.md
- accessibility.agent.md
- aem-frontend-specialist.agent.md
- amplitude-experiment-implementation.agent.md
- api-architect.agent.md
- apify-integration-expert.agent.md
- arch.agent.md
- arm-migration.agent.md
- atlassian-requirements-to-jira.agent.md
- azure-iac-exporter.agent.md
- azure-iac-generator.agent.md
- azure-logic-apps-expert.agent.md
- azure-principal-architect.agent.md
- azure-saas-architect.agent.md
- azure-verified-modules-bicep.agent.md
- azure-verified-modules-terraform.agent.md
- bicep-implement.agent.md
- bicep-plan.agent.md
- blueprint-mode-codex.agent.md
- blueprint-mode.agent.md
- cast-imaging-impact-analysis.agent.md
- cast-imaging-software-discovery.agent.md
- cast-imaging-structural-quality-advisor.agent.md
- clojure-interactive-programming.agent.md
- code-tour.agent.md
- comet-opik.agent.md
- csharp-dotnet-janitor.agent.md
- csharp-mcp-expert.agent.md
- debug.agent.md
- declarative-agents-architect.agent.md
- diffblue-cover.agent.md
- dotnet-maui.agent.md
- dotnet-upgrade.agent.md
- droid.agent.md
- drupal-expert.agent.md
- dynatrace-expert.agent.md
- elasticsearch-observability.agent.md
- electron-angular-native.agent.md
- expert-cpp-software-engineer.agent.md
- expert-dotnet-software-engineer.agent.md
- expert-react-frontend-engineer.agent.md
- gilfoyle.agent.md
- go-mcp-expert.agent.md
- java-mcp-expert.agent.md
- jfrog-sec.agent.md
- kotlin-mcp-expert.agent.md
- kusto-assistant.agent.md
- laravel-expert-agent.agent.md
- launchdarkly-flag-cleanup.agent.md
- lingodotdev-i18n.agent.md
- mcp-m365-agent-expert.agent.md
- microsoft-agent-framework-dotnet.agent.md
- microsoft-agent-framework-python.agent.md
- microsoft-study-mode.agent.md
- microsoft_learn_contributor.agent.md
- monday-bug-fixer.agent.md
- mongodb-performance-advisor.agent.md
- ms-sql-dba.agent.md
- neo4j-docker-client-generator.agent.md
- neon-migration-specialist.agent.md
- neon-optimization-analyzer.agent.md
- octopus-deploy-release-notes-mcp.agent.md
- pagerduty-incident-responder.agent.md
- php-mcp-expert.agent.md
- pimcore-expert.agent.md
- planner.agent.md
- platform-sre-kubernetes.agent.md
- postgresql-dba.agent.md
- power-bi-data-modeling-expert.agent.md
- power-bi-dax-expert.agent.md
- power-bi-performance-expert.agent.md
- power-bi-visualization-expert.agent.md
- power-platform-expert.agent.md
- power-platform-mcp-integration-expert.agent.md
- python-mcp-expert.agent.md
- ruby-mcp-expert.agent.md
- rust-gpt-4.1-beast-mode.agent.md
- rust-mcp-expert.agent.md
- salesforce-expert.agent.md
- se-product-manager-advisor.agent.md
- se-responsible-ai-code.agent.md
- se-security-reviewer.agent.md
- se-system-architecture-reviewer.agent.md
- se-technical-writer.agent.md
- se-ux-ui-designer.agent.md
- semantic-kernel-dotnet.agent.md
- semantic-kernel-python.agent.md
- shopify-expert.agent.md
- stackhawk-security-onboarding.agent.md
- swift-mcp-expert.agent.md
- tdd-green.agent.md
- tdd-red.agent.md
- tdd-refactor.agent.md
- terraform-azure-implement.agent.md
- terraform-azure-planning.agent.md
- terraform-iac-reviewer.agent.md
- terraform.agent.md
- typescript-mcp-expert.agent.md
- voidbeast-gpt41enhanced.agent.md
- wg-code-alchemist.agent.md
- wg-code-sentinel.agent.md

### Downloaded Prompts (74 files)
- ai-prompt-engineering-safety-review.prompt.md
- apple-appstore-reviewer.prompt.md
- aspnet-minimal-api-openapi.prompt.md
- az-cost-optimize.prompt.md
- azure-resource-health-diagnose.prompt.md
- containerize-aspnet-framework.prompt.md
- containerize-aspnetcore.prompt.md
- conventional-commit.prompt.md
- convert-plaintext-to-md.prompt.md
- cosmosdb-datamodeling.prompt.md
- create-spring-boot-java-project.prompt.md
- create-spring-boot-kotlin-project.prompt.md
- csharp-async.prompt.md
- csharp-docs.prompt.md
- csharp-mcp-server-generator.prompt.md
- csharp-mstest.prompt.md
- csharp-nunit.prompt.md
- csharp-tunit.prompt.md
- csharp-xunit.prompt.md
- dataverse-python-advanced-patterns.prompt.md
- dataverse-python-production-code.prompt.md
- dataverse-python-quickstart.prompt.md
- dataverse-python-usecase-builder.prompt.md
- declarative-agents.prompt.md
- documentation-writer.prompt.md
- dotnet-best-practices.prompt.md
- dotnet-design-pattern-review.prompt.md
- dotnet-upgrade.prompt.md
- editorconfig.prompt.md
- ef-core.prompt.md
- generate-custom-instructions-from-codebase.prompt.md
- go-mcp-server-generator.prompt.md
- java-add-graalvm-native-image-support.prompt.md
- java-docs.prompt.md
- java-junit.prompt.md
- java-mcp-server-generator.prompt.md
- java-refactoring-extract-method.prompt.md
- java-refactoring-remove-parameter.prompt.md
- java-springboot.prompt.md
- javascript-typescript-jest.prompt.md
- kotlin-mcp-server-generator.prompt.md
- kotlin-springboot.prompt.md
- mcp-copilot-studio-server-generator.prompt.md
- mcp-create-declarative-agent.prompt.md
- mkdocs-translations.prompt.md
- multi-stage-dockerfile.prompt.md
- my-issues.prompt.md
- my-pull-requests.prompt.md
- next-intl-add-language.prompt.md
- openapi-to-application-code.prompt.md
- php-mcp-server-generator.prompt.md
- playwright-automation-fill-in-form.prompt.md
- postgresql-code-review.prompt.md
- postgresql-optimization.prompt.md
- power-apps-code-app-scaffold.prompt.md
- power-bi-dax-optimization.prompt.md
- power-bi-model-design-review.prompt.md
- power-bi-performance-troubleshooting.prompt.md
- power-bi-report-design-consultation.prompt.md
- power-platform-mcp-connector-suite.prompt.md
- python-mcp-server-generator.prompt.md
- remember-interactive-programming.prompt.md
- ruby-mcp-server-generator.prompt.md
- rust-mcp-server-generator.prompt.md
- shuffle-json-data.prompt.md
- sql-code-review.prompt.md
- sql-optimization.prompt.md
- swift-mcp-server-generator.prompt.md
- tldr-prompt.prompt.md
- typescript-mcp-server-generator.prompt.md
- typespec-api-operations.prompt.md
- typespec-create-agent.prompt.md
- typespec-create-api-plugin.prompt.md
- update-avm-modules-in-bicep.prompt.md

### Downloaded Instructions (144 files)
- a11y.instructions.md
- ai-prompt-engineering-safety-best-practices.instructions.md
- angular.instructions.md
- ansible.instructions.md
- apex.instructions.md
- aspnet-rest-apis.instructions.md
- astro.instructions.md
- azure-devops-pipelines.instructions.md
- azure-functions-typescript.instructions.md
- azure-logic-apps-power-automate.instructions.md
- azure-verified-modules-bicep.instructions.md
- azure-verified-modules-terraform.instructions.md
- bicep-code-best-practices.instructions.md
- blazor.instructions.md
- clojure.instructions.md
- cmake-vcpkg.instructions.md
- coldfusion-cfc.instructions.md
- coldfusion-cfm.instructions.md
- collections.instructions.md
- containerization-docker-best-practices.instructions.md
- convert-cassandra-to-spring-data-cosmos.instructions.md
- convert-jpa-to-spring-data-cosmos.instructions.md
- copilot-sdk-csharp.instructions.md
- copilot-sdk-go.instructions.md
- copilot-sdk-nodejs.instructions.md
- copilot-sdk-python.instructions.md
- csharp-ja.instructions.md
- csharp-ko.instructions.md
- csharp-mcp-server.instructions.md
- csharp.instructions.md
- dart-n-flutter.instructions.md
- dataverse-python-advanced-features.instructions.md
- dataverse-python-agentic-workflows.instructions.md
- dataverse-python-api-reference.instructions.md
- dataverse-python-authentication-security.instructions.md
- dataverse-python-best-practices.instructions.md
- dataverse-python-error-handling.instructions.md
- dataverse-python-file-operations.instructions.md
- dataverse-python-modules.instructions.md
- dataverse-python-pandas-integration.instructions.md
- dataverse-python-performance-optimization.instructions.md
- dataverse-python-real-world-usecases.instructions.md
- dataverse-python-sdk.instructions.md
- dataverse-python-testing-debugging.instructions.md
- dataverse-python.instructions.md
- declarative-agents-microsoft365.instructions.md
- devbox-image-definition.instructions.md
- devops-core-principles.instructions.md
- dotnet-architecture-good-practices.instructions.md
- dotnet-framework.instructions.md
- dotnet-maui-9-to-dotnet-maui-10-upgrade.instructions.md
- dotnet-maui.instructions.md
- dotnet-upgrade.instructions.md
- dotnet-wpf.instructions.md
- generate-modern-terraform-code-for-azure.instructions.md
- gilfoyle-code-review.instructions.md
- go-mcp-server.instructions.md
- go.instructions.md
- html-css-style-color-guide.instructions.md
- java-11-to-java-17-upgrade.instructions.md
- java-17-to-java-21-upgrade.instructions.md
- java-21-to-java-25-upgrade.instructions.md
- java-mcp-server.instructions.md
- java.instructions.md
- joyride-user-project.instructions.md
- joyride-workspace-automation.instructions.md
- kotlin-mcp-server.instructions.md
- kubernetes-deployment-best-practices.instructions.md
- kubernetes-manifests.instructions.md
- localization.instructions.md
- lwc.instructions.md
- makefile.instructions.md
- mcp-m365-copilot.instructions.md
- mongo-dba.instructions.md
- ms-sql-dba.instructions.md
- nestjs.instructions.md
- nextjs-tailwind.instructions.md
- nextjs.instructions.md
- nodejs-javascript-vitest.instructions.md
- object-calisthenics.instructions.md
- oqtane.instructions.md
- pcf-alm.instructions.md
- pcf-api-reference.instructions.md
- pcf-best-practices.instructions.md
- pcf-canvas-apps.instructions.md
- pcf-code-components.instructions.md
- pcf-community-resources.instructions.md
- pcf-dependent-libraries.instructions.md
- pcf-events.instructions.md
- pcf-fluent-modern-theming.instructions.md
- pcf-limitations.instructions.md
- pcf-manifest-schema.instructions.md
- pcf-model-driven-apps.instructions.md
- pcf-overview.instructions.md
- pcf-power-pages.instructions.md
- pcf-react-platform-libraries.instructions.md
- pcf-sample-components.instructions.md
- pcf-tooling.instructions.md
- performance-optimization.instructions.md
- php-mcp-server.instructions.md
- php-symfony.instructions.md
- playwright-dotnet.instructions.md
- playwright-python.instructions.md
- playwright-typescript.instructions.md
- power-apps-canvas-yaml.instructions.md
- power-apps-code-apps.instructions.md
- power-bi-custom-visuals-development.instructions.md
- power-bi-data-modeling-best-practices.instructions.md
- power-bi-dax-best-practices.instructions.md
- power-bi-devops-alm-best-practices.instructions.md
- power-bi-report-design-best-practices.instructions.md
- power-bi-security-rls-best-practices.instructions.md
- power-platform-connector.instructions.md
- power-platform-mcp-development.instructions.md
- powershell-pester-5.instructions.md
- powershell.instructions.md
- python-mcp-server.instructions.md
- python.instructions.md
- quarkus-mcp-server-sse.instructions.md
- quarkus.instructions.md
- r.instructions.md
- reactjs.instructions.md
- ruby-mcp-server.instructions.md
- ruby-on-rails.instructions.md
- rust-mcp-server.instructions.md
- rust.instructions.md
- scala2.instructions.md
- security-and-owasp.instructions.md
- self-explanatory-code-commenting.instructions.md
- springboot-4-migration.instructions.md
- springboot.instructions.md
- sql-sp-generation.instructions.md
- svelte.instructions.md
- swift-mcp-server.instructions.md
- tanstack-start-shadcn-tailwind.instructions.md
- terraform-azure.instructions.md
- terraform-sap-btp.instructions.md
- terraform.instructions.md
- typescript-5-es2022.instructions.md
- typescript-mcp-server.instructions.md
- typespec-m365-copilot.instructions.md
- vsixtoolkit.instructions.md
- vuejs3.instructions.md
- wordpress.instructions.md

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-27  
**Source Repository:** https://github.com/github/awesome-copilot  
**Integration Date:** 2026-01-27
