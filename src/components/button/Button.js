import React from "react";

const Button = ({
  onClick,
  className,
  bgColor = "primary",
  type = "button",
  children,
  ...props
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      className={`py-3 px-6 rounded-lg capitalize ${bgClassName} ${className}`}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
