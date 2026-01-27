# GitHub Copilot Instructions

## Priority Guidelines

When generating code for this repository:

1. **Version Compatibility**: Always detect and respect the exact versions of languages, frameworks, and libraries used in this project (specifically TypeScript 5.x and Node.js 22.x).
2. **Context Files**: Prioritize patterns and standards defined in the .github/copilot directory and .github/instructions directory.
3. **Codebase Patterns**: When context files don't provide specific guidance, scan the codebase for established patterns, particularly in src/.
4. **Architectural Consistency**: Maintain our **Layered/Modular** architectural style (separating config, logic, and core execution) and established boundaries.
5. **Code Quality**: Prioritize **maintainability, performance, security, accessibility, and testability** in all generated code.

## Technology Version Detection

Before generating code, scan the codebase to identify:

1. **Language Versions**:
   - **TypeScript**: 5.6.x (Strict typing is enforced).
   - **Node.js**: 22.x (Use compatible built-ins).
   - **CommonJS**: The project is configured as type: "commonjs" in package.json.

2. **Framework Versions**:
   - **GitHub Actions Toolkit**: @actions/core ^1.11.1, @actions/github ^8.0.0.
   - **Testing**: vitest ^1.6.0.
   - **Validation**: js-yaml ^4.1.0.

3. **Library Versions**:
   - **OpenAI**: ^6.16.0 (Ensure compatibility with this SDK version).
   - **File System**: fs-extra ^11.3.3.

## Context Files

Prioritize the following files in .github/copilot directory (if they exist):

- **architecture.md**: System architecture guidelines
- **tech-stack.md**: Technology versions and framework details
- **coding-standards.md**: Code style and formatting standards
- **folder-structure.md**: Project organization guidelines
- **exemplars.md**: Exemplary code patterns to follow

## Codebase Scanning Instructions

When context files don't provide specific guidance:

1. Identify similar files to the one being modified or created (e.g., look at src/index.ts for CLI entry points or src/pack/ for module logic).
2. Analyze patterns for:
   - **Naming conventions**: CamelCase for functions/vars, PascalCase for types/interfaces.
   - **Code organization**: Imports at the top, constants next, helper functions, then main logic.
   - **Error handling**: Use try/catch blocks wrapping main logic; use core.setFailed or core.warning for action outputs.
   - **Logging**: Use @actions/core methods (core.info, core.debug) instead of console.log.
   
3. Follow the most consistent patterns found in the codebase.
4. When conflicting patterns exist, prioritize patterns in newer files or files with higher test coverage.
5. Never introduce patterns not found in the existing codebase (e.g., do not switch to ESM import.meta unless the project migrates).

## Code Quality Standards

### Maintainability
- Write self-documenting code with clear naming.
- Follow the naming and organization conventions evident in the codebase (e.g., explicit return types like : Promise<void>).
- Keep functions focused on single responsibilities (e.g., parseComponents, loadConfigFile in src/index.ts).
- Limit function complexity and length to match existing patterns.

### Performance
- Follow existing patterns for memory and resource management.
- Match existing patterns for handling computationally expensive operations.
- Follow established patterns for asynchronous operations (async/await is preferred over raw promises).

### Security
- Follow existing patterns for input validation (e.g., validating config file existence before reading).
- Handle sensitive data according to existing patterns (use core.getInput for secrets/tokens).

### Testability
- Follow established patterns for testable code.
- Write tests compatible with vitest.
- Ensure logic is separated from side-effects where possible to facilitate unit testing.

## Documentation Requirements

- Follow the exact documentation format found in the codebase.
- Match the JSDoc style and completeness of existing comments.
- Document parameters, returns, and exceptions in the same style.
- Follow existing patterns for usage examples.

## Testing Approach

### Unit Testing
- Match the exact structure and style of existing unit tests (using vitest).
- Follow the same naming conventions for test files (e.g., *.test.ts or *.spec.ts).
- Use the same assertion patterns found in existing tests.
- Apply the same mocking approach used in the codebase.

## Technology-Specific Guidelines

### TypeScript Guidelines
- Detect and adhere to TypeScript 5.6+.
- Use strict type annotations; avoid any unless absolutely necessary.
- Follow the same module import/export patterns (CommonJS compatibility with import * as ... or named imports).
- Match async/await usage patterns from existing code.
- Use interfaces/types for configuration objects (e.g., PackManifest in src/index.ts).

### GitHub Actions Guidelines
- Use @actions/core for inputs, outputs, and logging.
- Use @actions/exec for running command-line tools.
- Handle process exit codes correctly using core.setFailed on error.

## Version Control Guidelines

- Follow **Semantic Versioning** patterns as applied in the codebase.
- Match existing patterns for documenting breaking changes.

## General Best Practices

- Follow naming conventions exactly as they appear in existing code.
- Match code organization patterns from similar files.
- Apply error handling consistent with existing patterns.
- Follow the same approach to testing as seen in the codebase.
- Match logging patterns from existing code.
- Use the same approach to configuration as seen in the codebase (loading from YAML, falling back to defaults).

## Project-Specific Guidance

- **Architecture**: The project is structured with a core entry point (src/index.ts) that delegates to modules in subfolders (src/config, src/pack, src/pr, etc.). Respect this separation of concerns.
- **Config Handling**: Configuration is heavily driven by js-yaml parsing and merging with defaults. Follow this pattern for new configuration options.
- **Inputs**: Always read action inputs using core.getInput.
