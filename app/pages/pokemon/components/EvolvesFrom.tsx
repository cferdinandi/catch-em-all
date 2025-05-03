import type { NamedAPIResource } from 'pokenode-ts';
import { Link } from 'react-router';

/**
 * Display a link to the Pokemon this one evolves from
 * @param {object} options.evolution The evolution details, if any
 */
export function EvolvesFrom ({ evolution }: { evolution: NamedAPIResource | undefined; }) {

	if (!evolution || !evolution.name) {
		return null;
	}

	return (
		<div>
			<Link
				className="btn"
				to={`/pokemon/${evolution.name}`}
			>
				Evolves from <span className="text-title-case">{evolution.name}</span> &rarr;
			</Link>
		</div>
	)

}
