

export type ModalProps = {
    mode?: string | 'large'
    isOpen: Boolean;
    onClose: () => void;
    children: React.ReactNode;
}