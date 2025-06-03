import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tsconfigPaths(),
        tailwindcss(),
        compression()
    ],
    esbuild: {
        jsx: 'automatic',
        treeShaking: true,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    ui: ['@mantine/core', '@mantine/hooks'],
                    icons: ['@tabler/icons-react']
                },
            },
            treeshake: {
                moduleSideEffects: false,
                propertyReadSideEffects: false,
                tryCatchDeoptimization: false
            },
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        cssCodeSplit: true,
        reportCompressedSize: false,
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
        },
    },
    ssr: {
        noExternal: true
    },
});
