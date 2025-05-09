import { Placeholder } from '../placeholder/Placeholder';

const placeholderStyles = {
	'--height': '96px',
	'--width': '96px',
	'--border-radius': '50%',
	'margin': '0 auto',
};

export function PokemonSpritePlaceholder () {
	return  <Placeholder style={placeholderStyles} />;
}
