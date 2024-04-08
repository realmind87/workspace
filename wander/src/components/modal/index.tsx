import React from 'react';
import { ModalProps } from './types';
import Portal from './Portal'

const Modal : React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
    return (
        <Portal isOpen={isOpen} onClose={onClose}>
            {children}
        </Portal>
    )
};

export default Modal;