import React from "react";

interface Props {
  caption: string;
}

const CustomLabel: React.FC<Props> = ({ caption }) => {
  return <p>{caption}</p>;
};

export default CustomLabel;
