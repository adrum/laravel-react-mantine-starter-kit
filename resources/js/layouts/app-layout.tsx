import ModalContainer from '@/components/modal-container';
import { useAppearance } from '@/hooks/use-appearance';
import { useNotifications } from '@/hooks/use-notifications';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    useAppearance();
    useNotifications();
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <ModalContainer />
        </AppLayoutTemplate>
    );
};
