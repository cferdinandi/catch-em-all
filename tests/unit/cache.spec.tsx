import { test, expect } from '@playwright/experimental-ct-react';
import { getCache, setCache, mergeCache, removeCache } from '~/api/cache';


// The E2E testing suite checks that the API calls actually save to cache
// These tests ensure the functions do what they're supposed to
test.describe('API cache library', () => {

	const id = 'unit_test';
	const data = {
		name: 'Merlin',
		spells: ['abra', 'cadabra']
	};

	test('setCache() & getCache()', () => {

		// initial cache should be empty
		expect(getCache(id)).toBe(null);

		// add item to cache
		setCache(id, data);

		// make sure data is now in cache
		expect(getCache(id)).toEqual(data);

	});

	test('mergeCache()', () => {

		const updatedData = {
			spells: ['now', 'you', 'see', 'me']
		};
		const mergedSpells = [...data.spells, ...updatedData.spells];

		// set initial cache
		setCache(id, data);

		// merge in new data
		mergeCache(id, updatedData);

		// new spells should be included in cache with original ones
		expect(getCache(id)?.spells).toEqual(mergedSpells);

	});

	test('deleteCache()', () => {

		// set cache, then delete it
		setCache(id, data);
		removeCache(id);

		// cache should be gone
		expect(getCache(id)).toBe(null);

	});

});
