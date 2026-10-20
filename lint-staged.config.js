// Runs on the staged files before each commit (.husky/pre-commit).
// Each list runs in order; CI runs the full checks on every push.
/** @type {import('lint-staged').Configuration} */
module.exports = {
  '*.{js,jsx,ts,tsx}': [
    // Lint first and format last, so the committed file is always formatted.
    // --no-warn-ignored: staging a lint-ignored file (android/, ios/)
    // shouldn't count as a warning and block the commit.
    'eslint --max-warnings 0 --no-warn-ignored --fix',
    'prettier --write',
    // Types cross files, so the whole project is type-checked, once.
    () => 'npm run typecheck',
    'jest --bail --findRelatedTests --passWithNoTests',
  ],
  '*.{json,md,yml,yaml}': 'prettier --write',
};
