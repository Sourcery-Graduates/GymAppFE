import React, { ReactNode } from 'react';

import './Button.scss';

const Button: React.FC<Props> = ({
  children,
  className,
  type,
  onClick,
  isDisabled = false,
  style,
  size = 'big',
  form,
}) => {
  return (
    <button
      className={`basic-button ${className ? `${className}` : ''} ${size}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={style}
      form={form}
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
  form?: string;
};

export default Button;
