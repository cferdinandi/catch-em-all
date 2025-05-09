import styles from './placeholder.module.css';

/**
 * Creates a pulsing placeholder element until content loads from the API
 * The size and margin of the element can be controlled with CSS variables applied with the style prop
 * See the styles module for details
 */
export function Placeholder ({ ...props }) {
	return (
		<div
			className={styles.placeholder}
			// For e2e testing
			// https://playwright.dev/docs/locators#locate-by-test-id
			data-testid="placeholder"
			{ ...props }
		/>
	);
}
