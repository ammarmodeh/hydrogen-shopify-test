import type { Config } from '@react-router/dev/config';
import { vercelPreset } from '@vercel/react-router/vite';

/**
 * React Router 7 Configuration for Hydrogen on Vercel
 */
export default {
  // Use the Vercel preset for optimized deployment
  presets: [vercelPreset()],

  // Hydrogen specific defaults
  appDirectory: 'app',
  ssr: true,

  future: {
    unstable_optimizeDeps: true,
    v8_middleware: true,
    v8_splitRouteModules: true,
  },
} satisfies Config;
