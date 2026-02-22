import type { Config } from '@react-router/dev/config';
import { hydrogenPreset } from '@shopify/hydrogen/react-router-preset';

/**
 * React Router 7.9.x Configuration for Hydrogen
 *
 * This configuration uses the official Hydrogen preset to provide optimal
 * React Router settings for Shopify Oxygen deployment. The preset enables
 * validated performance optimizations while ensuring compatibility.
 */
export default {
  // Use the official Hydrogen preset which is optimized for Shopify data fetching
  presets: [hydrogenPreset()],
  // Enable Vercel-specific optimizations without breaking the Hydrogen build
  future: {
    unstable_optimizeDeps: true,
  },
} satisfies Config;
