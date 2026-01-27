<!-- agentops-managed: true -->
# AGENTS.md - Custom GitHub Copilot Agent Builder

**Last Updated**: 2026-01-27

## Table of Contents

1. [Project Overview](#project-overview)
2. [Development Workflow](#development-workflow)
3. [Testing Instructions](#testing-instructions)
4. [Code Style](#code-style)
5. [Build and Deployment](#build-and-deployment)
6. [Project-Specific Patterns](#project-specific-patterns)
7. [Pull Request Guidelines](#pull-request-guidelines)
8. [Security and Governance](#security-and-governance)
9. [Common Workflows](#common-workflows)
10. [Troubleshooting](#troubleshooting)
11. [Additional Context](#additional-context)

---

## Project Overview

### What This Project Is

**This is NOT a static template copier.** This is an **intelligent AgentOps framework generator** that analyzes target repositories and generates customized Copilot/AgentOps frameworks tailored to each repository's specific needs.

The `custom_github_copilot_agent_builder` is designed to be a **repository-specific Copilot/AgentOps framework generator**. Instead of blindly copying static templates, it:

1. **Analyzes target repositories** deterministically
2. **Decides what the repository needs** using agentic planning
3. **Generates appropriate files** (Markdown/YAML) with managed-block markers
4. **Opens pull requests** with the generated framework
5. **Maintains frameworks** through idempotent regeneration

### Core Purpose

Generate and maintain high-quality, repo-specific Copilot/AgentOps frameworks that include:

- **Repo-wide instructions**: `.github/copilot-instructions.md`
- **Path-specific instructions**: `.github/instructions/*.instructions.md`
- **Custom agents**: `.github/agents/*.agent.md` (planner, implementer, reviewer, specialists)
- **Prompt files**: `.github/prompts/*.prompt.md` (Copilot chat skills)
- **GitHub Models prompts**: `*.prompt.yml` (eval-ready workflows)
- **Governance files**: `docs/agentops/repo-profile.md`, `docs/agentops/mcp.md`, `docs/agentops/decision-log.md`
- **Context and memory**: `*.context.md`, `*.memory.md`
- **Spec templates**: `docs/specs/*.md`

### Modular Architecture

The codebase is organized into focused modules:

```
src/
├── sense/       # Phase 1: Deterministic repo scanning (RepoSnapshot generation)
├── plan/        # Phase 2: Agentic planning (PlanManifest creation via LLM)
├── pack/        # Phase 3: Template application + refinement
├── apply/       # Phase 3: File writing with managed-block protocol
├── pr/          # Phase 5: Pull request creation and summary
├── permissions/ # Permission handling and validation
├── config/      # Configuration schema and merging
└── index.ts     # Main entry point and orchestration
```

### Technology Stack

- **Language**: TypeScript/JavaScript
- **Runtime**: Node.js (CommonJS modules)
- **Build Tool**: TypeScript Compiler (`tsc`)
- **Testing**: Vitest
- **Key Dependencies**:
  - `@actions/core`, `@actions/github` - GitHub Actions integration
  - `openai` - LLM integration for agentic stages
  - `js-yaml` - YAML frontmatter parsing
  - `fs-extra` - File system operations

### Design Philosophy

This framework follows these core principles:

1. **Deterministic Sensing**: Repo scanning must produce identical output for identical input (FR-1.2, NFR-2)
2. **Agentic Planning**: Use LLMs to decide what's needed, not blindly apply templates (FR-2)
3. **Managed Regeneration**: Support safe updates without overwriting human edits (FR-8)
4. **Safety First**: Least privilege permissions, no secrets in generated files (NFR-1)
5. **Auditability**: Clear PR descriptions, decision logs, verification reports (NFR-3)


---

## Development Workflow

### System Phases

The system operates through five distinct phases:

#### Phase 1: Sensing (Deterministic) - FR-1

**Purpose**: Generate a `RepoSnapshot` JSON describing the target repository without LLM calls.

**Implementation**: `src/sense/`

**Key Activities**:
- Scan directory tree (limited depth)
- Detect languages, frameworks, package managers from config files
- Identify existing AI configuration files
- Detect documentation and spec conventions
- Assess repository risk factors (monorepo, protected branches)

**Output**: `RepoSnapshot` JSON (see [RepoSnapshot Schema](#reposnapshot-schema))

**Critical Requirement**: Must be **deterministic** - running twice on the same repo produces identical JSON (FR-1.2)

#### Phase 2: Planning (Agentic) - FR-2

**Purpose**: Use the builder's Planner agent to produce a structured `PlanManifest` from the `RepoSnapshot`.

**Implementation**: `src/plan/`

**Key Activities**:
- Analyze repo signals and infer purpose/stack
- Select appropriate template packs (base + stack-specific)
- Decide which files to create/update with justifications
- Define managed-block policy
- Generate acceptance criteria
- Identify questions/assumptions for maintainers

**Input**: `RepoSnapshot` JSON
**Output**: `PlanManifest` JSON (see [PlanManifest Schema](#planmanifest-schema))

**Agent Used**: `.github/agents/planner.agent.md` in this builder repo

#### Phase 3: Generation - FR-3

**Purpose**: Produce a `FileBundle` of Markdown and YAML files based on the `PlanManifest`.

**Implementation**: `src/pack/` (templates) and `src/apply/` (writing)

**Key Activities**:
- Apply deterministic templates with placeholder substitution
- Run specialist agents for content refinement (optional)
- Insert managed markers (file-level and block-level)
- Ensure consistent formatting and structure

**Agents Used**: 
- Docs writer (for repo-profile customization)
- Test writer (for test strategy)
- Security auditor (for MCP recommendations)

**Output**: Files ready for commit with managed markers

#### Phase 4: Verification - FR-9

**Purpose**: Validate generated files before creating a PR.

**Implementation**: `src/apply/` (validation logic)

**Key Activities**:
- Parse and validate YAML frontmatter
- Check required fields presence
- Verify file naming conventions
- Detect merge conflicts or secrets
- Run Reviewer agent to check acceptance criteria

**Agent Used**: `.github/agents/reviewer.agent.md` in this builder repo

**Output**: `VerificationReport` JSON (pass/fail + notes)

#### Phase 5: PR Creation - FR-10

**Purpose**: Deliver changes via pull request (never direct push to default branch).

**Implementation**: `src/pr/`

**Key Activities**:
- Create feature branch (e.g., `agentops/apply-pack`)
- Commit generated files
- Generate PR title and body with summary
- Include detected signals, file list, questions/assumptions
- Open or update pull request

**Output**: Pull request URL and workflow outputs

### Directory Structure

```
custom_github_copilot_agent_builder/
├── .github/
│   ├── workflows/
│   │   ├── apply-pack.yml           # Reusable workflow (workflow_call + workflow_dispatch)
│   │   ├── pack-staging.yml         # Staging environment workflow
│   │   └── pack-prod.yml            # Production environment workflow
│   ├── agents/                      # Canonical agent definitions (builder's own agents)
│   │   ├── planner.agent.md
│   │   ├── implementer.agent.md
│   │   ├── reviewer.agent.md
│   │   └── *.agent.md
│   ├── prompts/                     # Prompt templates for builder agents
│   └── instructions/                # Instructions for this builder repo
├── docs/
│   ├── specs/
│   │   └── agent_builder_first_intent.md  # Full specification (FR-0 through FR-11)
│   ├── context/                     # Context files
│   └── memory/                      # Memory files
├── src/
│   ├── sense/                       # Phase 1: Deterministic scanning
│   │   ├── snapshot.ts
│   │   └── types.ts                 # RepoSnapshot interface
│   ├── plan/                        # Phase 2: Agentic planning
│   │   ├── planner.ts
│   │   └── types.ts                 # PlanManifest interface
│   ├── pack/                        # Phase 3: Template management
│   │   ├── source.ts
│   │   ├── manifest.ts
│   │   └── *.test.ts
│   ├── apply/                       # Phase 3: File writing with managed blocks
│   │   ├── engine.ts
│   │   ├── managed-sections.ts
│   │   └── *.test.ts
│   ├── pr/                          # Phase 5: PR creation
│   │   ├── summary.ts
│   │   ├── stability.ts
│   │   └── *.test.ts
│   ├── permissions/                 # Permission validation
│   ├── config/                      # Configuration handling
│   │   ├── schema.ts
│   │   ├── merge.ts
│   │   └── *.test.ts
│   └── index.ts                     # Main orchestration
├── templates/                       # Template packs (base, language-specific)
├── AGENTS.md                        # This file
├── README.md                        # High-level overview
├── repo-profile.md                  # Builder repo's own profile
├── mcp.md                           # MCP server documentation
├── decision-log.md                  # Architectural decisions
├── package.json                     # Node.js dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── vitest.config.ts                 # Test configuration
```

### Key Files and Their Purposes

| File | Purpose | Phase |
|------|---------|-------|
| `src/sense/snapshot.ts` | Generate deterministic RepoSnapshot | 1 |
| `src/plan/planner.ts` | Call LLM to produce PlanManifest | 2 |
| `src/pack/source.ts` | Load and apply template packs | 3 |
| `src/apply/engine.ts` | Write files with managed-block protocol | 3 |
| `src/apply/managed-sections.ts` | Parse and update managed blocks | 3 |
| `src/pr/summary.ts` | Generate PR descriptions | 5 |
| `src/permissions/` | Validate and enforce permission profiles | All |
| `docs/specs/agent_builder_first_intent.md` | Complete specification (all FRs/NFRs) | - |

### Starting Development

1. **Clone and setup**:
```bash
git clone https://github.com/dhar174/custom_github_copilot_agent_builder.git
cd custom_github_copilot_agent_builder
npm install
```

2. **Build the TypeScript**:
```bash
npm run build
```

3. **Run tests**:
```bash
npm test
```

4. **Key commands**:
```json
{
  "build": "tsc -p tsconfig.json",
  "test": "vitest run"
}
```

5. **Before making changes**:
   - Review `docs/specs/agent_builder_first_intent.md` for requirements
   - Check `decision-log.md` for architectural context
   - Read `repo-profile.md` to understand the repo structure


---

## Testing Instructions

### Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm test -- --watch

# Run specific test file
npm test -- src/pack/manifest.test.ts

# Run tests with coverage
npm test -- --coverage
```

### Critical Test Areas

Testing must focus on these key acceptance criteria:

#### 1. Idempotence Testing (AC-1, NFR-2)

**Requirement**: Running the workflow twice on the same revision without changes must result in no new diffs (except in designated metadata blocks).

**Test Strategy**:
```typescript
// Example pattern from src/apply/engine.test.ts
test('applies template idempotently', async () => {
  const result1 = await applyTemplate(snapshot, manifest);
  const result2 = await applyTemplate(snapshot, manifest);
  expect(result1).toEqual(result2); // Must be byte-for-byte identical
});
```

**What to test**:
- Snapshot generation produces identical JSON on repeated runs
- Template application produces identical output
- Managed-block updates don't introduce spurious changes
- Timestamp/metadata blocks are isolated and excludable from diffs

#### 2. Deterministic Sensing Verification (FR-1.2)

**Requirement**: RepoSnapshot creation must be deterministic.

**Test Strategy**:
```typescript
// Example from src/sense/snapshot.ts tests
test('generates identical snapshot for same repo state', async () => {
  const snapshot1 = await generateSnapshot(repoPath);
  const snapshot2 = await generateSnapshot(repoPath);
  expect(snapshot1).toEqual(snapshot2);
});
```

**What to test**:
- Directory tree traversal is consistent
- File detection order is deterministic
- Signal extraction doesn't depend on timestamps
- No LLM calls in sensing phase

#### 3. Managed-Block Safety (AC-3, FR-8)

**Requirement**: When a file with mixed human and managed content exists, re-running must update only marked managed sections.

**Test Strategy**:
```typescript
// Example from src/apply/managed-sections.test.ts
test('preserves human edits outside managed blocks', async () => {
  const original = `
<!-- BEGIN: agentops-managed -->
Generated content v1
<!-- END: agentops-managed -->
Human-written content here
`;
  const updated = updateManagedSections(original, 'Generated content v2');
  expect(updated).toContain('Human-written content here'); // Preserved
  expect(updated).toContain('Generated content v2'); // Updated
  expect(updated).not.toContain('Generated content v1'); // Replaced
});
```

**What to test**:
- Block markers are correctly parsed
- Content outside markers is preserved
- Content inside markers is replaced
- Nested blocks are handled correctly
- Missing end markers are detected

#### 4. File Creation Correctness (AC-2, FR-4, FR-5, FR-6)

**Requirement**: For a representative sample repository, the workflow must generate all required files in correct locations with proper markers and frontmatter.

**Test Strategy**:
```typescript
test('creates instruction file with correct frontmatter', async () => {
  const file = await generateInstructionFile(manifest);
  const parsed = parseYamlFrontmatter(file.content);
  
  expect(file.path).toMatch(/\.instructions\.md$/);
  expect(parsed.frontmatter).toHaveProperty('applyTo');
  expect(parsed.frontmatter).toHaveProperty('description');
  expect(file.content).toContain('<!-- agentops-managed: true -->');
});
```

**What to test**:
- File paths match conventions (.agent.md, .instructions.md, .prompt.md)
- YAML frontmatter is valid and contains required fields
- Managed markers are present
- File structure matches templates

#### 5. YAML Frontmatter Validation (AC-4, FR-9.1)

**Requirement**: All generated files must pass YAML frontmatter linting.

**Test Strategy**:
```typescript
test('validates agent file frontmatter', () => {
  const agentFile = `---
description: 'Test agent'
tools: ['read', 'search']
---
# Agent content`;
  
  const validation = validateAgentFrontmatter(agentFile);
  expect(validation.valid).toBe(true);
  expect(validation.errors).toHaveLength(0);
});
```

**What to test**:
- YAML is parseable
- Required fields are present (description, applyTo, tools, etc.)
- Field types are correct
- Enum values are valid

### Acceptance Criteria Testing

When implementing features, test against these acceptance criteria from the specification:

| AC | Description | Test Location |
|----|-------------|---------------|
| AC-1 | Idempotence verified | `src/apply/engine.test.ts`, `src/sense/snapshot.test.ts` |
| AC-2 | Correct file creation | `src/pack/manifest.test.ts`, `src/apply/engine.test.ts` |
| AC-3 | Managed-block safety | `src/apply/managed-sections.test.ts` |
| AC-4 | Verification passes | `src/config/schema.test.ts` |
| AC-5 | PR creation | `src/pr/summary.test.ts` |
| AC-6 | MCP documentation | Template tests |
| AC-7 | Human override | Integration tests |

### Mock Strategy

For deterministic tests, mock these external dependencies:

```typescript
// Mock LLM calls
vi.mock('openai', () => ({
  OpenAI: vi.fn(() => ({
    chat: {
      completions: {
        create: vi.fn(() => Promise.resolve({ 
          choices: [{ message: { content: 'mocked response' } }] 
        }))
      }
    }
  }))
}));

// Mock file system for isolation
vi.mock('fs-extra', () => ({
  readFile: vi.fn(),
  writeFile: vi.fn(),
  ensureDir: vi.fn()
}));

// Mock GitHub API calls
vi.mock('@actions/github', () => ({
  getOctokit: vi.fn(() => ({
    rest: {
      pulls: { create: vi.fn() }
    }
  }))
}));
```

### Test Naming Convention

Follow this pattern for test names:

```typescript
describe('ModuleName', () => {
  describe('functionName', () => {
    test('should do expected behavior when condition', () => {
      // Test implementation
    });
    
    test('should throw error when invalid input', () => {
      // Error case
    });
    
    test('should handle edge case correctly', () => {
      // Edge case
    });
  });
});
```


---

## Code Style

### TypeScript Configuration

**tsconfig.json** key settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",           // CommonJS for Node.js compatibility
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,                 // Enable all strict type checks
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### Key Type Definitions

#### RepoSnapshot (src/sense/types.ts)

```typescript
export interface RepoSnapshot {
  repoName: string;
  defaultBranch: string;
  structure: DirectoryNode[];
  signals: RepoSignals;
  aiConfig: ExistingAiConfig;
  conventions: ExistingConventions;
}

export interface DirectoryNode {
  name: string;
  type: 'file' | 'directory';
  children?: DirectoryNode[]; // Limited depth
}

export interface RepoSignals {
  languages: string[];
  frameworks: string[];
  packageManagers: string[];
  buildTools: string[];
  isMonorepo: boolean;
  hasTestFolder: boolean;
  hasDocsFolder: boolean;
}

export interface ExistingAiConfig {
  hasCopilotInstructions: boolean;
  instructionFiles: string[];
  agentFiles: string[];
  promptFiles: string[];
  hasMcpConfig: boolean;
}

export interface ExistingConventions {
  hasSpecs: boolean;
  hasContext: boolean;
  hasMemory: boolean;
  hasDecisionLog: boolean;
}
```

#### PlanManifest (src/plan/types.ts)

```typescript
export interface PlanManifest {
  repoProfile: {
    purpose: string;
    stack: string[];
    commands: Record<string, string>;
  };
  selection: {
    basePack: boolean;
    stackPacks: string[];
    components: string[];
  };
  files: PlanFileAction[];
  managedPolicy: {
    marker: string;
    blockStart: string;
    blockEnd: string;
  };
  acceptanceCriteria: string[];
  questions: string[];
}

export interface PlanFileAction {
  path: string;
  action: 'create' | 'update' | 'delete' | 'ignore';
  reason: string;
  templateId?: string;
  refinementPrompt?: string; // If needing refinement
}
```

#### FileBundle

```typescript
export interface FileBundle {
  files: GeneratedFile[];
  metadata: {
    timestamp: string;
    packVersion: string;
    components: string[];
  };
}

export interface GeneratedFile {
  path: string;
  content: string;
  managed: boolean;
  mode?: number; // Unix file permissions
}
```

#### VerificationReport

```typescript
export interface VerificationReport {
  passed: boolean;
  files: FileValidation[];
  acceptanceCriteria: CriterionResult[];
  mustFixIssues: Issue[];
  shouldFixIssues: Issue[];
  notes: string[];
}

export interface FileValidation {
  path: string;
  valid: boolean;
  errors: ValidationError[];
}

export interface CriterionResult {
  criterion: string;
  passed: boolean;
  evidence: string;
}

export interface Issue {
  severity: 'must-fix' | 'should-fix';
  file: string;
  message: string;
  line?: number;
}
```

### Naming Conventions

#### Agent Files (.agent.md)

- Location: `.github/agents/`
- Pattern: `{role}.agent.md`
- Examples: `planner.agent.md`, `implementer.agent.md`, `reviewer.agent.md`, `security-auditor.agent.md`

**Required frontmatter**:
```yaml
---
description: 'Clear description of agent purpose'
tools: ['read', 'search', 'edit']  # Minimal necessary tools
---
```

#### Prompt Files (.prompt.md)

- Location: `.github/prompts/`
- Pattern: `{action}.prompt.md`
- Examples: `plan.prompt.md`, `implement.prompt.md`, `review.prompt.md`

**Required frontmatter**:
```yaml
---
description: 'Brief description of what this prompt does'
name: 'Display Name'
---
```

#### Instruction Files (.instructions.md)

- Location: `.github/instructions/`
- Pattern: `{scope}.instructions.md`
- Examples: `backend.instructions.md`, `frontend.instructions.md`, `typescript.instructions.md`

**Required frontmatter**:
```yaml
---
description: 'Instructions for specific files or paths'
applyTo: '**/*.ts'  # Glob pattern
---
```

#### GitHub Models Prompts (.prompt.yml)

- Location: `ai/prompts/` or any location
- Pattern: `{purpose}.prompt.yml`
- Examples: `release-notes.prompt.yml`, `spec-compliance.prompt.yml`

**Required structure**:
```yaml
name: prompt-name
description: Clear description
model: gpt-4
modelParameters:
  temperature: 0.0
  maxTokens: 1000
messages:
  - role: system
    content: System prompt
  - role: user
    content: User prompt with {{variables}}
```

### Code Formatting

- **Indentation**: 2 spaces (TypeScript, YAML, JSON)
- **Line Length**: Aim for 100 characters, hard limit 120
- **Quotes**: Single quotes for strings (TypeScript)
- **Semicolons**: Required (TypeScript)
- **Trailing Commas**: Yes (for multi-line objects/arrays)

### Import Organization

```typescript
// 1. External dependencies
import { readFile } from 'fs-extra';
import * as yaml from 'js-yaml';

// 2. GitHub Actions
import * as core from '@actions/core';
import * as github from '@actions/github';

// 3. Internal modules (relative imports)
import { RepoSnapshot } from './types';
import { generateSnapshot } from './snapshot';

// 4. Type-only imports
import type { PlanManifest } from '../plan/types';
```

### Error Handling

```typescript
// Use explicit error types
class SnapshotError extends Error {
  constructor(message: string, public cause?: Error) {
    super(message);
    this.name = 'SnapshotError';
  }
}

// Provide context in error messages
throw new SnapshotError(
  `Failed to scan repository at ${repoPath}: ${error.message}`,
  error
);

// Handle errors at appropriate boundaries
try {
  const snapshot = await generateSnapshot(repoPath);
} catch (error) {
  if (error instanceof SnapshotError) {
    core.setFailed(`Snapshot generation failed: ${error.message}`);
  } else {
    throw error; // Re-throw unexpected errors
  }
}
```

### Documentation Comments

Use JSDoc for public APIs:

```typescript
/**
 * Generates a deterministic snapshot of a repository.
 * 
 * @param repoPath - Absolute path to the repository root
 * @param options - Optional configuration for snapshot generation
 * @returns A RepoSnapshot object describing the repository
 * @throws {SnapshotError} If the repository cannot be scanned
 * 
 * @remarks
 * This function must be deterministic: running it twice on the same
 * repository state produces identical output (FR-1.2, NFR-2).
 */
export async function generateSnapshot(
  repoPath: string,
  options?: SnapshotOptions
): Promise<RepoSnapshot> {
  // Implementation
}
```


---

## Build and Deployment

### Reusable Workflow

The core deployment mechanism is `.github/workflows/apply-pack.yml`, a reusable GitHub Actions workflow that can be called by any target repository.

**Workflow Definition**:

```yaml
# .github/workflows/apply-pack.yml
name: Apply AgentOps Pack

on:
  workflow_call:
    inputs:
      repo:
        description: 'Target repository (owner/name)'
        required: true
        type: string
      mode:
        description: 'Application mode: safe, refresh, or overwrite'
        required: false
        default: 'safe'
        type: string
      pack_version:
        description: 'Pack version or git ref'
        required: false
        type: string
      pack_components:
        description: 'Comma-separated component list'
        required: false
        type: string
    secrets:
      GITHUB_TOKEN:
        required: true
      OPENAI_API_KEY:
        required: true

  workflow_dispatch:
    inputs:
      repo:
        description: 'Target repository (owner/name)'
        required: true
      # ... same inputs as workflow_call
```

### Example: Invoking from Target Repository

A target repository can invoke this workflow like this:

```yaml
# target-repo/.github/workflows/apply-agentops.yml
name: Apply AgentOps Framework

on:
  workflow_dispatch:
  schedule:
    - cron: '0 0 1 * *'  # Monthly refresh

jobs:
  apply:
    uses: dhar174/custom_github_copilot_agent_builder/.github/workflows/apply-pack.yml@main
    with:
      repo: ${{ github.repository }}
      mode: 'refresh'  # Only update managed sections
      pack_components: 'base,typescript,testing'
    secrets:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

### Three Application Modes (FR-7)

#### Mode 1: `safe` (Default)

**Behavior**: Only create missing files; never update existing ones.

**Use Case**: Initial framework application to avoid overwriting any existing content.

**Example**:
```bash
# Via workflow input
mode: 'safe'
```

**What happens**:
- Files that don't exist → Created with managed markers
- Files that exist → Skipped entirely
- No updates to existing content

#### Mode 2: `refresh` (Recommended)

**Behavior**: Update only files or sections marked as managed; preserve human edits.

**Use Case**: Regular maintenance and updates to the framework.

**Example**:
```bash
mode: 'refresh'
```

**What happens**:
- Files with `<!-- agentops-managed: true -->` marker → Fully regenerated
- Files with block markers → Only managed blocks updated, human sections preserved
- Files without markers → Skipped

#### Mode 3: `overwrite`

**Behavior**: Replace managed files entirely; use with caution.

**Use Case**: Major framework updates or correcting drift.

**Example**:
```bash
mode: 'overwrite'
```

**What happens**:
- All managed files → Completely replaced
- **WARNING**: Can lose human edits if markers are incorrect
- Should be used rarely and with review

### Environment Configuration

Required secrets and environment variables:

#### For Builder Repository (CI/CD)

```bash
# GitHub Personal Access Token or App token
# Needs: contents: write, pull-requests: write
GITHUB_TOKEN=ghp_xxx or ghs_xxx

# OpenAI API key for agentic stages (planning, refinement)
OPENAI_API_KEY=sk-xxx
```

#### For Target Repositories

```bash
# Standard GitHub Actions token (sufficient for most cases)
GITHUB_TOKEN=${{ secrets.GITHUB_TOKEN }}

# OpenAI API key (from repository secrets)
OPENAI_API_KEY=${{ secrets.OPENAI_API_KEY }}

# Optional: Custom token for cross-repo operations
OVERRIDE_TOKEN=${{ secrets.CUSTOM_PAT }}
```

### Workflow Outputs

The `apply-pack.yml` workflow exposes these outputs:

```yaml
outputs:
  changed:
    description: 'Whether any files were changed'
    value: ${{ jobs.apply-pack.outputs.changed }}
  changed_files:
    description: 'JSON array of changed file paths'
    value: ${{ jobs.apply-pack.outputs.changed_files }}
  verification_passed:
    description: 'Whether verification checks passed'
    value: ${{ jobs.apply-pack.outputs.verification_passed }}
  pr_url:
    description: 'URL of created or updated pull request'
    value: ${{ jobs.apply-pack.outputs.pr_url }}
```

### Local Development and Testing

For local testing without GitHub Actions:

```bash
# 1. Build the TypeScript
npm run build

# 2. Set environment variables
export GITHUB_TOKEN=your_token
export OPENAI_API_KEY=your_key

# 3. Run the CLI (if implemented)
node dist/index.js scan /path/to/repo
node dist/index.js generate /path/to/repo
node dist/index.js apply /path/to/repo --mode safe
```

### Performance Targets (NFR-4)

- **Target**: Generate and open a PR within **10 minutes**
- **Goal**: Achieve **5 minutes** for base pack application
- **Measurement**: End-to-end from workflow trigger to PR creation

**Optimization strategies**:
- Minimize LLM calls (use deterministic templates where possible)
- Parallelize file generation
- Cache template packs
- Optimize RepoSnapshot scanning (depth limits, file filtering)


---

## Project-Specific Patterns

### Managed-Block Protocol (FR-8)

The managed-block protocol enables safe, idempotent updates without overwriting human edits.

#### File-Level Markers

Place at the top of fully-managed files:

```markdown
<!-- agentops-managed: true -->
# File Title

Rest of content...
```

**Behavior by mode**:
- `safe`: File is created if it doesn't exist
- `refresh`: File is fully regenerated
- `overwrite`: File is fully regenerated

#### Block-Level Markers

For files with mixed human and generated content:

```markdown
# Human-edited introduction

Human content here...

<!-- BEGIN: agentops-managed -->
## Generated Section

This content is managed and will be updated automatically.
<!-- END: agentops-managed -->

More human content...

<!-- BEGIN: agentops-managed -->
## Another Generated Section

More managed content.
<!-- END: agentops-managed -->

Final human notes...
```

**Behavior by mode**:
- `safe`: Blocks are created if they don't exist
- `refresh`: Only content between `BEGIN` and `END` markers is updated
- `overwrite`: Entire file is regenerated (human content lost - use carefully)

#### Parsing Rules

1. **Markers must be exact**: Whitespace and capitalization matter
2. **Nested blocks**: Not supported - use top-level blocks only
3. **Missing end marker**: Treated as error, file is skipped
4. **Multiple blocks**: Supported - each is updated independently

#### Implementation Example

```typescript
// From src/apply/managed-sections.ts
export function updateManagedBlock(
  original: string,
  newContent: string,
  blockId?: string
): string {
  const beginMarker = '<!-- BEGIN: agentops-managed -->';
  const endMarker = '<!-- END: agentops-managed -->';
  
  const regex = new RegExp(
    `${escapeRegex(beginMarker)}[\\s\\S]*?${escapeRegex(endMarker)}`,
    'g'
  );
  
  return original.replace(
    regex,
    `${beginMarker}\n${newContent}\n${endMarker}`
  );
}
```

### Agent Definition Pattern

**Location**: `.github/agents/`
**Extension**: `.agent.md`

**Standard Structure**:

```markdown
---
description: 'Brief, specific description of agent purpose and when to use it'
tools: ['read', 'search']  # Minimal necessary tools (principle of least privilege)
model: 'gpt-4'  # Optional: specify model for complex agents
---

# Agent Name

## Purpose

[Clear statement of what this agent does]

## When to Use

- Scenario 1
- Scenario 2
- Scenario 3

## Constraints

- Must do X
- Must not do Y
- Always check Z before proceeding

## Workflow

1. Step 1
2. Step 2
3. Step 3

## Output Format

[Expected output structure]
```

### Prompt Template Pattern

**Location**: `.github/prompts/`
**Extension**: `.prompt.md`

**Standard Structure**:

```markdown
---
description: 'What this prompt accomplishes'
name: 'Display Name for UI'
tools: ['read', 'edit']  # If agent-mode prompt
---

# Prompt Title

## Context

[Background information the agent needs]

## Task

[Specific, actionable instructions]

## Requirements

- Requirement 1
- Requirement 2

## Output

[Expected deliverables]
```

### RepoSnapshot Schema

Complete interface for repository analysis output:

```typescript
interface RepoSnapshot {
  // Basic metadata
  repoName: string;              // e.g., "owner/repo"
  defaultBranch: string;         // e.g., "main" or "master"
  
  // Directory structure (limited depth)
  structure: DirectoryNode[];
  
  // Detected signals
  signals: {
    languages: string[];         // e.g., ["TypeScript", "Python"]
    frameworks: string[];        // e.g., ["React", "Next.js", "FastAPI"]
    packageManagers: string[];   // e.g., ["npm", "pip"]
    buildTools: string[];        // e.g., ["webpack", "vite", "tsc"]
    isMonorepo: boolean;
    hasTestFolder: boolean;
    hasDocsFolder: boolean;
  };
  
  // Existing AI configuration
  aiConfig: {
    hasCopilotInstructions: boolean;
    instructionFiles: string[];    // Paths to .instructions.md files
    agentFiles: string[];          // Paths to .agent.md files
    promptFiles: string[];         // Paths to .prompt.md files
    hasMcpConfig: boolean;
  };
  
  // Documentation conventions
  conventions: {
    hasSpecs: boolean;             // docs/specs/ exists
    hasContext: boolean;           // .context.md files exist
    hasMemory: boolean;            // .memory.md files exist
    hasDecisionLog: boolean;       // decision-log.md exists
  };
}
```

### PlanManifest Schema

Complete interface for agentic planning output:

```typescript
interface PlanManifest {
  // Inferred repository profile
  repoProfile: {
    purpose: string;                    // e.g., "Web API for task management"
    stack: string[];                    // e.g., ["Node.js", "TypeScript", "PostgreSQL"]
    commands: Record<string, string>;   // e.g., {"build": "npm run build", "test": "npm test"}
  };
  
  // Selected template packs and components
  selection: {
    basePack: boolean;                  // Always true for MVP
    stackPacks: string[];               // e.g., ["typescript", "nodejs", "react"]
    components: string[];               // e.g., ["testing", "docs", "security"]
  };
  
  // Planned file actions
  files: PlanFileAction[];
  
  // Managed-block configuration
  managedPolicy: {
    marker: string;                     // e.g., "<!-- agentops-managed: true -->"
    blockStart: string;                 // e.g., "<!-- BEGIN: agentops-managed -->"
    blockEnd: string;                   // e.g., "<!-- END: agentops-managed -->"
  };
  
  // Acceptance criteria for verification
  acceptanceCriteria: string[];         // e.g., ["All .agent.md files have valid frontmatter"]
  
  // Questions for maintainers
  questions: string[];                  // e.g., ["Should we include integration tests?"]
}

interface PlanFileAction {
  path: string;                         // Relative path from repo root
  action: 'create' | 'update' | 'delete' | 'ignore';
  reason: string;                       // Why this action is needed
  templateId?: string;                  // Which template to use (if any)
  refinementPrompt?: string;            // LLM refinement instructions (if any)
}
```

### Context and Memory Files

#### .context.md Usage

**Purpose**: Provide stable, reusable context for specific domains or tasks.

**Location**: Anywhere in the repo (commonly `docs/context/`)

**Structure**:
```markdown
# Context: [Domain/Feature]

## Current State
[Description of the current situation]

## Key Information
[Important facts, constraints, or requirements]

## Related Files
- path/to/file1.ts
- path/to/file2.ts

## Recent Changes
[Brief history if relevant]
```

#### .memory.md Usage

**Purpose**: Store durable facts, patterns, and decisions that agents should remember.

**Location**: Anywhere in the repo (commonly `docs/memory/`)

**Structure**:
```markdown
# Memory: [Topic]

## Learnings
- Lesson 1 learned from experience
- Lesson 2 from testing

## Patterns
- Pattern 1 we consistently use
- Pattern 2 to avoid

## Decisions
- Decision 1: Why we chose X over Y
- Decision 2: Convention we established

## Gotchas
- Common mistake 1 to avoid
- Edge case 2 to watch for
```


---

## Pull Request Guidelines

### Milestone Tracking

When creating PRs for this project, include milestone tracking checkboxes:

#### Milestone 1: Repository Scaffold and Deterministic Sensing
- [ ] Directory structure created (templates/, specs/, docs/agentops/)
- [ ] Base template pack populated with placeholders and markers
- [ ] RepoSnapshot script implemented (`src/sense/`)
- [ ] Snapshot generation is deterministic (tested)
- [ ] CLI entry point for snapshot debugging

#### Milestone 2: Reusable Workflow and Template Application
- [ ] Composite action (action.yml) created
- [ ] Reusable workflow (apply.yml) implemented
- [ ] Safe/refresh/overwrite modes working
- [ ] File generation with correct markers and frontmatter
- [ ] PR creation functional
- [ ] No agentic stages yet (deterministic only)

#### Milestone 3: Agentic Planning and Generation
- [ ] Builder agent definitions added (.github/agents/)
- [ ] Planning prompts created
- [ ] Planner agent call implemented (`src/plan/`)
- [ ] PlanManifest JSON schema validated
- [ ] Refine stage with specialist agents working
- [ ] Repo profile customization functional

#### Milestone 4: Verification and Reviewer Stage
- [ ] YAML frontmatter linting logic added
- [ ] Required fields validation working
- [ ] Naming convention checks implemented
- [ ] Reviewer agent call functional
- [ ] VerificationReport JSON generated
- [ ] PR creation blocked on must-fix issues

#### Milestone 5: MCP Governance and Advanced Features
- [ ] mcp.md generation implemented
- [ ] Recommended servers and trust tiers documented
- [ ] Secrets injection instructions included
- [ ] Organization MCP registry integration noted
- [ ] Profile and mcp_preset inputs supported
- [ ] Stack-specific packs selectable

#### Milestone 6: Documentation and Examples
- [ ] README.md comprehensive with workflow invocation example
- [ ] Modes (safe/refresh/overwrite) documented
- [ ] Inputs and outputs explained
- [ ] Sample target repository created (examples/target_repo)
- [ ] CI demonstration of applying builder
- [ ] Instructions for adding new template packs

### Functional Requirements Addressing

When your PR implements or modifies functionality, reference the relevant requirements:

**FR-0**: Workflow invocation & orchestration
**FR-1**: Deterministic repo snapshot (sensing)
**FR-2**: Agentic planning
**FR-3**: Agentic generation
**FR-4**: Instruction files correctness
**FR-5**: Custom agent files correctness
**FR-6**: Prompt files correctness
**FR-7**: Idempotent application modes
**FR-8**: Managed-block protocol
**FR-9**: Verification and linting
**FR-10**: Pull request creation
**FR-11**: MCP strategy and governance

**Example PR description**:
```markdown
## Changes

This PR implements Phase 2 agentic planning (FR-2).

### Functional Requirements
- FR-2.1: Planner agent definitions added to .github/agents/
- FR-2.2: PlanManifest generation working with correct schema
- FR-2.3: PlanManifest serialized as JSON for downstream use

### Testing
- [x] Planner agent produces valid JSON
- [x] All PlanManifest fields are populated
- [x] Questions array captures assumptions

### Milestone Progress
- [x] Milestone 3: Agentic Planning and Generation - Started
```

### Acceptance Criteria Checklist

Include these in your PR to demonstrate compliance:

- [ ] **AC-1: Idempotence verified** - Tests demonstrate no spurious diffs on re-run
- [ ] **AC-2: Correct file creation** - Files generated in correct locations with proper frontmatter
- [ ] **AC-3: Managed-block safety** - Human edits preserved in refresh mode (tested)
- [ ] **AC-4: Verification passes** - YAML frontmatter valid, Reviewer agent approves
- [ ] **AC-5: PR creation** - PR opens with title, body, and summary
- [ ] **AC-6: MCP documentation** - mcp.md includes GitHub MCP server and trust tiers
- [ ] **AC-7: Human override** - Questions from PlanManifest included in PR

### Review Process

For reviewers checking PRs on this project:

1. **Check milestone progress**: Are checkboxes accurate?
2. **Verify functional requirements**: Are referenced FRs actually addressed?
3. **Run tests**: Do all tests pass, including new ones?
4. **Test idempotence**: Can the feature be run twice with identical results?
5. **Check acceptance criteria**: Are claimed ACs demonstrably met?
6. **Review security**: No secrets, tokens, or credentials in code or generated files?
7. **Validate documentation**: Are README, AGENTS.md, or decision-log.md updated?
8. **Check managed markers**: Are generated files properly marked?

### PR Template

```markdown
## Summary
[Brief description of what this PR does]

## Functional Requirements
- FR-X.Y: [Description]
- FR-X.Z: [Description]

## Milestone Progress
- [ ] Milestone N: [Name] - [Started/In Progress/Completed]

## Acceptance Criteria
- [ ] AC-1: Idempotence verified
- [ ] AC-2: Correct file creation
- [ ] AC-3: Managed-block safety
- [ ] AC-4: Verification passes
- [ ] AC-5: PR creation
- [ ] AC-6: MCP documentation
- [ ] AC-7: Human override

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] Idempotence tested manually
- [ ] New tests added for new functionality

## Breaking Changes
[List any breaking changes or migrations needed]

## Related Issues
- Closes #[issue number]
- Related to #[issue number]
```


---

## Security and Governance

### MCP Trust Tiers (FR-11)

The framework categorizes MCP servers into three trust tiers:

#### Tier A: Read-Only (Safest)

**Characteristics**:
- Read-only access to specific resources
- Cannot modify repository contents
- Cannot execute commands
- Cannot access secrets

**Examples**:
- GitHub MCP server (read operations only)
- Documentation search (RAG)
- Code search and navigation
- Log viewer

**Default**: Always allowed without special approval

#### Tier B: Write Operations (Moderate Risk)

**Characteristics**:
- Can modify repository contents
- Can create PRs, issues, comments
- Can run safe build/test commands
- Requires explicit configuration

**Examples**:
- GitHub MCP server (PR/issue creation)
- CI/CD trigger tools
- Documentation generators
- Test runners

**Requirement**: Must be explicitly listed in `mcp.md` with justification

#### Tier C: Dangerous Operations (High Risk)

**Characteristics**:
- Can execute arbitrary commands
- Can access production systems
- Can deploy code
- Can manage secrets

**Examples**:
- Shell execution servers
- Production deployment tools
- Database management
- Secret managers

**Requirement**: Requires human approval + strict scoping + audit logging

### Permission Handling (src/permissions/)

The `src/permissions/` module enforces permission constraints:

```typescript
// Example permission profile
export interface PermissionProfile {
  name: string;
  description: string;
  requiredScopes: string[];        // GitHub token scopes
  allowedActions: string[];        // Permitted operations
  mcpTiers: ('A' | 'B' | 'C')[];  // Allowed MCP tiers
  requiresApproval: boolean;
}

// Default profile (safe)
export const DEFAULT_PROFILE: PermissionProfile = {
  name: 'default',
  description: 'Safe operations only',
  requiredScopes: ['repo', 'workflow'],
  allowedActions: ['read', 'create-pr', 'comment'],
  mcpTiers: ['A'],                 // Read-only MCP only
  requiresApproval: false
};

// Cross-repo profile (elevated)
export const CROSS_REPO_PROFILE: PermissionProfile = {
  name: 'cross-repo',
  description: 'Cross-repository operations',
  requiredScopes: ['repo', 'workflow', 'write:packages'],
  allowedActions: ['read', 'create-pr', 'comment', 'push-branch'],
  mcpTiers: ['A', 'B'],            // Read-only + write operations
  requiresApproval: true           // Requires manual approval
};
```

### Safe Defaults (NFR-1: Safety and Least Privilege)

**Principle**: All operations default to the safest possible configuration.

**Implementation**:

1. **Workflow permissions**:
```yaml
permissions:
  contents: write      # Minimum for creating branches
  pull-requests: write # Minimum for opening PRs
  # No other permissions granted by default
```

2. **Application mode**: Defaults to `safe` (only create missing files)

3. **MCP access**: Only Tier A (read-only) servers by default

4. **Token scoping**: Use minimal scopes for GitHub tokens

5. **No direct pushes**: Always create PRs, never push to default branch (FR-10.1)

### Idempotent Regeneration (NFR-2)

**Principle**: Re-running the workflow on an unchanged repository must yield zero diff (or only update designated metadata blocks).

**How to achieve**:

1. **Deterministic sensing**: RepoSnapshot generation uses fixed ordering and excludes timestamps
2. **Template application**: Placeholders are substituted deterministically
3. **Managed markers**: Only update content within markers in refresh mode
4. **Metadata isolation**: Timestamps and run IDs are in isolated blocks that can be excluded from diffs

**Testing**:
```typescript
test('idempotence: double application produces no diffs', async () => {
  const snapshot = await generateSnapshot(repoPath);
  const manifest = await generatePlan(snapshot);
  
  const result1 = await applyPack(repoPath, manifest, { mode: 'refresh' });
  const result2 = await applyPack(repoPath, manifest, { mode: 'refresh' });
  
  expect(result1.files).toEqual(result2.files);
  expect(result1.changedFiles).toHaveLength(0); // Second run changes nothing
});
```

### Critical Security Warning

**GENERATED FILES MUST NEVER CONTAIN SECRETS**

- No API keys, tokens, or passwords
- No hardcoded credentials
- No environment variable values
- No connection strings

**Instead**:
- Reference secrets by name (e.g., `${{ secrets.API_KEY }}`)
- Document where secrets should be configured
- Include instructions for secret setup in mcp.md

**Enforcement**:
```typescript
// Verification stage checks
function validateNoSecrets(content: string): ValidationError[] {
  const patterns = [
    /sk-[a-zA-Z0-9]{20,}/,           // OpenAI keys
    /ghp_[a-zA-Z0-9]{36}/,           // GitHub PATs
    /[a-zA-Z0-9]{40}/,               // Generic 40-char tokens
    /-----BEGIN.*PRIVATE KEY-----/   // Private keys
  ];
  
  const errors: ValidationError[] = [];
  for (const pattern of patterns) {
    if (pattern.test(content)) {
      errors.push({
        message: 'Potential secret detected in generated file',
        severity: 'must-fix'
      });
    }
  }
  return errors;
}
```

### Reliability and Failure Handling (NFR-5)

**Principle**: If agentic generation fails, fall back to deterministic templates and request human follow-up.

**Implementation**:

```typescript
async function generateWithFallback(
  snapshot: RepoSnapshot,
  options: GenerateOptions
): Promise<FileBundle> {
  try {
    // Try agentic generation
    const manifest = await agenticPlanning(snapshot, options.llmConfig);
    return await agenticGeneration(manifest, snapshot);
  } catch (error) {
    core.warning(`Agentic generation failed: ${error.message}`);
    core.warning('Falling back to deterministic templates');
    
    // Fallback to deterministic templates
    const fallbackManifest = buildFallbackManifest(snapshot);
    return await deterministicGeneration(fallbackManifest, snapshot);
  }
}
```

**PR behavior on fallback**:
- PR title prefixed with `[FALLBACK]`
- PR body explains the failure
- PR includes a checklist of manual steps needed
- Never fail silently - always open a PR requesting help


---

## Common Workflows

### Workflow 1: Adding a New Functional Requirement

**Scenario**: A new functional requirement needs to be implemented in the spec.

**Steps**:

1. **Update the specification**:
```bash
# Edit docs/specs/agent_builder_first_intent.md
# Add new FR-X section with clear description
```

2. **Document in decision log** (if architectural):
```markdown
## Decision XXX: [Title]
**Date**: YYYY-MM-DD
**Decision**: [What was decided]
**Context**: Implements FR-X
**Consequences**: [Impact]
**Status**: Accepted
```

3. **Create implementation plan**:
```markdown
- [ ] Update type definitions (if needed)
- [ ] Implement core logic in appropriate module
- [ ] Add unit tests (idempotence, correctness)
- [ ] Update AGENTS.md if user-facing
- [ ] Add to PR template as acceptance criterion
```

4. **Implement with tests**:
```typescript
// src/module/feature.ts
export function newFeature() {
  // Implementation
}

// src/module/feature.test.ts
describe('newFeature', () => {
  test('meets FR-X requirements', () => {
    // Test against FR-X
  });
  
  test('maintains idempotence', () => {
    // Test NFR-2
  });
});
```

5. **Create PR**:
```markdown
## Summary
Implements FR-X: [Description]

## Functional Requirements
- FR-X: [New requirement]

## Acceptance Criteria
- [ ] Feature works as specified
- [ ] Tests pass
- [ ] Idempotence maintained
- [ ] Documentation updated
```

### Workflow 2: Creating a New Template Pack

**Scenario**: Add support for a new language or framework (e.g., Python/FastAPI).

**Steps**:

1. **Create template directory**:
```bash
mkdir -p templates/packs/python-fastapi
cd templates/packs/python-fastapi
```

2. **Add template files** with placeholders:
```markdown
<!-- templates/packs/python-fastapi/instructions/python.instructions.md -->
---
description: 'Python-specific coding standards'
applyTo: '**/*.py'
---
<!-- agentops-managed: true -->
# Python Development Standards

## Project: {{repo_name}}

[Template content with {{placeholders}}]
```

3. **Create pack manifest**:
```yaml
# templates/packs/python-fastapi/pack.yml
name: python-fastapi
version: 1.0.0
description: FastAPI web application support
triggers:
  files: ['requirements.txt', 'pyproject.toml']
  patterns: ['fastapi']
files:
  - src: instructions/python.instructions.md
    dest: .github/instructions/python.instructions.md
  - src: agents/python-tester.agent.md
    dest: .github/agents/python-tester.agent.md
```

4. **Add pack to selection logic**:
```typescript
// src/pack/source.ts
export function selectPacks(snapshot: RepoSnapshot): string[] {
  const packs = ['base'];
  
  if (snapshot.signals.languages.includes('Python')) {
    if (snapshot.signals.frameworks.includes('FastAPI')) {
      packs.push('python-fastapi');
    } else {
      packs.push('python');
    }
  }
  
  return packs;
}
```

5. **Test the pack**:
```typescript
test('python-fastapi pack selected for FastAPI repos', () => {
  const snapshot = createMockSnapshot({
    languages: ['Python'],
    frameworks: ['FastAPI']
  });
  
  const packs = selectPacks(snapshot);
  expect(packs).toContain('python-fastapi');
});
```

### Workflow 3: Adding a New Canonical Agent

**Scenario**: Create a new agent definition for the builder repo (e.g., a database specialist).

**Steps**:

1. **Define the agent**:
```bash
# Create .github/agents/database-specialist.agent.md
```

2. **Write agent definition**:
```markdown
---
description: 'Database schema design, migration strategy, and query optimization specialist'
tools: ['read', 'search']
model: 'gpt-4'
---

# Database Specialist

## Purpose
Provide expert guidance on database schema design, migrations, and optimization.

## When to Use
- Designing new database schemas
- Reviewing migration scripts
- Optimizing slow queries
- Planning data model changes

## Constraints
- Always consider backward compatibility
- Document breaking changes clearly
- Suggest rollback strategies
- Check for N+1 query problems

## Workflow
1. Analyze current schema (if exists)
2. Identify data relationships
3. Propose normalized schema
4. Suggest appropriate indexes
5. Document migration path

## Output Format
- Schema diagrams (mermaid ER diagrams)
- Migration checklist
- Performance considerations
```

3. **Add agent to planner logic**:
```typescript
// src/plan/planner.ts
const agentPrompt = `
Available specialist agents:
- docs-writer: Documentation and README updates
- test-writer: Test strategy and test files
- security-auditor: Security review and MCP recommendations
- database-specialist: Schema design and migration planning

For a repository with signals: ${JSON.stringify(snapshot.signals)}
Which specialist agents should refine the framework?
`;
```

4. **Test agent definition**:
```bash
# Manually test with Copilot chat
@database-specialist Help design a schema for user authentication
```

5. **Document in AGENTS.md**:
```markdown
### Database Specialist Agent

**Location**: `.github/agents/database-specialist.agent.md`

**Purpose**: Schema design, migrations, and query optimization

**When to invoke**: For repositories with database frameworks detected
```

### Workflow 4: Testing Idempotence

**Scenario**: Verify that a feature maintains idempotence (NFR-2).

**Steps**:

1. **Set up test repository**:
```bash
# Create a temporary test repo
mkdir -p /tmp/test-repo
cd /tmp/test-repo
git init
echo "# Test" > README.md
echo '{"name":"test","version":"1.0.0"}' > package.json
git add . && git commit -m "Initial commit"
```

2. **Run workflow first time**:
```bash
node dist/index.js apply /tmp/test-repo --mode safe
```

3. **Capture first result**:
```bash
git -C /tmp/test-repo status > /tmp/result1.txt
git -C /tmp/test-repo diff > /tmp/diff1.txt
git -C /tmp/test-repo add .
git -C /tmp/test-repo commit -m "First application"
```

4. **Run workflow second time**:
```bash
node dist/index.js apply /tmp/test-repo --mode refresh
```

5. **Capture second result**:
```bash
git -C /tmp/test-repo status > /tmp/result2.txt
git -C /tmp/test-repo diff > /tmp/diff2.txt
```

6. **Verify idempotence**:
```bash
# Should have no changes on second run (except metadata blocks)
if [ -s /tmp/diff2.txt ]; then
  echo "FAIL: Idempotence violated - unexpected diffs on second run"
  cat /tmp/diff2.txt
  exit 1
else
  echo "PASS: Idempotence verified - no diffs on second run"
fi
```

7. **Automate in test**:
```typescript
test('idempotence: refresh mode produces no diffs on re-run', async () => {
  const testRepo = await createTestRepo();
  
  // First application
  await applyPack(testRepo, { mode: 'refresh' });
  await commitAll(testRepo, 'First application');
  
  // Second application
  const result = await applyPack(testRepo, { mode: 'refresh' });
  
  expect(result.changedFiles).toHaveLength(0);
  expect(result.diff).toBe('');
});
```

### Workflow 5: Developing Against Target Repo

**Scenario**: Test the builder against a real target repository during development.

**Steps**:

1. **Clone target repository**:
```bash
cd /tmp
git clone https://github.com/example/target-repo.git
cd target-repo
```

2. **Run builder locally**:
```bash
cd ~/custom_github_copilot_agent_builder
npm run build

# Generate snapshot
node dist/index.js scan /tmp/target-repo > /tmp/snapshot.json
cat /tmp/snapshot.json | jq .  # Verify snapshot looks correct
```

3. **Test planning phase**:
```bash
# Set OpenAI key
export OPENAI_API_KEY=sk-...

# Generate plan
node dist/index.js plan /tmp/target-repo > /tmp/plan.json
cat /tmp/plan.json | jq .  # Review plan
```

4. **Test generation (dry-run)**:
```bash
node dist/index.js generate /tmp/target-repo --dry-run > /tmp/preview.log
cat /tmp/preview.log  # Review what would be created
```

5. **Apply to target (safe mode)**:
```bash
node dist/index.js apply /tmp/target-repo --mode safe
cd /tmp/target-repo
git status  # See what was created
git diff    # Review changes
```

6. **Review and iterate**:
```bash
# If something is wrong, fix the builder code
cd ~/custom_github_copilot_agent_builder
# Edit src/... files
npm run build

# Reset target repo
cd /tmp/target-repo
git reset --hard HEAD
git clean -fd

# Try again
cd ~/custom_github_copilot_agent_builder
node dist/index.js apply /tmp/target-repo --mode safe
```

7. **Test in GitHub Actions**:
```bash
# Push to a feature branch
cd ~/custom_github_copilot_agent_builder
git checkout -b test/new-feature
git add .
git commit -m "Test new feature"
git push origin test/new-feature

# Manually trigger workflow
# Go to GitHub Actions UI
# Select "Apply AgentOps Pack" workflow
# Click "Run workflow"
# Input: owner/target-repo
# Mode: safe
# Watch logs
```


---

## Troubleshooting

### TypeScript Compilation Errors

**Problem**: `tsc` fails with type errors

**Solutions**:

1. **Check TypeScript version**:
```bash
npx tsc --version  # Should be 5.6.3 or compatible
```

2. **Clean and rebuild**:
```bash
rm -rf dist/
npm run build
```

3. **Check for missing type definitions**:
```bash
# If error mentions missing types for 'some-package'
npm install --save-dev @types/some-package
```

4. **Verify tsconfig.json**:
```bash
# Ensure compilerOptions.strict is true
# Ensure include/exclude are correct
cat tsconfig.json
```

5. **Common issues**:
```typescript
// Issue: implicit 'any' type
// Solution: Add explicit type annotation
function process(data: any) { }  // Bad
function process(data: RepoSnapshot) { }  // Good

// Issue: 'X' is possibly 'undefined'
// Solution: Add null check or use optional chaining
const name = snapshot.repoName;  // May be undefined
const name = snapshot?.repoName ?? 'unknown';  // Safe
```

### Test Failures

**Problem**: `npm test` reports failures

**Solutions**:

1. **Run specific failing test**:
```bash
npm test -- src/pack/manifest.test.ts
# Review error output
```

2. **Check for test isolation issues**:
```typescript
// Each test should clean up after itself
afterEach(() => {
  vi.clearAllMocks();
  // Clean up test files
});
```

3. **Verify mocks are working**:
```typescript
// Check that mocks are actually being called
test('uses mocked function', () => {
  const mockFn = vi.fn();
  // ... test code
  expect(mockFn).toHaveBeenCalledTimes(1);
});
```

4. **Check for async issues**:
```typescript
// Always await async functions in tests
test('async operation', async () => {
  await asyncFunction();  // Don't forget await
  expect(result).toBe(expected);
});
```

5. **Snapshot mismatches**:
```bash
# Update snapshots if changes are intentional
npm test -- --update-snapshots
```

### Missing Dependencies

**Problem**: Import errors or missing modules

**Solutions**:

1. **Install dependencies**:
```bash
npm install
```

2. **Check for version conflicts**:
```bash
npm ls  # Look for UNMET PEER DEPENDENCY warnings
```

3. **Clear cache and reinstall**:
```bash
rm -rf node_modules package-lock.json
npm install
```

4. **Verify package.json**:
```json
{
  "dependencies": {
    "@actions/core": "^1.11.1",
    "@actions/github": "^8.0.0",
    "js-yaml": "^4.1.0",
    "openai": "^6.16.0"
  }
}
```

### Workflow Not Triggering

**Problem**: GitHub Actions workflow doesn't run

**Solutions**:

1. **Check workflow file syntax**:
```bash
# Use yamllint or GitHub Actions validator
cat .github/workflows/apply-pack.yml | yamllint -
```

2. **Verify trigger configuration**:
```yaml
on:
  workflow_dispatch:  # Manual trigger
    inputs:
      repo:
        required: true
  workflow_call:     # Called from other repos
    inputs:
      repo:
        required: true
        type: string
```

3. **Check permissions**:
```yaml
permissions:
  contents: write        # Required for creating branches
  pull-requests: write   # Required for opening PRs
```

4. **Verify branch filters** (if using push/pull_request):
```yaml
on:
  push:
    branches: [main, develop]  # Only these branches
```

5. **Check workflow file location**:
```bash
# Must be in .github/workflows/
ls -la .github/workflows/apply-pack.yml
```

### Managed-Block Updates Not Working

**Problem**: Content within managed blocks isn't being updated in refresh mode

**Solutions**:

1. **Verify markers are exact**:
```markdown
<!-- BEGIN: agentops-managed -->  ✓ Correct
<!-- BEGIN:agentops-managed -->   ✗ Wrong (no space)
<!-- begin: agentops-managed -->  ✗ Wrong (lowercase)
```

2. **Check for missing end markers**:
```bash
# Search for BEGIN markers without matching END
grep -n "BEGIN: agentops-managed" file.md
grep -n "END: agentops-managed" file.md
# Count should match
```

3. **Test marker parsing**:
```typescript
import { updateManagedBlock } from './src/apply/managed-sections';

const content = `
<!-- BEGIN: agentops-managed -->
old content
<!-- END: agentops-managed -->
`;

const updated = updateManagedBlock(content, 'new content');
console.log(updated);  // Should contain 'new content'
```

4. **Verify mode is 'refresh'**:
```bash
# In workflow invocation
mode: 'refresh'  # Not 'safe' or 'overwrite'
```

5. **Check file has managed marker**:
```markdown
<!-- agentops-managed: true -->  # At top of file
```

### Idempotence Test Failures

**Problem**: Running workflow twice produces unexpected diffs

**Solutions**:

1. **Identify source of diff**:
```bash
# Compare first and second run
git diff > /tmp/idempotence-diff.txt
cat /tmp/idempotence-diff.txt
```

2. **Common causes**:
```markdown
# Timestamps in generated content
❌ Generated: 2026-01-27T10:30:00Z
✅ Generated: {{timestamp}} (in isolated metadata block)

# Random ordering
❌ files: [file3, file1, file2]
✅ files: [file1, file2, file3].sort()

# LLM non-determinism
❌ Using temperature > 0 in sensing/template phases
✅ Use temperature=0 or no LLM in deterministic phases
```

3. **Isolate metadata blocks**:
```markdown
<!-- BEGIN: agentops-managed -->
Main content (deterministic)
<!-- END: agentops-managed -->

<!-- BEGIN: agentops-metadata -->
Last updated: {{timestamp}}
Run ID: {{run_id}}
<!-- END: agentops-metadata -->
```

4. **Test with deterministic inputs**:
```typescript
test('deterministic with fixed inputs', () => {
  const snapshot = createFixedSnapshot();  // No random data
  const result1 = generateFiles(snapshot);
  const result2 = generateFiles(snapshot);
  expect(result1).toEqual(result2);
});
```

5. **Check for file system race conditions**:
```typescript
// Await all file operations
await Promise.all(files.map(f => writeFile(f.path, f.content)));
// Not: files.forEach(f => writeFile(f.path, f.content));
```

### PR Creation Fails

**Problem**: Pull request is not created or creation errors out

**Solutions**:

1. **Verify GitHub token**:
```bash
# Check token has correct scopes
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user
# Should return user info

# Check token can access repo
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/owner/repo
```

2. **Check permissions**:
```yaml
permissions:
  contents: write        # Can create branches
  pull-requests: write   # Can open PRs
```

3. **Verify branch doesn't already exist**:
```bash
# If branch exists, workflow may fail
git ls-remote origin agentops/apply-pack
# If output exists, delete the branch first
```

4. **Check for required reviews**:
```bash
# Some repos require review on branch creation
# Check branch protection settings
```

5. **Review PR creation logic**:
```typescript
// Ensure PR API call is correct
await octokit.rest.pulls.create({
  owner,
  repo,
  title: 'Apply AgentOps Pack',
  head: 'agentops/apply-pack',
  base: defaultBranch,
  body: prBody
});
```


---

## Additional Context

### Design Philosophy (from README)

This framework is built on these foundational principles:

1. **Version Everything**: Prompts, instructions, decisions, and specs should be in git
2. **Small Tool Surface Area**: Enable only what's needed; prefer read-only until proven safe
3. **Specs Before Code**: Update the contract first, then implement against it
4. **Write Down Decisions**: Stop paying the "context tax" repeatedly (use decision-log.md)
5. **Make Autonomy Observable**: PR templates + checklists + CI gates keep behavior predictable

### Success Metrics

#### NFR-3: PR Quality and Auditability

**Metrics**:
- PR description completeness: includes summary, file list, questions
- Commit message clarity: follows conventional commits format
- Decision log updated for architectural changes
- Checklist items completed before merge

**What good looks like**:
```markdown
## Summary
Clear 1-2 sentence description

## Files Changed
- .github/agents/planner.agent.md - Added new planning logic
- src/plan/planner.ts - Implemented FR-2.2

## Questions
- Should we include language-specific prompts?
- What MCP servers are allowed in target repos?

## Checklist
- [x] Tests pass
- [x] Idempotence verified
- [x] Documentation updated
```

#### NFR-4: Performance

**Targets**:
- **Target**: 10 minutes end-to-end (workflow trigger → PR created)
- **Goal**: 5 minutes for base pack application

**Measurement**:
```yaml
# Add to workflow
- name: Record timing
  run: |
    echo "workflow_start=${{ github.event.workflow_run.created_at }}" >> $GITHUB_OUTPUT
    echo "workflow_end=$(date -u +%Y-%m-%dT%H:%M:%SZ)" >> $GITHUB_OUTPUT
```

**Optimization areas**:
1. Reduce LLM calls (minimize planning/refinement stages)
2. Parallelize file generation
3. Cache template packs
4. Optimize RepoSnapshot depth and filters

### Implementation Milestones

Track progress through these six milestones:

#### ☐ Milestone 1: Repository Scaffold and Deterministic Sensing
**Status**: [Not Started / In Progress / Completed]

**Deliverables**:
- [ ] Directory structure (templates/, specs/, docs/agentops/)
- [ ] Base template pack with placeholders and markers
- [ ] Snapshot script (src/sense/)
- [ ] Deterministic snapshot verified
- [ ] CLI entry point for debugging

**Acceptance**: Running snapshot twice produces identical JSON

#### ☐ Milestone 2: Reusable Workflow and Template Application
**Status**: [Not Started / In Progress / Completed]

**Deliverables**:
- [ ] Composite action (action.yml)
- [ ] Reusable workflow (apply.yml)
- [ ] Safe/refresh/overwrite modes
- [ ] File generation with markers/frontmatter
- [ ] PR creation
- [ ] Deterministic-only (no LLM)

**Acceptance**: Workflow generates files and opens PR successfully

#### ☐ Milestone 3: Agentic Planning and Generation
**Status**: [Not Started / In Progress / Completed]

**Deliverables**:
- [ ] Builder agent definitions (.github/agents/)
- [ ] Planning prompts
- [ ] Planner agent call (src/plan/)
- [ ] PlanManifest JSON validated
- [ ] Refine stage with specialists
- [ ] Repo profile customization

**Acceptance**: LLM-based planning produces valid PlanManifest

#### ☐ Milestone 4: Verification and Reviewer Stage
**Status**: [Not Started / In Progress / Completed]

**Deliverables**:
- [ ] YAML frontmatter linting
- [ ] Required fields validation
- [ ] Naming convention checks
- [ ] Reviewer agent call
- [ ] VerificationReport JSON
- [ ] PR blocked on must-fix issues

**Acceptance**: Invalid files are caught before PR creation

#### ☐ Milestone 5: MCP Governance and Advanced Features
**Status**: [Not Started / In Progress / Completed]

**Deliverables**:
- [ ] mcp.md generation
- [ ] Recommended servers and tiers
- [ ] Secrets injection instructions
- [ ] Org MCP registry integration
- [ ] Profile and mcp_preset inputs
- [ ] Stack-specific pack selection

**Acceptance**: mcp.md documents at least GitHub MCP server with tiers

#### ☐ Milestone 6: Documentation and Examples
**Status**: [Not Started / In Progress / Completed]

**Deliverables**:
- [ ] Comprehensive README.md
- [ ] Workflow invocation examples
- [ ] Mode documentation
- [ ] Sample target repository
- [ ] CI demonstration
- [ ] New pack instructions

**Acceptance**: External repo can successfully invoke the workflow

### Performance Targets Detail

**Phase timing goals** (NFR-4):

| Phase | Target | Goal | Measurement Point |
|-------|--------|------|-------------------|
| Sensing | 30s | 15s | RepoSnapshot generated |
| Planning | 120s | 60s | PlanManifest returned from LLM |
| Generation | 180s | 90s | All files generated |
| Verification | 60s | 30s | VerificationReport produced |
| PR Creation | 30s | 15s | PR opened |
| **Total** | **10m** | **5m** | Workflow complete |

### Reliability and Failure Handling (NFR-5)

**Failure modes and responses**:

| Failure | Response | Fallback |
|---------|----------|----------|
| Sensing fails | Workflow fails with clear error | None - this is critical |
| Planning timeout | Use deterministic templates | Open PR with [FALLBACK] tag |
| LLM API error | Retry 3 times, then fallback | Use deterministic templates |
| Template not found | Use base pack only | Open PR noting missing pack |
| Verification fails (must-fix) | Block PR creation | Output VerificationReport to logs |
| PR creation fails | Workflow fails | Output branch name and manual steps |

**Implementation**:
```typescript
class FailureHandler {
  async handlePlanningFailure(
    error: Error,
    snapshot: RepoSnapshot
  ): Promise<PlanManifest> {
    core.warning(`Planning failed: ${error.message}`);
    core.warning('Using fallback deterministic manifest');
    
    return {
      repoProfile: inferBasicProfile(snapshot),
      selection: { basePack: true, stackPacks: [], components: [] },
      files: generateBasicFileList(snapshot),
      managedPolicy: DEFAULT_MANAGED_POLICY,
      acceptanceCriteria: ['Files created with correct markers'],
      questions: [
        'Planning agent failed. Please review and customize generated files.',
        `Error: ${error.message}`
      ]
    };
  }
}
```

### Agent Team Patterns for Generated Repos

When this builder generates a framework for a target repository, it creates these agent patterns:

#### Pattern A: Plan → Implement → Review (Default)
- **Planner** (read-only): Decomposes tasks, writes acceptance criteria
- **Implementer** (write): Makes changes, runs tests, updates docs
- **Reviewer** (read-only): Checks diffs, flags risks, suggests improvements

#### Pattern B: Specialist Swarm (Complex Changes)
- **Security Auditor**: Reviews auth, data handling, dependencies
- **Test Writer**: Adds regression tests
- **Docs Writer**: Updates documentation and examples
- **Release Agent**: Drafts notes and prepares PR descriptions

#### Pattern C: Sub-Agent Decomposition
Main agent hands narrow tasks to sub-agents:
- "Write tests for X"
- "Update docs for Y"
- "Check spec compliance"
- "Search prior decisions and summarize constraints"

### Related Resources

**Specifications**:
- [Agent Builder First Intent](docs/specs/agent_builder_first_intent.md) - Complete FR/NFR list
- [Decision Log](decision-log.md) - Architectural decisions

**Configuration**:
- [Repository Profile](repo-profile.md) - This repo's profile
- [MCP Documentation](mcp.md) - MCP server guidelines

**GitHub Resources**:
- [Custom Agents Documentation](https://docs.github.com/en/copilot/customizing-copilot/creating-a-custom-agent)
- [Custom Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Prompt Files](https://docs.github.com/en/copilot/customizing-copilot/creating-a-custom-prompt)

**Standards**:
- [AGENTS.md Standard](https://agents.md/) - Format and best practices

### Contributing

**Priority areas** for contributions:

1. **Template Packs**: Language/framework-specific templates (Python, Go, Rust, etc.)
2. **Agent Archetypes**: New canonical agents (database specialist, performance auditor)
3. **Prompt Skills**: Reusable prompt files for common tasks
4. **MCP Profiles**: Example mcp.md files for different tech stacks
5. **Test Coverage**: Additional tests for edge cases and acceptance criteria
6. **Documentation**: Guides, tutorials, and examples

**Process**:

1. Review [Agent Builder Specification](docs/specs/agent_builder_first_intent.md)
2. Check [Decision Log](decision-log.md) for context
3. Open an issue describing your proposal
4. Create a feature branch
5. Implement with tests
6. Update relevant documentation (AGENTS.md, README.md)
7. Open PR with milestone tracking and acceptance criteria checklist
8. Address reviewer feedback

**Code quality expectations**:
- All tests pass (npm test)
- TypeScript compiles with no errors (npm run build)
- Idempotence verified for generation features
- Documentation updated
- No secrets in code or generated files
- Managed markers used correctly

---

## Quick Reference

### Essential Commands

```bash
# Setup
npm install
npm run build

# Testing
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # With coverage

# Development
node dist/index.js scan /path/to/repo           # Generate snapshot
node dist/index.js plan /path/to/repo           # Generate plan
node dist/index.js apply /path/to/repo          # Apply framework
```

### Key Files

| File | Purpose |
|------|---------|
| `docs/specs/agent_builder_first_intent.md` | Complete specification |
| `src/sense/types.ts` | RepoSnapshot interface |
| `src/plan/types.ts` | PlanManifest interface |
| `src/apply/managed-sections.ts` | Managed-block logic |
| `.github/workflows/apply-pack.yml` | Reusable workflow |

### Environment Variables

```bash
GITHUB_TOKEN=ghp_xxx       # GitHub API access
OPENAI_API_KEY=sk-xxx      # LLM access for planning
```

### Links

- Specification: [docs/specs/agent_builder_first_intent.md](docs/specs/agent_builder_first_intent.md)
- README: [README.md](README.md)
- Repo Profile: [repo-profile.md](repo-profile.md)
- MCP Guide: [mcp.md](mcp.md)
- Decisions: [decision-log.md](decision-log.md)

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-27  
**Maintained By**: This file is managed by the custom_github_copilot_agent_builder project  
**Updates**: See [decision-log.md](decision-log.md) for change history
