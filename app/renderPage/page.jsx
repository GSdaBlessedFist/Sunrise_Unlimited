'use client'; // Required for client-side rendering
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStorefront } from '../Providers/StorefrontProvider'; 
import dynamic from 'next/dynamic';

 function RenderPage() {
  

  // const searchParams = useSearchParams();
  // const query = searchParams ? searchParams.get('query') : null;
  // const destination = searchParams ? searchParams.get('destination') : null;
  const {storefronts} = useStorefront();
  const [loadedComponents, setLoadedComponents] = useState([]);
  const [LayoutComponent, setLayoutComponent] = useState(null);

  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  useEffect(()=>{
    const layout = storefronts.length;

    const layoutMap = {
      1: dynamic(() => import('../components/mall_layouts/Mall_layout1.jsx')),
      2: dynamic(() => import('../components/mall_layouts/Mall_layout2.jsx')),
    };

    const selectedLayout = layoutMap[layout]
    setLayoutComponent(() => selectedLayout);
  },[storefronts]);


  
  
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas camera={{ position: [5, 2.25, 20], fov: 45 }}>
          <ambientLight />
          <directionalLight intensity={0.5} />
          <Suspense fallback={null}>
            {LayoutComponent && <LayoutComponent key="layout" storefronts={storefronts} />} 
          </Suspense>
        </Canvas>
        <InfoDisplay/>
        
        
      </div>
    </Suspense>
  );
}
export default RenderPage;

function InfoDisplay() {

  const searchParams = useSearchParams();
  const query = searchParams ? searchParams.get('query') : null;
  const destination = searchParams ? searchParams.get('destination'): null;

  return (<>
    <div style={{ position: "absolute", top: "10px", left: "10px", color: "white" }}>
      <p>Query: {query}</p>
      <p>Destination: {destination}</p>
    </div>
    </>);
}
