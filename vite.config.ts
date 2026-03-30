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
          encontrosPremium: path.resolve(__dirname, 'encontros-premium.html'),
          corridasBasicoCarros: path.resolve(__dirname, 'corridas-basico-carros.html'),
          corridasBasicoMotas: path.resolve(__dirname, 'corridas-basico-motas.html'),
          corridasPremiumCarros: path.resolve(__dirname, 'corridas-premium-carros.html'),
          corridasPremiumMotas: path.resolve(__dirname, 'corridas-premium-motas.html'),
          sucesso: path.resolve(__dirname, 'sucesso.html')
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
