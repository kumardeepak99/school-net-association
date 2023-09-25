const nextJest = require("next/jest");
const createJestConfig = nextJest({
  // path to Next.js app to load next.config.js and .env files in test environment
  dir: "./",
});

//any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  projects: [
    {
      preset: "ts-jest",
      displayName: "frontend",
      testEnvironment: "jest-environment-jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      testMatch: ["<rootDir>/src/app/__tests__/pages/**/*.test.tsx", "<rootDir>/src/app/__tests__/components/**/*.test.tsx"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      globals: {
        "ts-jest": {
          tsconfig: "tsconfig.test.json",
        },
      },
    },
    {
      preset: "ts-jest",
      displayName: "backend",
      testEnvironment: "node",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      testMatch: ["<rootDir>/src/app/__tests__/api/**/*.test.ts"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    },
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  //ignore test files
  testPathIgnorePatterns: ["__tests__/__fixtures__"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
