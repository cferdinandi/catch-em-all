# API Performance

The [PokeAPI](https://pokeapi.co) used for this project requires numerous API calls to get the complete set of information needed.


## API Cache in Memory

To reduce the impact of these many API calls, the app a library that automatically caches API responses in memory.

The homepage features a "Load More" button. A custom react hook combines paginated responses into one array that persists across route changes, avoiding needless reloads.


## Service Worker

In addition to caching API calls in memory, the apps implements a service worker that caches API responses in the browser for up to two weeks.

Any API calls for cached endpoints are served from the service worker cache instead of a call to the network. This cache is preserved from one browser session to the next.

While this kind of caching doesn't work for all APIs, the PokeAPI is very static, making this kind of caching ideal.

The service worker also caches images and serves those locally on repeat visits as well. The more the user browses, the faster the app gets!


## Placeholder Content

The app includes a `<Placeholder>` component that displays a pulsing gray element.

This is used as a skeleton for where content will be loaded until the actual content becomes available. The height, width, and margin on the element can be controlled with CSS variables.
