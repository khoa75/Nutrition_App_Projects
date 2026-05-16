# Sample Prompt: Generate Release Notes / Changelog

**Task**: Read Git history using `git log` command and automatically create `CHANGELOG.md` file based on Conventional Commits.

**Instructions for AI Agent (`docs_writer` / `devops_engineer`)**:
1. Use terminal command tool to get commit list.
   - Example command: `git log --pretty=format:"%h - %s (%an, %ad)" --since="v[previous_version]"` (or read all if it's the first release).
2. Classify commits by type:
   - **`feat`**: New Features
   - **`fix`**: Bug Fixes
   - **`perf`**: Performance Improvements
   - *Skip* commits of type `chore`, `docs`, `style` (unless these commits have direct impact on end users).
3. Compose content in standard Markdown format:
   ```markdown
   ## [Version_Name] - YYYY-MM-DD
   
   ### ✨ New Features
   - Filter and list descriptions from `feat` commits...
   
   ### 🐛 Bug Fixes
   - Filterand list descriptions from `fix` commits...
   ```
4. Finally, automatically append or create new content to `CHANGELOG.md` file in the project root directory.
