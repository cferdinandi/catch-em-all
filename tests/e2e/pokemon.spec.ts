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

		// Shows Type section
		const typeSection = page.getByTestId('types');
		await expect(typeSection.locator('h2')).toBeVisible();
		await expect(typeSection.locator('ul')).toBeVisible();

		// Shows Habitat section
		const habitatSection = page.getByTestId('habitat');
		await expect(habitatSection.locator('h2')).toBeVisible();
		await expect(habitatSection.locator('span')).toBeVisible();

		// Shows Abilities section
		const abilitySection = page.getByTestId('abilities');
		await expect(abilitySection.locator('h2')).toBeVisible();
		await expect(abilitySection.locator('dl')).toBeVisible();
		expect(await abilitySection.locator('dt').count()).toBeGreaterThanOrEqual(1);
		expect(await abilitySection.locator('dd').count()).toBeGreaterThanOrEqual(1);

	});

});
