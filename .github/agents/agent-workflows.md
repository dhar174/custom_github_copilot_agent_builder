# Custom Agent Workflows & Relationships

This document visualizes the relationships between custom agents and defines logical workflow sequences for common development tasks.

## Agent Ecosystem Overview

```mermaid
graph TB
    subgraph "Planning & Design"
        plan[Plan Mode]
        architect[Architect]
        prd[PRD Creator]
        spec[Specification]
        implplan[Implementation Plan]
    end
    
    subgraph "Implementation"
        pse[Principal Software Engineer]
        clean[Clean Code Agent]
        debug[Debug Agent]
    end
    
    subgraph "Quality Assurance"
        test[Test Writer]
        security[Security Reviewer]
        review[Code Reviewer]
    end
    
    subgraph "DevOps & Deployment"
        devops[DevOps Expert]
        ghactions[GitHub Actions Expert]
    end
    
    subgraph "Documentation"
        refine[Refine Issue]
        tech-content[Technical Content]
    end
    
    subgraph "Meta & Support"
        foundry[Custom Agent Foundry]
        mentor[Mentor]
        research[Research & Spike]
    end

    classDef planning fill:#e1f5ff,stroke:#01579b,stroke-width:2px
    classDef implementation fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef quality fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef devops fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    classDef docs fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    classDef meta fill:#f1f8e9,stroke:#33691e,stroke-width:2px
    
    class plan,architect,prd,spec,implplan planning
    class pse,clean,debug implementation
    class test,security,review quality
    class devops,ghactions devops
    class refine,tech-content docs
    class foundry,mentor,research meta
```

---

## Workflow 1: Feature Development (Complete Cycle)

```mermaid
flowchart LR
    A[User Request] --> B[Plan Mode]
    B -->|Clarify & Research| C[PRD Creator]
    C -->|Document Requirements| D[Specification]
    D -->|Technical Spec| E[Architect]
    E -->|Design Decisions| F[Implementation Plan]
    F -->|Detailed Steps| G[Principal Software Engineer]
    G -->|Code Implementation| H[Test Writer]
    H -->|Test Coverage| I[Security Reviewer]
    I -->|Security Check| J[DevOps Expert]
    J -->|Deploy| K[Monitor & Iterate]
    
    style A fill:#ffeb3b
    style K fill:#4caf50
```

### Handoff Chain
1. **Plan** → `"Create PRD"` → **PRD Creator**
2. **PRD** → `"Generate Specification"` → **Specification**
3. **Specification** → `"Design Architecture"` → **Architect**
4. **Architect** → `"Create Implementation Plan"` → **Implementation Plan**
5. **Implementation Plan** → `"Begin Implementation"` → **Principal Software Engineer**
6. **PSE** → `"Add Tests"` → **Test Writer**
7. **Test Writer** → `"Security Review"` → **Security Reviewer**
8. **Security** → `"Setup Deployment"` → **DevOps Expert**

---

## Workflow 2: Bug Fix & Debugging

```mermaid
flowchart TD
    BUG[Bug Report] --> REFINE[Refine Issue]
    REFINE -->|Clarified Issue| DEBUG[Debug Agent]
    DEBUG -->|Identify Root Cause| FIX[Principal Software Engineer]
    FIX -->|Implement Fix| TEST[Test Writer]
    TEST -->|Regression Tests| VERIFY{Tests Pass?}
    VERIFY -->|No| DEBUG
    VERIFY -->|Yes| REVIEW[Code Review]
    REVIEW --> DEPLOY[DevOps - Deploy]
    
    style BUG fill:#ff5252
    style VERIFY fill:#ffc107
    style DEPLOY fill:#4caf50
```

### Handoff Chain
1. **Refine Issue** → `"Debug this issue"` → **Debug Agent**
2. **Debug** → `"Implement fix"` → **Principal Software Engineer**
3. **PSE** → `"Add regression tests"` → **Test Writer**
4. **Test Writer** → `"Deploy fix"` → **DevOps Expert**

---

## Workflow 3: Refactoring & Modernization

```mermaid
flowchart LR
    A[Code Assessment] --> B[Plan Mode]
    B -->|Analysis| C[Architect]
    C -->|Modernization Strategy| D[Implementation Plan]
    D -->|Refactor Steps| E[Clean Code Agent]
    E -->|Improved Code| F[Test Writer]
    F -->|Updated Tests| G[Review]
    
    style A fill:#ff9800
    style G fill:#4caf50
```

