# Repository Analysis: custom_github_copilot_agent_builder

## Overview

The **custom_github_copilot_agent_builder** is an intelligent framework for designing, organizing, and scaling custom GitHub Copilot agents with consistent guardrails, reusable skills, and tool-enabled autonomy.

Rather than a static template, this repository is a **practical operating system** for how teams manage AI agents across multiple surfaces (VS Code Copilot, Copilot Web UI, Copilot Coding Agent, etc.). It provides the AgentOps Pack Applier—a sophisticated pipeline that analyzes target repositories and generates tailored AI configurations automatically.

**Core Value Proposition**: Transform scattered agent instructions and ad-hoc skills into repeatable, auditable, portable frameworks that scale across teams and repositories.

---

## Architecture

The system is built on a **Sense-Plan-Act pipeline** that ensures deterministic, safe, and context-aware generation of Copilot environments:

### Layer 1: Context Layer
Stable, curated files that agents rely on for decision-making:
- **repo-profile.md** — Stack, commands, structure, conventions, gotchas
- **spec.md** — Feature/system contracts with acceptance criteria
- **decision-log.md** — Durable architectural decisions and rationale
- **context.md files** — Task or domain context that should persist
- **memory.md files** — Working memory facts agents maintain

### Layer 2: Behavior Layer
Custom agents (53 definitions) that encode roles and constraints:
- Planner, Implementer, Reviewer, Release Manager agents
- Specialists: Security auditor, refactor bot, docs writer, test writer
- Sub-agents: Narrow, dependable helpers

### Layer 3: Skills Layer
Reusable workflows encoded as prompt assets:
- `*.prompt.md` — Copilot prompt files ("skills")
- `*.prompt.yml` — GitHub Models prompts
- `mcp.md` — Tool access plans for RAG, memory, search, ticketing, CI/CD

---

## Key Components

### Core Engine (TypeScript/Node.js)
- **Sense** (`sense/snapshot.ts`) — Analyzes target repo structure, frameworks, existing AI config
- **Plan** (`plan/planner.ts`) — LLM-based decision engine for component selection
- **Pack** (`pack/`) — Template expansion with specialist agent refinement
- **Apply** (`apply/`) — File application with managed blocks (safe human/AI mixing)
- **PR Module** (`pr/`) — GitHub PR creation with human-readable descriptions
- **Config** (`config/`) — Schema validation and config merging

### 53 Custom Agent Definitions
**Infrastructure**: context7, architect, principal-software-engineer, devops-expert  
**Development**: expert-nextjs-developer, clean-code, api-architect, test-writer  
**Meta**: meta-agentic-project-scaffold, specification, implementation-plan  
**Quality**: security-reviewer, performance-analyzer, janitor

### Instructions & Guardrails
Repository-wide and path-specific Copilot instructions covering:
- Code review standards, performance optimization
- Development methodology (spec-driven workflow)
- Language/framework specific guidance (Python, Node.js, Java, .NET)
- Tool-specific best practices (GitHub Actions, Docker, etc.)

### Memory Bank
Persistent organizational context:
- projectbrief.md — Project goals and scope
- productContext.md — Problem/solution positioning
- systemPatterns.md — Architecture and technical decisions
- techContext.md — Technology stack
- activeContext.md — Current work focus
- progress.md — Development status
- tasks/ — Task tracking and management

---

## Technologies Used

**Core Runtime**:
- TypeScript 5.6+, Node.js, CommonJS

**Key Dependencies**:
- @actions/core (1.11.1) — GitHub Actions framework
- @actions/github (8.0.0) — GitHub API integration
- openai (6.16.0) — LLM agent processing
- js-yaml (4.1.0) — YAML config parsing

**Development Tools**:
- Vitest (1.6.0) — Unit testing
- TypeScript — Language and type checking
- Zod — Runtime schema validation

---

## Data Flow

**User Request → PR**:
1. User adds workflow call to target repo
2. Workflow triggers AgentOps Pack Applier
3. Sense: Analyze target repo structure
4. Plan: Decision agent selects components
5. Pack: Generate file bundle with templates
6. Apply: Create managed-block compatible files
7. Result: PR with generated configs opens automatically

**Guarantees**:
- Idempotence: Same input → same output
- Safety: Managed blocks prevent overwriting human edits
- Consistency: Schemas enforce format correctness

---

## Team and Ownership

- **Charles I Niswander II** (69 commits, 68%)
  - Core architecture designer
  - Sense-Plan-Act pipeline implementer
  - Managed blocks sophistication
  - Primary decision-maker

- **copilot-swe-agent[bot]** (9 commits, 9%)
  - Agent definitions and documentation
  - PR updates and refinements

---

## Development Methodology

- **Spec-Driven**: Features defined via spec.md before implementation
- **Agent-Assisted**: Custom agents guide development decisions
- **Memory-Centric**: Context stored in persistent memory-bank/
- **Test-First**: Comprehensive test suite validates each layer
- **Safe by Design**: Managed blocks enable non-destructive "refresh" ops

---

## Deployment & Usage

**As GitHub Action**:
```yaml
- uses: dhar174/custom_github_copilot_agent_builder@main
  with:
    apply: true
    components: instructions,agents,prompts
```

**Local Development**:
```bash
npm install
npm run build
npm run test
```

