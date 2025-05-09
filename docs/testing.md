# Testing

**The tl;dr:** this app relies heavily on E2E testing, which I believe provides better information and more confidence with less effort than aggressively testing every UI component individually in isolation.


## Quick Start

- `npm run test:types` - run Typescript checks
- `npm run test:lint` - run linting script
- `npm run test:unit` - run unit tests
- `npm run test:e2e` - run End-to-End tests
- `npm run test:lint-fix` - run linting script _and_ automatically fix errors
- `npm run test:all` - run all tests
- `npm run test:all-fix` - run all tests _and_ automatically fix linting errors

_**Note:** occasionally, one of the E2E tests will fail in one of the test browsers because the API takes too long to respond. Rerunning the affected test usually resolves the issue._


## Testing Approach

There are a few principles that guide how I approached testing with this project...

1. Test _what the component does_, not how it works.
2. Avoid mocking APIs. Recreating the backend is time-consuming, prone to error, and reduces the overall value of the tests. Call real APIs.
3. For UI components that call APIs, testing behaviors and interactions as part of an end-to-end test gets you more value with less effort.
4. For UI components that receive data and conditionally render different things, test the different variations of that component to ensure the output matches the expected input.
5. For utility functions, test that the data out meets expectations based on the data passed in.


## Testing Tools

### Playwright

The app uses [Playwright](https://playwright.dev) for E2E _and_ unit testing.

Playwright has a few major advantages over other popular options...

- Because it runs in real browsers, you run into fewer issues around features that aren't supported in JSDOM and require workarounds.
- For UI components, it tests _what the component does_ rather than _how it works_. This helps avoid testing implementation details that force you to rewrite tests every time you refactor code.
- While primarily thought of as an E2E testing tool, it [now supports component testing](https://playwright.dev/docs/test-components), and can even be used to run unit tests. This lets you write your entire suite of tests in one tool.

The most notable downside is that its slower to run than a testing platform like Jest. I believe the benefits outweigh this downside, but that is of course an opinionated position.

_**I got to experience the benefits of this approach first hand while working on this project.** I originally [wrote my own API integration with fetch](https://github.com/cferdinandi/catch-em-all/tree/a5053a8204dfce47235f1a87cc51be379d80e8cd/app/api), but later switched to an SDK. Because I wasn't testing implementation details, I didn't have to rewrite my tests, and had confidence that the refactor didn't break anything._


### Biome

The app uses [Biome](https://biomejs.dev) for linting and code formatting.

In addition to enforcing code standards, it catches a variety of low-hanging-fruit errors that could be missed by other types of testing: missing dependencies with `useEffect()`, accessibility issues, and more.

When paired with an IDE integration, it can also provide live feedback as you code.


### Typescript

The app uses [Typescript](https://www.typescriptlang.org) for type checking/type safety.

You can run type checks manually, but this works best when paired with an IDE integration that will warn you about type issues in real-time as you code.



## Accessibility Testing

An accessibility test was also conducted on this app. This included...

- Google Lighthouse testing for UI-related accessibility issues.
- E2E with Playwright test to ensure focus is shifted properly on page navigation.
- Automated testing of common accessibility issues with Biome.
- Manually checking colors using the [Color Oracle color blindness simulator](https://colororacle.org).
- Manually navigating the site with a keyboard.
- Manually testing with a screen reader.
