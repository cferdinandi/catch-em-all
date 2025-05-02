import { useCallPaginatedAPI } from '~/api/queries';
import { pokemonURL } from '~/api/endpoints';

import { PokemonCard } from './components/PokemonCard';
import { PlaceHolderGrid } from './components/PlaceholderGrid';
import { LoadingSpinner } from './components/LoadingSpinner';

export function Home () {

	// Gets a list of Pokemon from the API, and a function to request more
	const { data, loadMore, hasMore, isPending, hasError } = useCallPaginatedAPI(pokemonURL);

	// Don't display a status message on initial load
	let statusMessage = '';

	// DO display a status message when loading more Pokemon
	if (!!data?.previous) {
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

			<div className="row row-auto-fit margin-bottom-xlarge">
				{data?.results ? data?.results?.map((pokemon: any) => {
					const { name, url } = pokemon;

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
						data-is-loading={isPending}
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();
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
