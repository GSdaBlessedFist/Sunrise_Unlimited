'use client'; // Required for client-side rendering

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mall_Groundfloor } from '../components/mall_floorplans/Mall_groundfloor';
import { useStorefront } from '../Providers/StorefrontProvider'; 
//import Storefront_MrChocolate from "../storefronts/mr_chocolate/Storefront_MrChocolate";
import dynamic from 'next/dynamic';

 function RenderPage() {
  

  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const destination = searchParams.get('destination');
  const {storefronts} = useStorefront();
  const [loadedComponents, setLoadedComponents] = useState([]);

  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////



  
  useEffect(() => {
    const loadComponents = async () => {
      //console.log("Storefronts: ", storefronts);
      const components = await Promise.all(
        storefronts.map(async (storefront) => {
          const { component } = storefront;

          // Dynamically import using the componentPath
          const StorefrontComponent = dynamic(() =>
            import(`../${component}`)
          );
          return { id: storefront.id, Component: StorefrontComponent };
        })
      );
      setLoadedComponents(components);
      
    };

    loadComponents();
  }, []);

  useEffect(() => {
    
      console.log("loadedComponents: ", loadedComponents);
      
  }, [loadedComponents]);


  
  
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [5, 2.75, 5], fov: 50 }}>
        <ambientLight />
        <directionalLight intensity={0.5} />
        <Suspense fallback={null}>
          <Mall_Groundfloor position={[0, 0, 0]} />
          {loadedComponents.map(({ id, Component }) => (
            <Component key={id} />
          ))}
          
        </Suspense>
      </Canvas>

      {/* Optional: Display query params for debugging or content rendering */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white' }}>
        <p>Query: {query}</p>
        <p>Destination: {destination}</p>
      </div>
    </div>
  );
}
export default RenderPage;