import { useCallAPI } from '~/api/queries';

import { Abilities } from './Abilities';
import { EvolvesFrom } from './EvolvesFrom';
import { FlavorText } from './FlavorText';
import { Habitat } from './Habitat';
import { PokemonTypes } from './PokemonTypes';

/**
 * Displays details about the Pokemon species
 * @TODO Update type details with TS for API responses
 * @param {string} options.url       The API endpoint for getting more info
 * @param {array}  options.types     The Pokemon type data (ex. plant, water, etc.)
 * @param {array}  options.abilities The Pokemon's special abilities
 */
export function SpeciesDetails ({
	url,
	types,
	abilities,
}: {
	url: string;
	types: Array<any>;
	abilities: Array<any> | null;
}) {

	const { data, hasError } = useCallAPI(url);

	if (hasError) {
		return null;
	}

	return (
		<div>
			<FlavorText entries={data?.flavor_text_entries} />
			<div className="row">
				<div className="grid-half">
					<PokemonTypes types={types} />
				</div>
				<div className="grid-half">
					<Habitat habitat={data?.habitat} />
				</div>
			</div>
			<Abilities abilities={abilities} />
			<EvolvesFrom evolution={data?.evolves_from_species} />
		</div>
	);

}
