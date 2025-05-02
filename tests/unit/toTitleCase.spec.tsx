import { test, expect } from '@playwright/experimental-ct-react';
import { toTitleCase } from '~/utilities/toTitleCase';


test.describe('toTitleCase()', () => {

	test('English entry to be returned', () => {

		// lowercase
		expect(toTitleCase('hello world!')).toBe('Hello World!');

		// uppercase
		expect(toTitleCase('HELLO WORLD!')).toBe('Hello World!');

		// mixed case
		expect(toTitleCase('hElLo WoRlD!')).toBe('Hello World!');

	});

});