### Handoff Chain
1. **Plan** → `"Design modernization approach"` → **Architect**
2. **Architect** → `"Create refactoring plan"` → **Implementation Plan**
3. **Implementation Plan** → `"Apply clean code principles"` → **Clean Code Agent**
4. **Clean Code** → `"Update test coverage"` → **Test Writer**

---

## Workflow 4: API Development

```mermaid
flowchart TD
    START[API Requirements] --> PLAN[Plan Mode]
    PLAN --> API[API Architect]
    API -->|API Design| SPEC[Specification]
    SPEC -->|OpenAPI Spec| IMPL[Implementation Agent]
    IMPL -->|Code| TEST[Test Writer]
    TEST -->|Integration Tests| SEC[Security Reviewer]
    SEC -->|Security Scan| DOC[Technical Content]
    DOC -->|Documentation| DEPLOY[DevOps]
    
    style START fill:#03a9f4
    style DEPLOY fill:#4caf50
```

### Handoff Chain
1. **Plan** → `"Design API"` → **API Architect**
2. **API Architect** → `"Create specification"` → **Specification**
3. **Specification** → `"Implement API"` → **Principal Software Engineer**
4. **PSE** → `"Add integration tests"` → **Test Writer**
5. **Test Writer** → `"Security review"` → **Security Reviewer**
6. **Security** → `"Document API"` → **Technical Content**
7. **Documentation** → `"Setup CI/CD"` → **DevOps Expert**

---

## Workflow 5: New Project Setup

```mermaid
flowchart LR
    IDEA[Project Idea] --> PRD[PRD Creator]
    PRD --> ARCH[Architect]
    ARCH --> SPEC[Specification]
    SPEC --> DEVOPS[DevOps Expert]
    DEVOPS -->|Setup Infrastructure| IMPL[Implementation]
    
    style IDEA fill:#9c27b0
    style IMPL fill:#4caf50
```

### Handoff Chain
1. **PRD Creator** → `"Design system architecture"` → **Architect**
2. **Architect** → `"Create technical specification"` → **Specification**
3. **Specification** → `"Setup DevOps infrastructure"` → **DevOps Expert**

---

## Workflow 6: CI/CD Pipeline Setup

```mermaid
flowchart TD
    REQ[Pipeline Requirements] --> DEVOPS[DevOps Expert]
    DEVOPS -->|Strategy| GHA[GitHub Actions Expert]
    GHA -->|Workflow Files| TEST[Test Configuration]
    TEST -->|Validation| SEC[Security Scanning]
    SEC -->|Deploy Config| DONE[Pipeline Active]
    
    style REQ fill:#ff5722
    style DONE fill:#4caf50
```

### Handoff Chain
1. **DevOps Expert** → `"Create GitHub Actions workflows"` → **GitHub Actions Expert**

---

## Workflow 7: Documentation & Content

```mermaid
flowchart LR
    NEED[Doc Need] --> PLAN[Plan Mode]
    PLAN --> SPEC[Specification]
    SPEC --> TECH[Technical Content Evaluator]
    TECH --> REVIEW[Review & Refine]
    
    style NEED fill:#795548
    style REVIEW fill:#4caf50
```

---

## Agent Role Categories

### 🎯 Entry Points (User-Facing Agents)
Agents users typically start with:
- **Plan Mode** - Strategic planning and analysis
- **PRD Creator** - Product requirements
- **Refine Issue** - Issue enhancement
- **Debug Agent** - Bug investigation
- **Custom Agent Foundry** - Agent creation

### 🏗️ Architecture & Design
Strategic decision-making:
- **Architect** - System design
- **API Architect** - API design
- **Specification** - Technical specs
- **Implementation Plan** - Execution plans

### 💻 Implementation
Code generation and modification:
- **Principal Software Engineer** - Expert implementation
- **Clean Code Agent** - Code quality
- **Modernization** - Legacy refactoring

### ✅ Quality Assurance
Validation and testing:
- **Test Writer** - Test generation
- **Security Reviewer** - Security analysis
- **Code Review** - Quality checks

