const getDefaultIgnorePatterns = () => {
  return [
    // Hacky way to silence @yarnpkg/doctor about node_modules detection
    `**/${"node"}_modules`,
    ".cache",
    "**/.cache",
    "**/build",
    "**/coverage",
    "**/.turbo",
    "**/public/build",
    "**/dist",
    "**/.storybook",
    "**/storybook-static",
  ]
}

module.exports = {
  getDefaultIgnorePatterns,
}
