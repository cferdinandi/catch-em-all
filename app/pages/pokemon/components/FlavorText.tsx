import type { FlavorText as PokemonFlavorTest } from 'pokenode-ts';
import { Placeholder } from '~/components/placeholder/Placeholder';
import { getEnglishEntry } from '~/utilities/getEnglishEntry';

/**
 * Display flavor text about the Pokemon (usually a short bio or fun fact)
 * @param {array} options.entries A selection of flavor text in different languages
 */
export function FlavorText ({ entries }: { entries: Array<PokemonFlavorTest> | undefined; }) {

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
	const englishEntry = getEnglishEntry(entries);
	const flavor_text = englishEntry && 'flavor_text' in englishEntry ? englishEntry?.flavor_text : null;
	if (!flavor_text) {
		return null;
	}

	// data-testid for e2e testing
	// https://playwright.dev/docs/locators#locate-by-test-id
	return (
		<p data-testid="flavor-text">
			{flavor_text}
		</p>
	)

}
