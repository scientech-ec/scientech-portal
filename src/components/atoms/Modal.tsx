import React from "react";
import { Portal } from "react-portal";
import CloseIcon from "./svg/CloseIcon";

interface Props {
  open: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<Props> = ({
  children,
  onClose,
  onConfirm,
  open,
  title,
}) => {
  return open ? (
    <Portal node={document && document.getElementById("modal")}>
      <div className="fixed  inset-0 flex items-center justify-center bg-black/50">
        <section className="bg-white">
          <header className="flex items-start justify-between">
            <h4>{title}</h4>
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </header>
          <article>{children}</article>
          <div>
            <button onClick={onClose}>Cancelar</button>
            <button onClick={onConfirm}>Continuar</button>
          </div>
        </section>
      </div>
    </Portal>
  ) : null;
};

export default Modal;
