import { useParams } from 'react-router';
import { useGetPokemonByName } from '~/api/clients';

import { PokemonSprite } from '~/components/PokemonSprite';
import { SpeciesDetails } from './components/SpeciesDetails';
import { ButtonCopy } from './components/buttons/ButtonCopy';
import { ButtonShare } from './components/buttons/ButtonShare';
import { Page404 } from '../404/Page404';

import { toTitleCase } from '~/utilities/toTitleCase';

export function Pokemon () {

	const { name } = useParams();
	const { data, hasError } = useGetPokemonByName(name ?? null);
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
						<PokemonSprite sprites={data?.sprites} />
					</div>
					<div
						className="row-auto-fit row-gap-small margin-bottom-xxlarge"
						style={{'--min-column-size': '8ch'} as React.CSSProperties}
					>
						<ButtonShare name={nameAsTitle} />
						<ButtonCopy name={nameAsTitle} />
					</div>
				</div>
				<div className="grid-two-thirds">
					<SpeciesDetails
						name={data?.species?.name}
						types={data?.types}
						abilities={data?.abilities}
					/>
				</div>
			</div>
		</main>
	);
}
