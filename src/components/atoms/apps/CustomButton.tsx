import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  variant?: "primary" | "success" | "danger";
}
const CustomButton: React.FC<Props> = ({
  children,
  icon,
  iconPosition = "start",
  variant = "primary",
  ...rest
}) => {
  const handleVariant = () => {
    switch (variant) {
      case "success":
        return "bg-green-600 text-white hover:bg-green-800 active:bg-green-200 active:text-green-800";
      case "danger":
        return "bg-red-600 text-white hover:bg-red-800 active:bg-red-200 active:text-red-800";
      default:
        return "hover:bg-gray-200 active:bg-gray-800 active:text-gray-200";
    }
  };
  return (
    <button
      {...rest}
      className={`rounded-md border py-1 px-2  ${handleVariant()}`}
    >
      {icon !== undefined && iconPosition === "start" && icon}
      {children}
      {icon !== undefined && iconPosition === "end" && icon}
    </button>
  );
};

export default CustomButton;
