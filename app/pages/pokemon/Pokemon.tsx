import { useParams } from 'react-router';
import { useGetPokemonByName } from '~/api/clients';

import { PokemonSprite } from '~/components/sprite/PokemonSprite';
import { PokemonSpritePlaceholder } from '~/components/sprite/PokemonSpritePlaceholder';
import { SpeciesDetails } from './components/SpeciesDetails';
import { ButtonCopy } from './components/buttons/ButtonCopy';
import { ButtonShare } from './components/buttons/ButtonShare';
import { Page404 } from '../404/Page404';

import { toTitleCase } from '~/utilities/toTitleCase';

// Outside of component for better performance
const rowStyle = {'--min-column-size': '8ch'} as React.CSSProperties;

export function Pokemon () {

	const { name } = useParams();
	const { data, isPending, hasError } = useGetPokemonByName(name ?? null);
	const nameAsTitle = toTitleCase(name ?? '');

	if (hasError || !name) {
		return <Page404 />;
	}

	/**
	 * Placeholders for when content is loading are handled in the respective child components
	 * This helps ensure that they're styled as close to the current real HTML as possible
	 */
	return (
		<main
			key={name}
			className="container container-medium"
		>
			<h1>{nameAsTitle}</h1>
			<div className="row row-gap-xxxlarge">
				<div className="grid-third">
					<div className="text-align-center">
						{ isPending ? <PokemonSpritePlaceholder /> : <PokemonSprite sprites={data?.sprites} /> }
					</div>
					{/* Automated column layout to account for some browsers not supporting the Share API */}
					<div
						className="row-auto-fit row-gap-small margin-bottom-xxlarge"
						style={rowStyle}
					>
						{/* Wait until data has loaded to show buttons, in case there's an error with the API */}
						{ isPending ? null : <ButtonShare name={nameAsTitle} /> }
						{ isPending ? null : <ButtonCopy name={nameAsTitle} /> }
					</div>
				</div>
				<div className="grid-two-thirds">
					<SpeciesDetails
						name={data?.species?.name}
						types={data?.types}
						abilities={data?.abilities}
						isPokemonPending={isPending}
					/>
				</div>
			</div>
		</main>
	);
}
