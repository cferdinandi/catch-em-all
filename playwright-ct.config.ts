import { defineConfig, devices } from '@playwright/experimental-ct-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests',

	// The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot.
	snapshotDir: './__snapshots__',

	// Maximum time one test can run for.
	timeout: 10 * 1000,

	// Run tests in files in parallel
	fullyParallel: true,

	// Fail the build on CI if you accidentally left test.only in the source code.
	forbidOnly: !!process.env.CI,

	// Retry on CI only
	retries: process.env.CI ? 2 : 0,

	// Opt out of parallel tests on CI.
	workers: process.env.CI ? 1 : undefined,

	// Reporter to use. See https://playwright.dev/docs/test-reporters
	reporter: [
		['list'],
		[
			'html',
			{ outputFolder: 'playwright-report_components' }
		]
	],

	// Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
	use: {
		// Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
		trace: 'on-first-retry',

		// Port to use for Playwright component endpoint.
		ctPort: 3100,

		ctViteConfig: {
			resolve: {
				alias: {
					// '~': './app',
					'~': resolve(__dirname, './app'),
				},
			},
		  },
	},

	// Configure projects for browsers
	// Only testing in Chromium since e2e tests cover full browser support
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		}
	],
});
