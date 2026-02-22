import { createHydrogenContext } from '@shopify/hydrogen';
import { AppSession } from '~/lib/session';
import { CART_QUERY_FRAGMENT } from '~/lib/fragments';

// Define the additional context object
const additionalContext = {
  // Additional context for custom properties, CMS clients, 3P SDKs, etc.
  // These will be available as both context.propertyName and context.get(propertyContext)
  // Example of complex objects that could be added:
  // cms: await createCMSClient(env),
  // reviews: await createReviewsClient(env),
};

/**
 * Creates Hydrogen context for React Router 7.9.x
 * Returns HydrogenRouterContextProvider with hybrid access patterns
 * @param {Request} request
 * @param {Env} env
 * @param {ExecutionContext} executionContext
 */
export async function createHydrogenRouterContext(
  request: Request,
  env: Env,
  executionContext: ExecutionContext,
) {
  /**
   * Open a cache instance in the worker and a custom session instance.
   */
  const envVars = {
    ...process.env,
    ...(env || {}),
  };

  if (!envVars.SESSION_SECRET && !process.env.SESSION_SECRET) {
    // Falls back to a default for mock shop if not strictly required
    console.warn('SESSION_SECRET environment variable is not set');
  }

  const publicStoreDomain = envVars.PUBLIC_STORE_DOMAIN || 'mock.shop';
  const publicStorefrontToken = envVars.PUBLIC_STOREFRONT_API_TOKEN || '2023-07';
  const publicStorefrontId = envVars.PUBLIC_STOREFRONT_ID || 'gid://shopify/Storefront/1';

  const waitUntil = executionContext?.waitUntil?.bind(executionContext) ?? (() => { });
  const [cache, session] = await Promise.all([
    typeof caches !== 'undefined' ? caches.open('hydrogen') : Promise.resolve(undefined),
    AppSession.init(request, [envVars.SESSION_SECRET || 'foobar']),
  ]);

  const hydrogenContext = createHydrogenContext(
    {
      env: envVars,
      request,
      cache,
      waitUntil,
      session,
      // Or detect from URL path based on locale subpath, cookies, or any other strategy
      i18n: { language: 'EN', country: 'US' },
      cart: {
        queryFragment: CART_QUERY_FRAGMENT,
      },
    },
    additionalContext,
  );

  return hydrogenContext;
}

/** @typedef {Class<additionalContext>} AdditionalContextType */
