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

  return (
    <div className='user-message-card'>
      <div className='user-message-card__content'>{<p>{data}</p>}</div>
    </div>
  );
};

export default UserMessageCard;
