import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalProps } from './types';
import { IoClose } from "react-icons/io5";
import Button from '../buttons'
import { HiMiniMinus } from "react-icons/hi2";

const Modal : React.FC<ModalProps> = ({ mode= "", isOpen, onClose, children }) => {
  const [ modalState, setModalState ] = useState('mini');

  if (!isOpen) return null;


  return ReactDOM.createPortal(
    <div className={`modal-overlay ${modalState}`}>
        <article className={`modal-wrap ${mode}`}>
          {mode === 'full' ? (
            <div className='window-control'>
              {/* <Button
                  type="button"
                  text="최소화"
                  icon={<HiMiniMinus size={26} color="#000" />}
                  onHandler={() => console.log('')}
              /> */}
              
              <Button
                  type="button"
                  text="닫기"
                  icon={<IoClose size={26} color="#000"/>}
                  onHandler={onClose}
              />
            </div>
          ) : (
            <button className="modal-close" onClick={onClose}>
                <IoClose size={40} color="#666"/>
            </button>
          )}

          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {children}
          </div>  
        </article>
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;