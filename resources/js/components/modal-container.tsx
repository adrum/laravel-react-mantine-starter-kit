import { useEffect, useState, Suspense } from 'react';
import { close, useModalState, useModalSubscribe } from '@/useModal';
import Modal from './modal';

export default function ModalContainer() {
    const [state, setState] = useState(useModalState());

    useEffect(() => {
        return useModalSubscribe(setState);
    }, []);

    if (!state.show || !state.resolvedComponent) return null;

    const Component = state.resolvedComponent;

    const handleClose = () => {
        console.log('Modal closing...');
        // Force a re-render after closing
        close();
        setState({...useModalState()});
    };

    return (
        <Modal show={state.show} onClose={handleClose}>
            <Suspense fallback={<div>Loading.</div>}>
                <Component {...state.props} />
            </Suspense>
        </Modal>
    );
}

