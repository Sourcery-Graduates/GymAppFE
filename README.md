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
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

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
})
```
## 🧪 Testing
### Unit tests

Tests are developed using [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).

Vitest provides fast test execution and good integration with Vite Framework, while React Testing Library enables testing components in a way that closely resembles how users interact with them.

### 📦 Installation

To run tests locally install all dependencies: 
``` bash
npm install
```
### ▶️ Running Tests

Particular scripts could be used to run tests:
```bash
npm run test          // running all tests in CI mode
npm run test:watch    // running all tests in interactive mode
npm run test:unit     // running only unit tests
```

### ⚙️	CI Integration

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