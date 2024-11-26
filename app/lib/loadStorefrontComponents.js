// lib/loadStorefrontComponents.js
import dynamic from 'next/dynamic';
import p from '../helpers/consoleHelper';

/**
 * Dynamically loads storefront components based on the storefront data.
 * @param {Array} storefronts - Array of storefront objects.
 * @returns {Promise<Array>} - A promise that resolves to an array of loaded components.
 */

const SOURCE = "loadStorefrontComponents";
const srcColor = 115;


export const loadStorefrontComponents = async (storefronts) => {
  if (!storefronts || storefronts.length === 0) return [];

  p(SOURCE,storefronts,srcColor,"Storefronts before loading components:");
  //storefronts here is an object with ['storefronts']

  const components = await Promise.all(
    storefronts.storefronts.map(async (storefront) => {
      const {id, component } = storefront;
      //console.log(`Processing storefront with id: ${id}, component: ${component}`);


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
