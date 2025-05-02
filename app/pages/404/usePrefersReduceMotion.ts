import { useEffect, useState, type ChangeEvent } from 'react';

/**
 * A hook to check if user has prefers-reduce-motion enabled
 * Automatically updates when the user updates their preferences
 */
export function usePrefersReducedMotion () {

	// If true, user prefers reduced motion
	const [matches, setMatches] = useState(false);

	// Callback function for updating user preference
	function updateMatches (event: MediaQueryListEvent) {
		setMatches(event.matches);
	}

	// On render, sets user preference and listens for changes
	useEffect(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion)');
		setMatches(prefersReducedMotion.matches);

		prefersReducedMotion.addEventListener('change', updateMatches);

		return () => {
			prefersReducedMotion.removeEventListener('change', updateMatches);
		}
	}, []);

	return { matches };

}
