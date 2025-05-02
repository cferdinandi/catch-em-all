import { Placeholder } from '~/components/placeholder/Placeholder';

// The placeholder for an individual Pokemon card
export function PlaceholderCard () {
	const cssProps = {
		'--border-radius': 'var(--border-radius-s)',
		'--height': '9.5rem',
	};

	return <Placeholder style={cssProps} />;
}
