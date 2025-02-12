import UserAvatar from '@/app/layout/authenticatedLayout/topSection/userAvatar/UserAvatar';
import './TopSection.scss';
import Notifications from '@/app/layout/authenticatedLayout/topSection/notifications/Notifications';

const TopSection = () => {
  return (
    <div className='top_section'>
      <div className='top_section_item'>
        <Notifications />
      </div>
      <div className='top_section_item'>
        <UserAvatar />
      </div>
    </div>
  );
};

export default TopSection;
