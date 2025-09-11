docs(git): add commit message guidelines

# Git Commit Guidelines

## 1. One commit = one logical change
Keep commits small and focused. Don’t mix unrelated changes.

✅ Good:
- fix(auth): correct success message on login
- feat(ui): add popup animation for flash messages

❌ Bad:
- update stuff
- misc changes

---

## 2. Commit message format (Conventional Commits)

<type>(<scope>): <short summary>

Types:
- feat   → new feature
- fix    → bug fix
- chore  → tooling, dependencies, cleanup
- docs   → documentation only
- style  → formatting only
- refactor → code restructure without behavior change
- test   → add or fix tests

Examples:
- feat(auth): add custom signout with popup success message
- fix(css): correct popup fade-out timing
- chore: add db.sqlite3 to .gitignore

---

## 3. Writing good messages
- First line ≤ 72 characters, imperative mood ("add" not "added").
- Use a body if needed to explain *why* not just *what*.

Example:

fix(auth): correct login message

Previously, the login view displayed "You have been logged out"
after signing in. Updated to show "Sign in successful" instead.

---

## 4. Best practices
- Run `git status` and `git diff` before staging.
- Use `git add -p` to commit only relevant hunks.
- Avoid committing generated files (`db.sqlite3`, `__pycache__/`, `.env`, logs).
- Use feature branches instead of committing directly to main.
