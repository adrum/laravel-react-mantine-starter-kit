import { useAppearance } from '@/hooks/use-appearance';
import { useNotifications } from '@/hooks/use-notifications';
import { type ReactNode } from 'react';
import AppSiteLayout from './app/app-site-layout';

interface AppLayoutProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary';
}

export default ({ children, ...props }: AppLayoutProps) => {
    useAppearance();
    useNotifications();
    return <AppSiteLayout {...props}>{children}</AppSiteLayout>;
};
