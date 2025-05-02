import { test, expect } from '@playwright/experimental-ct-react';
import { LoadingSpinner } from '~/pages/home/components/LoadingSpinner';

test.describe('<LoadingSpinner>', () => {

	test('isLoading prop updates text', async ({ mount }) => {

		const component = await mount(<LoadingSpinner isLoading={true} />);

		// Should show a message if loading
		await expect(component.locator('[role="status"]')).not.toBeEmpty();

		// Should be empty if not loading
		// Extend timeout to account for delayed removal of text
		await component.update(<LoadingSpinner isLoading={false} />);
		await expect(component.locator('[role="status"]')).toBeEmpty({ timeout: 6_000 });

	});

	test('message prop customizes text', async ({ mount }) => {

		const component = await mount(
			<LoadingSpinner
				isLoading={true}
				message="Hello"
			/>
		);

		// Should show custom message
		await expect(component.locator('[role="status"]')).toHaveText('Hello');

		// Should update custom message
		await component.update(
			<LoadingSpinner
				isLoading={false}
				message="Goodbye"
			/>
		);
		await expect(component.locator('[role="status"]')).toHaveText('Goodbye');

	});


});
