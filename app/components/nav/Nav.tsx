import { Link } from 'react-router';

import Logo from '~/img/logo.svg?react';
import styles from './nav.module.css';

export function Nav () {
	return (
		<header className={styles.wrapper}>
			<nav className="container container-large text-align-center">
				<Link
					className={styles.link}
					to="/"
				>
					<Logo
						className={styles.logo}
						aria-hidden="true"
					/> Catch 'Em All
				</Link>
			</nav>
		</header>
	);
}
