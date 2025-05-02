import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Service workers must be in the root directory
// which is why this isn't located in /app
import serviceWorker from '~/../serviceworker.js?url';

/**
 * Registers a service worker and sends cleanup message on each page
 * The main purpose of the SW is to cache images and API responses beyond the current session
 * API responses are automatically purged after two weeks
 * You wouldn't do this with every site, but where this API's responses are relatively static, it's a good strategy
 */
export function useRegisterServiceWorker () {
	const location = useLocation();

	useEffect(() => {

		// Initialize the service worker
		if (navigator && navigator.serviceWorker) {
			navigator.serviceWorker.register(serviceWorker);
		}

		// Cleanup old cache on page load
		if (navigator.serviceWorker.controller) {
			navigator.serviceWorker.controller?.postMessage('sw-clean-up');
		}

	}, [location]);
}
