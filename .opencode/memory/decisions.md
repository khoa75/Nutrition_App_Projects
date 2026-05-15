# Architectural Decisions

## 2026-05-04: .opencode Restructure
- **Decision**: Restructured the `.opencode` directory to a more modular and organized format.
- **Rationale**: To improve AI assistance by separating concerns (config, prompts, context, tasks, memory).
- **Status**: Approved and implemented.

## 2026-05-15: DevOps Workflows, Git & LSP Setup
- **Decision**: Added LSP setup for Java/Python/Dart/TS in `opencode.json` and strict permission control (`"ask"`) for `bash` and `edit`. Added Conventional Commits and Fail-Fast CI workflows to `.opencode/skills`.
- **Rationale**: Ensure AI Agents have correct context/tooling but are strictly controlled before mutating the codebase. Standardization of commit messages to aid CI/CD automation.

## 2026-05-01: Modular Monolith
- **Decision**: Chose Modular Monolith over Microservices.
- **Rationale**: Reduced complexity while maintaining module boundaries.
