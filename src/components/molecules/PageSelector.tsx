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
    <div>
      <button>
        <ChevronDoubleLeftIcon className="h-4 w-4" onClick={onFirst} />
      </button>
      <button>
        <ChevronLeftIcon className="h-4 w-4" onClick={onPrevious} />
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button>
        <ChevronRightIcon className="h-4 w-4" onClick={onNext} />
      </button>
      <button>
        <ChevronDoubleRightIcon className="h-4 w-4" onClick={onLast} />
      </button>
    </div>
  );
};

export default PageSelector;
