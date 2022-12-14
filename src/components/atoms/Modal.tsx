import React, { useCallback, useEffect } from "react";
import { Portal } from "react-portal";
import CloseIcon from "./svg/CloseIcon";

interface Props {
  open: boolean;
  handleClose: VoidFunction;
  children: React.ReactNode;
  title: string;
  modalClasses?: string;
}

const Modal: React.FC<Props> = ({
  children,
  handleClose,
  open,
  title,
  modalClasses = "",
}) => {
  const escFunction = useCallback(
    (event: { keyCode: number }) => {
      if (event.keyCode === 27 && open) {
        handleClose();
      }
    },
    [open]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [open]);

  return open ? (
    <Portal node={document && document.getElementById("modal")}>
      <div
        className="fixed  inset-0 flex items-center justify-center bg-black/50"
        onClick={handleClose}
      >
        <section
          className={`h-auto min-w-[50%] max-w-[80%] bg-white ${modalClasses}`}
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex items-start justify-between border-b px-4 py-3">
            <h4 className="grow">{title}</h4>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </header>
          <article>{children}</article>
        </section>
      </div>
    </Portal>
  ) : null;
};

export default Modal;
