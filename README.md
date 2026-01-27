# custom_github_copilot_agent_builder

A practical, repo-first framework for designing, organizing, and scaling **custom GitHub Copilot agents**—with consistent guardrails, reusable skills, and tool-enabled autonomy.

This repo is a template + reference implementation for building **optimized Copilot agent teams** using:

- **Repo-wide and path-specific Copilot instructions**
- **Custom Copilot agents** (`*.agent.md`) including **specialist teammates** and **sub-agents**
- **Copilot prompt files** (`*.prompt.md`) as versioned “skills”
- **GitHub Models prompts** (`*.prompt.yml`) for prompt assets, eval-ready workflows, and org-scale reuse
- **MCP server plans** (`mcp.md`) for tool access (RAG, memory, search, ticketing, CI, etc.)
- A central **repo profile** (`repo-profile.md`) so agents know how your project actually works
- **Decision logs** (`decision-log.md`) so agent choices remain consistent over time
- **Specs** (`spec.md`) and structured context/memory files (`.context.md`, `.memory.md`) to reduce drift and rework

If you use multiple agent surfaces (VS Code Copilot, Copilot Web UI, Copilot Coding Agent, Codex, Gemini tools, etc.), this repo is meant to be your **single, coherent operating system** for how agents behave and how they’re allowed to act.

---

## Why this exists

Agent setups usually fail for predictable reasons:

- instructions scattered across chat threads
- “skills” living only in someone’s head
- no clear build/test commands for the repo
- too many tools enabled (or none), so agents either break things or hallucinate
- lack of durable memory: decisions and constraints keep getting re-litigated

This framework makes agent behavior:

- **repeatable** (playbooks are stored as files)
- **auditable** (decisions + specs are tracked)
- **safe by design** (tool scoping + governance hooks)
- **portable** across repos and teams

---

## Core concepts

### 1) Context layer (what agents should know)
Use stable, curated files rather than “hope the model remembers”:

- `repo-profile.md` — stack, commands, structure, conventions, gotchas
- `spec.md` — feature or system contract (acceptance criteria + invariants)
- `decision-log.md` — durable architectural decisions and rationale
- `*.context.md` — task or domain context that should persist
- `*.memory.md` — durable “working memory” facts the agent should keep consistent

### 2) Behavior layer (how agents should act)
Use **custom agents** to encode roles and constraints:

- `*.agent.md` — agent definitions (planner, implementer, reviewer, release manager, etc.)
- Specialist teammates: security auditor, refactor bot, docs writer, test writer
- Sub-agents: narrow, dependable helpers the main agent can hand off to

### 3) Skills layer (how work gets done reliably)
Encode repeatable workflows into prompt assets:

- `*.prompt.md` — Copilot prompt files (“skills” invoked on demand)
- `*.prompt.yml` — GitHub Models prompt assets (shareable, eval-ready)

### 4) Tools layer (what the agent can actually do)
Define the tool ecosystem intentionally:

- `mcp.md` — approved MCP servers, capabilities, trust tiers, required secrets
- memory/RAG servers, repo search, ticketing, CI log tools, doc search, etc.

---

## Repository structure

This repo is intended to be copied or used as a template.

