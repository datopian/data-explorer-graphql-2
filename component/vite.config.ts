import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'src/lib/index.ts'),
            name: 'Data Explorer',
            formats: ['es', 'umd'],
            fileName: (format) => `data-explorer.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'graphql', '@apollo/client'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    graphql: 'graphql',
                    '@apollo/client': 'apollo',
                },
            },
        },
    },
});
