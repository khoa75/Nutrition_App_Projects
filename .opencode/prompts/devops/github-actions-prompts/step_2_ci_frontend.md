---
name: step_2_ci_frontend
description: >
  Prompt: Setup GitHub Actions CI - Step 2: Frontend (Mobile & Admin)
license: Apache-2.0
compatibility: opencode
---

# Prompt: Setup GitHub Actions CI - Step 2: Frontend (Mobile & Admin)

## 1. Context & Constraints
Please read the following files before writing code:
- `.opencode/context/05-infrastructure/ci_cd.md`
- `.opencode/skills/devops/SKILL.md`

## 2. Task: Setup Frontend CI
1. Create `.github/workflows/react-native-ci.yml`:
   - Trigger on changes in `frontend/` folder.
   - Setup Node.js 20.
   - Run `npm install`.
   - Run `eslint` (lint) and TypeScript check (`tsc --noEmit`).
   - Run `jest` (unit tests).
2. Create `.github/workflows/react-ci.yml`:
   - Trigger on changes in `admin-dashboard/` folder.
   - Setup Node.js 20.
   - Run `npm install` and `npm run lint`.
   - Run `npm test`.
   - Run `npm run build`.

## 3. Acceptance Criteria
- Linting errors block the PR merge.
- Build artifacts are successfully generated.
- Tests cover the main user flows.
