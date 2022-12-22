import React from "react";
import { lotSchema } from "../../../constants/calculatorUI";
import { loadLotData } from "../../../helpers/loadLotData";
import { useCalculator } from "../../../hooks/useCalculator";
import LotCard from "../../molecules/calculator/LotCard";

const LotDetails: React.FC = () => {
  const { calculatorInputs } = useCalculator();
  const lotObject = loadLotData(lotSchema, calculatorInputs);

  return (
    <section className="w-full rounded-md border p-4">
      <h5>Detalle de Lote</h5>
      <div className="mt-2 flex justify-around">
        {lotObject.map((category, index) => (
          <LotCard
            key={index}
            title={category.title}
            values={category.values}
          />
        ))}
      </div>
    </section>
  );
};

export default LotDetails;
