import { AbilityDetails } from './AbilityDetails';
import { Placeholder } from '~/components/placeholder/Placeholder';


/**
 * Displays info about the Pokemon's special abilities, if any
 * @param {array} options.abilities The special ability info
 */
export function Abilities ({ abilities }: { abilities: Array<any> | null; }) {

	// Styles for the placeholder content
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
		<div className="margin-bottom-xxlarge">
			<h2 className="h3">Abilities</h2>
			<dl>
			{abilities.map((item) => {
				const { name, url } = item.ability;
				return (
					<AbilityDetails
						key={name}
						name={name}
						url={url}
					/>
				);
			})}
			</dl>
		</div>
	)

}
