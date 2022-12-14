import React from "react";

interface Props extends React.AllHTMLAttributes<HTMLParagraphElement> {
  caption: string;
}

const CustomLabel: React.FC<Props> = ({ caption, ...rest }) => {
  return <p {...rest}>{caption}</p>;
};

export default CustomLabel;
