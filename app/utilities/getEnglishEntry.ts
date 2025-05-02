/**
 * Get the first English-language entry from an array
 * Used specifically for API responses from the Pokemon API
 */
export function getEnglishEntry (items: Array<any> | null) {
	if (!items) {
		return null;
	}

	return items.find((item) => {
		return item?.language?.name === 'en';
	});
}
