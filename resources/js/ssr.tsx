import theme from '@/theme'; // <- Import your Mantine theme
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { MantineProvider } from '@mantine/core';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { type RouteName, route } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Use a more efficient glob import strategy
const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, pages),
        setup: ({ App, props }) => {
            // Provide Ziggy route helper
            // @ts-expect-error FIX ME LATER
            global.route<RouteName> = (name, params, absolute) =>
                route(name, params, absolute, {
                    // @ts-expect-error FIX ME LATER
                    ...page.props.ziggy,
                    // @ts-expect-error FIX ME LATER
                    location: new URL(page.props.ziggy.location),
                });

            return (
                <MantineProvider theme={theme}>
                    <App {...props} />
                </MantineProvider>
            );
        },
    }),
);