### 🚀 DevOps & Deployment
Infrastructure and deployment:
- **DevOps Expert** - Full lifecycle
- **GitHub Actions Expert** - CI/CD workflows

### 📚 Documentation
Content creation:
- **Technical Content Evaluator** - Doc quality
- **ADR Generator** - Decision records

### 🤝 Support & Meta
Assistance and agent management:
- **Mentor** - Guidance and coaching
- **Research & Spike** - Technical investigation
- **Custom Agent Foundry** - Agent creation
- **Demonstrate Understanding** - Knowledge verification

---

## Recommended Handoff Implementations

### High Priority Handoffs (Implement First)

```yaml
# plan.agent.md
handoffs:
  - label: "📋 Create PRD"
    agent: prd
    prompt: "Create a comprehensive PRD for: {{conversation}}"
    send: false
  - label: "📐 Generate Specification"
    agent: specification
    prompt: "Create a technical specification for: {{conversation}}"
    send: false
  - label: "🏗️ Design Architecture"
    agent: architect
    prompt: "Design the architecture for: {{conversation}}"
    send: false

# specification.agent.md
handoffs:
  - label: "📝 Create Implementation Plan"
    agent: implementation-plan
    prompt: "Generate a detailed implementation plan based on this specification"
    send: false
  - label: "🏗️ Review Architecture"
    agent: architect
    prompt: "Review and refine the architecture for this specification"
    send: false

# implementation-plan.agent.md
handoffs:
  - label: "💻 Begin Implementation"
    agent: principal-software-engineer
    prompt: "Implement this plan: {{conversation}}"
    send: false

# principal-software-engineer.agent.md
handoffs:
  - label: "🧪 Add Test Coverage"
    agent: test-writer
    prompt: "Create comprehensive tests for the implementation above"
    send: false
  - label: "🔒 Security Review"
    agent: security-reviewer
    prompt: "Perform a security review of the implementation above"
    send: false
  - label: "✨ Apply Clean Code"
    agent: clean-code
    prompt: "Refactor this code to follow clean code principles: {{conversation}}"
    send: false

# debug.agent.md
handoffs:
  - label: "🧪 Add Regression Tests"
    agent: test-writer
    prompt: "Create tests to prevent regression of the bug fixed above"
    send: false
  - label: "💻 Implement Fix"
    agent: principal-software-engineer
    prompt: "Implement a fix for the root cause identified above"
    send: false

# architect.agent.md
handoffs:
  - label: "📋 Create Specification"
    agent: specification
    prompt: "Create a detailed specification for the architecture decisions outlined above"
    send: false
  - label: "🚀 Setup Infrastructure"
    agent: devops-expert
    prompt: "Setup DevOps infrastructure for this architecture"
    send: false

# prd.agent.md
handoffs:
  - label: "🏗️ Design Architecture"
    agent: architect
    prompt: "Design the system architecture for this PRD"
    send: false
  - label: "📐 Create Specification"
    agent: specification
    prompt: "Create technical specifications for this PRD"
    send: false

# devops-expert.agent.md
handoffs:
  - label: "⚙️ Configure GitHub Actions"
    agent: github-actions-expert
    prompt: "Create GitHub Actions workflows for this DevOps strategy"
    send: false
```

---

## Usage Patterns

### Pattern 1: Full Feature Development
```
User Request 
  → Plan Mode (research & strategize)
  → PRD Creator (document requirements)
  → Specification (technical details)
  → Architect (design decisions)
  → Implementation Plan (execution steps)
  → Principal Software Engineer (code)
  → Test Writer (tests)
  → Security Reviewer (security)
  → DevOps Expert (deploy)
```

### Pattern 2: Quick Bug Fix
```
Bug Report
  → Refine Issue (clarify details)
  → Debug Agent (root cause)
  → Principal Software Engineer (fix)
  → Test Writer (regression tests)
```

### Pattern 3: Code Quality Improvement
```
Code Review Request
  → Plan Mode (assess codebase)
  → Clean Code Agent (refactor)
  → Test Writer (update tests)
  → Review (validate)
```

### Pattern 4: Infrastructure Setup
```
Deployment Need
  → DevOps Expert (strategy)
  → GitHub Actions Expert (workflows)
  → Security Reviewer (security scan)
```

---

