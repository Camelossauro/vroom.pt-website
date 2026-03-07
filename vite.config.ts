import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    // ADICIONEI ESTA PARTE ABAIXO PARA O VERCEL RECONHECER TODOS OS TEUS FICHEIROS
    build: {
      rollupOptions: {
        input: {
          main: './index.html',
          planos_basico: './planos-basico.html',
          planos_premium: './planos-premium.html',
          corridas_basico: './corridas-basico.html',
          corridas_premium: './corridas-premium.html',
          evento: './evento.html',
        },
      },
    },
  };
});