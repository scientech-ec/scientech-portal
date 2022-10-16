import React from "react";
import { lotSchema } from "../../../constants/calculator";
import { loadLotData } from "../../../helpers/loadLotData";
import { useCalculator } from "../../../hooks/useCalculator";
import LotCard from "../../molecules/calculator/LotCard";

const LotDetails: React.FC = () => {
  const { values } = useCalculator();
  const lotObject = loadLotData(lotSchema, values);

  return (
    <section className="w-full rounded-md border p-2">
      <h5>Detalle de Lote</h5>
      <div className="flex justify-around">
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
