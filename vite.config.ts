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
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          deeplink: path.resolve(__dirname, 'deeplink.html'),
          evento: path.resolve(__dirname, 'evento.html'),
          planosBasico: path.resolve(__dirname, 'planos-basico.html'),
          planosPremium: path.resolve(__dirname, 'planos-premium.html'),
          corridasBasico: path.resolve(__dirname, 'corridas-basico.html'),
          corridasPremium: path.resolve(__dirname, 'corridas-premium.html'),
          encontrosBasico: path.resolve(__dirname, 'encontros-basico.html'),
          encontrosPremium: path.resolve(__dirname, 'encontros-premium.html')
        }
      }
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});