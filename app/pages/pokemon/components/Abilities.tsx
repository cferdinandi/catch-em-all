import type { PokemonAbility } from 'pokenode-ts';
import { AbilityDetails } from './AbilityDetails';
import { Placeholder } from '~/components/placeholder/Placeholder';


// Styles for the placeholder content
// Outside of component for better performance
const placeHolderStyles = {
	heading: {
		'--height': 'var(--font-size-l)',
		'--width': '12ch',
		'--margin-bottom': 'var(--space-m)',
	},
	term: {
		'--width': '9ch',
		'--margin-bottom': 'var(--space-xs)',
	},
	definition: {
		'--margin-bottom': 'var(--space-xs)',
	},
};

/**
 * Displays info about the Pokemon's special abilities, if any
 * @param {array} options.abilities The special ability info
 */
export function Abilities ({ abilities }: { abilities: Array<PokemonAbility> | undefined; }) {

	// Display a placeholder while waiting for API data
	if (!abilities) {
		return (
			<div className="margin-bottom-xxlarge">
				<div className="padding-top-large">
					<Placeholder style={placeHolderStyles.heading} />
				</div>
				<div className="margin-bottom-xlarge">
					<Placeholder style={placeHolderStyles.term} />
					<Placeholder style={placeHolderStyles.definition} />
					<Placeholder style={placeHolderStyles.definition} />
					<Placeholder style={placeHolderStyles.definition} />
				</div>
				<div className="margin-bottom-xlarge">
					<Placeholder style={placeHolderStyles.term} />
					<Placeholder style={placeHolderStyles.definition} />
					<Placeholder style={placeHolderStyles.definition} />
					<Placeholder style={placeHolderStyles.definition} />
				</div>
			</div>
		);
	}

	if (!abilities.length) {
		return null;
	}

	return (
		<div
			className="margin-bottom-xxlarge"
			data-testid="abilities"
		>
			<h2 className="h3">Abilities</h2>
			<dl>
			{abilities.map((item) => {
				const { name } = item.ability;
				return (
					<AbilityDetails
						key={name}
						name={name}
					/>
				);
			})}
			</dl>
		</div>
	)

}
