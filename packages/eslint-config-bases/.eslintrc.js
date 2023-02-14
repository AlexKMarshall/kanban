const { getDefaultIgnorePatterns } = require("./helpers")

module.exports = {
  root: true,
  ignorePatterns: [...getDefaultIgnorePatterns()],
  extends: ["./src/bases/typescript", "./src/bases/prettier"],
}
