import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Shifts focus to heading on route changes
 * ReactRouter historically did this automatically, but seems to no longer do so
 * @link https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/
 */
export function useFocusOnLocationChange () {
	const location = useLocation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: location required to trigger behavior on route changes
	useEffect(() => {
		const h1 = document.querySelector('h1');
		const tabIndex = h1?.getAttribute('tabindex');
		h1?.setAttribute('tabindex', tabIndex ?? '-1');
		h1?.focus();
	}, [location]);
}
