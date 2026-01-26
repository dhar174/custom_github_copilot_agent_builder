# Prompts

This directory contains reusable prompt templates for GitHub Copilot.

## Purpose

Store `.prompt.md` files that define reusable prompts for common tasks and workflows.

## Prompt File Format

Prompt files should follow this format:

```markdown
# Prompt: [Prompt Name]

## Description
Brief description of what this prompt does and when to use it.

## Parameters
List of parameters that can be customized:
- `{parameter1}`: Description of parameter
- `{parameter2}`: Description of parameter

## Template

'''
[Your prompt template here with {parameter} placeholders]
'''

## Example Usage

### Example 1
**Parameters**:
- `parameter1`: value1
- `parameter2`: value2

**Rendered Prompt**:
'''
[The prompt with actual values substituted]
'''

**Expected Result**:
Description of what this prompt should accomplish.

## Tips
- Tips for using this prompt effectively
- Common variations
- Best practices
```

## Types of Prompts

### Task Prompts
Prompts for specific development tasks:
- Code generation
- Refactoring
- Bug fixing
- Documentation

### Review Prompts
Prompts for code review and analysis:
- Security review
- Performance analysis
- Code quality checks
- Architecture review

### Documentation Prompts
Prompts for documentation tasks:
- API documentation
- README generation
- Tutorial creation
- Comment generation

### Testing Prompts
Prompts for testing-related tasks:
- Test case generation
- Test data creation
- Coverage analysis
- Test documentation

## Creating Reusable Prompts

When creating a new prompt:

1. **Identify Common Pattern**: Find a task you do repeatedly
2. **Extract Variables**: Identify parts that change between uses
3. **Write Template**: Create a template with parameter placeholders
4. **Add Examples**: Show realistic usage examples
5. **Document Purpose**: Explain when and how to use it
6. **Test Thoroughly**: Verify it works in different scenarios

## Best Practices

1. **Clear Parameters**: Use descriptive parameter names
2. **Flexible Design**: Make prompts adaptable to variations
3. **Good Defaults**: Consider providing default values
4. **Complete Examples**: Show full usage examples
5. **Version Control**: Track prompt evolution
6. **Regular Updates**: Keep prompts current with best practices

## Prompt Naming Conventions

- Use descriptive names: `code-review.prompt.md`, `test-generator.prompt.md`
- Follow kebab-case for filenames
- Use `.prompt.md` extension
- Keep names concise but clear

## Using Prompts

Prompts can be used:
- Directly with GitHub Copilot
- As templates for custom agents
- As starting points for new prompts
- For consistent task execution
- To share best practices across the team
