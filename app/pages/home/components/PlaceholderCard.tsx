import { Placeholder } from '~/components/placeholder/Placeholder';

// Placeholder custom styles
// Outside of component for better performance
const cssProps = {
	'--border-radius': 'var(--border-radius-s)',
	'--height': '9.5rem',
};

// The placeholder for an individual Pokemon card
export function PlaceholderCard () {
	return <Placeholder style={cssProps} />;
}
