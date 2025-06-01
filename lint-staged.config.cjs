module.exports = {
  "apps/api/src/**/*.{js,ts}": [
    "eslint --fix --config apps/api/eslint.config.mjs",
    "prettier --write --config apps/api/.prettierrc",
  ],
  "apps/web/src/**/*.vue": [
    "eslint --fix --config apps/web/eslint.config.ts",
    "prettier --write --config apps/web/.prettierrc.json",
  ],
};
