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

  const step = type === "number" ? { step: 0.01 } : null;

  const nanAlert =
    type === "number" && typeof value === "number" && isNaN(value)
      ? "bg-red-500"
      : "";
  return (
    <input
      onFocus={(e) => e.target.select()}
      className={`rounded-md border ${className} ${nanAlert}`}
      type={type}
      value={value}
      onChange={handleChange}
      {...minValue}
      {...step}
      {...rest}
    />
  );
};

export default CustomInput;
