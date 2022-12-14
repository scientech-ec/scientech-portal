import React from "react";
import CustomInput from "../../atoms/apps/CustomInput";
import CustomLabel from "../../atoms/apps/CustomLabel";

interface Props {
  title: string;
  values: {
    name: string;
    value: number;
    label: string;
    startSymbol?: string;
    endSymbol?: string;
  }[];
}

const LotCard: React.FC<Props> = ({ title, values }) => {
  return (
    <div className="w-80">
      <h6 className="rounded-md bg-sky-500 py-1 text-center font-bold">
        {title}
      </h6>
      <div className="mt-1 grid grid-cols-3 gap-y-1 rounded-md border p-1">
        {values.map((value, index) => (
          <React.Fragment key={index}>
            <CustomLabel className="col-span-2" caption={value.label} />
            <div className="flex items-center gap-1 rounded-md border px-1">
              <span className="text-xs text-gray-600">{value.startSymbol}</span>
              <CustomInput
                className="w-full rounded-none border-none"
                value={value.value}
                type="number"
                name={`lot.${value.name}`}
              />
              <span className="text-xs text-gray-600">{value.endSymbol}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LotCard;
