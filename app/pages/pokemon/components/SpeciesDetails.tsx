import { useGetSpeciesByName } from '~/api/clients';

import { Abilities } from './Abilities';
import { EvolvesFrom } from './EvolvesFrom';
import { FlavorText } from './FlavorText';
import { Habitat } from './Habitat';
import { PokemonTypes } from './PokemonTypes';

import type { PokemonAbility, PokemonType } from 'pokenode-ts';

/**
 * Displays details about the Pokemon species
 * @param {string} options.name      The species name
 * @param {array}  options.types     The Pokemon type data (ex. plant, water, etc.)
 * @param {array}  options.abilities The Pokemon's special abilities
 */
export function SpeciesDetails ({
	name,
	types,
	abilities,
	isPokemonPending,
}: {
	name: string | undefined;
	types: Array<PokemonType> | undefined;
	abilities: Array<PokemonAbility> | undefined;
	isPokemonPending: boolean;
}) {

	const { data, isPending } = useGetSpeciesByName(name);

	if (!name && !isPokemonPending) {
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
