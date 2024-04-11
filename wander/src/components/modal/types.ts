

export type ModalProps = {
    mode?: string | 'large' | 'full'
    isOpen: Boolean;
    onClose: () => void;
    children: React.ReactNode;
}