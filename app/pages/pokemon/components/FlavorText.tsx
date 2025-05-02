import { Placeholder } from '~/components/placeholder/Placeholder';
import { getEnglishEntry } from '~/utilities/getEnglishEntry';

/**
 * Display flavor text about the Pokemon (usually a short bio or fun fact)
 * @param {array} options.entries A selection of flavor text in different languages
 */
export function FlavorText ({ entries }: { entries: Array<any> | null; }) {

	// Define placeholder content styles
	const placeHolderStyles = {
		'--margin-bottom': 'var(--space-xs)',
	};

	// Display placeholders while waiting for API data
	if (!entries) {
		return (
			<div className="margin-bottom-xxlarge">
				<Placeholder style={placeHolderStyles} />
				<Placeholder style={placeHolderStyles} />
			</div>
		);
	}

	if (!entries.length) {
		return null;
	}

	// Get the first English language entry
	const { flavor_text } = getEnglishEntry(entries);
	if (!flavor_text) {
		return null;
	}

	return (
		<p>
			{flavor_text}
		</p>
	)

}
