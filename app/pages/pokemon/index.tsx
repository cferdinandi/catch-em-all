import { Pokemon } from './Pokemon';
import { toTitleCase } from '~/utilities/toTitleCase';

import type { Route } from "./+types";

export function meta ({ params }: Route.MetaArgs) {
	const { name } = params;
	const siteName = `Catch 'Em All!`;
	const title = `${toTitleCase(name)} | ${siteName}`;

	return [
		{ title },
		{
			name: 'description',
			content: `Learn more about ${toTitleCase(name)}.`
		},
	];
}

export default Pokemon;
