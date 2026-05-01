# Git Workflow Rule

This rule defines the standard Git operations for contributing to the Nutrition App.

## Branch Naming
- All new features must be developed on a dedicated branch prefixed with `feature/`.
- Example: `feature/user-registration`, `feature/bmi-calculator`.
- Bug fixes should use `bugfix/` or `fix/`.

## Commits
- Make meaningful, atomic commits.
- Commit messages should clearly describe *what* was changed and *why*.
- Example: `feat: add JWT validation middleware` or `fix: correct BMI formula calculation`.

## Pull Requests (PR)
- Create PRs with clear descriptions referencing the User Story (e.g., "US-1: User Registration").
- PRs must pass all tests before being merged.
- Code review is required before merging into the `main` branch.
- Delete branches after a successful merge.
