import './UserMessageCard.scss';
import BasicSpinner from '@/app/components/loaders/BasicSpinner';

interface UserMessageProps {
  isLoading: boolean;
  data: string;
}

const UserMessageCard = ({ isLoading, data }: UserMessageProps) => {
  if (isLoading) {
    return <BasicSpinner />;
  }

  return <div className='user-message-card'>{<p className='user-message-card__content'>{data}</p>}</div>;
};

export default UserMessageCard;
