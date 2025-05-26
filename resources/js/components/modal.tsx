import { useEffect } from 'react';
import Teleport from './teleport';

type ModalProps = {
    children: React.ReactNode;
    show: boolean;
    onClose?: () => void;
};

export default function Modal({ children, show, onClose }: ModalProps) {
    useEffect(() => {
        if (!show) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && onClose) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [show, onClose]);

    const handleClickAway = (e: React.MouseEvent<HTMLDivElement>) => {
        // Make sure we're clicking on the backdrop, not the modal content
        if (e.target instanceof Element &&
            e.target.hasAttribute('data-modal-backdrop') &&
            onClose) {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        }
    };

    if (!show) return null;

    return (
        <Teleport target="app">
            <div
                className="fixed inset-0 z-[50000] flex items-center justify-center bg-black/75"
                onClick={handleClickAway}
                data-modal-backdrop
            >
                <div className="rounded-lg bg-white dark:bg-card p-4">
                    {children}
                </div>
            </div>
        </Teleport>
    );
}

