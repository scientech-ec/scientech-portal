import React from "react";
import { useCalculator } from "../../../hooks/useCalculator";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  value: string | number;
}

const CustomInput: React.FC<Props> = ({ type = "text", value, ...rest }) => {
  const { handleChange } = useCalculator();
  return (
    <input
      className={`border ${rest.className}`}
      type={type}
      value={value}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default CustomInput;
