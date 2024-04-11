import React from 'react';
import { ModalProps } from './types';
import Portal from './Portal'

const Modal : React.FC<ModalProps> = ({ children, mode, isOpen, onClose }) => {
    return (
        <Portal mode={mode} isOpen={isOpen} onClose={onClose}>
            {children}
        </Portal>
    )
};

export default Modal;