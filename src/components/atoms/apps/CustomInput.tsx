import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  value: string | number;
}

const CustomInput: React.FC<Props> = ({ type = "text", value, ...rest }) => {
  return <input type={type} value={value} {...rest} />;
};

export default CustomInput;
