import * as React from 'react';
import { cn } from '@/lib/utils';
import type { AppVariant } from '@/types';

type Props = React.ComponentProps<'div'> & {
    variant?: AppVariant;
};

export function AppContent({ children, className, ...props }: Props) {
    return (
        <div
            className={cn(
                'mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
