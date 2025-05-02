import { mergeWith } from 'lodash-es';

type Cache = {
	// @TODO update with the types for API responses
	[key: string]: any;
};

/**
 * Cached API responses
 * Stored outside of hooks so it will persist across components
 */
const cache: Cache = {};

/**
 * Merge arrays into each other instead of overwriting them when combining paginated API responses
 * @TODO update types
 * @param {any} obj1 The existing API response
 * @param {any} obj2 The new API response
 */
function deepMerge (obj1: any, obj2: any) {
	return mergeWith(obj1, obj2, (obj1, obj2) => {
		if (Array.isArray(obj1)) {
			return [...obj1, ...obj2];
		}
	})
}

/**
 * Get stored data in the cache, if it exists
 * @param {string} key The cache key (typically the endpoint)
 */
export function getCache (key: string) {
	return cache[key] ? structuredClone(cache[key]) : null;
}

/**
 * Add data to the cache
 * @TODO update types
 * @param {string} key  The cache key (typically the endpoint)
 * @param {any}    data An immutable copy of the cached API response
 */
export function setCache (key: string, data: any) {
	cache[key] = data;
	return structuredClone(data);
}

/**
 * Merge new data into an existing cache
 * Used for paginated API calls
 * @param {string} key  The cache key (typically the endpoint)
 * @param {any}    data An immutable copy of the cached API response
 */
export function mergeCache (key: string, data: any) {
	const existing = getCache(key);
	if (!existing) {
		return setCache(key, data);
	}
	const merged = deepMerge(existing, data);
	return setCache(key, merged);
}

/**
 * Remove an item from the cache
 * @param {string} key The cache key (typically the endpoint)
 */
export function removeCache (key: string) {
	delete cache[key];
}
