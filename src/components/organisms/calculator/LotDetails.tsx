import React from "react";
import { useCalculator } from "../../../hooks/useCalculator";
import { Calculator } from "../../../interfaces/calculatorApp";
import LotCard from "../../molecules/calculator/LotCard";

const lotData = [
  {
    title: "Costos en Origen",
    values: [
      { name: "Flete en origen:", value: "originFleet" },
      { name: "Impuestos en origen:", value: "originTaxes" },
    ],
  },
  {
    title: "Costos de Importación",
    values: [
      { name: "Costo de flete [USD/lb]:", value: "importFleetPerLibre" },
      { name: "Trámite de importación:", value: "importProcedure" },
      { name: "Agente aduanero:", value: "customsAgent" },
    ],
  },
  {
    title: "Costos Locales",
    values: [
      { name: "Flete y movilización:", value: "localFleet" },
      { name: "Tarifas bancarias:", value: "bankExpenses" },
    ],
  },
];

const loadLotData = (source: typeof lotData, calculatorData: Calculator) =>
  source.map((data) => ({
    title: data.title,
    values: data.values.map((value) => ({
      label: value.name,
      name: value.value,
      value: calculatorData.lot[value.value],
    })),
  }));

const LotDetails: React.FC = () => {
  const { values } = useCalculator();
  const lotObject = loadLotData(lotData, values);

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
