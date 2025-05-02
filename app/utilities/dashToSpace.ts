/**
 * Converts dashes to spaces
 * Used to normalize the responses for certain Pokemon API properties
 */
export function dashToSpace (text: string) {
	return text.replaceAll('-', ' ');
}
