import React from 'react';

import './BasicSpinner.scss';

const BasicSpinner: React.FC = () => {
  return (
    <div className='loader-container'>
      <span className='loader'></span>
    </div>
  );
};

export default BasicSpinner;
