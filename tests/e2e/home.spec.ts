import { test, expect } from '@playwright/test';

test.describe('The app homepage', () => {

	test('the page loads and displays Pokemon', async ({ page }) => {

		await page.goto('/');

		// Shows a page heading
		await expect(page.locator('h1')).toContainText(`Catch 'Em All!`);

		// Shows placeholders while waiting for the API to response
		await expect(page.locator('.row-auto-fit [data-testid="placeholder"]')).toHaveCount(20);

		// Loads Pokemon once the API responds
		await expect(page.locator('.row-auto-fit [data-testid="card"]')).toHaveCount(20);

	});

	test('clicking a link opens the individual Pokemon page', async ({ page }) => {

		await page.goto('/');

		// Click the first Pokemon in the list
		// (cache the name for later use)
		const pokemon = page.locator('.row-auto-fit [data-testid="placeholder"]').first();
		const pokemonName = await pokemon.textContent() as string;
		const pokemonNameRegex = new RegExp(pokemonName, 'i')
		await page.locator('.row-auto-fit [data-testid="placeholder"]').first().click();

		// URL contains the Pokemon
		await expect(page).toHaveURL(pokemonNameRegex);

		// Has Pokemon name in title
		await expect(page.locator('h1')).toHaveText(pokemonNameRegex);

	});

	test('clicking load more loads more Pokemon', async ({ page }) => {

		await page.goto('/');

		// Initial 20 Pokemon are displayed
		await expect(page.locator('.row-auto-fit [data-testid="card"]')).toHaveCount(20);

		// Click the load more button
		await page.getByRole('button', { name: 'Load More' }).click();

		// Should display text for screen readers
		// (can't test loading ring visibility because browser test is headless)
		await expect(page.locator('[data-is-loading] [role="status"]')).not.toBeEmpty();

		// Additional 20 Pokemon to now be displayed
		await expect(page.locator('.row-auto-fit [data-testid="card"]')).toHaveCount(40);

	});

	test('navigating away and returning should reload all previously loaded Pokemon', async ({ page }) => {

		await page.goto('/');

		// Load more Pokemon
		await page.getByRole('button', { name: 'Load More' }).click();

		// 40 Pokemon should be displayed
		await expect(page.locator('.row-auto-fit [data-testid="card"]')).toHaveCount(40, { timeout: 10_000 });

		// Navigate to another page
		await page.locator('.row-auto-fit [data-testid="card"]').first().click();

		// Go back to the homepage
		await page.locator('header nav a').click();

		// 40 Pokemon should still be displayed
		await expect(page.locator('.row-auto-fit [data-testid="card"]')).toHaveCount(40, { timeout: 10_000 });

	});

});
