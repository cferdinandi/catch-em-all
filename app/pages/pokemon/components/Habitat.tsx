import type { NamedAPIResource } from 'pokenode-ts';
import { Placeholder } from '~/components/placeholder/Placeholder';
import { dashToSpace } from '~/utilities/dashToSpace';

// Define styles for placeholder content
// Outside of component for better performance
const placeHolderStyles = {
	heading: {
		'--height': 'var(--font-size-l)',
		'--margin-bottom': 'var(--space-m)',
	},
	habitat: {
		'--width': '10ch',
	},
};

/**
 * Display Pokemon habitat details
 * @param {object} options.habitat Info about the Pokemon's habitat
 */
export function Habitat ({ habitat }: { habitat: NamedAPIResource | null | undefined; }) {

	// Display placeholders while waiting for API data
	if (habitat === undefined) {
		return (
			<div>
				<div className="padding-top-large">
					<Placeholder style={placeHolderStyles.heading} />
				</div>
				<Placeholder style={placeHolderStyles.habitat} />
			</div>
		);
	}

	return (
		<div data-testid="habitat">
			<h2 className="h3 margin-bottom-small">Habitat</h2>
			<span className="text-title-case">{!habitat ? 'none' : dashToSpace(habitat.name)}</span>
		</div>
	)

}
