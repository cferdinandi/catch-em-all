import { test, expect } from '@playwright/experimental-ct-react';
import { dashToSpace } from '~/utilities/dashToSpace';

test.describe('dashToSpace()', () => {

	test('all dashes are replaced with spaces', () => {
		const stringWithDashes = 'hello-world! How ARE-you ToDaY?';
		const stringDashesRemoved = dashToSpace(stringWithDashes);
		expect(stringDashesRemoved).toBe('hello world! How ARE you ToDaY?');
	});

});
