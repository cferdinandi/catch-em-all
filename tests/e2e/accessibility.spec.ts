import { test, expect } from '@playwright/test';

test.describe('app accessiblity', () => {

	test('focus shifts on navigation', async ({ page }) => {

		await page.goto('/');

		// Click the first Pokemon in the list
		await page.locator('a[href*="/pokemon/"]').first().click();

		// Wait for URL to change and content to load
		await expect(page).toHaveURL(/pokemon/);
		await expect(page.locator('h1')).toBeVisible();

		// Heading element should have focus
		await expect(page.locator('h1')).toBeFocused();

	});

});
