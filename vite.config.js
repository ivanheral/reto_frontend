// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import preact from '@preact/preset-vite';
import { splitVendorChunkPlugin } from 'vite';

export default defineConfig((config) => {
    const { mode } = config;
    return {
        plugins: [...react(), mode === 'production' && [preact(), splitVendorChunkPlugin()]],
        server: {
            port: 3000,
            open: true,
        },
        build: {
            outDir: './build',
        },
    };
});
