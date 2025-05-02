import { useCallAPI } from '~/api/queries';
import { pokemonURL } from '~/api/endpoints';

import { PlaceholderCard } from './PlaceholderCard';
import { PokemonSprite } from '~/components/PokemonSprite';
import { Link } from 'react-router';

import styles from './card.module.css';

/**
 * The individual card for one Pokemon
 * @param {string} options.name The name of the Pokemon (ex. Pikachu)
 */
export function PokemonCard ({ name }: { name: string; }) {

	const url = `${pokemonURL}/${name}`;
	const { data, hasError } = useCallAPI(url);

	if (hasError) {
		return null;
	}

	// While the data is loading, display a Placeholder element
	if (!data) {
		return (
			<PlaceholderCard />
		)
	}

	return (
		<div className={styles.card}>
			<Link
				className={styles['card-link']}
				to={`/pokemon/${name}`}
			>
				<div>
					<PokemonSprite sprites={data?.sprites} />
				</div>
				<span className="text-title-case">{name}</span>
			</Link>
		</div>
	);
}
