# 001‑agentops‑pack‑applier: Agentic Copilot/AgentOps Framework Generator

## Overview

This specification defines the first intent for the custom\_github\_copilot\_agent\_builder project.  
The goal of this intent is to produce a **repository‑specific Copilot/AgentOps framework** for any target repository.  
Instead of blindly copying a static template, the system uses its own agent definitions and prompt skills (stored inside this builder repository) to **analyze a target repository**, decide what it needs, generate the appropriate Markdown/YAML files and open a pull request on the target repository.  
The framework includes:

* Repo‑wide and path‑specific Copilot instruction files (.github/copilot‑instructions.md, .github/instructions/\*.instructions.md).

* Custom agents (.github/agents/\*.agent.md), including planner, implementer, reviewer and specialist roles.

* Prompt files for Copilot chat (.github/prompts/\*.prompt.md) and GitHub Models (\*.prompt.yml).

* Governance files such as docs/agentops/repo‑profile.md, docs/agentops/mcp.md, docs/agentops/decision‑log.md.

* Context and memory files (\*.context.md, \*.memory.md) and spec templates (specs/\*.md).

* Managed‑block markers to allow safe updates without overwriting human edits.

This intent exposes a **reusable GitHub Actions workflow** that can be called by any repository via workflow\_call.  
Under the hood, the workflow performs a deterministic scan of the repository, runs agentic analysis and generation stages, verifies the results and creates a pull request.  
All outputs are human‑readable Markdown or YAML files.

## Functional Requirements

### FR‑0: Workflow invocation & orchestration

* **FR‑0.1** Provide a reusable workflow at .github/workflows/apply.yml triggered via workflow\_call (for consumption by other repositories) and workflow\_dispatch (for manual runs).

* **FR‑0.2** Workflow runs on the GitHub‐hosted ubuntu-latest runner and does not require Docker‑in‑Docker for the MVP.

### FR‑1: Deterministic repo snapshot (sensing)

* **FR‑1.1** Generate a RepoSnapshot JSON describing the target repository without calling any LLMs. The snapshot must include:

* Directory tree (limited depth) and top‑level folders.

* Signals from key build/config files (e.g. package.json, pyproject.toml, go.mod) to infer languages and frameworks.

* Existing AI configuration files if present, such as .github/copilot‑instructions.md, .github/instructions/\*.instructions.md, .github/agents/\*.agent.md, \*.prompt.md, and \*.prompt.yml.

* Existing documentation and spec conventions (e.g. docs/, specs/).

* Hints about risk (e.g. presence of monorepo structure, likely protected branches).

* **FR‑1.2** Snapshot creation must be deterministic: re‑running it on an unchanged repository produces identical JSON.

### FR‑2: Agentic planning

* **FR‑2.1** Store canonical agent definitions under .github/agents/ in the builder repo (planner, implementer, reviewer, security, docs, tester, etc.). These definitions include YAML frontmatter and text describing responsibilities.

* **FR‑2.2** Use the builder’s **Planner agent** and planning prompts to produce a structured PlanManifest from the RepoSnapshot. The manifest must describe:

* Inferred repo profile (purpose, stack, commands).

* Selected template packs (base and stack‑specific).

* Files to create or update, including reasons and any apply/exclude globs.

* Managed‑block policy (marker strings and block markers).

* Acceptance criteria (e.g. idempotence, no overwrites outside managed sections).

* Questions or assumptions for maintainers.

* **FR‑2.3** PlanManifest must be serialized as machine‑readable JSON to drive downstream steps.

### FR‑3: Agentic generation

* **FR‑3.1** Based on PlanManifest, produce a FileBundle of mostly Markdown and YAML files. For each file:

* Apply deterministic templates (from templates/ packs) and substitute placeholders (e.g. repo name, default branch).

* When refinement is allowed, run the builder’s specialist agents (docs, tester, etc.) via LLM calls to tailor content (such as customizing repo‑profile.md or context files). Output formats must remain consistent.

* Write managed markers (e.g. \<\!-- agentops‑managed: true \--\> or block markers) at the top of each generated file.

* Files include: AGENTS.md, .github/copilot‑instructions.md, .github/instructions/\*.instructions.md, .github/agents/\*.agent.md, .github/prompts/\*.prompt.md, \*.prompt.yml, docs/agentops/repo‑profile.md, docs/agentops/mcp.md, docs/agentops/decision‑log.md, specs/\*.md, .context.md, .memory.md.

