import React from "react";

interface Props {
  title: string;
  values: { name: string; value: number }[];
}

const LotCard: React.FC<Props> = ({ title, values }) => {
  return (
    <div>
      <h6>{title}</h6>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
};

export default LotCard;