```text
custom_github_copilot_agent_builder/
  README.md
  AGENTS.md          # agent “README”; add more in subdirs as needed
  repo-profile.md    # “what this repo is” (stack, commands, gotchas)
  mcp.md              # what MCP servers to use + env/secrets needed
  decision-log.md     # lightweight memory you want agents to respect

  docs/
    specs/
      spec.md      # overall spec/contract for the project
      example-feature.spec.md  # per-feature spec templates

    context/
      project.context.md    # stable reusable context for the overall project
      domain.context.md    # domain-specific context files

    memory/
      repo.memory.md    # durable facts about the repo
      glossary.memory.md  # key terms and definitions
      invariants.memory.md  # rules and patterns to always follow


  .github/
    copilot-instructions.md # repo-wide instructions
    instructions/                   # path-specificinstructions (*.instructions.md)
      backend.instructions.md       # e.g., for /api/, /services/
      frontend.instructions.md      # e.g., for /web/, /apps/
      docs.instructions.md          # e.g., for /docs/, /website/
      

    agents/                        # custom agents (*.agent.md)
      planner.agent.md
      implementer.agent.md
      reviewer.agent.md
      security-auditor.agent.md
      docs-writer.agent.md
      test-writer.agent.md

    prompts/                      # Copilot prompt files (*.prompt.md)
      plan.prompt.md
      implement.prompt.md
      review.prompt.md
      write-tests.prompt.md
      update-docs.prompt.md

  ai/
    prompts/
      release-notes.prompt.yml
      spec-compliance.prompt.yml
      regression-risk.prompt.yml
````

### What each file does (quick map)

* **`AGENTS.md`**
  Your “agent README.” Put the rules that matter most (build commands, review checklist, boundaries, conventions). Add more `AGENTS.md` files in subfolders if needed.

* **`repo-profile.md`**
  The repo’s operating manual: tech stack, dependencies, architecture overview, run/test/build commands, formatting, env setup, PR expectations.

* **`mcp.md`**
  Your MCP “capability registry.” Define servers, skills, auth, secrets, and *what’s allowed*. Use trust tiers.

* **`decision-log.md`**
  Keeps the agent aligned over time. If a decision is made once, write it down and stop re-arguing it.

* **`.github/copilot-instructions.md`**
  Repo-wide instructions Copilot can automatically apply.

* **`.github/instructions/*.instructions.md`**
  Path-specific instructions (frontend vs backend vs infra vs docs).

* **`.github/agents/*.agent.md`**
  Your team roster. Specialist agents + sub-agents with clear constraints.

* **`.github/prompts/*.prompt.md`**
  Your “skills library.” Repeatable workflows you can invoke.

* **`ai/prompts/*.prompt.yml`**
  GitHub Models prompt assets—useful for evaluations, standardized prompt reuse, and workflows where GitHub Models are part of the loop.

* **`docs/specs/spec.md`**
  Your contracts: what “correct” means.

* **`docs/context/*.context.md`**
  Stable, reusable context for domains, modules, or initiatives.

* **`docs/memory/*.memory.md`**
  Durable facts: glossary, invariants, preferred patterns, “never do X” rules.

---

## Recommended agent team patterns

This repo encourages a few high-reliability team topologies:

### Pattern A: Plan → Implement → Review (default)

* **Planner** (read-only): decomposes tasks, writes acceptance criteria, identifies risks
* **Implementer** (write): makes changes, runs tests, updates docs/specs
* **Reviewer** (read-only): checks diffs against checklists, flags risk, suggests improvements

### Pattern B: Specialist swarm (bigger changes)

* Security auditor reviews auth, data handling, deps
* Test writer adds regression tests
* Docs writer updates docs & examples
* Release agent drafts notes and prepares a clean PR description

### Pattern C: “Sub-agent” decomposition

Main agent hands narrow tasks to sub-agents:

* “Write tests for X”
* “Update docs for Y”
* “Check spec compliance”
* “Search prior decisions and summarize constraints”

---

## MCP strategy (don’t skip this)

Tools make agents real—but also dangerous if unmanaged.

`mcp.md` should define:

* allowed MCP servers per repo
* tool allowlists per agent (minimum necessary)
* secrets and how they’re injected
* trust tiers (A/B/C) and when human approval is required

Examples of MCP categories you can standardize:

* **Memory tools** (durable notes, structured memory storage)
* **RAG/doc search** (internal docs, codebase search, knowledge bases)
* **CI/Actions tools** (fetch logs, summarize failures, rerun workflows)
* **Ticketing/project tools** (GitHub Issues, Jira, Linear)
* **Release tools** (changelog generation, versioning, tagging guidance)



Here’s a clean way to think about **how this repo gets used** and a concrete **plan** for it—assuming the core promise is:

> “Given another repo (or many repos), generate and maintain a high-quality Copilot/AgentOps framework inside that repo by writing the right files, safely and repeatably.”

---

## How the repo will be used (the operational model)

### Primary use case: “AgentOps bootstrapper + maintainer”

You point `custom_github_copilot_agent_builder` at a target repo and it:

1. **Reads the repo** (structure, stack, scripts, conventions, docs)

2. **Builds a repo profile** (`repo-profile.md`) and a minimal “truth set”

3. **Generates a standard agent framework**:

   * `.github/copilot-instructions.md`
   * `.github/instructions/*.instructions.md` (path-specific)
   * `.github/agents/*.agent.md` (planner/implementer/reviewer + specialists)
   * `.github/prompts/*.prompt.md` (skills)
   * `ai/prompts/*.prompt.yml` (GitHub Models prompt assets)
   * `docs/agentops/mcp.md` (approved MCP servers + tiers + secrets)
   * `docs/agentops/decision-log.md`
   * `docs/specs/*.md`
   * `docs/context/*.context.md`
   * `docs/memory/*.memory.md`

4. **Writes those files as a PR** (default), not a direct push

5. Later, you re-run it to **update/regenerate** as the repo evolves

### Secondary use cases

* **Template repo**: fork/copy it and use the structure manually.
* **Org-wide standardizer**: run it across many repos to enforce consistency (via GitHub Actions or a GitHub App).
* **“Bring your own LLM”**: choose OpenAI/Codex, Gemini, Copilot chat outputs, or local models as the “summarizer + writer” layer, while keeping the same deterministic file structure.

---

## The plan (what you’ll build, in order)

### Phase 1 — MVP: Local CLI that generates a patch (fastest path)

Deliver a CLI that works on local clones:

**Commands**

* `cgcab scan <path>` → produces `repo-signals.json` (detected stack, scripts, paths)
* `cgcab generate <path>` → outputs the full framework into a staging dir
* `cgcab diff <path>` → shows what would change
* `cgcab apply <path>` → writes files locally (or outputs a git patch)
* `cgcab pr --repo owner/name` → opens a PR using GitHub API/token

**Why this first:** it proves the core generation logic before you add automation surfaces.

### Phase 2 — GitHub Action: run inside any repo, open PR automatically

Add `action.yml` so target repos can do:

* `workflow_dispatch` → “bootstrap agent framework”
* `schedule` → “refresh repo profile + prompts monthly”
* “label/comment trigger” → e.g., `/agentops refresh`

The action runs the generator, commits changes on a branch, opens/updates a PR.

### Phase 3 — GitHub App: org-scale control plane (optional but powerful)

A GitHub App can:

* listen to `repo created`, `push`, `pull_request`, `issues_comment`
* run “agent framework refresh” when major changes happen
* enforce policies (required files, guardrails, approved MCP servers)
* create check runs with “Approve regeneration / tighten permissions” buttons

### Phase 4 — MCP-native integration (nice-to-have)

Expose the generator itself as an MCP server (or provide an MCP tool wrapper) so agent surfaces can call:

* `analyze_repo(repo_url)`
* `propose_agentops_patch()`
* `open_pr_with_patch()`

This makes the framework “callable” from Copilot agent mode / Codex / other MCP-enabled surfaces *without* baking repo write logic into each surface.

---

## “It should be able to write files based on other repos” (how that works)

You want **two distinct subsystems**:

### A) Repo ingestion (read)

Support multiple ways to read a target repo:

1. **Local path** (fastest, no permissions complexity)
2. **Git clone via HTTPS/SSH** (for private repos with tokens/keys)
3. **GitHub API fetch** (for smaller repos / selective file reads)

During ingestion, collect “signals”:

* language + framework hints (package.json, pyproject.toml, go.mod, Cargo.toml, etc.)
* test runners + scripts
* lint/format configs
* folder structure (src/, apps/, packages/, services/, infra/)
* existing docs/specs/conventions

### B) Patch application (write)

Writing should be **safe and reviewable**:

**Default behavior: PR-only**

* create a new branch
* write/update the framework files
* open a PR with a clear checklist and “what changed” summary

**Idempotent regeneration**

* mark generated regions/files with headers like:

  * `<!-- GENERATED by custom_github_copilot_agent_builder -->`
* avoid overwriting hand-edited sections by using:

  * merge rules, or
  * “managed blocks” inside files

**Three overwrite modes**

* `--safe` (only create missing files)
* `--update` (regenerate known managed blocks)
* `--force` (full overwrite; rarely used)

---

## What “effective framework” means in practice (your outputs)

Each target repo ends up with:

### 1) A single source of truth

* `docs/agentops/repo-profile.md`
  “How to build/test/run, what matters, conventions, risky zones.”

### 2) A team roster (custom agents)

* `.github/agents/`

  * planner (read-only)
  * implementer (write + run tests)
  * reviewer (diff + checklist)
  * specialists (security, docs, tests, refactor)

### 3) A skills library (prompt files)

* `.github/prompts/`

  * plan / implement / review
  * write tests
  * update docs
  * triage issue → PR
  * debug CI failure

### 4) Tool governance

* `docs/agentops/mcp.md`

  * approved MCP servers
  * trust tiers (A read-only / B write / C dangerous)
  * required secrets + naming conventions
  * per-agent allowlists

### 5) Durable memory + specs

* `docs/agentops/decision-log.md`
* `docs/specs/spec.md` (and per-feature specs)
* `docs/context/*.context.md`
* `docs/memory/*.memory.md`

---

## Recommended “north star” workflow across your repos

1. Run builder → open PR adding the framework
2. Merge once you’re happy
3. From then on, changes come via:

   * periodic refresh PRs (monthly or on major stack changes)
   * human-authored decisions/specs that the agents inherit
   * incremental MCP additions with tiered permissions

---

## If you want the fastest next step

The best MVP is: **Local CLI + PR writer**.

If you tell me what language you want the repo built in (**TypeScript/Node** vs **Python**), I’ll sketch the exact folder structure + module breakdown (scanner → policy engine → template renderer → applier) and the first 5 commands you’ll implement.



---

## Getting started

### Option 1: Use this as a template

1. Create a new repo from this template (or copy the structure).
2. Fill out:

   * `repo-profile.md`
   * `.github/copilot-instructions.md`
   * `mcp.md`
3. Keep the starter agents/prompts, then customize roles based on your repo.

### Option 2: Add it to an existing repo

1. Add `AGENTS.md` and `repo-profile.md` first.
2. Add `.github/copilot-instructions.md` and any path instructions.
3. Add 3 agents: `planner`, `implementer`, `reviewer`.
4. Add 5 prompts: `plan`, `implement`, `review`, `write-tests`, `update-docs`.
5. Add `decision-log.md`, then start writing decisions as you go.

---

## Design principles

* **Version everything**: prompts, instructions, decisions, and specs should be in git.
* **Small tool surface area**: enable only what’s needed, and prefer read-only until proven safe.
* **Specs before code**: update the contract first, then implement against it.
* **Write down decisions**: stop paying the “context tax” repeatedly.
* **Make autonomy observable**: PR templates + checklists + CI gates keep behavior predictable.

---

## What success looks like

When this framework is in place, you should see:

* fewer “agent rewrites”
* fewer inconsistent implementations across files/modules
* faster onboarding (humans and agents)
* better PR quality and clearer rationale
* higher confidence in agent autonomy because checks and boundaries are explicit

---

## Contributing

PRs are welcome—especially:

* additional agent archetypes (`*.agent.md`)
* prompt skills (`*.prompt.md`)
* example MCP server profiles in `mcp.md`
* spec templates and checklists
* repo-profile templates for common stacks (Python, TS/Node, Next.js, Rust, etc.)

---

## License

Choose what fits your goals (MIT/Apache-2.0 are common for templates).

---

## 🎁 Awesome Copilot Resources Integration

This project now includes **448 resources** from the [github/awesome-copilot](https://github.com/github/awesome-copilot) repository to supercharge your development workflow!

### 📦 What's Included

- **137 Prompts** - Task-specific commands for common development operations
- **163 Instructions** - Language and framework-specific guidance
- **148 Agents** - Specialized AI assistants for various domains

### 🚀 Quick Start

1. **Open this project in VS Code Insiders**
2. Resources are automatically loaded from `.github/` folders
3. **Open Copilot Chat** and start using:
   - Type `/` to see available prompts
   - Type `@` to see available agents
   - Instructions apply automatically based on file type

### 📚 Documentation

**Start Here:** [INDEX.md](./INDEX.md) - Complete navigation guide

**Key Documents:**
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Fast lookup for common resources
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Practical examples and workflows
- [AWESOME_COPILOT_RESOURCES.md](./AWESOME_COPILOT_RESOURCES.md) - Comprehensive guide
- [RESOURCE_CATALOG.md](./RESOURCE_CATALOG.md) - Complete resource listing

### 💡 Quick Examples

```bash
# Planning
@planner Create implementation plan for user authentication

# Architecture
/architecture-blueprint-generator

# Code Generation
@code-generator Generate REST API endpoints

# Testing (TDD Workflow)
@tdd-red Write failing test for login
@tdd-green Implement passing code
@tdd-refactor Improve code structure

# Code Review
@code-review Review my pull request

# Documentation
@se-technical-writer Document the API

# Cloud Infrastructure
@azure-principal-architect Design Azure architecture
@terraform-azure-implement Generate Terraform code

# Database Optimization
@postgresql-dba Optimize database queries
@mongodb-performance-advisor Improve MongoDB performance
```

### 🎯 Workflows Enabled

✅ Full-stack application development  
✅ Cloud infrastructure deployment  
✅ Database development & optimization  
✅ AI/MCP server development  
✅ Mobile app development  
✅ Test-driven development (TDD)  
✅ Documentation automation  
✅ Code review & quality assurance  
✅ Performance optimization  
✅ Security scanning & compliance  

### 🔍 Finding Resources

Use discovery prompts in Copilot Chat:
```
/suggest-awesome-github-copilot-prompts
/suggest-awesome-github-copilot-agents
/suggest-awesome-github-copilot-instructions
```

### 📖 Coverage

- **30+ Programming Languages** (Python, TypeScript, C#, Java, Go, Rust, etc.)
- **40+ Frameworks** (React, Angular, Vue, Spring Boot, FastAPI, etc.)
- **10+ Cloud Platforms** (Azure, AWS, GCP, Kubernetes, Terraform, etc.)
- **20+ Database Systems** (PostgreSQL, MongoDB, Elasticsearch, etc.)
- **50+ Tools & Utilities** (Docker, Playwright, Jest, GitHub Actions, etc.)

### 🎓 Learning Path

1. **Read** [INDEX.md](./INDEX.md) (5 min)
2. **Skim** [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) (10 min)
3. **Try** a workflow from [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) (30 min)
4. **Explore** your tech stack in [RESOURCE_CATALOG.md](./RESOURCE_CATALOG.md)
5. **Practice** building with multi-agent workflows

### 🔗 Resources

- **Awesome Copilot Repository:** https://github.com/github/awesome-copilot
- **VS Code Copilot Docs:** https://code.visualstudio.com/docs/copilot
- **GitHub Copilot Docs:** https://docs.github.com/copilot

---

**All resources copied as-is from awesome-copilot without modification.**  
**Ready to use immediately in VS Code Insiders!** 🚀

