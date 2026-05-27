# Playwright TypeScript Automation Framework

Production-grade test automation framework built with Playwright + TypeScript.

## 🛠️ Tech Stack
- Playwright + TypeScript
- Allure Reporting
- GitHub Actions CI/CD
- Page Object Model (POM)
- API Testing Layer (hybrid UI + API)

## 📁 Project Structure
src/
  pages/       → Page Object classes
  fixtures/    → Custom Playwright fixtures
  utils/       → Helpers, config loaders
tests/         → Test specs
.github/       → CI/CD workflow

## 🚀 Run Tests
npm install
npx playwright test

## 📊 Generate Allure Report
npx allure generate allure-results --clean
npx allure open