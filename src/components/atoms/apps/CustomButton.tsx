import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}
const CustomButton: React.FC<Props> = ({
  children,
  icon,
  iconPosition = "start",
  ...rest
}) => {
  return (
    <button
      {...rest}
      className="rounded-md border py-1 px-2 hover:bg-gray-200 active:bg-gray-800 active:text-gray-200"
    >
      {icon !== undefined && iconPosition === "start" && icon}
      {children}
      {icon !== undefined && iconPosition === "end" && icon}
    </button>
  );
};

export default CustomButton;
