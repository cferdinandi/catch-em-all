import { useState } from 'react';
import Icon from  './icons/share.svg?react';
import './icons.module.css';

/**
 * Triggers to the OS-native share modal, if supported
 * @param {string} options.name The name of the Pokemon to share
 */
export function ButtonShare ({ name }: { name: string; }) {

	// The details to include on the share card
	const url = window.location.href;
	const title = `${name} - Catch 'em All!`;
	const text = `Learn more about ${name}`;

	// Button label state
	const defaultLabel = 'Share';
	const [label, setLabel] = useState(defaultLabel);
	const a11yLabel = defaultLabel === label ? '' : label;

	// Only show the button is the Share API is supported
	if (!navigator.share) {
		return null;
	}

	// Trigger the share card
	async function triggerShare () {
		try {

			// Open the share card
			await navigator.share({ title, url, text });

			// Temporarily update the button label after sharing
			setLabel('Shared!');

			// Reset the button label after 5 seconds
			setTimeout(() => {
				setLabel(defaultLabel);
			}, 5000);

		} catch (error) {
			console.warn('Unable to share.', error);
		}

	}

	return (
		<span data-testid="share">
			<button
				className="btn-neutral btn-block btn-small"
				onClick={(event) => {

					// Not needed but preemptively defensive
					event.preventDefault();
					event.stopPropagation();

					triggerShare();

				}}
				aria-label={`${defaultLabel} ${name}`}
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
