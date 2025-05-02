import { getCache, mergeCache, setCache } from './cache';
import { useEffect, useState } from 'react';

import type { CallAPI, CallPaginatedAPI } from './types';

/**
 * A React hook wrapper for calling and caching APIs
 * @param  {string}  endpoint The API endpoint to call
 * @return {CallAPI}          Hooks for managing the API state and response
 */
export function useCallAPI (endpoint: string): CallAPI {

	// Check for existing data in the cache
	const cachedData = getCache(endpoint);

	// Setup state hooks
	const [data, setData] = useState(cachedData);
	const [isPending, setIsPending] = useState(false);
	const [hasError, setHasError] = useState(false);

	// If the endpoint changes, flush state
	useEffect(() => {
		const newCachedData = getCache(endpoint);
		setData(newCachedData);
		if (!newCachedData) {
			callAPI();
		}
	}, [endpoint]);

	async function callAPI () {

		// If an API call is already in progress, do not call it again until resolved
		if (isPending) {
			return;
		}

		// Update pending and error states
		setIsPending(true);
		setHasError(false);

		try {

			// Call the API and parse the response
			const request = await fetch(endpoint);
			if (!request.ok) throw request;
			const response = await request.json();

			// Store the response in cache
			setCache(endpoint, response);

			// Update states
			setData(response);
			setIsPending(false);

		} catch (error) {
			setIsPending(false);
			setHasError(true);
		}

	}

	// If there's no cached data, call the API
	if (!cachedData) {
		callAPI();
	}

	return {
		data,      // The API response, once available
		isPending, // If true, API call is in-progress
		hasError   // If true, there was an API error
	};

}

/**
 * A React hook wrapper for calling and caching paginated APIs
 * @param  {string}           endpoint The API endpoint to call
 * @return {CallPaginatedAPI}          Hooks for managing the API state and response, and loading more results
 */
export function useCallPaginatedAPI (endpoint: string): CallPaginatedAPI {

	// Check for existing data in the cache
	const cachedData = getCache(endpoint);

	// If there's cached data, use the URL for the next set of paginated responses
	// Otherwise, use the provided endpoint
	let url = cachedData?.next ?? endpoint;

	// Setup state hooks
	const [data, setData] = useState(cachedData);
	const [hasMore, setHasMore] = useState(cachedData?.next);
	const [isPending, setIsPending] = useState(false);
	const [hasError, setHasError] = useState(false);

	// If the endpoint changes, flush state
	useEffect(() => {
		const newCachedData = getCache(endpoint);
		setData(newCachedData);
		if (!newCachedData) {
			callAPI();
		}
	}, [endpoint]);

	async function callAPI () {

		// If an API call is already in progress, do not call it again until resolved
		if (isPending) {
			return;
		}

		// Update pending and error states
		setIsPending(true);
		setHasError(false);

		try {

			// Call the API and parse the response
			const request = await fetch(url);
			if (!request.ok) throw request;
			const response = await request.json();

			// Merge the response results into the existing cache (if one exists)
			const results = mergeCache(endpoint, response);

			// Update the URL for the next pagination call
			url = response.next;

			// Update states
			setData(results);
			setHasMore(!!response.next);
			setIsPending(false);

		} catch (error) {
			setIsPending(false);
			setHasError(true);
		}

	}

	// If there's no cached data, call the API
	if (!cachedData) {
		callAPI();
	}

	return {
		data,              // The API response, once available
		loadMore: callAPI, // A function for calling the next endpoint in the paginated request
		hasMore,           // If true, there are more results that can be loaded
		isPending,         // If true, API call is in-progress
		hasError           // If true, there was an API error
	};

}
