import { useMemo } from 'react';
import './LikeWithCount.scss';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

interface LikeWithCountProps {
  likesCount: number;
  isLikedByCurrentUser: boolean;
  handleClick: () => void;
}

const LikeWithCount = ({ likesCount, isLikedByCurrentUser, handleClick }: LikeWithCountProps) => {
  const likes = useMemo(() => {
    return likesCount > 999 ? `${(likesCount / 1000).toFixed(0)}k` : likesCount;
  }, [likesCount]);

  return (
    <div className='likes' onClick={handleClick}>
      <div className='likes__count'>
        <p>{likes}</p>
      </div>
      <div className={`likes__icon ${isLikedByCurrentUser ? 'active' : ''}`}>
        <ThumbUpOffAltIcon fontSize='small' />
      </div>
    </div>
  );
};

export default LikeWithCount;
