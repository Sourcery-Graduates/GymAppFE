import { useMemo } from 'react';
import './Footer.scss';

const Footer = (): JSX.Element => {
	const currentYear: number = useMemo(() => {
		return new Date().getFullYear();
	}, []);

	return <div className='footer'>Copyright © {currentYear} Sourcery graduates</div>;
};

export default Footer;
