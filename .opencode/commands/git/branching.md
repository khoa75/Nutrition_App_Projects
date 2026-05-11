# Git Branching & Checkout

Commands to manage independent development flows.

## 1. List Branches
```bash
git branch -a
```

## 2. Create New Branch and Switch to it
```bash
git checkout -b feature/your-feature-name
```

## 3. Switch to Existing Branch
```bash
git checkout main
```

## Branch Naming Rules
- **Feature**: `feature/<name>`
- **Bugfix**: `bugfix/<id>`
- **Hotfix**: `hotfix/<description>`
