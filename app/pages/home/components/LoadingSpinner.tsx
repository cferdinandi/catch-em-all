import { useEffect, useState } from 'react';
import styles from './loading.module.css';

/**
 * Displays a loading spinner with accessible text
 * Announces when content has been loaded to screen readers
 * Displays just text when prefers-reduced-motion is enabled
 * @link https://loading.io/css/
 * @param {Boolean} options.isLoading If true, content is loading and icon should be displayed
 * @param {String}  options.message   The message to display given the current state
 */
export function LoadingSpinner ({
	isLoading = true,
	message,
}: {
	isLoading: boolean;
	message?: string;
}) {

	// Messages to use based on the isLoading state
	// Defaults to message property, with fallbacks
	const messages = {
		loading: message ?? 'Loading...',
		loaded: message ?? 'Content loaded',
	};

	// The current message to use
	const [label, setLabel] = useState(() => {
		return isLoading ? messages.loading : '';
	});

	// Update the label when isLoading state changes
	useEffect(() => {
		setLabel(isLoading ? messages.loading : messages.loaded);
		if (!isLoading) {
			const timer = setTimeout(() => {
				setLabel('');
			}, 5000);

			return () => {
				clearTimeout(timer);
			}
		}
	}, [isLoading]);

	return (
		<div data-is-loading={isLoading}>
			<div
				className={styles.ring}
				data-loading-ring
			>
				<div />
				<div />
				<div />
				<div />
			</div>
			<div
				className={styles.message}
				role="status"
			>{label}</div>
		</div>
	);
}
