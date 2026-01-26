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

  AGENTS.md
  repo-profile.md
  mcp.md
  decision-log.md

  docs/
    specs/
      spec.md
      example-feature.spec.md

    context/
      project.context.md
      domain.context.md

    memory/
      repo.memory.md
      glossary.memory.md

  .github/
    copilot-instructions.md
    instructions/
      backend.instructions.md
      frontend.instructions.md
      docs.instructions.md

    agents/
      planner.agent.md
      implementer.agent.md
      reviewer.agent.md
      security-auditor.agent.md
      docs-writer.agent.md
      test-writer.agent.md

    prompts/
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
