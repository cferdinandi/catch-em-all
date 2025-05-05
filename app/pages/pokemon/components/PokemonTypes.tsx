import type { PokemonType } from 'pokenode-ts';
import { Placeholder } from '~/components/placeholder/Placeholder';

// Define styles for the placeholder content
// Outside of component for performance reasons
const placeHolderStyles = {
	heading: {
		'--height': 'var(--font-size-l)',
		'--margin-bottom': 'var(--space-m)',
	},
	types: {
		'--width': '7ch',
	},
};

/**
 * Displays the Pokemon's types (eg. plant, water, etc.)
 * @param {array} options.types The type details
 */
export function PokemonTypes ({ types }: { types: Array<PokemonType> | undefined; }) {

	// Display placeholders while waiting for API data
	if (!types) {
		return (
			<div>
				<div className="padding-top-large">
					<Placeholder style={placeHolderStyles.heading} />
				</div>
				<ul className="list-inline">
					<li><Placeholder style={placeHolderStyles.types} /></li>
					<li><Placeholder style={placeHolderStyles.types} /></li>
				</ul>
			</div>
		);
	}

	if (!types.length) {
		return null;
	}

	return (
		<div data-testid="types">
			<h2 className="h3 margin-bottom-small">Types</h2>
			<ul className="list-inline">
				{types.map((typeData) => {
					const type = typeData?.type?.name;

					if (!type) {
						return null;
					}

					return (
						<li key={type} className="text-title-case">{type}</li>
					);
				})}
			</ul>
		</div>
	)

}
