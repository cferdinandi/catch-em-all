import { test, expect } from '@playwright/experimental-ct-react';
import { getEnglishEntry } from '~/utilities/getEnglishEntry';

// Dummy entry from API data
const entries = [
	{
		effect: 'Wenn ein Pokémon mit dieser Fähigkeit nur noch 1/3 seiner maximalen hp oder weniger hat, werden all seine grass Attacken verstärkt, so dass sie 1,5× so viel regular damage anrichten wie sonst.',
		language: {
			name: 'de',
			url: 'https://pokeapi.co/api/v2/language/6/'
		},
		short_effect: 'Erhöht den Schaden von grass Attacken um 50% wenn nur noch 1/3 der maximalen hp oder weniger übrig sind.'
	},
	{
		effect: 'When this Pokémon has 1/3 or less of its HP remaining, its grass-type moves inflict 1.5× as much regular damage.',
		language: {
			name: 'en',
			url: 'https://pokeapi.co/api/v2/language/9/'
		},
		short_effect: 'Strengthens grass moves to inflict 1.5× damage at 1/3 max HP or less.'
	}
];

test.describe('getEnglishEntry()', () => {

	test('English entry to be returned', () => {
		const englishEntry = getEnglishEntry(entries);
		expect(englishEntry?.language.name).toBe('en');
	});

});
