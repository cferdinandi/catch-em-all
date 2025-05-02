import { Placeholder } from '~/components/placeholder/Placeholder';
import { dashToSpace } from '~/utilities/dashToSpace';

/**
 * Display Pokemon habitat details
 * @param {object} options.habitat Info about the Pokemon's habitat
 */
export function Habitat ({ habitat }: { habitat: any | null; }) {

	// Define styles for placeholder content
	const placeHolderStyles = {
		heading: {
			'--height': 'var(--font-size-l)',
			'--margin-bottom': 'var(--space-m)',
		},
		habitat: {
			'--width': '10ch',
		},
	};

	// Display placeholders while waiting for API data
	if (!habitat) {
		return (
			<div>
				<div className="padding-top-large">
					<Placeholder style={placeHolderStyles.heading} />
				</div>
				<Placeholder style={placeHolderStyles.habitat} />
			</div>
		);
	}

	if (!habitat.name) {
		return null;
	}

	return (
		<div data-testid="habitat">
			<h2 className="h3 margin-bottom-small">Habitat</h2>
			<span className="text-title-case">{dashToSpace(habitat.name)}</span>
		</div>
	)

}
