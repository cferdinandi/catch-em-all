import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

export default [
	index('pages/home/index.tsx'),
	...prefix('pokemon', [
		index('pages/home/RedirectHome.tsx'),
		route(':name', 'pages/pokemon/index.tsx'),
	]),
] satisfies RouteConfig;