## Agent Dependency Map

```mermaid
graph TD
    subgraph "Foundational"
        PLAN[Plan Mode<br/>Zero dependencies]
        FOUNDRY[Custom Agent Foundry<br/>Zero dependencies]
    end
    
    subgraph "Strategic"
        PRD[PRD Creator<br/>Depends: Plan]
        ARCH[Architect<br/>Depends: Plan, PRD]
        SPEC[Specification<br/>Depends: Arch, PRD]
    end
    
    subgraph "Execution"
        IMPLPLAN[Implementation Plan<br/>Depends: Spec, Arch]
        PSE[Principal Software Engineer<br/>Depends: ImplPlan]
        CLEAN[Clean Code<br/>Depends: PSE]
    end
    
    subgraph "Validation"
        TEST[Test Writer<br/>Depends: PSE, Clean]
        SEC[Security Reviewer<br/>Depends: PSE, Test]
    end
    
    subgraph "Deployment"
        DEVOPS[DevOps Expert<br/>Depends: Test, Sec]
        GHA[GitHub Actions<br/>Depends: DevOps]
    end
    
    PLAN --> PRD
    PLAN --> ARCH
    PRD --> ARCH
    PRD --> SPEC
    ARCH --> SPEC
    SPEC --> IMPLPLAN
    ARCH --> IMPLPLAN
    IMPLPLAN --> PSE
    PSE --> CLEAN
    PSE --> TEST
    CLEAN --> TEST
    PSE --> SEC
    TEST --> SEC
    TEST --> DEVOPS
    SEC --> DEVOPS
    DEVOPS --> GHA
```

---

## Agent Selection Guide

### "Which agent should I use?"

| Your Goal | Start With | Then Use |
|-----------|------------|----------|
| 🎯 New feature idea | Plan Mode | → PRD → Specification → Implementation Plan |
| 🐛 Fix a bug | Debug Agent | → Principal Software Engineer → Test Writer |
| 🏗️ Design system | Architect | → Specification → Implementation Plan |
| 📋 Write requirements | PRD Creator | → Specification → Architect |
| 💻 Write code | Principal Software Engineer | → Test Writer → Security Reviewer |
| 🧪 Add tests | Test Writer | (standalone or after implementation) |
| 🔒 Security review | Security Reviewer | → Principal Software Engineer (for fixes) |
| 🚀 Setup deployment | DevOps Expert | → GitHub Actions Expert |
| ✨ Improve code quality | Clean Code Agent | → Test Writer |
| 📚 Create docs | Technical Content | (standalone) |
| 🔧 Create new agent | Custom Agent Foundry | (standalone) |
| 🤔 Research spike | Research Agent | → Plan Mode (with findings) |

---

## Best Practices

### ✅ Do's
- Start with planning agents for complex work
- Use handoffs to create seamless workflows
- Validate with quality agents before deployment
- Document decisions with appropriate agents
- Chain agents logically (Plan → Implement → Test → Deploy)

### ❌ Don'ts
- Skip planning for complex features
- Jump directly to implementation without design
- Deploy without security review
- Forget test coverage
- Create circular dependencies between agents

---

## Future Enhancements

### Potential New Workflows
1. **Performance Optimization**: Plan → Profile → Optimize → Benchmark → Deploy
2. **Migration**: Assess → Plan → Test → Migrate → Validate
3. **Incident Response**: Detect → Debug → Fix → Test → Deploy → Post-Mortem

### Missing Agent Opportunities
- **Performance Analyzer** - Bottleneck identification
- **Migration Specialist** - System migrations
- **Post-Mortem Generator** - Incident documentation
- **Dependency Auditor** - Dependency health checks
- **Load Tester** - Performance testing

---

## Metrics & Success Criteria

### Workflow Efficiency Metrics
- **Time to Implementation**: Plan → Deploy time
- **Handoff Success Rate**: Percentage of successful handoffs
- **Quality Gate Passes**: Security + Test coverage rate
- **Agent Utilization**: Which agents are most/least used

### Quality Indicators
- Issues caught by Security Reviewer before deployment
- Test coverage increase from Test Writer
- Code quality improvement from Clean Code Agent
- Bug resolution time with Debug Agent

---

*Last Updated: January 27, 2026*
*Version: 1.0*
