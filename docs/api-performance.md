# API Performance

The [PokeAPI](https://pokeapi.co) used for this project requires numerous API calls to get the complete set of information needed.


## API Cache in Memory

To reduce the impact of these many API calls, the app uses two custom hooks for querying the API: `useCallAPI()` and `useCallPaginatedAPI()`.

These hooks implement an internal cache in browser memory so that once an endpoint is called, its data can be loaded from cache on subsequent calls instead of another HTTP request.

Under-the-hood, the system uses `fetch()` requests and a private object with public helper methods.

While there are third-party libraries that do similar things, having tighter control over the request and response structure with less overhead was an appealing choice.


## Service Worker

In addition to caching API calls in memory, the apps implements a service worker that caches API responses in the browser for up to two weeks.

Any API calls for cached endpoints are served from the service worker cache instead of a call to the network. This cache is preserved from one browser session to the next.

While this kind of caching doesn't work for all APIs, the PokeAPI is very static, making this kind of caching ideal.

The service worker also caches images and serves those locally on repeat visits as well. The more the user browses, the faster the app gets!


## Placeholder Content

The app includes a `<Placeholder>` component that displays a pulsing gray element.

This is used as a skeleton for where content will be loaded until the actual content becomes available. The height, width, and margin on the element can be controlled with CSS variables.
