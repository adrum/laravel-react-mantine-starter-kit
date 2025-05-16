import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    build: {
        // Enable code splitting to reduce bundle size
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    // Vendor chunk for node_modules
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('inertiajs')) {
                            return 'vendor-react';
                        }
                        if (id.includes('mantine')) {
                            return 'vendor-mantine';
                        }
                        if (id.includes('tabler') || id.includes('headlessui')) {
                            return 'vendor-ui';
                        }
                        return 'vendor';
                    }
                }
            }
        },
        // Enable minification
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    },
    plugins: [
        laravel({
            input: ['resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
    ],
});