* **FR‑3.2** Support a “pack \+ refine” flow: apply templates first, then optionally use LLM prompts to refine specific sections (e.g. drafting repo profile, customizing instruction sections) under controlled boundaries.

### FR‑4: Instruction files correctness (Copilot)

* **FR‑4.1** Write path‑specific instructions under .github/instructions/ with the .instructions.md suffix. Each file must include YAML frontmatter with at least an applyTo glob. Use excludeAgent for agent‑specific exclusions when needed.

* **FR‑4.2** Provide a single .github/copilot‑instructions.md for repo‑wide guidance and ensure it is updated or created according to the plan.

### FR‑5: Custom agent files correctness

* **FR‑5.1** Create or update custom agent profile files in .github/agents/ using .agent.md extension. Each profile must include required frontmatter fields (description and tools) and descriptive content following our agent archetypes.

* **FR‑5.2** Track versioning implicitly via git history; do not embed version numbers in the profile.

### FR‑6: Prompt files correctness

* **FR‑6.1** Ensure every Copilot prompt file (.prompt.md) contains YAML frontmatter with at least a description field, followed by the body of the prompt.

* **FR‑6.2** GitHub Models prompts must be stored as .prompt.yml or .prompt.yaml and may live anywhere in the repository; each must declare name, description, model, modelParameters, messages and optional testData and evaluators as per GitHub Models conventions.

### FR‑7: Idempotent application modes

* **FR‑7.1** Support three modes when writing files:

* **safe** – only create missing files; do not update existing ones.

* **refresh** – update only files or sections marked as managed; leave human‑edited content intact.

* **overwrite** – replace managed files entirely; rarely used.

* **FR‑7.2** Outputs must not introduce spurious diffs: timestamps or ordering changes should only be present in isolated metadata blocks that can be excluded from comparisons.

### FR‑8: Managed‑block protocol

* **FR‑8.1** Insert a sentinel marker (e.g. \<\!-- agentops‑managed: true \--\>) at the top of each generated file to signal managed files.

* **FR‑8.2** For files mixing human and generated content, support block markers (\<\!-- BEGIN: agentops‑managed \--\> … \<\!-- END: agentops‑managed \--\>) to delineate editable versus managed regions.

* **FR‑8.3** In refresh mode, update only managed blocks and preserve surrounding human edits.

### FR‑9: Verification and linting

* **FR‑9.1** Before creating a PR, run schema and lint checks to ensure that:

* YAML frontmatter in instructions, prompts and agent files is parseable and contains required fields.

* All files exist in their expected directories and with correct naming conventions.

* There are no unresolved merge conflicts or obvious secrets.

* **FR‑9.2** Run the builder’s **Reviewer agent** on the proposed changes to ensure acceptance criteria are met (idempotence, correctness, security hygiene), and produce a VerificationReport JSON capturing pass/fail status and any notes.

### FR‑10: Pull request creation

* **FR‑10.1** By default, all changes must be delivered via a pull request. The workflow must not push directly to the default branch.

* **FR‑10.2** Use a branch name convention (e.g. agentops/apply-pack) and customizable PR title and body. The PR body must include:

* A summary of the repository signals detected.

* A list of generated or updated files with brief justifications.

* Any questions or assumptions from the PlanManifest.

* **FR‑10.3** Expose outputs such as changed, changed\_files, and verification\_passed as workflow outputs.

### FR‑11: MCP strategy and governance

* **FR‑11.1** Generate or update docs/agentops/mcp.md documenting recommended MCP servers, trust tiers, and how to supply secrets.  
  Baseline: GitHub MCP server for source control and GitHub operations; optional RAG, memory, database, and workflow tools. Emphasize least privilege and read‑only by default.

* **FR‑11.2** Document interactions with organization/enterprise MCP registries and allowlists in the PR body and in mcp.md as applicable.

## Non‑Functional Requirements

### NFR‑1: Safety and least privilege

The workflow must explicitly declare only the permissions it needs (contents: write, pull‑requests: write) and avoid printing secrets. Generated files must never contain tokens or environment variables.

### NFR‑2: Idempotence

Re‑running the workflow on an unchanged repository with the same templates and inputs must yield zero diff (or only update metadata blocks by design). Idempotence is a core acceptance criterion.

