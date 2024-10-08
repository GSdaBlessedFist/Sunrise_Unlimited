// lib/loadStorefrontComponents.js
import dynamic from 'next/dynamic';

/**
 * Dynamically loads storefront components based on the storefront data.
 * @param {Array} storefronts - Array of storefront objects.
 * @returns {Promise<Array>} - A promise that resolves to an array of loaded components.
 */
export const loadStorefrontComponents = async (storefronts) => {
  if (!storefronts || storefronts.length === 0) return [];

  const components = await Promise.all(
    storefronts.map(async (storefront) => {
      const { component } = storefront;

      try {
        // Dynamically import the component
        const StorefrontComponent = dynamic(() =>
          import(`../${component}`).then((mod) => mod.default)
        );
        //console.log("From withing the lib:" + StorefrontComponent)
        return { id: storefront.id, componentPath:storefront.component,Component: StorefrontComponent };
      } catch (error) {
        console.error(`Failed to load component for storefront ID: ${storefront.id}`, error);
        return null; // Return null if the component fails to load
      }
    })
  );

  // Filter out any null values caused by failed imports
  return components.filter((comp) => comp !== null);
};
