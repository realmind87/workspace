import React from 'react';
import ReactDOM from 'react-dom';
import { ModalProps } from './types';
import { IoClose } from "react-icons/io5";

const Modal : React.FC<ModalProps> = ({ mode= "", isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
        <article className={`modal-wrap ${mode}`}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
            <button className="modal-close" onClick={onClose}>
                <IoClose size={40} color="#666"/>
            </button>
        </article>
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;