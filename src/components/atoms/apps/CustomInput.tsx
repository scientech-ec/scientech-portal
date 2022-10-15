import React from "react";
import { useCalculator } from "../../../hooks/useCalculator";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  value: string | number;
  className?: string;
}

const CustomInput: React.FC<Props> = ({
  type = "text",
  className = "",
  value,
  ...rest
}) => {
  const { handleChange } = useCalculator();

  const minValue = type === "number" ? { min: 0 } : null;

  const nanAlert =
    type === "number" && typeof value === "number" && isNaN(value)
      ? "bg-red-500"
      : "";
  return (
    <input
      className={`rounded-md border ${className} ${nanAlert}`}
      type={type}
      value={value}
      onChange={handleChange}
      {...minValue}
      {...rest}
    />
  );
};

export default CustomInput;
