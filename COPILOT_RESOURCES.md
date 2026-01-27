# GitHub Copilot Resources Catalog

This document provides a comprehensive catalog of all GitHub Copilot customization resources pulled from the [awesome-copilot](https://github.com/github/awesome-copilot) repository.

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Custom Agents](#custom-agents)
- [Prompts](#prompts)
- [Instructions](#instructions)
- [Workflows](#workflows)
- [Usage Recommendations](#usage-recommendations)

---

## Overview

This repository now includes:
- **77 Custom Agents** - Specialized AI assistants for specific tasks
- **93 Prompts** - Reusable prompt templates for common operations
- **67 Instructions** - Context-specific coding guidelines

All resources are organized in the `.github/` directory structure:
- `.github/agents/` - Custom agent definitions
- `.github/prompts/` - Prompt templates
- `.github/instructions/` - Instruction files

---

## Installation

### VS Code Insiders
These resources work with VS Code Insiders and GitHub Copilot. To use them:

1. Install [VS Code Insiders](https://code.visualstudio.com/insiders/)
2. Install the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
3. Clone this repository or copy the `.github/` directory to your project
4. Resources will be automatically detected by Copilot

### Using Individual Resources

To use a specific agent, prompt, or instruction in VS Code:
- **Agents**: Use `@agent-name` in Copilot Chat
- **Prompts**: Use `/prompt-name` in Copilot Chat
- **Instructions**: Automatically applied based on file patterns

---

## Custom Agents

Custom agents are specialized AI assistants that can be invoked for specific tasks. They provide focused expertise in particular domains.

### Available Agents (77)

#### 4.1 Beast Mode v3.1
- **File**: `4.1-Beast.agent.md`
- **Description**: GPT 4.1 as a top-notch coding agent.
- **Usage**: `@4.1-beast-mode-v3.1` in Copilot Chat

#### C# Expert
- **File**: `CSharpExpert.agent.md`
- **Description**: An agent designed to assist with software development tasks for .NET projects.
- **Usage**: `@c#-expert` in Copilot Chat

#### Thinking Beast Mode
- **File**: `Thinking-Beast-Mode.agent.md`
- **Description**: A transcendent coding agent with quantum cognitive architecture, adversarial intelligence, and unrestricted creative freedom.
- **Usage**: `@thinking-beast-mode` in Copilot Chat

#### Ultimate Transparent Thinking Beast Mode
- **File**: `Ultimate-Transparent-Thinking-Beast-Mode.agent.md`
- **Description**: Ultimate Transparent Thinking Beast Mode
- **Usage**: `@ultimate-transparent-thinking-beast-mode` in Copilot Chat

#### WinForms Expert
- **File**: `WinFormsExpert.agent.md`
- **Description**: Support development of .NET (OOP) WinForms Designer compatible Apps.
- **Usage**: `@winforms-expert` in Copilot Chat

#### accessibility
- **File**: `accessibility.agent.md`
- **Description**: Expert assistant for web accessibility (WCAG 2.1/2.2), inclusive UX, and a11y testing
- **Usage**: `@accessibility` in Copilot Chat

#### address-comments
- **File**: `address-comments.agent.md`
- **Description**: Address PR comments
- **Usage**: `@address-comments` in Copilot Chat

#### ADR Generator
- **File**: `adr-generator.agent.md`
- **Description**: Expert agent for creating comprehensive Architectural Decision Records (ADRs) with structured formatting optimized for AI consumption and human readability.
- **Usage**: `@adr-generator` in Copilot Chat

#### aem-frontend-specialist
- **File**: `aem-frontend-specialist.agent.md`
- **Description**: Expert assistant for developing AEM components using HTL, Tailwind CSS, and Figma-to-code workflows with design system integration
- **Usage**: `@aem-frontend-specialist` in Copilot Chat

#### Amplitude Experiment Implementation
- **File**: `amplitude-experiment-implementation.agent.md`
- **Description**: This custom agent uses Amplitude's MCP tools to deploy new experiments inside of Amplitude, enabling seamless variant testing capabilities and rollout of product features.
- **Usage**: `@amplitude-experiment-implementation` in Copilot Chat

#### api-architect
- **File**: `api-architect.agent.md`
- **Description**: Your role is that of an API architect. Help mentor the engineer by providing guidance, support, and working code.
- **Usage**: `@api-architect` in Copilot Chat

#### apify-integration-expert
- **File**: `apify-integration-expert.agent.md`
- **Description**: Expert agent for integrating Apify Actors into codebases. Handles Actor selection, workflow design, implementation across JavaScript/TypeScript and Python, testing, and production-ready deployment.
- **Usage**: `@apify-integration-expert` in Copilot Chat

#### Senior Cloud Architect
- **File**: `arch.agent.md`
- **Description**: Expert in modern architecture design patterns, NFR requirements, and creating comprehensive architectural diagrams and documentation
- **Usage**: `@senior-cloud-architect` in Copilot Chat

#### architect
- **File**: `architect.agent.md`
- **Description**: An agent for architects to design and plan software systems, including defining components, interactions, and technologies.
- **Usage**: `@architect` in Copilot Chat

#### arm-migration-agent
- **File**: `arm-migration.agent.md`
- **Description**: Arm Cloud Migration Assistant accelerates moving x86 workloads to Arm infrastructure. It scans the repository for architecture assumptions, portability issues, container base image and dependency incompatibilities, and recommends Arm-optimized changes. It can drive multi-arch container builds, validate performance, and guide optimization, enabling smooth cross-platform deployment directly inside GitHub.
- **Usage**: `@arm-migration-agent` in Copilot Chat

#### atlassian-requirements-to-jira
- **File**: `atlassian-requirements-to-jira.agent.md`
- **Description**: Transform requirements documents into structured Jira epics and user stories with intelligent duplicate detection, change management, and user-approved creation workflow.
- **Usage**: `@atlassian-requirements-to-jira` in Copilot Chat

#### azure-iac-exporter
- **File**: `azure-iac-exporter.agent.md`
- **Description**: Export existing Azure resources to Infrastructure as Code templates via Azure Resource Graph analysis, Azure Resource Manager API calls, and azure-iac-generator integration. Use this skill when the user asks to export, convert, migrate, or extract existing Azure resources to IaC templates (Bicep, ARM Templates, Terraform, Pulumi).
- **Usage**: `@azure-iac-exporter` in Copilot Chat

#### azure-iac-generator
- **File**: `azure-iac-generator.agent.md`
- **Description**: Central hub for generating Infrastructure as Code (Bicep, ARM, Terraform, Pulumi) with format-specific validation and best practices. Use this skill when the user asks to generate, create, write, or build infrastructure code, deployment code, or IaC templates in any format (Bicep, ARM Templates, Terraform, Pulumi).
- **Usage**: `@azure-iac-generator` in Copilot Chat

#### Azure Logic Apps Expert Mode
- **File**: `azure-logic-apps-expert.agent.md`
- **Description**: Expert guidance for Azure Logic Apps development focusing on workflow design, integration patterns, and JSON-based Workflow Definition Language.
- **Usage**: `@azure-logic-apps-expert-mode` in Copilot Chat

#### Azure Principal Architect mode instructions
- **File**: `azure-principal-architect.agent.md`
- **Description**: Provide expert Azure Principal Architect guidance using Azure Well-Architected Framework principles and Microsoft best practices.
- **Usage**: `@azure-principal-architect-mode-instructions` in Copilot Chat

#### Azure SaaS Architect mode instructions
- **File**: `azure-saas-architect.agent.md`
- **Description**: Provide expert Azure SaaS Architect guidance focusing on multitenant applications using Azure Well-Architected SaaS principles and Microsoft best practices.
- **Usage**: `@azure-saas-architect-mode-instructions` in Copilot Chat

#### Azure AVM Bicep mode
- **File**: `azure-verified-modules-bicep.agent.md`
- **Description**: Create, update, or review Azure IaC in Bicep using Azure Verified Modules (AVM).
- **Usage**: `@azure-avm-bicep-mode` in Copilot Chat

#### Azure AVM Terraform mode
- **File**: `azure-verified-modules-terraform.agent.md`
- **Description**: Create, update, or review Azure IaC in Terraform using Azure Verified Modules (AVM).
- **Usage**: `@azure-avm-terraform-mode` in Copilot Chat

#### bicep-implement
- **File**: `bicep-implement.agent.md`
- **Description**: Act as an Azure Bicep Infrastructure as Code coding specialist that creates Bicep templates.
- **Usage**: `@bicep-implement` in Copilot Chat

#### bicep-plan
- **File**: `bicep-plan.agent.md`
- **Description**: Act as implementation planner for your Azure Bicep Infrastructure as Code task.
- **Usage**: `@bicep-plan` in Copilot Chat

#### blueprint-mode-codex
- **File**: `blueprint-mode-codex.agent.md`
- **Description**: Executes structured workflows with strict correctness and maintainability. Enforces a minimal tool usage policy, never assumes facts, prioritizes reproducible solutions, self-correction, and edge-case handling.
- **Usage**: `@blueprint-mode-codex` in Copilot Chat

#### blueprint-mode
- **File**: `blueprint-mode.agent.md`
- **Description**: Executes structured workflows (Debug, Express, Main, Loop) with strict correctness and maintainability. Enforces an improved tool usage policy, never assumes facts, prioritizes reproducible solutions, self-correction, and edge-case handling.
- **Usage**: `@blueprint-mode` in Copilot Chat

#### CAST Imaging Impact Analysis Agent
- **File**: `cast-imaging-impact-analysis.agent.md`
- **Description**: Specialized agent for comprehensive change impact assessment and risk analysis in software systems using CAST Imaging
- **Usage**: `@cast-imaging-impact-analysis-agent` in Copilot Chat

#### CAST Imaging Software Discovery Agent
- **File**: `cast-imaging-software-discovery.agent.md`
- **Description**: Specialized agent for comprehensive software application discovery and architectural mapping through static code analysis using CAST Imaging
- **Usage**: `@cast-imaging-software-discovery-agent` in Copilot Chat

#### CAST Imaging Structural Quality Advisor Agent
- **File**: `cast-imaging-structural-quality-advisor.agent.md`
- **Description**: Specialized agent for identifying, analyzing, and providing remediation guidance for code quality issues using CAST Imaging
- **Usage**: `@cast-imaging-structural-quality-advisor-agent` in Copilot Chat

#### clean-code
- **File**: `clean-code.agent.md`
- **Description**: An agent for writing clean, readable, and maintainable code following established coding guidelines.
- **Usage**: `@clean-code` in Copilot Chat

#### Clojure Interactive Programming
- **File**: `clojure-interactive-programming.agent.md`
- **Description**: Expert Clojure pair programmer with REPL-first methodology, architectural oversight, and interactive problem-solving. Enforces quality standards, prevents workarounds, and develops solutions incrementally through live REPL evaluation before file modifications.
- **Usage**: `@clojure-interactive-programming` in Copilot Chat

#### VSCode Tour Expert
- **File**: `code-tour.agent.md`
- **Description**: Expert agent for creating and maintaining VSCode CodeTour files with comprehensive schema support and best practices
- **Usage**: `@vscode-tour-expert` in Copilot Chat

#### Comet Opik
- **File**: `comet-opik.agent.md`
- **Description**: Unified Comet Opik agent for instrumenting LLM apps, managing prompts/projects, auditing prompts, and investigating traces/metrics via the latest Opik MCP server.
- **Usage**: `@comet-opik` in Copilot Chat

#### Context7-Expert
- **File**: `context7.agent.md`
- **Description**: Expert in latest library versions, best practices, and correct syntax using up-to-date documentation
- **Usage**: `@context7-expert` in Copilot Chat

#### critical-thinking
- **File**: `critical-thinking.agent.md`
- **Description**: Challenge assumptions and encourage critical thinking to ensure the best possible solution and outcomes.
- **Usage**: `@critical-thinking` in Copilot Chat

#### csharp-dotnet-janitor
- **File**: `csharp-dotnet-janitor.agent.md`
- **Description**: Perform janitorial tasks on C#/.NET code including cleanup, modernization, and tech debt remediation.
- **Usage**: `@csharp-dotnet-janitor` in Copilot Chat

#### C# MCP Server Expert
- **File**: `csharp-mcp-expert.agent.md`
- **Description**: Expert assistant for developing Model Context Protocol (MCP) servers in C#
- **Usage**: `@c#-mcp-server-expert` in Copilot Chat

#### Custom Agent Foundry
- **File**: `custom-agent-foundry.agent.md`
- **Description**: Expert at designing and creating VS Code custom agents with optimal configurations
- **Usage**: `@custom-agent-foundry` in Copilot Chat

#### debug
- **File**: `debug.agent.md`
- **Description**: Debug your application to find and fix a bug
- **Usage**: `@debug` in Copilot Chat

#### debugger
- **File**: `debugger.agent.md`
- **Description**: An agent to help debug code by providing detailed error analysis and potential fixes.
- **Usage**: `@debugger` in Copilot Chat

#### declarative-agents-architect
- **File**: `declarative-agents-architect.agent.md`
- **Description**: No description available
- **Usage**: `@declarative-agents-architect` in Copilot Chat

#### demonstrate-understanding
- **File**: `demonstrate-understanding.agent.md`
- **Description**: Validate user understanding of code, design patterns, and implementation details through guided questioning.
- **Usage**: `@demonstrate-understanding` in Copilot Chat

#### devils-advocate
- **File**: `devils-advocate.agent.md`
- **Description**: I play the devil's advocate to challenge and stress-test your ideas by finding flaws, risks, and edge cases
- **Usage**: `@devils-advocate` in Copilot Chat

#### DevOps Expert
- **File**: `devops-expert.agent.md`
- **Description**: DevOps specialist following the infinity loop principle (Plan → Code → Build → Test → Release → Deploy → Operate → Monitor) with focus on automation, collaboration, and continuous improvement
- **Usage**: `@devops-expert` in Copilot Chat

#### expert-nextjs-developer
- **File**: `expert-nextjs-developer.agent.md`
- **Description**: Expert Next.js 16 developer specializing in App Router, Server Components, Cache Components, Turbopack, and modern React patterns with TypeScript
- **Usage**: `@expert-nextjs-developer` in Copilot Chat

#### GitHub Actions Expert
- **File**: `github-actions-expert.agent.md`
- **Description**: GitHub Actions specialist focused on secure CI/CD workflows, action pinning, OIDC authentication, permissions least privilege, and supply-chain security
- **Usage**: `@github-actions-expert` in Copilot Chat

#### GPT 5 Beast Mode
- **File**: `gpt-5-beast-mode.agent.md`
- **Description**: Beast Mode 2.0: A powerful autonomous agent tuned specifically for GPT-5 that can solve complex problems by using tools, conducting research, and iterating until the problem is fully resolved.
- **Usage**: `@gpt-5-beast-mode` in Copilot Chat

#### hlbpa
- **File**: `hlbpa.agent.md`
- **Description**: Your perfect AI chat mode for high-level architectural documentation and review. Perfect for targeted updates after a story or researching that legacy system when nobody remembers what it's supposed to be doing.
- **Usage**: `@hlbpa` in Copilot Chat

#### Implementation Plan Generation Mode
- **File**: `implementation-plan.agent.md`
- **Description**: Generate an implementation plan for new features or refactoring existing code.
- **Usage**: `@implementation-plan-generation-mode` in Copilot Chat

#### janitor
- **File**: `janitor.agent.md`
- **Description**: Perform janitorial tasks on any codebase including cleanup, simplification, and tech debt remediation.
- **Usage**: `@janitor` in Copilot Chat

#### mentor
- **File**: `mentor.agent.md`
- **Description**: Help mentor the engineer by providing guidance and support.
- **Usage**: `@mentor` in Copilot Chat

#### Meta Agentic Project Scaffold
- **File**: `meta-agentic-project-scaffold.agent.md`
- **Description**: Meta agentic project creation assistant to help users create and manage project workflows effectively.
- **Usage**: `@meta-agentic-project-scaffold` in Copilot Chat

#### modernization
- **File**: `modernization.agent.md`
- **Description**: Human-in-the-loop modernization assistant for analyzing, documenting, and planning complete project modernization with architectural recommendations.
- **Usage**: `@modernization` in Copilot Chat

#### OpenAPI to Application Generator
- **File**: `openapi-to-application.agent.md`
- **Description**: Expert assistant for generating working applications from OpenAPI specifications
- **Usage**: `@openapi-to-application-generator` in Copilot Chat

#### Plan Mode - Strategic Planning & Architecture
- **File**: `plan.agent.md`
- **Description**: Strategic planning and architecture assistant focused on thoughtful analysis before implementation. Helps developers understand codebases, clarify requirements, and develop comprehensive implementation strategies.
- **Usage**: `@plan-mode---strategic-planning-&-architecture` in Copilot Chat

#### Playwright Tester Mode
- **File**: `playwright-tester.agent.md`
- **Description**: Testing mode for Playwright tests
- **Usage**: `@playwright-tester-mode` in Copilot Chat

#### prd-creation
- **File**: `prd-creation.agent.md`
- **Description**: Create comprehensive Product Requirements Documents (PRDs) by transforming feature ideas into detailed specifications.
- **Usage**: `@prd-creation` in Copilot Chat

#### Create PRD Chat Mode
- **File**: `prd.agent.md`
- **Description**: Generate a comprehensive Product Requirements Document (PRD) in Markdown, detailing user stories, acceptance criteria, technical considerations, and metrics. Optionally create GitHub issues upon user confirmation.
- **Usage**: `@create-prd-chat-mode` in Copilot Chat

#### principal-software-engineer
- **File**: `principal-software-engineer.agent.md`
- **Description**: Provide principal-level software engineering guidance with focus on engineering excellence, technical leadership, and pragmatic implementation.
- **Usage**: `@principal-software-engineer` in Copilot Chat

#### prompt-builder
- **File**: `prompt-builder.agent.md`
- **Description**: Expert prompt engineering and validation system for creating high-quality prompts - Brought to you by microsoft/edge-ai
- **Usage**: `@prompt-builder` in Copilot Chat

#### prompt-engineer
- **File**: `prompt-engineer.agent.md`
- **Description**: A specialized chat mode for analyzing and improving prompts. Every user input is treated as a prompt to be improved. It first provides a detailed analysis of the original prompt within a <reasoning> tag, evaluating it against a systematic framework based on OpenAI's prompt engineering best practices. Following the analysis, it generates a new, improved prompt.
- **Usage**: `@prompt-engineer` in Copilot Chat

#### refine-issue
- **File**: `refine-issue.agent.md`
- **Description**: Refine the requirement or issue with Acceptance Criteria, Technical Considerations, Edge Cases, and NFRs
- **Usage**: `@refine-issue` in Copilot Chat

#### Technical spike research mode
- **File**: `research-technical-spike.agent.md`
- **Description**: Systematically research and validate technical spike documents through exhaustive investigation and controlled experimentation.
- **Usage**: `@technical-spike-research-mode` in Copilot Chat

#### SE: DevOps/CI
- **File**: `se-gitops-ci-specialist.agent.md`
- **Description**: DevOps specialist for CI/CD pipelines, deployment debugging, and GitOps workflows focused on making deployments boring and reliable
- **Usage**: `@se:-devops/ci` in Copilot Chat

#### search-ai-optimization-expert
- **File**: `search-ai-optimization-expert.agent.md`
- **Description**: Expert guidance for modern search optimization: SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) with AI-ready content strategies
- **Usage**: `@search-ai-optimization-expert` in Copilot Chat

#### simple-app-idea-generator
- **File**: `simple-app-idea-generator.agent.md`
- **Description**: Brainstorm and develop new application ideas through fun, interactive questioning until ready for specification creation.
- **Usage**: `@simple-app-idea-generator` in Copilot Chat

#### software-engineer-agent-v1
- **File**: `software-engineer-agent-v1.agent.md`
- **Description**: Expert-level software engineering agent. Deliver production-ready, maintainable code. Execute systematically and specification-driven. Document comprehensively. Operate autonomously and adaptively.
- **Usage**: `@software-engineer-agent-v1` in Copilot Chat

#### specification
- **File**: `specification.agent.md`
- **Description**: Generate or update specification documents for new or existing functionality.
- **Usage**: `@specification` in Copilot Chat

#### specsmd-construction-agent
- **File**: `specsmd-construction-agent.agent.md`
- **Description**: Building phase agent - execute bolts through DDD stages (model, test, implement)
- **Usage**: `@specsmd-construction-agent` in Copilot Chat

#### specsmd-inception-agent
- **File**: `specsmd-inception-agent.agent.md`
- **Description**: Planning phase agent - requirements gathering, story creation, and bolt planning
- **Usage**: `@specsmd-inception-agent` in Copilot Chat

#### specsmd-master-agent
- **File**: `specsmd-master-agent.agent.md`
- **Description**: Master orchestrator for AI-DLC - routes to appropriate phase/agent based on project state
- **Usage**: `@specsmd-master-agent` in Copilot Chat

#### specsmd-operations-agent
- **File**: `specsmd-operations-agent.agent.md`
- **Description**: Deployment phase agent - build, deploy, verify, and monitor releases
- **Usage**: `@specsmd-operations-agent` in Copilot Chat

#### Task Planner Instructions
- **File**: `task-planner.agent.md`
- **Description**: Task planner for creating actionable implementation plans - Brought to you by microsoft/edge-ai
- **Usage**: `@task-planner-instructions` in Copilot Chat

#### Task Researcher Instructions
- **File**: `task-researcher.agent.md`
- **Description**: Task research specialist for comprehensive project analysis - Brought to you by microsoft/edge-ai
- **Usage**: `@task-researcher-instructions` in Copilot Chat

#### tech-debt-remediation-plan
- **File**: `tech-debt-remediation-plan.agent.md`
- **Description**: Generate technical debt remediation plans for code, tests, and documentation.
- **Usage**: `@tech-debt-remediation-plan` in Copilot Chat

#### technical-content-evaluator
- **File**: `technical-content-evaluator.agent.md`
- **Description**: Elite technical content editor and curriculum architect for evaluating technical training materials, documentation, and educational content. Reviews for technical accuracy, pedagogical excellence, content flow, code validation, and ensures A-grade quality standards.
- **Usage**: `@technical-content-evaluator` in Copilot Chat


---

## Prompts

Prompts are reusable templates for common development tasks. They can be invoked directly in Copilot Chat.

### Available Prompts (93)

#### add-educational-comments
- **File**: `add-educational-comments.prompt.md`
- **Description**: Add educational comments to the file specified, or prompt asking for file to comment if one is not provided.
- **Usage**: `/add-educational-comments` in Copilot Chat

#### ai-prompt-engineering-safety-review
- **File**: `ai-prompt-engineering-safety-review.prompt.md`
- **Description**: Comprehensive AI prompt engineering safety review and improvement prompt. Analyzes prompts for safety, bias, security vulnerabilities, and effectiveness while providing detailed improvement recommendations with extensive frameworks, testing methodologies, and educational content.
- **Usage**: `/ai-prompt-engineering-safety-review` in Copilot Chat

#### Apple App Store Reviewer
- **File**: `apple-appstore-reviewer.prompt.md`
- **Description**: Serves as a reviewer of the codebase with instructions on looking for Apple App Store optimizations or rejection reasons.
- **Usage**: `/apple-app-store-reviewer` in Copilot Chat

#### architecture-blueprint-generator
- **File**: `architecture-blueprint-generator.prompt.md`
- **Description**: Comprehensive project architecture blueprint generator that analyzes codebases to create detailed architectural documentation. Automatically detects technology stacks and architectural patterns, generates visual diagrams, documents implementation patterns, and provides extensible blueprints for maintaining architectural consistency and guiding new development.
- **Usage**: `/architecture-blueprint-generator` in Copilot Chat

#### aspnet-minimal-api-openapi
- **File**: `aspnet-minimal-api-openapi.prompt.md`
- **Description**: Create ASP.NET Minimal API endpoints with proper OpenAPI documentation
- **Usage**: `/aspnet-minimal-api-openapi` in Copilot Chat

#### az-cost-optimize
- **File**: `az-cost-optimize.prompt.md`
- **Description**: Analyze Azure resources used in the app (IaC files and/or resources in a target rg) and optimize costs - creating GitHub issues for identified optimizations.
- **Usage**: `/az-cost-optimize` in Copilot Chat

#### azure-resource-health-diagnose
- **File**: `azure-resource-health-diagnose.prompt.md`
- **Description**: Analyze Azure resource health, diagnose issues from logs and telemetry, and create a remediation plan for identified problems.
- **Usage**: `/azure-resource-health-diagnose` in Copilot Chat

#### boost-prompt
- **File**: `boost-prompt.prompt.md`
- **Description**: Interactive prompt refinement workflow: interrogates scope, deliverables, constraints; copies final markdown to clipboard; never writes code. Requires the Joyride extension.
- **Usage**: `/boost-prompt` in Copilot Chat

#### breakdown-epic-arch
- **File**: `breakdown-epic-arch.prompt.md`
- **Description**: Prompt for creating the high-level technical architecture for an Epic, based on a Product Requirements Document.
- **Usage**: `/breakdown-epic-arch` in Copilot Chat

#### breakdown-epic-pm
- **File**: `breakdown-epic-pm.prompt.md`
- **Description**: Prompt for creating an Epic Product Requirements Document (PRD) for a new epic. This PRD will be used as input for generating a technical architecture specification.
- **Usage**: `/breakdown-epic-pm` in Copilot Chat

#### breakdown-feature-implementation
- **File**: `breakdown-feature-implementation.prompt.md`
- **Description**: Prompt for creating detailed feature implementation plans, following Epoch monorepo structure.
- **Usage**: `/breakdown-feature-implementation` in Copilot Chat

#### breakdown-feature-prd
- **File**: `breakdown-feature-prd.prompt.md`
- **Description**: Prompt for creating Product Requirements Documents (PRDs) for new features, based on an Epic.
- **Usage**: `/breakdown-feature-prd` in Copilot Chat

#### breakdown-plan
- **File**: `breakdown-plan.prompt.md`
- **Description**: Issue Planning and Automation prompt that generates comprehensive project plans with Epic > Feature > Story/Enabler > Test hierarchy, dependencies, priorities, and automated tracking.
- **Usage**: `/breakdown-plan` in Copilot Chat

#### breakdown-test
- **File**: `breakdown-test.prompt.md`
- **Description**: Test Planning and Quality Assurance prompt that generates comprehensive test strategies, task breakdowns, and quality validation plans for GitHub projects.
- **Usage**: `/breakdown-test` in Copilot Chat

#### code-exemplars-blueprint-generator
- **File**: `code-exemplars-blueprint-generator.prompt.md`
- **Description**: Technology-agnostic prompt generator that creates customizable AI prompts for scanning codebases and identifying high-quality code exemplars. Supports multiple programming languages (.NET, Java, JavaScript, TypeScript, React, Angular, Python) with configurable analysis depth, categorization methods, and documentation formats to establish coding standards and maintain consistency across development teams.
- **Usage**: `/code-exemplars-blueprint-generator` in Copilot Chat

#### comment-code-generate-a-tutorial
- **File**: `comment-code-generate-a-tutorial.prompt.md`
- **Description**: Transform this Python script into a polished, beginner-friendly project by refactoring the code, adding clear instructional comments, and generating a complete markdown tutorial.
- **Usage**: `/comment-code-generate-a-tutorial` in Copilot Chat

#### containerize-aspnet-framework
- **File**: `containerize-aspnet-framework.prompt.md`
- **Description**: Containerize an ASP.NET .NET Framework project by creating Dockerfile and .dockerfile files customized for the project.
- **Usage**: `/containerize-aspnet-framework` in Copilot Chat

#### containerize-aspnetcore
- **File**: `containerize-aspnetcore.prompt.md`
- **Description**: Containerize an ASP.NET Core project by creating Dockerfile and .dockerfile files customized for the project.
- **Usage**: `/containerize-aspnetcore` in Copilot Chat

#### conventional-commit
- **File**: `conventional-commit.prompt.md`
- **Description**: Prompt and workflow for generating conventional commit messages using a structured XML format. Guides users to create standardized, descriptive commit messages in line with the Conventional Commits specification, including instructions, examples, and validation.
- **Usage**: `/conventional-commit` in Copilot Chat

#### convert-plaintext-to-md
- **File**: `convert-plaintext-to-md.prompt.md`
- **Description**: Convert a text-based document to markdown following instructions from prompt, or if a documented option is passed, follow the instructions for that option.
- **Usage**: `/convert-plaintext-to-md` in Copilot Chat

#### copilot-instructions-blueprint-generator
- **File**: `copilot-instructions-blueprint-generator.prompt.md`
- **Description**: Technology-agnostic blueprint generator for creating comprehensive copilot-instructions.md files that guide GitHub Copilot to produce code consistent with project standards, architecture patterns, and exact technology versions by analyzing existing codebase patterns and avoiding assumptions.
- **Usage**: `/copilot-instructions-blueprint-generator` in Copilot Chat

#### cosmosdb-datamodeling
- **File**: `cosmosdb-datamodeling.prompt.md`
- **Description**: Step-by-step guide for capturing key application requirements for NoSQL use-case and produce Azure Cosmos DB Data NoSQL Model design using best practices and common patterns, artifacts_produced: "cosmosdb_requirements.md" file and "cosmosdb_data_model.md" file
- **Usage**: `/cosmosdb-datamodeling` in Copilot Chat

#### create-agentsmd
- **File**: `create-agentsmd.prompt.md`
- **Description**: Prompt for generating an AGENTS.md file for a repository
- **Usage**: `/create-agentsmd` in Copilot Chat

#### create-architectural-decision-record
- **File**: `create-architectural-decision-record.prompt.md`
- **Description**: Create an Architectural Decision Record (ADR) document for AI-optimized decision documentation.
- **Usage**: `/create-architectural-decision-record` in Copilot Chat

#### create-github-action-workflow-specification
- **File**: `create-github-action-workflow-specification.prompt.md`
- **Description**: Create a formal specification for an existing GitHub Actions CI/CD workflow, optimized for AI consumption and workflow maintenance.
- **Usage**: `/create-github-action-workflow-specification` in Copilot Chat

#### create-github-issue-feature-from-specification
- **File**: `create-github-issue-feature-from-specification.prompt.md`
- **Description**: Create GitHub Issue for feature request from specification file using feature_request.yml template.
- **Usage**: `/create-github-issue-feature-from-specification` in Copilot Chat

#### create-github-issues-feature-from-implementation-plan
- **File**: `create-github-issues-feature-from-implementation-plan.prompt.md`
- **Description**: Create GitHub Issues from implementation plan phases using feature_request.yml or chore_request.yml templates.
- **Usage**: `/create-github-issues-feature-from-implementation-plan` in Copilot Chat

#### create-github-issues-for-unmet-specification-requirements
- **File**: `create-github-issues-for-unmet-specification-requirements.prompt.md`
- **Description**: Create GitHub Issues for unimplemented requirements from specification files using feature_request.yml template.
- **Usage**: `/create-github-issues-for-unmet-specification-requirements` in Copilot Chat

#### create-github-pull-request-from-specification
- **File**: `create-github-pull-request-from-specification.prompt.md`
- **Description**: Create GitHub Pull Request for feature request from specification file using pull_request_template.md template.
- **Usage**: `/create-github-pull-request-from-specification` in Copilot Chat

#### create-implementation-plan
- **File**: `create-implementation-plan.prompt.md`
- **Description**: Create a new implementation plan file for new features, refactoring existing code or upgrading packages, design, architecture or infrastructure.
- **Usage**: `/create-implementation-plan` in Copilot Chat

#### create-llms
- **File**: `create-llms.prompt.md`
- **Description**: Create an llms.txt file from scratch based on repository structure following the llms.txt specification at https://llmstxt.org/
- **Usage**: `/create-llms` in Copilot Chat

#### create-oo-component-documentation
- **File**: `create-oo-component-documentation.prompt.md`
- **Description**: Create comprehensive, standardized documentation for object-oriented components following industry best practices and architectural documentation standards.
- **Usage**: `/create-oo-component-documentation` in Copilot Chat

#### create-readme
- **File**: `create-readme.prompt.md`
- **Description**: Create a README.md file for the project
- **Usage**: `/create-readme` in Copilot Chat

#### create-specification
- **File**: `create-specification.prompt.md`
- **Description**: Create a new specification file for the solution, optimized for Generative AI consumption.
- **Usage**: `/create-specification` in Copilot Chat

#### create-spring-boot-java-project
- **File**: `create-spring-boot-java-project.prompt.md`
- **Description**: Create Spring Boot Java Project Skeleton
- **Usage**: `/create-spring-boot-java-project` in Copilot Chat

#### create-spring-boot-kotlin-project
- **File**: `create-spring-boot-kotlin-project.prompt.md`
- **Description**: Create Spring Boot Kotlin Project Skeleton
- **Usage**: `/create-spring-boot-kotlin-project` in Copilot Chat

#### create-technical-spike
- **File**: `create-technical-spike.prompt.md`
- **Description**: Create time-boxed technical spike documents for researching and resolving critical development decisions before implementation.
- **Usage**: `/create-technical-spike` in Copilot Chat

#### create-tldr-page
- **File**: `create-tldr-page.prompt.md`
- **Description**: Create a tldr page from documentation URLs and command examples, requiring both URL and command name.
- **Usage**: `/create-tldr-page` in Copilot Chat

#### csharp-async
- **File**: `csharp-async.prompt.md`
- **Description**: Get best practices for C# async programming
- **Usage**: `/csharp-async` in Copilot Chat

#### csharp-docs
- **File**: `csharp-docs.prompt.md`
- **Description**: Ensure that C# types are documented with XML comments and follow best practices for documentation.
- **Usage**: `/csharp-docs` in Copilot Chat

#### csharp-mcp-server-generator
- **File**: `csharp-mcp-server-generator.prompt.md`
- **Description**: Generate a complete MCP server project in C# with tools, prompts, and proper configuration
- **Usage**: `/csharp-mcp-server-generator` in Copilot Chat

#### csharp-mstest
- **File**: `csharp-mstest.prompt.md`
- **Description**: Get best practices for MSTest unit testing, including data-driven tests
- **Usage**: `/csharp-mstest` in Copilot Chat

#### csharp-nunit
- **File**: `csharp-nunit.prompt.md`
- **Description**: Get best practices for NUnit unit testing, including data-driven tests
- **Usage**: `/csharp-nunit` in Copilot Chat

#### csharp-tunit
- **File**: `csharp-tunit.prompt.md`
- **Description**: Get best practices for TUnit unit testing, including data-driven tests
- **Usage**: `/csharp-tunit` in Copilot Chat

#### csharp-xunit
- **File**: `csharp-xunit.prompt.md`
- **Description**: Get best practices for XUnit unit testing, including data-driven tests
- **Usage**: `/csharp-xunit` in Copilot Chat

#### Dataverse Python Advanced Patterns
- **File**: `dataverse-python-advanced-patterns.prompt.md`
- **Description**: Generate production code for Dataverse SDK using advanced patterns, error handling, and optimization techniques.
- **Usage**: `/dataverse-python-advanced-patterns` in Copilot Chat

#### Dataverse Python - Production Code Generator
- **File**: `dataverse-python-production-code.prompt.md`
- **Description**: Generate production-ready Python code using Dataverse SDK with error handling, optimization, and best practices
- **Usage**: `/dataverse-python---production-code-generator` in Copilot Chat

#### Dataverse Python Quickstart Generator
- **File**: `dataverse-python-quickstart.prompt.md`
- **Description**: Generate Python SDK setup + CRUD + bulk + paging snippets using official patterns.
- **Usage**: `/dataverse-python-quickstart-generator` in Copilot Chat

#### Dataverse Python - Use Case Solution Builder
- **File**: `dataverse-python-usecase-builder.prompt.md`
- **Description**: Generate complete solutions for specific Dataverse SDK use cases with architecture recommendations
- **Usage**: `/dataverse-python---use-case-solution-builder` in Copilot Chat

#### declarative-agents
- **File**: `declarative-agents.prompt.md`
- **Description**: Complete development kit for Microsoft 365 Copilot declarative agents with three comprehensive workflows (basic, advanced, validation), TypeSpec support, and Microsoft 365 Agents Toolkit integration
- **Usage**: `/declarative-agents` in Copilot Chat

#### devops-rollout-plan
- **File**: `devops-rollout-plan.prompt.md`
- **Description**: Generate comprehensive rollout plans with preflight checks, step-by-step deployment, verification signals, rollback procedures, and communication plans for infrastructure and application changes
- **Usage**: `/devops-rollout-plan` in Copilot Chat

#### documentation-writer
- **File**: `documentation-writer.prompt.md`
- **Description**: Diátaxis Documentation Expert. An expert technical writer specializing in creating high-quality software documentation, guided by the principles and structure of the Diátaxis technical documentation authoring framework.
- **Usage**: `/documentation-writer` in Copilot Chat

#### dotnet-best-practices
- **File**: `dotnet-best-practices.prompt.md`
- **Description**: Ensure .NET/C# code meets best practices for the solution/project.
- **Usage**: `/dotnet-best-practices` in Copilot Chat

#### dotnet-design-pattern-review
- **File**: `dotnet-design-pattern-review.prompt.md`
- **Description**: Review the C#/.NET code for design pattern implementation and suggest improvements.
- **Usage**: `/dotnet-design-pattern-review` in Copilot Chat

#### .NET Upgrade Analysis Prompts
- **File**: `dotnet-upgrade.prompt.md`
- **Description**: Ready-to-use prompts for comprehensive .NET framework upgrade analysis and execution
- **Usage**: `/.net-upgrade-analysis-prompts` in Copilot Chat

#### editorconfig
- **File**: `editorconfig.prompt.md`
- **Description**: Generates a comprehensive and best-practice-oriented .editorconfig file based on project analysis and user preferences.
- **Usage**: `/editorconfig` in Copilot Chat

#### ef-core
- **File**: `ef-core.prompt.md`
- **Description**: Get best practices for Entity Framework Core
- **Usage**: `/ef-core` in Copilot Chat

#### finalize-agent-prompt
- **File**: `finalize-agent-prompt.prompt.md`
- **Description**: Finalize prompt file using the role of an AI agent to polish the prompt for the end user.
- **Usage**: `/finalize-agent-prompt` in Copilot Chat

#### first-ask
- **File**: `first-ask.prompt.md`
- **Description**: Interactive, input-tool powered, task refinement workflow: interrogates scope, deliverables, constraints before carrying out the task; Requires the Joyride extension.
- **Usage**: `/first-ask` in Copilot Chat

#### folder-structure-blueprint-generator
- **File**: `folder-structure-blueprint-generator.prompt.md`
- **Description**: Comprehensive technology-agnostic prompt for analyzing and documenting project folder structures. Auto-detects project types (.NET, Java, React, Angular, Python, Node.js, Flutter), generates detailed blueprints with visualization options, naming conventions, file placement patterns, and extension templates for maintaining consistent code organization across diverse technology stacks.
- **Usage**: `/folder-structure-blueprint-generator` in Copilot Chat

#### gen-specs-as-issues
- **File**: `gen-specs-as-issues.prompt.md`
- **Description**: This workflow guides you through a systematic approach to identify missing features, prioritize them, and create detailed specifications for implementation.
- **Usage**: `/gen-specs-as-issues` in Copilot Chat

#### git-flow-branch-creator
- **File**: `git-flow-branch-creator.prompt.md`
- **Description**: Intelligent Git Flow branch creator that analyzes git status/diff and creates appropriate branches following the nvie Git Flow branching model.
- **Usage**: `/git-flow-branch-creator` in Copilot Chat

#### github-copilot-starter
- **File**: `github-copilot-starter.prompt.md`
- **Description**: Set up complete GitHub Copilot configuration for a new project based on technology stack
- **Usage**: `/github-copilot-starter` in Copilot Chat

#### mcp-create-adaptive-cards
- **File**: `mcp-create-adaptive-cards.prompt.md`
- **Description**: No description available
- **Usage**: `/mcp-create-adaptive-cards` in Copilot Chat

#### mcp-deploy-manage-agents
- **File**: `mcp-deploy-manage-agents.prompt.md`
- **Description**: No description available
- **Usage**: `/mcp-deploy-manage-agents` in Copilot Chat

#### memory-merger
- **File**: `memory-merger.prompt.md`
- **Description**: Merges mature lessons from a domain memory file into its instruction file. Syntax: `/memory-merger >domain [scope]` where scope is `global` (default), `user`, `workspace`, or `ws`.
- **Usage**: `/memory-merger` in Copilot Chat

#### model-recommendation
- **File**: `model-recommendation.prompt.md`
- **Description**: Analyze chatmode or prompt files and recommend optimal AI models based on task complexity, required capabilities, and cost-efficiency
- **Usage**: `/model-recommendation` in Copilot Chat

#### playwright-explore-website
- **File**: `playwright-explore-website.prompt.md`
- **Description**: Website exploration for testing using Playwright MCP
- **Usage**: `/playwright-explore-website` in Copilot Chat

#### playwright-generate-test
- **File**: `playwright-generate-test.prompt.md`
- **Description**: Generate a Playwright test based on a scenario using Playwright MCP
- **Usage**: `/playwright-generate-test` in Copilot Chat

#### prd-creation
- **File**: `prd-creation.prompt.md`
- **Description**: Generate a comprehensive Product Requirements Document (PRD) for a new feature
- **Usage**: `/prd-creation` in Copilot Chat

#### project-workflow-analysis-blueprint-generator
- **File**: `project-workflow-analysis-blueprint-generator.prompt.md`
- **Description**: Comprehensive technology-agnostic prompt generator for documenting end-to-end application workflows. Automatically detects project architecture patterns, technology stacks, and data flow patterns to generate detailed implementation blueprints covering entry points, service layers, data access, error handling, and testing approaches across multiple technologies including .NET, Java/Spring, React, and microservices architectures.
- **Usage**: `/project-workflow-analysis-blueprint-generator` in Copilot Chat

#### prompt-builder
- **File**: `prompt-builder.prompt.md`
- **Description**: Guide users through creating high-quality GitHub Copilot prompts with proper structure, tools, and best practices.
- **Usage**: `/prompt-builder` in Copilot Chat

#### pytest-coverage
- **File**: `pytest-coverage.prompt.md`
- **Description**: Run pytest tests with coverage, discover lines missing coverage, and increase coverage to 100%.
- **Usage**: `/pytest-coverage` in Copilot Chat

#### readme-blueprint-generator
- **File**: `readme-blueprint-generator.prompt.md`
- **Description**: Intelligent README.md generation prompt that analyzes project documentation structure and creates comprehensive repository documentation. Scans .github/copilot directory files and copilot-instructions.md to extract project information, technology stack, architecture, development workflow, coding standards, and testing approaches while generating well-structured markdown documentation with proper formatting, cross-references, and developer-focused content.
- **Usage**: `/readme-blueprint-generator` in Copilot Chat

#### remember
- **File**: `remember.prompt.md`
- **Description**: Transforms lessons learned into domain-organized memory instructions (global or workspace). Syntax: `/remember [>domain [scope]] lesson clue` where scope is `global` (default), `user`, `workspace`, or `ws`.
- **Usage**: `/remember` in Copilot Chat

#### repo-story-time
- **File**: `repo-story-time.prompt.md`
- **Description**: Generate a comprehensive repository summary and narrative story from commit history
- **Usage**: `/repo-story-time` in Copilot Chat

#### review-and-refactor
- **File**: `review-and-refactor.prompt.md`
- **Description**: Review and refactor code in your project according to defined instructions
- **Usage**: `/review-and-refactor` in Copilot Chat

#### sa-generate
- **File**: `structured-autonomy-generate.prompt.md`
- **Description**: Structured Autonomy Implementation Generator Prompt
- **Usage**: `/sa-generate` in Copilot Chat

#### sa-implement
- **File**: `structured-autonomy-implement.prompt.md`
- **Description**: Structured Autonomy Implementation Prompt
- **Usage**: `/sa-implement` in Copilot Chat

#### sa-plan
- **File**: `structured-autonomy-plan.prompt.md`
- **Description**: Structured Autonomy Planning Prompt
- **Usage**: `/sa-plan` in Copilot Chat

#### suggest-awesome-github-copilot-agents
- **File**: `suggest-awesome-github-copilot-agents.prompt.md`
- **Description**: No description available
- **Usage**: `/suggest-awesome-github-copilot-agents` in Copilot Chat

#### suggest-awesome-github-copilot-collections
- **File**: `suggest-awesome-github-copilot-collections.prompt.md`
- **Description**: Suggest relevant GitHub Copilot collections from the awesome-copilot repository based on current repository context and chat history, providing automatic download and installation of collection assets, and identifying outdated collection assets that need updates.
- **Usage**: `/suggest-awesome-github-copilot-collections` in Copilot Chat

#### suggest-awesome-github-copilot-instructions
- **File**: `suggest-awesome-github-copilot-instructions.prompt.md`
- **Description**: No description available
- **Usage**: `/suggest-awesome-github-copilot-instructions` in Copilot Chat

#### suggest-awesome-github-copilot-prompts
- **File**: `suggest-awesome-github-copilot-prompts.prompt.md`
- **Description**: No description available
- **Usage**: `/suggest-awesome-github-copilot-prompts` in Copilot Chat

#### task-execution
- **File**: `task-execution.prompt.md`
- **Description**: Execute development tasks systematically with proper testing and git practices
- **Usage**: `/task-execution` in Copilot Chat

#### task-generation
- **File**: `task-generation.prompt.md`
- **Description**: Convert a PRD into actionable development tasks with clear dependencies
- **Usage**: `/task-generation` in Copilot Chat

#### technology-stack-blueprint-generator
- **File**: `technology-stack-blueprint-generator.prompt.md`
- **Description**: Comprehensive technology stack blueprint generator that analyzes codebases to create detailed architectural documentation. Automatically detects technology stacks, programming languages, and implementation patterns across multiple platforms (.NET, Java, JavaScript, React, Python). Generates configurable blueprints with version information, licensing details, usage patterns, coding conventions, and visual diagrams. Provides implementation-ready templates and maintains architectural consistency for guided development.
- **Usage**: `/technology-stack-blueprint-generator` in Copilot Chat

#### update-implementation-plan
- **File**: `update-implementation-plan.prompt.md`
- **Description**: Update an existing implementation plan file with new or update requirements to provide new features, refactoring existing code or upgrading packages, design, architecture or infrastructure.
- **Usage**: `/update-implementation-plan` in Copilot Chat

#### update-llms
- **File**: `update-llms.prompt.md`
- **Description**: Update the llms.txt file in the root folder to reflect changes in documentation or specifications following the llms.txt specification at https://llmstxt.org/
- **Usage**: `/update-llms` in Copilot Chat

#### update-markdown-file-index
- **File**: `update-markdown-file-index.prompt.md`
- **Description**: Update a markdown file section with an index/table of files from a specified folder.
- **Usage**: `/update-markdown-file-index` in Copilot Chat

#### update-oo-component-documentation
- **File**: `update-oo-component-documentation.prompt.md`
- **Description**: Update existing object-oriented component documentation following industry best practices and architectural documentation standards.
- **Usage**: `/update-oo-component-documentation` in Copilot Chat

#### update-specification
- **File**: `update-specification.prompt.md`
- **Description**: Update an existing specification file for the solution, optimized for Generative AI consumption based on new requirements or updates to any existing code.
- **Usage**: `/update-specification` in Copilot Chat

#### write-coding-standards-from-file
- **File**: `write-coding-standards-from-file.prompt.md`
- **Description**: Write a coding standards document for a project using the coding styles from the file(s) and/or folder(s) passed as arguments in the prompt.
- **Usage**: `/write-coding-standards-from-file` in Copilot Chat


---

## Instructions

Instructions provide context-specific coding guidelines that are automatically applied based on file patterns.

### Available Instructions (67)

#### a11y
- **File**: `a11y.instructions.md`
- **Description**: Guidance for creating more accessible code
- **Auto-applied**: Based on file patterns defined in frontmatter

#### agent-skills
- **File**: `agent-skills.instructions.md`
- **Description**: Guidelines for creating high-quality Agent Skills for GitHub Copilot
- **Auto-applied**: Based on file patterns defined in frontmatter

#### agents
- **File**: `agents.instructions.md`
- **Description**: Guidelines for creating custom agent files for GitHub Copilot
- **Auto-applied**: Based on file patterns defined in frontmatter

#### ai-prompt-engineering-safety-best-practices
- **File**: `ai-prompt-engineering-safety-best-practices.instructions.md`
- **Description**: Comprehensive best practices for AI prompt engineering, safety frameworks, bias mitigation, and responsible AI usage for Copilot and LLMs.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### angular
- **File**: `angular.instructions.md`
- **Description**: Angular-specific coding standards and best practices
- **Auto-applied**: Based on file patterns defined in frontmatter

#### ansible
- **File**: `ansible.instructions.md`
- **Description**: Ansible conventions and best practices
- **Auto-applied**: Based on file patterns defined in frontmatter

#### apex
- **File**: `apex.instructions.md`
- **Description**: Guidelines and best practices for Apex development on the Salesforce Platform
- **Auto-applied**: Based on file patterns defined in frontmatter

#### aspnet-rest-apis
- **File**: `aspnet-rest-apis.instructions.md`
- **Description**: Guidelines for building REST APIs with ASP.NET
- **Auto-applied**: Based on file patterns defined in frontmatter

#### astro
- **File**: `astro.instructions.md`
- **Description**: Astro development standards and best practices for content-driven websites
- **Auto-applied**: Based on file patterns defined in frontmatter

#### azure-devops-pipelines
- **File**: `azure-devops-pipelines.instructions.md`
- **Description**: Best practices for Azure DevOps Pipeline YAML files
- **Auto-applied**: Based on file patterns defined in frontmatter

#### azure-functions-typescript
- **File**: `azure-functions-typescript.instructions.md`
- **Description**: TypeScript patterns for Azure Functions
- **Auto-applied**: Based on file patterns defined in frontmatter

#### azure-logic-apps-power-automate
- **File**: `azure-logic-apps-power-automate.instructions.md`
- **Description**: Guidelines for developing Azure Logic Apps and Power Automate workflows with best practices for Workflow Definition Language (WDL), integration patterns, and enterprise automation
- **Auto-applied**: Based on file patterns defined in frontmatter

#### azure-verified-modules-bicep
- **File**: `azure-verified-modules-bicep.instructions.md`
- **Description**: Azure Verified Modules (AVM) and Bicep
- **Auto-applied**: Based on file patterns defined in frontmatter

#### azure-verified-modules-terraform
- **File**: `azure-verified-modules-terraform.instructions.md`
- **Description**:  Azure Verified Modules (AVM) and Terraform
- **Auto-applied**: Based on file patterns defined in frontmatter

#### bicep-code-best-practices
- **File**: `bicep-code-best-practices.instructions.md`
- **Description**: Infrastructure as Code with Bicep
- **Auto-applied**: Based on file patterns defined in frontmatter

#### blazor
- **File**: `blazor.instructions.md`
- **Description**: Blazor component and application patterns
- **Auto-applied**: Based on file patterns defined in frontmatter

#### clojure
- **File**: `clojure.instructions.md`
- **Description**: Clojure-specific coding patterns, inline def usage, code block templates, and namespace handling for Clojure development.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### cmake-vcpkg
- **File**: `cmake-vcpkg.instructions.md`
- **Description**: C++ project configuration and package management
- **Auto-applied**: Based on file patterns defined in frontmatter

#### code-review-generic
- **File**: `code-review-generic.instructions.md`
- **Description**: Generic code review instructions that can be customized for any project using GitHub Copilot
- **Auto-applied**: Based on file patterns defined in frontmatter

#### codexer
- **File**: `codexer.instructions.md`
- **Description**: Advanced Python research assistant with Context 7 MCP integration, focusing on speed, reliability, and 10+ years of software development expertise
- **Auto-applied**: Based on file patterns defined in frontmatter

#### coldfusion-cfc
- **File**: `coldfusion-cfc.instructions.md`
- **Description**: ColdFusion Coding Standards for CFC component and application patterns
- **Auto-applied**: Based on file patterns defined in frontmatter

#### coldfusion-cfm
- **File**: `coldfusion-cfm.instructions.md`
- **Description**: ColdFusion cfm files and application patterns
- **Auto-applied**: Based on file patterns defined in frontmatter

#### collections
- **File**: `collections.instructions.md`
- **Description**: Guidelines for creating and managing awesome-copilot collections
- **Auto-applied**: Based on file patterns defined in frontmatter

#### containerization-docker-best-practices
- **File**: `containerization-docker-best-practices.instructions.md`
- **Description**: Comprehensive best practices for creating optimized, secure, and efficient Docker images and managing containers. Covers multi-stage builds, image layer optimization, security scanning, and runtime best practices.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### convert-cassandra-to-spring-data-cosmos
- **File**: `convert-cassandra-to-spring-data-cosmos.instructions.md`
- **Description**: Step-by-step guide for converting Spring Boot Cassandra applications to use Azure Cosmos DB with Spring Data Cosmos
- **Auto-applied**: Based on file patterns defined in frontmatter

#### convert-jpa-to-spring-data-cosmos
- **File**: `convert-jpa-to-spring-data-cosmos.instructions.md`
- **Description**: Step-by-step guide for converting Spring Boot JPA applications to use Azure Cosmos DB with Spring Data Cosmos
- **Auto-applied**: Based on file patterns defined in frontmatter

#### GitHub Copilot SDK C# Instructions
- **File**: `copilot-sdk-csharp.instructions.md`
- **Description**: This file provides guidance on building C# applications using GitHub Copilot SDK.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### GitHub Copilot SDK Go Instructions
- **File**: `copilot-sdk-go.instructions.md`
- **Description**: This file provides guidance on building Go applications using GitHub Copilot SDK.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### GitHub Copilot SDK Node.js Instructions
- **File**: `copilot-sdk-nodejs.instructions.md`
- **Description**: This file provides guidance on building Node.js/TypeScript applications using GitHub Copilot SDK.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### GitHub Copilot SDK Python Instructions
- **File**: `copilot-sdk-python.instructions.md`
- **Description**: This file provides guidance on building Python applications using GitHub Copilot SDK.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### copilot-thought-logging
- **File**: `copilot-thought-logging.instructions.md`
- **Description**: See process Copilot is following where you can edit this to reshape the interaction or save when follow up may be needed
- **Auto-applied**: Based on file patterns defined in frontmatter

#### csharp-ja
- **File**: `csharp-ja.instructions.md`
- **Description**: C# アプリケーション構築指針 by @tsubakimoto
- **Auto-applied**: Based on file patterns defined in frontmatter

#### csharp-ko
- **File**: `csharp-ko.instructions.md`
- **Description**: C# 애플리케이션 개발을 위한 코드 작성 규칙 by @jgkim999
- **Auto-applied**: Based on file patterns defined in frontmatter

#### csharp-mcp-server
- **File**: `csharp-mcp-server.instructions.md`
- **Description**: Instructions for building Model Context Protocol (MCP) servers using the C# SDK
- **Auto-applied**: Based on file patterns defined in frontmatter

#### csharp
- **File**: `csharp.instructions.md`
- **Description**: Guidelines for building C# applications
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dart-n-flutter
- **File**: `dart-n-flutter.instructions.md`
- **Description**: Instructions for writing Dart and Flutter code following the official recommendations.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python-advanced-features
- **File**: `dataverse-python-advanced-features.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python-agentic-workflows
- **File**: `dataverse-python-agentic-workflows.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python-api-reference
- **File**: `dataverse-python-api-reference.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python-authentication-security
- **File**: `dataverse-python-authentication-security.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python-best-practices
- **File**: `dataverse-python-best-practices.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python-error-handling
- **File**: `dataverse-python-error-handling.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python-file-operations
- **File**: `dataverse-python-file-operations.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python-modules
- **File**: `dataverse-python-modules.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python-pandas-integration
- **File**: `dataverse-python-pandas-integration.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python-performance-optimization
- **File**: `dataverse-python-performance-optimization.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python-real-world-usecases
- **File**: `dataverse-python-real-world-usecases.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python-sdk
- **File**: `dataverse-python-sdk.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python-testing-debugging
- **File**: `dataverse-python-testing-debugging.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### dataverse-python
- **File**: `dataverse-python.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### declarative-agents-microsoft365
- **File**: `declarative-agents-microsoft365.instructions.md`
- **Description**: Comprehensive development guidelines for Microsoft 365 Copilot declarative agents with schema v1.5, TypeSpec integration, and Microsoft 365 Agents Toolkit workflows
- **Auto-applied**: Based on file patterns defined in frontmatter

#### devbox-image-definition
- **File**: `devbox-image-definition.instructions.md`
- **Description**: Authoring recommendations for creating YAML based image definition files for use with Microsoft Dev Box Team Customizations
- **Auto-applied**: Based on file patterns defined in frontmatter

#### devops-core-principles
- **File**: `devops-core-principles.instructions.md`
- **Description**: Foundational instructions covering core DevOps principles, culture (CALMS), and key metrics (DORA) to guide GitHub Copilot in understanding and promoting effective software delivery.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### genaiscript
- **File**: `genaiscript.instructions.md`
- **Description**: AI-powered script generation guidelines
- **Auto-applied**: Based on file patterns defined in frontmatter

#### github-actions-ci-cd-best-practices
- **File**: `github-actions-ci-cd-best-practices.instructions.md`
- **Description**: Comprehensive guide for building robust, secure, and efficient CI/CD pipelines using GitHub Actions. Covers workflow structure, jobs, steps, environment variables, secret management, caching, matrix strategies, testing, and deployment strategies.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### instructions
- **File**: `instructions.instructions.md`
- **Description**: Guidelines for creating high-quality custom instruction files for GitHub Copilot
- **Auto-applied**: Based on file patterns defined in frontmatter

#### langchain-python
- **File**: `langchain-python.instructions.md`
- **Description**: Instructions for using LangChain with Python
- **Auto-applied**: Based on file patterns defined in frontmatter

#### markdown
- **File**: `markdown.instructions.md`
- **Description**: Documentation and content creation standards
- **Auto-applied**: Based on file patterns defined in frontmatter

#### memory-bank
- **File**: `memory-bank.instructions.md`
- **Description**: No description available
- **Auto-applied**: Based on file patterns defined in frontmatter

#### prompt
- **File**: `prompt.instructions.md`
- **Description**: Guidelines for creating high-quality prompt files for GitHub Copilot
- **Auto-applied**: Based on file patterns defined in frontmatter

#### shell
- **File**: `shell.instructions.md`
- **Description**: Shell scripting best practices and conventions for bash, sh, zsh, and other shells
- **Auto-applied**: Based on file patterns defined in frontmatter

#### spec-driven-workflow-v1
- **File**: `spec-driven-workflow-v1.instructions.md`
- **Description**: Specification-Driven Workflow v1 provides a structured approach to software development, ensuring that requirements are clearly defined, designs are meticulously planned, and implementations are thoroughly documented and validated.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### taming-copilot
- **File**: `taming-copilot.instructions.md`
- **Description**: Prevent Copilot from wreaking havoc across your codebase, keeping it under control.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### task-implementation
- **File**: `task-implementation.instructions.md`
- **Description**: Instructions for implementing task plans with progressive tracking and change record - Brought to you by microsoft/edge-ai
- **Auto-applied**: Based on file patterns defined in frontmatter

#### tasksync
- **File**: `tasksync.instructions.md`
- **Description**: TaskSync V4 - Allows you to give the agent new instructions or feedback after completing a task using terminal while agent is running.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### update-code-from-shorthand
- **File**: `update-code-from-shorthand.instructions.md`
- **Description**: Shorthand code will be in the file provided from the prompt or raw data in the prompt, and will be used to update the code file when the prompt has the text `UPDATE CODE FROM SHORTHAND`.
- **Auto-applied**: Based on file patterns defined in frontmatter

#### update-docs-on-code-change
- **File**: `update-docs-on-code-change.instructions.md`
- **Description**: Automatically update README.md and documentation files when application code changes require documentation updates
- **Auto-applied**: Based on file patterns defined in frontmatter


---

## Workflows

These resources enable various development workflows:

### 1. Planning and Architecture Workflows
- **Use Agents**: `@planner`, `@arch`, `@api-architect`, `@prd`
- **Use Prompts**: `/breakdown-plan`, `/breakdown-epic-arch`, `/architecture-blueprint-generator`
- **Purpose**: Create technical specifications, architecture diagrams, and implementation plans

### 2. Code Development Workflows
- **Use Agents**: Language-specific experts (e.g., `@CSharpExpert`, `@laravel-expert-agent`)
- **Use Instructions**: Language-specific instructions (e.g., `angular.instructions.md`, `blazor.instructions.md`)
- **Purpose**: Write high-quality, idiomatic code following best practices

### 3. Code Review and Quality Workflows
- **Use Agents**: `@address-comments`, `@janitor`
- **Use Prompts**: `/code-review-checklist`, `/code-quality-audit`
- **Use Instructions**: `code-review-generic.instructions.md`
- **Purpose**: Review code for quality, security, and maintainability

### 4. Testing Workflows
- **Use Agents**: `@playwright-tester`, `@test-specialist`
- **Use Prompts**: `/breakdown-test`, `/generate-unit-tests`
- **Purpose**: Create comprehensive test suites

### 5. Documentation Workflows
- **Use Agents**: `@se-technical-writer`
- **Use Prompts**: `/comment-code-generate-a-tutorial`, `/generate-api-docs`
- **Purpose**: Generate documentation, tutorials, and API references

### 6. Cloud and Infrastructure Workflows
- **Use Agents**: `@azure-principal-architect`, `@azure-iac-generator`, `@terraform-expert`
- **Use Prompts**: `/containerize-aspnetcore`, `/terraform-resource-generator`
- **Use Instructions**: `azure-devops-pipelines.instructions.md`, `terraform.instructions.md`
- **Purpose**: Design and implement cloud infrastructure

### 7. Database Workflows
- **Use Agents**: `@postgresql-dba`, `@mongodb-performance-advisor`, `@neo4j-docker-client-generator`
- **Use Instructions**: `mongodb.instructions.md`, `postgresql.instructions.md`
- **Purpose**: Design schemas, optimize queries, manage databases

### 8. Security and Compliance Workflows
- **Use Agents**: `@se-responsible-ai-code`, `@security-first-coder`
- **Use Prompts**: `/ai-prompt-engineering-safety-review`, `/security-audit`
- **Use Instructions**: `security-best-practices.instructions.md`
- **Purpose**: Ensure security and compliance in code

---

## Usage Recommendations

### For Application Development

1. **Project Initialization**
   - Start with `@planner` to create a project plan
   - Use `/architecture-blueprint-generator` for architecture design
   - Apply relevant instructions for your tech stack

2. **Feature Development**
   - Use `/breakdown-feature-implementation` to plan features
   - Invoke language-specific agents for implementation
   - Follow instructions automatically applied to your files

3. **Code Quality**
   - Use `@janitor` for code cleanup
   - Run `/code-review-checklist` before commits
   - Address feedback with `@address-comments`

4. **Testing**
   - Generate tests with `/generate-unit-tests`
   - Use `@playwright-tester` for E2E tests
   - Follow test-driven development with `@test-specialist`

5. **Documentation**
   - Generate docs with `@se-technical-writer`
   - Create tutorials with `/comment-code-generate-a-tutorial`
   - Keep docs updated alongside code

### Best Practices

1. **Start Broad, Then Specialize**: Begin with general agents like `@planner`, then move to specialized agents
2. **Chain Workflows**: Combine agents and prompts (e.g., plan → implement → test → document)
3. **Context Matters**: Instructions are automatically applied based on file types, providing context-aware assistance
4. **Iterate**: Use agents iteratively to refine outputs
5. **Mix and Match**: Combine different agents, prompts, and instructions for complex tasks

### Project Management Insights

1. **Consistency**: Instructions ensure code consistency across team members
2. **Knowledge Transfer**: Agents codify best practices and domain expertise
3. **Efficiency**: Prompts automate repetitive tasks
4. **Quality**: Built-in code review and testing workflows
5. **Onboarding**: New team members benefit from embedded guidance

---

## Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Awesome Copilot Repository](https://github.com/github/awesome-copilot)
- [VS Code Copilot Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [Customizing GitHub Copilot](https://docs.github.com/en/copilot/customizing-copilot)

---

## Contributing

To add or modify resources:
1. Edit files in `.github/agents/`, `.github/prompts/`, or `.github/instructions/`
2. Follow the naming conventions (`.agent.md`, `.prompt.md`, `.instructions.md`)
3. Include proper YAML frontmatter with name and description
4. Test the resource in VS Code Insiders

---

*Last updated: 2026-01-27*
*Total resources: 237 (Agents: 77, Prompts: 93, Instructions: 67)*
