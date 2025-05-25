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
            if (e.key === 'Escape') onClose?.();
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [show, onClose]);

    const handleClickAway = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose?.();
    };

    if (!show) return null;

    return (
        <Teleport target="app">
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
                onClick={handleClickAway}
            >
                <div className="rounded-lg bg-white p-4">
                    {children}
                </div>
            </div>
        </Teleport>
    );
}

