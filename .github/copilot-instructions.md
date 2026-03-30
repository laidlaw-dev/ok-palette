# Copilot Instructions

## Project Overview

## Javascript and Typescript
- The project uses Typescript.
- Use types and interfaces to define the shape of objects.
- Use Eslint for linting.
- Use Prettier for code formatting.
- Use functional components and hooks for React components.
- Use arrow functions for defining functions.
- Use async/await for asynchronous code.
- Use destructuring for objects and arrays.
- Use template literals for strings.
- Use optional chaining and nullish coalescing for handling undefined and null values.
- Use `const` for variables that do not change and `let` for variables that do change.
- Use functional programming principles where possible. E.g. use `map`, `filter`, and `reduce` instead of `for` loops.
- Keep functions small and focused. A function should do one thing and do it well.
- Use meaningful names for variables and functions. E.g. use `getUser` instead of `fetchData`.
- Export types and interfaces from a separate `types.ts` file where possible.
- Export functions and components from an `index.ts` file where possible.
- Export functions and components as named exports where possible. Avoid exporting as default.
- Use `src` directory for source code.

## CSS styling
- The project uses Tailwind CSS for styling.
- The color palette is defined in `index.css` using CSS variables.
- The color variables include primary, secondary, surface, error, warning, info, and success colors with their light, dark, and surface variants.
- Use the color variables instead of tailwind's default colors for consistency.

## Testing
- The project uses Vitest for testing.
- Use `vitest` for running the tests.
- Create test files in the same directory as the component with a `.test.ts` extension for functions and a `.test.tsx` extension for React components.
- Use `@testing-library/react` for testing React components.
- Use `@testing-library/jest-dom` for additional matchers in tests.
- The describe and it blocks are used for organizing tests.
- The describe block should be the name of the function or component being tested. E.g. if the function under test is called `add`, the describe block should be `describe('add', () => { ... })`.
- A mocked function should have the name of the function being mocked with `mock_` prefix. E.g. if the function being mocked is called `fetchData`, the mocked function should be called `mock_fetchData`.
- Use fakeTimers from `vitest` to mock timers in tests.
- Use fake timers when testing code that uses `DateTime.now()` from `luxon` to ensure consistent results.

## Text
- Display text should always use the translation function `t` from `i18next/useTranslation` to allow for future internationalization.
- The translation keys should be in `src/locales/{lang}/translation.json`.
- The translation keys should be in snake case.
- The translation keys should be organized in the `public/locales/{lang}/translation.json` file using sub objects. E.g. `{ "common": { "cancel": "Cancel" } }`.

## Date and Time
- Use `DateTime` from `luxon` for date and time manipulation.
- Use `DateTime` for parsing, formatting, and manipulating dates and times.
- Use UTC to store times and convert to local time for display.
