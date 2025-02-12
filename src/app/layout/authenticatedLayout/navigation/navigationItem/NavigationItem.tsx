import './NavigationItem.scss';
import { AppRoutes } from '@/types/routes';
import { NavLink } from 'react-router-dom';

interface NavigationItemProps {
  children: React.ReactNode;
  navigateTo: AppRoutes;
  description: string;
  style?: React.CSSProperties;
  className?: string;
}

const NavigationItem = ({ className, style, navigateTo, children, description }: NavigationItemProps) => {
  return (
    <>
      <NavLink style={style} className={`navigation_item ${className ? `${className}` : ''}`} to={navigateTo}>
        <div title={description} className='navigation_icon'>
          {children}
        </div>
        <div className='icon_description'>{description}</div>
      </NavLink>
    </>
  );
};

export default NavigationItem;
