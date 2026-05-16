---
name: git
description: Version control skill, writing standard commit messages (Conventional Commits) and optimizing Git history
license: Apache-2.0
compatibility: opencode
---
## 1. Commit Message Standard (Conventional Commits)

To keep Git history clear, professional, and easy to automate (e.g., generating changelogs), all commits in the project must follow this structure:

```text
<type>(<scope>): <subject>

<body>

<footer>
```

### Standard `type` (commit types):
- `feat`: Add a new feature.
- `fix`: Fix a bug.
- `docs`: Update documentation (README, Swagger, markdown...).
- `style`: Change code formatting (whitespace, missing semicolons, code format...) without changing logic.
- `refactor`: Rewrite code without changing logic (no bug fixes, no new features).
- `perf`: Optimize performance, processing speed.
- `test`: Add or fix test cases.
- `build`: Change build system or dependencies (maven, npm, uv, pub...).
- `ci`: Change CI/CD configuration (GitHub Actions, workflow files...).
- `chore`: Cleanup tasks, tool changes not belonging to the above types.

### 2. Subject Line Rules
- **Always include User Story or Task ID (if available):** Example `feat(auth): US-01 add JWT login endpoint`.
- **Use English and write in imperative mood:** Example `add` instead of `added` or `adds`, `fix` instead of `fixed`.
- **Be concise:** Maximum 50-72 characters for good display on command line tools or GitHub UI.
- Do not capitalize the first letter (except for proper names/numbers).
- Do not put a period at the end of the subject line.

### 3. Body and Footer Rules (optional)
- **Body:** Separate from subject with one blank line. Explain **why** this change was made (What and Why) instead of describing how the code works (How). Lines should be wrapped at around 72 characters.
- **Footer:** Used to reference tickets/issues (e.g., `Closes #42`, `Fixes US-05`) or mark Breaking Changes.

## 4. Best Practices when Committing
- **Atomic Commits:** Each commit should focus on solving only one issue/task. Don't combine fixing CSS bugs and creating a Backend endpoint in the same commit.
- **Check before committing:** Always carefully review staged changes to ensure no garbage code slips through (like `console.log`, `print`, temporary `TODO`).
- **Ask before doing:** (For AI Agent) Whenever there is a small change on the codebase, the AI Agent must proactively ask if the user wants to commit that task to keep the history transparent.
