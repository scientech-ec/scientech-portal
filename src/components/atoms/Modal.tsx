import React from "react";
import { Portal } from "react-portal";
import CloseIcon from "./svg/CloseIcon";

interface Props {
  open: boolean;
  handleClose: VoidFunction;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<Props> = ({ children, handleClose, open, title }) => {
  return open ? (
    <Portal node={document && document.getElementById("modal")}>
      <div className="fixed  inset-0 flex items-center justify-center bg-black/50">
        <section className="bg-white">
          <header className="flex items-start justify-between">
            <h4>{title}</h4>
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
