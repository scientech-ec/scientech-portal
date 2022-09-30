import React from "react";
import ArticlesDetails from "../organisms/calculator/ArticlesDetails";
import Controls from "../organisms/calculator/Controls";
import LotDetails from "../organisms/calculator/LotDetails";
import Report from "../organisms/calculator/Report";

const CalculatorApp: React.FC = () => {
  return (
    <article className="flex w-full flex-col gap-5 p-5">
      <Controls />
      <ArticlesDetails />
      <LotDetails />
      <Report />
    </article>
  );
};

export default CalculatorApp;
