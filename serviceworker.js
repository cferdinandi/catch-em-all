// Allows for versioned caching
const UPDATED_ON = '20250501';

// Cache IDs
const imgID = `${UPDATED_ON}_img`;
const apiID = `${UPDATED_ON}_api`;
const cacheIDs = [imgID, apiID];

// Max number of files in cache
const limits = {
	imgID: 50,
	apiID: 100,
};

// PokeAPI URL
const apiURL = 'https://pokeapi.co/api/';

// Cache duration in milliseconds
// 2 weeks: 1000ms * 60s * 60m * 24h * 14d
const apiCacheDuration = 1000 * 60 * 60 * 24 * 14;


//
// Methods
//

/**
 * Remove cached items over a certain number
 * @param  {String}  key The cache key
 * @param  {Integer} max The max number of items allowed
 */
async function trimCache (key, max) {
	const cache = await caches.open(key);
	const keys = await cache.keys();
	if (keys.length <= max) return;
	await cache.delete(keys[0]);
	trimCache(key, max);
}

/**
 * Check if cached API data is still valid
 * @param  {Object}  response The response object
 * @return {Boolean}          If true, cached data is valid
 */
function isValid (response) {
	if (!response) return false;
	let fetched = response.headers.get('sw-fetched-on');
	if (fetched && (parseFloat(fetched) + apiCacheDuration) > new Date().getTime()) return true;
	return false;
}


//
// Event Listeners
//

// On install, skip waiting and start caching immediately
self.addEventListener('install', () => {
	self.skipWaiting();
});

// On version update, remove old cached files
self.addEventListener('activate', async (event) => {
	const keys = await event.waitUntil(caches.keys());
	if (!keys?.length) return;
	await Promise.all(keys.filter((key) => {
		return !cacheIDs.includes(key);
	}).map((key) => {
		return caches.delete(key);
	}));
	return self.clients.claim();
});

// listen for requests
self.addEventListener('fetch', (event) => {

	// Get the request
	const request = event.request;

	// Bug fix
	// https://stackoverflow.com/a/49719964
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	// Ignore non-GET requests
	if (request.method !== 'GET') return;

	// Images
	// Offline-first
	if (request.headers.get('Accept').includes('image')) {
		event.respondWith(
			caches.match(request).then((response) => {
				return response || fetch(request).then(function (response) {

					// Save a copy of it in cache
					const copy = response.clone();
					event.waitUntil(caches.open(imgID).then(function (cache) {
						return cache.put(request, copy);
					}));

					// Return the response
					return response;

				});
			})
		);
		return;
	}

	// API Calls
	// Offline-first
	if (request.url.includes(apiURL)) {
		event.respondWith(
			caches.match(request).then((response) => {

				// If there's a cached API and it's still valid, use it
				const cachedAPI = response;
				if (isValid(response)) {
					return response;
				}

				// Otherwise, make a fresh API call
				return fetch(request).then((response) => {

					// Create a copy of the response and save it to the cache
					let copy = response.clone();
					event.waitUntil(caches.open(apiID).then((cache) => {
						let headers = new Headers(copy.headers);
						headers.append('sw-fetched-on', new Date().getTime());
						return copy.blob().then((body) => {
							return cache.put(request, new Response(body, {
								status: copy.status,
								statusText: copy.statusText,
								headers: headers
							}));
						});
					}));

					// Return the response
					return response;

				}).catch(() => {
					return cachedAPI;
				});

			})
		);
	}

});

// Trim caches over a certain size
self.addEventListener('message', (event) => {
	if (event.data !== 'sw-clean-up') return;
	for (const id of cacheIDs) {
		if (!limits[id]) continue;
		trimCache(id, limits[id]);
	};
});
