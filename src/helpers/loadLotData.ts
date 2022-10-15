import type { LotSchema } from "../constants/calculator";
import { Calculator } from "../interfaces/calculatorApp";

export const loadLotData = (
  source: LotSchema,
  calculatorData: Calculator
): LotData =>
  source.map((data) => ({
    title: data.title,
    values: data.values.map((value) => ({
      label: value.name,
      name: value.value,
      value: calculatorData.lot[value.value],
    })),
  }));

type LotData = {
  title: string;
  values: {
    label: string;
    name: string;
    value: number;
  }[];
}[];
