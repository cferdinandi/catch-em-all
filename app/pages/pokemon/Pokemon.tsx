import { useCallAPI } from '~/api/queries';
import { useParams } from 'react-router';
import { pokemonURL } from '~/api/endpoints';

import { PokemonSprite } from '~/components/PokemonSprite';
import { SpeciesDetails } from './components/SpeciesDetails';
import { ButtonCopy } from './components/buttons/ButtonCopy';
import { ButtonShare } from './components/buttons/ButtonShare';
import { Page404 } from '../404/Page404';

import { toTitleCase } from '~/utilities/toTitleCase';

export function Pokemon () {

	const { name } = useParams();
	const { data, hasError } = useCallAPI(`${pokemonURL}/${name}`);
	const nameAsTitle = toTitleCase(name ?? '');

	if (hasError || !name) {
		return <Page404 />;
	}

	/**
	 * Placeholders for when content is loading are handled in the respective child components
	 * This helps ensure that they're styled as close to the current real HTML as possible
	 */
	return (
		<main className="container container-medium">
			<h1>{nameAsTitle}</h1>
			<div className="row row-gap-xxxlarge">
				<div className="grid-third">
					<div className="text-align-center">
						<PokemonSprite sprites={data?.sprites} />
					</div>
					<div className="row margin-bottom-xxlarge">
						<div className="grid-half">
							<ButtonShare name={nameAsTitle} />
						</div>
						<div className="grid-half">
							<ButtonCopy name={nameAsTitle} />
						</div>
					</div>
				</div>
				<div className="grid-two-thirds">
					<SpeciesDetails
						url={data?.species?.url}
						types={data?.types}
						abilities={data?.abilities}
					/>
				</div>
			</div>
		</main>
	);
}
