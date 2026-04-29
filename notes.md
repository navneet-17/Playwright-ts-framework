## Running Tests

### Framework Tests (Production)
- Location: `src/tests/`
- Run: `npx playwright test`
- Reports: HTML + Allure
- CI/CD: Yes

### Practice-Set Scripts (Learning Only)
- Location: `tests/practice-sets/`
- File naming: `*.ts` (not `.spec.ts`)
- Run from anywhere: `npm run test:practice`
- Reports: Console output only
- CI/CD: No

#### Why Separate Locations?
Practice scripts are raw TypeScript/Node.js learning code — they don't use Playwright's test runner. Framework tests use Playwright's `test()` function and full reporting infrastructure.

#### Adding New Practice Scripts
1. Create new file: `tests/practice-sets/yourScript.ts`
2. Run it: `npm run test:practice`

Both can run simultaneously without conflicts.