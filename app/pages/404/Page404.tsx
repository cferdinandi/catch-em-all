import { usePrefersReducedMotion } from './usePrefersReduceMotion';

import { Nav } from '~/components/nav/Nav';
import { Footer } from '~/components/footer/Footer';

import img404 from '~/img/sunflora-sunflower.jpg';
import gif404 from '~/img/sunflora-sunflower.gif';

export function Page404 () {
	const { matches: reduceMotion } = usePrefersReducedMotion();
	const imgSrc = reduceMotion ? img404 : gif404;

	return (
		<>
			<Nav />
			<main className="container">
				<h1>On no!</h1>
				<img className="img-full-width" alt="Ash and Pikachu running after a Sunflora" src={imgSrc} />
				<p>We couldn't catch this one! Please try again.</p>
				<p>If you continue to see this message, please contact the site admin at <a href="mailto:notarealemail@gomakethings.com">notarealemail@gomakethings.com</a>.</p>
			</main>
			<Footer />
		</>
	);
}
