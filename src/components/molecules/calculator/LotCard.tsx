import React from "react";
import CustomInput from "../../atoms/apps/CustomInput";
import CustomLabel from "../../atoms/apps/CustomLabel";

interface Props {
  title: string;
  values: { name: string; value: number; label: string }[];
}

const LotCard: React.FC<Props> = ({ title, values }) => {
  return (
    <div className="w-80">
      <h6>{title}</h6>
      <div className="grid grid-cols-4">
        {values.map((value, index) => (
          <React.Fragment key={index}>
            <CustomLabel className="col-span-3" caption={value.label} />
            <CustomInput
              value={value.value}
              type="number"
              name={`lot.${value.name}`}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LotCard;
