import ModalContainer from '@/components/modal-container';
import { useAppearance } from '@/hooks/use-appearance';
import { useNotifications } from '@/hooks/use-notifications';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import AppHeaderLayout from './app/app-header-layout';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    useAppearance();
    useNotifications();
    return (
        <AppHeaderLayout  breadcrumbs={breadcrumbs} {...props}>
            {children}
            <ModalContainer />
        </AppHeaderLayout>
    );
};
