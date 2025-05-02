import { Placeholder } from '~/components/placeholder/Placeholder';

import { useCallAPI } from '~/api/queries';
import { getEnglishEntry } from '~/utilities/getEnglishEntry';


/**
 * Display the details for a Pokemon ability
 * @param {string} options.name The ability name
 * @param {string} options.url  The API endpoint to get details about the ability
 */
export function AbilityDetails ({
	name,
	url,
}: {
	name: 'string';
	url: 'string';
}) {

	// Get more details about the ability from the API
	const { data, isPending, hasError } = useCallAPI(url);

	// Get the first English language entry about the ability
	const effectDetails = data?.effect_entries ? getEnglishEntry(data?.effect_entries) : null;

	// Display placeholders while waiting for API data
	if (isPending) {
		return (
			<>
				<Placeholder />
				<Placeholder style={{'--height': '10rem'}} />
			</>
		);
	}

	if (hasError || !effectDetails || !effectDetails.effect) {
		return null;
	}

	return (
		<>
			<dt className="font-secondary text-title-case">{name ?? 'Ability'}</dt>
			<dd>{effectDetails.effect}</dd>
		</>
	);
}
