# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

## 🧪 Testing

### Unit tests

Tests are developed using [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).

Vitest provides fast test execution and good integration with Vite Framework, while React Testing Library enables testing components in a way that closely resembles how users interact with them.

### 📦 Installation

To run tests locally install all dependencies:

```bash
npm install
```

### ▶️ Running Tests

Particular scripts could be used to run tests:

```bash
npm run test          // running all tests in CI mode
npm run test:watch    // running all tests in interactive mode
npm run test:unit     // running only unit tests
```

### ⚙️ CI Integration

- Trigger: On push and pull request to the `main` branch
- Runner: Github Actions
- Workflow name: `Node.js.yml - Run Vitest tests`

### 📂 Test Structure

Tests are located in the following directories:

```
src/
├── app/
│   └── tests/
│       └── unit/
│           └── components/        # Unit tests for UI components
|           └── hooks/             # (Optional) Unit tests for custom hooks
|           └── utils/             # (Optional) Unit tests for utility functions
|
|
├── setupTests.ts                  # Global test setup (e.g. mocks, test environments)
└── vite.config.ts                 # Vite configuration with Vitest integration
```

### 🐛 Debugging

1. Open relevant test file
2. Set breakpoints where needed
3. To use a launch configuration `Vitest: Debug Tests` add setup in .vscode/launch.json:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Vitest",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["--run"],
      "autoAttachChildProcesses": true,
      "console": "integratedTerminal"
    }
  ]
}
```

4. Alternatively run test in interactive mode with flag `--watch` (script: `npm run test:watch`)

For running one test you can use:

1. Add in the test file `.only` : `it.only(...)`, `test.only(...)` or `describe.only(...)`
2. Specify path to the test file in the command line script

```
npm run test --src/app/tests/unit/components/AppAlert.test.tsx
```

### ✅ Unit Testing Best Practices

### To maintain clean, reliable tests follow these guidelines:

### 1️⃣ Write tests from the user's perspective

Use `React Testing Library` to test component behavior, not internal implementation.  
Focus on what the user sees and interacts with, such as text, buttons, and roles.

### 2️⃣ Use clear and descriptive names

Add `test` to each file name: MyComponent.test.ts(x)

Group test using `describe()`.

Make test names readable, descriptive and use natural language (avoid camelCase/snake_case):

```ts
// Good
test('displays error message on failed login', () => {
  // test logic
});

