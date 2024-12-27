import './UserMessageCard.scss';
import BasicSpinner from '../loaders/BasicSpinner';

interface UserMessageProps<T> {
  isLoading: boolean;
  data: T;
  successText?: (data: T) => string;
}

const UserMessageCard = <T,>({ isLoading, data, successText }: UserMessageProps<T>) => {
  if (isLoading) {
    return <BasicSpinner />;
  }

  return (
    <div className='user-message-card'>
      <div className='user-message-card__content'>{data && successText && <p>{successText(data)}</p>}</div>
    </div>
  );
};

export default UserMessageCard;
