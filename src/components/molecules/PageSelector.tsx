import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onNext: VoidFunction;
  onPrevious: VoidFunction;
  onFirst: VoidFunction;
  onLast: VoidFunction;
}

const PageSelector: React.FC<Props> = ({
  currentPage,
  onFirst,
  onLast,
  onNext,
  onPrevious,
  totalPages,
}) => {
  return (
    <div className="flex items-center">
      <button className="rounded-md border px-2 py-1">
        <ChevronDoubleLeftIcon className="h-5 w-5" onClick={onFirst} />
      </button>
      <button className="rounded-md border px-2 py-1">
        <ChevronLeftIcon className="h-5 w-5" onClick={onPrevious} />
      </button>
      <span className="px-4">
        Página {currentPage} de {totalPages}
      </span>
      <button className="rounded-md border px-2 py-1">
        <ChevronRightIcon className="h-5 w-5" onClick={onNext} />
      </button>
      <button className="rounded-md border px-2 py-1">
        <ChevronDoubleRightIcon className="h-5 w-5" onClick={onLast} />
      </button>
    </div>
  );
};

export default PageSelector;
