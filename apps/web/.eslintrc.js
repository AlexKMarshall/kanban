require("@kanban/eslint-config-bases/patch/modern-module-resolution")

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["tsconfig.json"],
  },
  ignorePatterns: ["**/node_modules", "build", "public/build"],
  extends: [
    "@kanban/eslint-config-bases/typescript",
    "@kanban/eslint-config-bases/react",
  ],
}
