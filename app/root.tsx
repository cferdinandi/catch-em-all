import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';

import { Nav } from './components/nav/Nav';
import { Footer } from './components/footer/Footer';
import { Page404 } from './pages/404/Page404';

import { useFocusOnLocationChange } from './utilities/useFocusOnLocationChange';
import { useRegisterServiceWorker } from './utilities/useRegisterServiceWorker';

import favicon from './img/favicon.ico';

// Load global CSS
import colors from  './css/colors.css?url';
import theme from './css/theme.css?url';
import reset from './css/reset.css?url';
import typography from './css/typography.css?url';
import buttons from './css/buttons.css?url';
import layout from './css/layout.css?url';
import grid from './css/grid.css?url';
import utilities from './css/utilities.css?url';
import a11y from './css/accessibility.css?url';

// Create the ref objects for each style
const globalStyles = [
	colors,
	theme,
	reset,
	typography,
	buttons,
	layout,
	grid,
	utilities,
	a11y,
].map((file) => {
	return {
		rel: 'stylesheet',
		href: file,
	};
});

export const links: Route.LinksFunction = () => [
	{
		rel: 'shortcut icon',
		sizes: '16x16 24x24 32x32 64x64',
		href: favicon,
	},
	...globalStyles,
];

export function Layout ({ children }: { children: React.ReactNode }) {

	useFocusOnLocationChange();
	useRegisterServiceWorker();

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);

}

export default function App () {
	return (
		<>
			<Nav />
			<Outlet />
			<Footer />
		</>
	);
}

export function ErrorBoundary ({ error }: Route.ErrorBoundaryProps) {

	if (import.meta.env.DEV && error && error instanceof Error) {
		console.warn('Route Error:', error.message, error.stack);
	}

	return <Page404 />;

}
