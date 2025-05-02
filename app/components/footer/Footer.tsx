import { Link } from 'react-router';

import Logo from '~/img/logo.svg?react';
import styles from './footer.module.css';

export function Footer () {
	return (
		<footer className={styles.wrapper}>
			<nav className={`container container-large ${styles.nav}`}>
				<Link
					className={styles.link}
					to="/"
				>
					<Logo aria-hidden="true" /> Catch 'Em All
				</Link>
				<a href="https://pokeapi.co">Powered by the PokéAPI</a>
			</nav>
		</footer>
	);
}
