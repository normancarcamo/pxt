"use strict";

const config = {
  "preset": "ts-jest",
  "rootDir": ".",
  "bail": true,
  "verbose": false,
  "collectCoverage": false,
  "expand": true,
  "testURL": "http://localhost:3001/",
  "coverageDirectory": "docs/test/coverage",
  "testEnvironment": "node",
  "setupFilesAfterEnv": [
    "./jest.setup.ts"
  ],
  "moduleFileExtensions": [ "ts", "tsx", "js", "jsx", "json", "node" ],
  "watchPathIgnorePatterns": ["node_modules"],
  "testMatch": [
    "<rootDir>/test/**/(*-|*.)(steps|spec|test).(js|jsx|ts|tsx)?(x)"
  ],
  "modulePaths": [
    "<rootDir>",
    "<rootDir>/src",
    "<rootDir>/test",
  ],
  "reporters": [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Autofit",
      "outputPath": "docs/test/report/index.html",
      "includeFailureMsg": true,
      "sort": "titleAsc",
      "dateFormat": "dd-mm-yyyy HH:MM:ss"
    }]
  ],
  "coveragePathIgnorePatterns": [
    "<rootDir>/test",
    "<rootDir>/src/index",
    "<rootDir>/src/app",
    "<rootDir>/src/router",
    "<rootDir>/src/controller",
  ],
  "collectCoverageFrom": [
    "<rootDir>/src/*.(js|jsx|ts|tsx)"
  ]
};

if (process.env.MOCK === "true") {
  config.reporters[1][1].outputPath = "docs/test/report/testing-mock.html";
  config.coverageDirectory = "docs/test/coverage/testing-mock";
} else {
  config.reporters[1][1].outputPath = "docs/test/report/testing.html";
  config.coverageDirectory = "docs/test/coverage/testing";
}

module.exports = config;
