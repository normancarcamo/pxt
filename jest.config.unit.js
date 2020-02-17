module.exports = {
  preset: "ts-jest",
  rootDir: ".",
  bail: true,
  verbose: false,
  collectCoverage: false,
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
    "<rootDir>/test/**/(*-|*.)(spec|test).(js|jsx|ts|tsx)?(x)"
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
      outputPath: "docs/test/report/index.html",
      includeFailureMsg: true,
      sort: "titleAsc",
      dateFormat: "dd-mm-yyyy HH:MM:ss",
      outputPath: "docs/test/report/unit-testing.html"
    }]
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/test",
    "<rootDir>/src/index",
    "<rootDir>/src/app",
    "<rootDir>/src/router",
    "<rootDir>/src/controller",
  ],
  collectCoverageFrom: [
    "<rootDir>/src/*.(js|jsx|ts|tsx)"
  ],
  coverageDirectory: "docs/test/coverage/unit"
};