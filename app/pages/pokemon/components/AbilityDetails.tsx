import { useGetAbilityByName } from '~/api/clients';

import { Placeholder } from '~/components/placeholder/Placeholder';
import { getEnglishEntry } from '~/utilities/getEnglishEntry';

// Styles for the placeholder content
// Outside of component for better performance
const placeHolderStyles = {
	term: {
		'--width': '9ch',
		'--margin-bottom': 'var(--space-xs)',
	},
	definition: {
		'--margin-bottom': 'var(--space-xs)',
	},
};

/**
 * Display the details for a Pokemon ability
 * @param {string} options.name The ability name
 * @param {string} options.url  The API endpoint to get details about the ability
 */
export function AbilityDetails ({
	name
}: {
	name: string;
}) {

	// Get more details about the ability from the API
	const { data, isPending, hasError } = useGetAbilityByName(name);

	// Get the first English language entry about the ability
	const effectDetails = data?.effect_entries ? getEnglishEntry(data?.effect_entries) : null;

	// Display placeholders while waiting for API data
	if (isPending) {
		return (
			<div className="margin-bottom-xxlarge">
				<Placeholder style={placeHolderStyles.term} />
				<Placeholder style={placeHolderStyles.definition} />
				<Placeholder style={placeHolderStyles.definition} />
			</div>
		);
	}

	if (hasError || !effectDetails || !('effect' in effectDetails)) {
		return null;
	}

	return (
		<>
			<dt className="font-secondary text-title-case">{name ?? 'Ability'}</dt>
			<dd>{effectDetails.effect}</dd>
		</>
	);
}
