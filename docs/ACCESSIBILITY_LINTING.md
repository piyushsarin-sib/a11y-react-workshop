# Accessibility Linting

This project enforces accessibility standards through ESLint and the `eslint-plugin-jsx-a11y` plugin.

## How it works

1. **During Development**:
   - ESLint will check for accessibility issues in real-time
   - The Vite dev server will show an overlay for errors and warnings

2. **Before Commits**:
   - Husky and lint-staged will run ESLint checks
   - Commits will fail if there are accessibility issues

3. **Before Build**:
   - The `prebuild` script runs ESLint with zero warnings allowed
   - The build will fail if there are any accessibility issues

4. **In CI/CD**:
   - GitHub Actions will run ESLint checks on push/PR
   - The pipeline will fail if there are any accessibility issues

## Available Scripts

- `npm run lint` - Run ESLint on all JavaScript and JSX files
- `npm run lint:fix` - Run ESLint and automatically fix issues when possible
- `npm run lint:a11y` - Run only accessibility-focused ESLint rules

## Key Accessibility Rules

The `eslint-plugin-jsx-a11y` plugin enforces best practices for web accessibility:

- Alt text for images
- Proper aria attributes
- Keyboard navigation support
- Semantic HTML
- Color contrast considerations
- And much more

## Resources

- [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/)
- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [eslint-plugin-jsx-a11y documentation](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
