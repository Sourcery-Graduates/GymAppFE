import { useMemo } from 'react';
import './Footer.scss';

const Footer = (): JSX.Element => {
	const currentYear: number = useMemo(() => {
		return new Date().getFullYear();
	}, []);

	return <footer className='footer'>Copyright © {currentYear} Sourcery graduates</footer>;
};

export default Footer;
