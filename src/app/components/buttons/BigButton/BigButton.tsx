import React, { ReactNode } from "react";
import "./BigButton.scss";

const BigButton: React.FC<Props> = ({
  content,
  svgComponent,
  className,
  type,
  onClick,
  isDisabled = false,
}) => {
  return (
    <button
      className={`big-button ${className ? `${className}` : ""}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      <span>
        {svgComponent ? svgComponent : ""}
        {content}
      </span>
    </button>
  );
};

type Props = {
  content: string;
  svgComponent?: ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  isDisabled?: boolean;
};

export default BigButton;
