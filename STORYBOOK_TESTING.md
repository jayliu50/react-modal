# Storybook Testing Setup

This project now includes automated testing capabilities for Storybook stories using the latest Storybook format with play functions.

## What's New

### 1. Updated Story Format
- All stories now use the latest Storybook format
- Added comprehensive play functions for each story
- Stories include proper test IDs for reliable testing

### 2. Play Functions Added
Each story now includes a `play` function that tests core functionality:

#### Modal Stories (`stories/Modal.stories.tsx`)
- **Basic**: Tests opening/closing modal, content visibility
- **CustomAnimation**: Tests modal with custom animations
- **Scrolling**: Tests modal with long scrollable content
- **ESCTurnedOff**: Tests modal with ESC key disabled

#### Stack Stories (`stories/Stack.stories.tsx`)
- **Basic**: Tests opening multiple modals in a stack
- **SkipAnimations**: Tests modal stack with animation skipping

### 3. Automated Testing
- Added `@storybook/test-runner` for automated testing
- Added `test-storybook` npm script
- Configured test runner with proper timeouts and setup

## Running Tests

### Interactive Storybook
```bash
npm run storybook
```

### Automated Test Runner
```bash
# Run all story tests
npm run test-storybook

# Run tests for specific stories
npm run test-storybook -- --stories-json --filter="Modal"
```

### CI/CD Integration
The test runner can be integrated into CI/CD pipelines:

```bash
# Build storybook for testing
npm run build-storybook

# Run tests against built storybook
npm run test-storybook -- --url=http://localhost:6006
```

## Test Coverage

Each play function tests:
- User interactions (clicking buttons, keyboard input)
- Component state changes
- Visual content verification
- Accessibility features
- Custom functionality (animations, scrolling, ESC handling)

## Configuration Files

- `.storybook/test-runner.ts`: Test runner configuration
- `.storybook/main.js`: Storybook main configuration
- `.storybook/preview.js`: Global decorators and test utilities setup

## Test Utilities

Stories use a compatible approach for test utilities that works across different environments:
- Dynamic import of `@storybook/test` utilities
- Graceful fallback when test utilities aren't available
- Global `window.TestUtils` for consistent access

This setup ensures comprehensive testing of modal functionality while maintaining compatibility with the existing codebase.