### NFR‑3: PR quality and auditability

Pull requests must be readable and auditable. Use clear commit messages, concise PR bodies, and include a checklist. Decisions affecting long‑term architecture or policy must be logged in decision‑log.md.

### NFR‑4: Performance

Generate and open/update a PR on a typical repository within **10 minutes**, with a goal of 5 minutes for the base pack. Long‑running LLM calls should be minimized.

### NFR‑5: Reliability

If agentic generation fails or times out, fall back to applying deterministic templates and open a PR requesting human follow‑up; never fail silently.

### NFR‑6: Maintainability

Template packs and agent definitions must be versioned via git tags or branches. The generator must be driven by configurable templates rather than hardcoded text.

## Acceptance Criteria

1. **Idempotence verified** – Running the workflow twice on the same revision without changes results in no new diffs (except in designated metadata blocks). A lint job must fail if diffs appear unexpectedly.

2. **Correct file creation** – For a representative sample repository (with multiple languages and existing AI configs), the workflow generates all required files in their correct locations and with proper markers and frontmatter.

3. **Managed‑block safety** – When a file with mixed human and managed content exists, re‑running the workflow updates only the marked managed section, leaving human edits untouched.

4. **Verification passes** – All generated files pass YAML frontmatter linting, required fields presence, and the Reviewer agent reports no must‑fix issues.

5. **PR creation** – The workflow opens or updates a pull request on the target repository with a clear title, body, and summary. The PR passes any preconfigured branch protection checks (e.g. CI and lints).

6. **MCP documentation** – mcp.md lists at least a GitHub MCP server and describes categories (read‑only vs write) and secrets injection. It references org‑level MCP governance where relevant.

7. **Human override** – Maintainers can answer questions posed by the PlanManifest in the PR comments or by editing template files; subsequent refreshes incorporate these answers.

## Milestones

### Milestone 1 – Repository scaffold and deterministic sensing

* Create the directory structure (templates/, specs/, docs/agentops/ etc.) and populate it with the base template pack (Markdown/YAML files with placeholders and managed markers).

* Implement the snapshot script to collect RepoSnapshot data from the target repository deterministically.

* Provide a basic CLI entry point (or action step) to produce the snapshot and print it for debugging.

### Milestone 2 – Reusable workflow and template application

* Build the composite action (action.yml) and reusable workflow (apply.yml) that consume RepoSnapshot, apply the base template pack with placeholder substitution, and open a PR. Support safe, refresh, and overwrite modes.

* Validate generated files for correct locations, markers and frontmatter. Skip the agentic planning and refinement stages for now (deterministic only).

### Milestone 3 – Agentic planning and generation

* Add the builder’s agent definitions and planning prompts. Implement the Planner agent call (via chosen LLM provider) to produce PlanManifest from RepoSnapshot.

* Extend the workflow to read the PlanManifest and decide which template files to create or update.

* Implement the refine stage using specialist agents (Docs, Tester, etc.) to tailor the repo profile, instructions, and context/memory files.

### Milestone 4 – Verification and reviewer stage

* Add linting logic for YAML frontmatter, required fields and naming conventions.

* Implement the Reviewer agent call to verify acceptance criteria (idempotence, security, maintainability) and produce a VerificationReport.

* Ensure that PR creation only proceeds if the verification passes or includes minor “should fix” issues; block PR creation on must‑fix issues.

### Milestone 5 – MCP governance and advanced features

* Flesh out mcp.md generation: include recommended servers and trust tiers, instructions for adding secrets, and note interactions with enterprise MCP registries.

* Document how to integrate with organization policies (e.g. MCP allowlists, branch protections) and optionally add checks to enforce them.

* Add support for profile and mcp\_preset inputs to choose stack‑specific packs and MCP configurations.

### Milestone 6 – Documentation and examples

* Provide comprehensive documentation in README.md for calling the workflow from other repositories (example invocation). Explain modes, inputs and expected outputs.

* Include a sample target repository (e.g. examples/target\_repo) and demonstrate applying the builder to it in CI.

* Describe how to add new template packs (e.g. language‑specific variations) and how maintainers can customize the generated files.

---

After these milestones, the system should reliably analyze a repository, generate a tailored Copilot/AgentOps framework, and propose it via a pull request while adhering to strict governance and quality standards.

---

