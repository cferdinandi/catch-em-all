import { useGetAllPokemon } from '~/api/clients';
import type { NamedAPIResource } from 'pokenode-ts';

import { PokemonCard } from './components/PokemonCard/PokemonCard';
import { PlaceHolderGrid } from './components/PlaceholderGrid';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';

export function Home () {

	// Gets a list of Pokemon from the API, and a function to request more
	const { data, loadMore, hasMore, isNext, isPending, hasError } = useGetAllPokemon();

	// Don't display a status message on initial load
	let statusMessage = '';

	// DO display a status message when loading more Pokemon
	if (isNext) {
		if (isPending) {
			statusMessage = 'Catching more Pokémon...';
		} else if (hasError) {
			statusMessage = 'Unable to load Pokémon...';
		} else {
			statusMessage = 'Caught them!';
		}
	}

	return (
		<main className="container container-large">
			<h1>Catch 'Em All!</h1>
			<p>Which Pokémon do you want to learn more about today?</p>

			<div className="row-auto-fit margin-bottom-xlarge">
				{data ? data?.map((pokemon: NamedAPIResource) => {
					const { name } = pokemon;

					if (!name) {
						return null;
					}

					return (
						<PokemonCard
							key={name}
							name={name}
						/>
					);
				}) : (
					<PlaceHolderGrid />
				)}
			</div>

			<div className="padding-top margin-bottom-large text-align-center">
				<LoadingSpinner
					isLoading={isPending}
					message={statusMessage}
				/>
			</div>

			{hasMore ? (
				<div className="text-align-center margin-bottom-large">
					<button
						className="btn-large"
						data-is-disabled={isPending}
						type="button"
						onClick={() => {
							loadMore();
						}}
					>
						Load More
					</button>
				</div>
			) : null}
		</main>
	);
}
