/**
 * Converts a string to title case
 * Generally CSS is the better choice for this
 * But the title and metadata aren't styled with CSS
 */
export function toTitleCase (text: string) {
	const normalize = text.toLowerCase();
	return normalize.split(' ').map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}).join(' ');
}
