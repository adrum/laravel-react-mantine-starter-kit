import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export default function Teleport({ children, target }) {
    const [targetNode, setTargetNode] = useState(null);

    useEffect(() => {
        const node = typeof target === 'string' ? document.getElementById(target) : target;
        setTargetNode(node);
    }, [target]);

    if (!targetNode) return null;

    return createPortal(children, targetNode);
}

