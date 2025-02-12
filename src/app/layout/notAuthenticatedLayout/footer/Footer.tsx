import { useMemo } from 'react';
import './Footer.scss';

const Footer = () => {
  const currentYear: number = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  return (
    <footer>
      <p className='notAuthenticated_text_footer'>To be able to access application you need an account</p>
      <p className='notAuthenticated_text_footer'>Copyright © {currentYear} Sourcery graduates</p>
    </footer>
  );
};

export default Footer;
