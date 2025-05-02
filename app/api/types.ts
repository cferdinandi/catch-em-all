// The API response structure
// @TODO update to reflect useState() and API types
export type CallAPI = {
	data: any;
	isPending: boolean;
	hasError: boolean;
}

// The paginated API response structure
// @TODO update to reflect useState() and API types
export type CallPaginatedAPI = CallAPI & {
	loadMore: Function;
	hasMore: boolean;
}
