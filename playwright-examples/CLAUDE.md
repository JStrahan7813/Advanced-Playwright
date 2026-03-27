# Project QA Rules
- Tech Stack: Playwright (E2E), Jest (Unit)
- Test Command: `npm test` or `npx playwright test`
- Coding Style: Use Page Object Model (POM)
- Self-Healing Rule: If a test fails, analyze the HTML snapshot/logs, fix the selector, and rerun until green.