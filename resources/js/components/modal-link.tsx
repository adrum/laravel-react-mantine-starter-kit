import { open } from '@/useModal';
import { usePage } from '@inertiajs/react';
import { Button } from '@mantine/core';

export default function ModalLink({ size, variant, href, children, ...props }: any) {
    const { version } = usePage();
    return (
        <Button
            variant='default'
            size='sm'
            className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
            onClick={() => open(href, version ?? '')}
            {...props}
        >
            {children}
        </Button>
    );
}
