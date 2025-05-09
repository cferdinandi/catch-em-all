import { useEffect, useState } from 'react';
import { PokemonClient } from 'pokenode-ts';
import type { Ability, NamedAPIResource, Pokemon, PokemonSpecies } from 'pokenode-ts';

// Hold API response list in memory
let pokemonList: NamedAPIResource[] | null = null;
let apiHasMore = false;

/**
 * Get all Pokemon
 * Automatically tracks and returns previously loaded calls
 */
export function useGetAllPokemon () {

	// Setup state hooks
	const [data, setData] = useState<NamedAPIResource[] | null>(() => {
		return pokemonList;
	});
	const [hasMore, setHasMore] = useState(() => {
		return apiHasMore;
	})
	const [isPending, setIsPending] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [isNext, setIsNext] = useState(false);

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
			const api = new PokemonClient();
			const response = await api.listPokemons(pokemonList?.length ?? 0);
			if (!response) {
				throw 'no response';
			}

			// Update response in memory
			pokemonList = pokemonList ? [...pokemonList, ...response.results] : response.results;
			apiHasMore = !!response?.next;

			// Update states
			setData(pokemonList);
			setHasMore(apiHasMore);
			setIsPending(false);
			setIsNext(true);

		} catch (error) {
			setIsPending(false);
			setHasError(true);
		}

	}

	if (!pokemonList) {
		callAPI();
	}

	return {
		data,              // The API response, once available
		loadMore: callAPI, // A function for calling the next endpoint in the paginated request
		hasMore,           // If true, there are more results that can be loaded
		isPending,         // If true, API call is in-progress
		isNext,            // If true, loading Pokemon beyond the initial load
		hasError           // If true, there was an API error
	}

}

/**
 * Convenience wrapper for getting a Pokemon by name
 */
export function useGetPokemonByName (id: string | null | undefined) {

	// Setup state hooks
	const [data, setData] = useState<Pokemon | null>(null);
	const [isPending, setIsPending] = useState(false);
	const [hasError, setHasError] = useState(false);

	// If the id changes, flush state
	useEffect(() => {
		setData(null);
		setIsPending(false);
		if (!id) return;
		callAPI();
	}, [id]);

	async function callAPI () {

		// If an API call is already in progress, do not call it again until resolved
		if (isPending || hasError || !id) {
			return;
		}

		// Update pending and error states
		setIsPending(true);
		setHasError(false);

		try {

			// Call the API and parse the response
			const api = new PokemonClient();
			const response = await api.getPokemonByName(id);
			if (!response) {
				throw 'no response';
			}

			// Update states
			setData(response);
			setIsPending(false);

		} catch (error) {
			setIsPending(false);
			setHasError(true);
		}

	}

	if (!data) {
		callAPI();
	}

	return {
		data,      // The API response, once available
		isPending, // If true, API call is in-progress
		hasError   // If true, there was an API error
	}

}

export function useGetAbilityByName (id: string | null | undefined) {

	// Setup state hooks
	const [data, setData] = useState<Ability | null>(null);
	const [isPending, setIsPending] = useState(false);
	const [hasError, setHasError] = useState(false);

	// If the id changes, flush state
	useEffect(() => {
		setData(null);
		setIsPending(false);
		if (!id) return;
		callAPI();
	}, [id]);

	async function callAPI () {

		// If an API call is already in progress, do not call it again until resolved
		if (isPending || hasError || !id) {
			return;
		}

		// Update pending and error states
		setIsPending(true);
		setHasError(false);

		try {

			// Call the API and parse the response
			const api = new PokemonClient();
			const response = await api.getAbilityByName(id);
			if (!response) {
				throw 'no response';
			}

			// Update states
			setData(response);
			setIsPending(false);

		} catch (error) {
			setIsPending(false);
			setHasError(true);
		}

	}

	if (!data) {
		callAPI();
	}

	return {
		data,      // The API response, once available
		isPending, // If true, API call is in-progress
		hasError   // If true, there was an API error
	}

}

export function useGetSpeciesByName (id: string | null | undefined) {

	// Setup state hooks
	const [data, setData] = useState<PokemonSpecies | null>(null);
	const [isPending, setIsPending] = useState(false);
	const [hasError, setHasError] = useState(false);

	// If the id changes, flush state
	useEffect(() => {
		setData(null);
		setIsPending(false);
		if (!id) return;
		callAPI();
	}, [id]);

	async function callAPI () {

		// If an API call is already in progress, do not call it again until resolved
		if (isPending || hasError || !id) {
			return;
		}

		// Update pending and error states
		setIsPending(true);
		setHasError(false);

		try {

			// Call the API and parse the response
			const api = new PokemonClient();
			const response = await api.getPokemonSpeciesByName(id);
			if (!response) {
				throw 'no response';
			}

			// Update states
			setData(response);
			setIsPending(false);

		} catch (error) {
			setIsPending(false);
			setHasError(true);
		}

	}

	if (!data) {
		callAPI();
	}

	return {
		data,      // The API response, once available
		isPending, // If true, API call is in-progress
		hasError   // If true, there was an API error
	}

}
