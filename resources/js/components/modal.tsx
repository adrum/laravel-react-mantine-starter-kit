import { ActionIcon, Divider } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import Teleport from './teleport';
import { close } from '@/useModal';

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
        if (e.target instanceof Element && e.target.hasAttribute('data-modal-backdrop') && onClose) {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        }
    };

    if (!show) return null;

    return (
        <Teleport target="app">
            <div className="fixed inset-0 z-[50000] flex items-center justify-center bg-black/75" onClick={handleClickAway} data-modal-backdrop>
                <div className="min-w-[400px] dark:bg-card relative rounded-lg bg-white py-8 px-4">
                    <ActionIcon variant="subtle" color="gray" className="!absolute !top-2 !right-2 pb-4" onClick={close}>
                        <IconX size={16} />
                    </ActionIcon>
                    {children}
                </div>
            </div>
        </Teleport>
    );
}
