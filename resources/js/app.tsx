import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import { Notifications } from './components/notifications';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import theme from '@/theme';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <>
                <ColorSchemeScript
                    nonce="8IBTHwOdqNKAWeKl7plt8g=="
                    defaultColorScheme="auto"
                />
                <MantineProvider defaultColorScheme="auto" theme={theme}>
                    <ModalsProvider>
                        <Notifications />
                        {app}
                    </ModalsProvider>
                </MantineProvider>
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
