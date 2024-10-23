import React, { ReactNode } from 'react';

import './Button.scss';

const Button: React.FC<Props> = ({ children, className, type, onClick, isDisabled = false, style, size = 'big' }) => {
  return (
    <button
      className={`basic-button ${className ? `${className}` : ''} ${size}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={style}
    >
      <span>{children}</span>
    </button>
  );
};

type Props = {
  children: ReactNode;
  className?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: () => void;
  isDisabled?: boolean;
  style?: React.CSSProperties;
  size?: 'big' | 'small';
};

export default Button;
