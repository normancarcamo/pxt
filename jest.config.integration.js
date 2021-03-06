module.exports = {
  preset: "ts-jest",
  rootDir: ".",
  bail: true,
  verbose: true,
  collectCoverage: true,
  expand: true,
  testURL: "http://localhost:3001/",
  coverageDirectory: "docs/test/coverage",
  testEnvironment: "node",
  setupFilesAfterEnv: [
    "./jest.setup.ts"
  ],
  moduleFileExtensions: [ "ts", "tsx", "js", "jsx", "json", "node" ],
  watchPathIgnorePatterns: ["node_modules"],
  testMatch: [
    "**/*.steps.ts"
  ],
  modulePaths: [
    "<rootDir>",
    "<rootDir>/src",
    "<rootDir>/test",
  ],
  reporters: [
    "default",
    ["./node_modules/jest-html-reporter", {
      pageTitle: "Autofit",
      includeFailureMsg: true,
      sort: "titleAsc",
      dateFormat: "dd-mm-yyyy HH:MM:ss",
      outputPath: "docs/test/report/integration-testing.html"
    }]
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/index"
  ],
  collectCoverageFrom: [
    "<rootDir>/src/*.(js|jsx|ts|tsx)"
  ],
  coverageDirectory: "docs/test/coverage/integration"
};