// Bad
test('should work', () => {
  // unclear test
});
```

### 3️⃣ Prefer `screen queries` over manual DOM access

Use semantic queries like **getByRole, getByText, getByLabelText**.
Avoid using `querySelector` or accessing DOM nodes directly.
Although there might be exceptions.

### 4️⃣ Isolate unit tests

Test one specific behavior per test case.
Mock external dependencies (e.g., APIs, context providers) to avoid side effects using `vi.fn()`, `vi.mock()`.
Mock only what is necessary — focus on behavior.

### 5️⃣ Use `.only` and `.skip` responsibly

Use `test.only(...)` and `test.skip(...)` only during development or debugging.
Ensure no .only remains in committed code.

### 6️⃣ Keep tests short and focused

Each test should handle a single scenario or behavior.
Break down complex tests into smaller, more maintainable ones.

### 7️⃣ Clean up after tests

Prevent state leakage between tests.
Use `beforeEach` / `afterEach` hooks for shared setup or teardown.

### 8️⃣ Avoid testing implementation details

Don't rely on component internals or specific structure.
Focus on behavior and output relevant to users.

### 9️⃣ Prioritize test quality over coverage numbers

Aim for high coverage, but avoid meaningless or redundant tests.
Focus on critical paths, edge cases, and user flows.

### 🔟 Review and refactor tests regularly

Keep tests updated as features evolve.
Deduplicate setup code and extract shared utilities where possible.

## E2E Automated tests

Tests are developed using [Playwright](https://playwright.dev/).

### 📦 Installation

To run tests locally install all dependencies:

```bash
npm install
```

### ▶️ Running Tests

Particular scripts could be used to run tests:

```bash
npm run test:playwright             # Running all tests
npm run test:playwright:headed      # Running all tests in headed mode
npm run test:auth                   # Running login and registration tests
npm run test:app                    # Running shared login tests with first generating new user session
```

### 📊 Test Reports

After running the tests, you can generate and open reports using the provided scripts:

```bash
npm run playwright:report     # Open the latest Playwright HTML report
npm run allure:report         # Generate and open the Allure report
```

The reports are located in the following folders, respectively:

```
├── allure-report/                   # Contains Allure report files
├── playwright-report/               # Contains Playwright report
```

ℹ️ **Note**: To use Allure, make sure it is installed on your machine. You can follow the official [Allure instalation guide](https://allurereport.org/docs/install/).

For more details about integrating Allure with Playwright, see the [allure-playwright documentation](https://github.com/allure-framework/allure-js/tree/main/packages/allure-playwright).

### 📂 Test Structure

Tests are located in the following directories:

```
e2e/
├── components/                   # Contains reusable code
├── helpers/                      # Contains helper methods
├── pages/                        # Contains page object classes
├── helpers/                      # Contains utilities that interact with the system under test (app)
├── test-utils/                   # Contains utilities that support test framework and test environment
├── test-data/                    # Contains test data
└── tests/
|      └── application/           # Tests using shared login data
|      └── authentication/        # Login and registration tests
|      └── setup/                 # Setup autentication state that is reused in application tests
|
|
├── playwright.config.ts          # Global test setup
```

### 🔐 Environment configuration

Copy the `.env.template` file to `.env.test` and fill in the required values.

```bash
# Credentials for logging
USER_EMAIL=EMAIL
USER_PASSWORD=PASSWORD
```

### 👤 Shared login using storageState

To avoid repeating login step in every test, we use a shared authenticated session stored in `.auth/user.json`
File will be created once `setup.spec.ts` or project `setup-authentication` is be run.
To avoid expiration of storage state, setup is added to application project as a dependency - storage data will be generated each time application tests are run.

**How it works:**

1. **Login once** in a separate setup test file `setup.spec.ts` and save the session to `.auth/user.json`
2. **Reuse setup authentication** as dependency in any test project that needs an authenticated user

### 📋 Project Structure

We use Playwright projects to separate test categories and apply different configurations:

1. setup-authentication
2. authentication
3. application

**Benefits of this approach:**

- **Separation of concerns** - setup, authentication and application test are kept separately
- **Selective configuration** - shared login used where needed (application project)
- **Clear test management** - easier to run or skip specific test groups

### 🗑️ Test Data Cleanup Strategy

We use custom `TestDataManager` utility to manage and clean up test data created during automated tests.

**How it works:**

-> Each factory that creates test data (via UI or via API) has automatic registartion of cleanup task

-> These cleanup tasks are executed automatically in `afterEach` to ensure test isolation and keep the environment clean

Tests should not directly call delete endpoints, unless the goal is to verify deletion.

**Example usage:**

```ts
test.beforeEach(() => {
  dataTestManager = new DataTestManager();
});

test.afterEach(() => {
  await dataTestManager.cleanup();
});

test('creates a routine', async () => {
  const routine = await RoutineFactory.init(apiContext, dataTestManager).create(); // automatic registration of cleanup task is done within create()

  // assertions
});
```

### 📦 Page Object Structure

The test suites follows the Page Object Model with a shared `BasePage` class, providing common functionalities such as `goto`, `reloadPage`, `expectToHaveURL`.

Feature specific pages extend this base and define their own selectors and actions.

For reusable forms/views with shared structure, intermediate base pages (e.g. `WorkoutBasePage`, `RoutineFormBasePage`) are added to encapsulate shared logic across create/edit flows.

### 📦 RoutineFactory - Test Data Generator for Routines

`RoutineFactory` provides a convenient way to create test data for routines via API or UI. Test data is generated using `faker` as well as there is possibility to create with own test data using fluent interface `.withName()`, `.withDescription()`. It supports automatic cleanup registration to keep test environment clean and isolated.

Create a routine via API:

```ts
const routine = await RoutineFactory.init(apiContext, dataTestManager).withName('Push Day').create();
```

Create a routine with exercises via API:

```ts
const routine = await RoutineFactory.init(apiContext, dataTestManager).createWithExercises(3);
```

Create a routine via UI:

```ts
const routine = RoutineFactory.init(apiContext, dataTestManager);
await routine.createViaUI(routinesPage);
```

Skip cleanup registration:

```ts
const routine = await RoutineFactory.init(apiContext, dataTestManager).withoutCleanup().create();
```

### 📦 WorkoutFactory - Test Data Generator for Workouts

Similarly to `RoutineFactory`, `WorkoutFactory` provides a convenient way to create test data for workouts via API or UI. Test data is generated using `faker` as well as there is possibility to create with own test data using fluent interface `.withName()`, `.withComment()`. It supports automatic cleanup registration to keep test environment clean and isolated.
