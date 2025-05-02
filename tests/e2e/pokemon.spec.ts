import { test, expect } from '@playwright/test';

test.describe('Individual Pokemon page', () => {

	test('the page loads and displays Pokemon details', async ({ page }) => {

		await page.goto('/pokemon/bulbasaur');

		// Shows a page heading
		await expect(page.locator('h1')).toContainText(/bulbasaur/i);

		// Shows a sprite image hosted by the API
		await expect(page.locator('img[src*="/PokeAPI/sprites/master/sprites/pokemon/"]')).toBeVisible();

		// Shows flavor text
		await expect(page.getByTestId('flavor-text')).not.toBeEmpty();

		// Shows Type and Habitat sections
		await expect(page.locator('h2').filter({ hasText: 'Types' })).toBeVisible();
		await expect(page.locator('h2').filter({ hasText: 'Habitat' })).toBeVisible();

	});

});
