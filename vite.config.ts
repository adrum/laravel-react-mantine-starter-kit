import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('@mantine')) return 'mantine';
                        if (id.includes('react')) return 'react-vendor';
                        return 'vendor';
                    }
                },
            },
        },
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
        },
    },
});
