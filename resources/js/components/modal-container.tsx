import { useEffect, useState, Suspense } from 'react';
import { close, useModalState, useModalSubscribe } from '@/useModal';
import Modal from './modal';

export default function ModalContainer({onClose = () => {}}) {
    const [state, setState] = useState(useModalState());

    useEffect(() => {
        return useModalSubscribe(setState);
    }, []);

    if (!state.show || !state.resolvedComponent) return null;

    const Component = state.resolvedComponent;

    return (
        <Modal show={state.show} onClose={onClose}>
            <Suspense fallback={<div>Loading.</div>}>
                <Component {...state.props} />
            </Suspense>
        </Modal>
    );
}

