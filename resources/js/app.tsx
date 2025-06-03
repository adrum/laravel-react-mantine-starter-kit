import '../css/app.css';

import theme from '@/theme';

import { createInertiaApp } from '@inertiajs/react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { hydrateRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Use dynamic imports for page components to enable code splitting
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // If `name` is a `module::page`, return the page from the module
        if (name.includes('::')) {
            const [module, page] = name.split('::');

            return resolvePageComponent(
                `../../app-modules/${module}/resources/js/pages/${page}.tsx`,
                import.meta.glob('../../app-modules/*/resources/js/pages/**/*.tsx'),
            );
        } else {
            return resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx'));
        }
    },
    setup({ el, App, props }) {
        hydrateRoot(
            el,
            <MantineProvider theme={theme}>
                <Notifications />
                <App {...props} />
            </MantineProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();
