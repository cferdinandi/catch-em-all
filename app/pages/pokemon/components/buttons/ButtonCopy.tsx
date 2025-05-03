import { useState } from 'react';
import Icon from  './icons/copy.svg?react';
import './icons.module.css';

/**
 * Copies a link to the current page to the user's clipboard
 * @param {string} options.name The name of the Pokemon (used for accessible button label)
 */
export function ButtonCopy ({ name }: { name: string; }) {

	// The link to copy
	const url = window.location.href;

	// Button label state
	const defaultLabel = 'Copy';
	const [label, setLabel] = useState(defaultLabel);
	const a11yLabel = defaultLabel === label ? '' : label;

	// Copy the URL to the clipboard
	async function copyToClipboard () {
		try {

			// Copy the URL
			await navigator.clipboard.writeText(url);

			// Temporarily update the button label after copying
			setLabel('Copied!');

			// Reset the button label after 5 seconds
			setTimeout(() => {
				setLabel(defaultLabel);
			}, 5000);

		} catch (error) {
			console.warn('Unable to copy.', error);
		}
	}

	return (
		<span data-testid="copy">
			<button
				className="btn-neutral btn-block btn-small"
				type="button"
				onClick={() => {
					copyToClipboard();
				}}
				aria-label={`${defaultLabel} link to ${name}`}
			>
				<Icon /> {label}
			</button>
			<div
				className="visually-hidden"
				// biome-ignore lint/a11y/useSemanticElements: better screen reader support
				role="status"
			>{a11yLabel}</div>
		</span>
	);

}
