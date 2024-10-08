import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { loadStorefrontComponents } from '../../lib/loadStorefrontComponents';
import { useStorefront } from '../../Providers/StorefrontProvider';

export default function Mall_Layout1(props) {
  const { nodes, materials } = useGLTF('/models/mall_layout1.glb')
  const [loadedComponents, setLoadedComponents] = useState([]);
  const {storefronts} = useStorefront();

  const plotRef = useRef();
  const [plotPositions,setPlotPositions] = useState([]);

  
  
  useEffect(() => {
    if (storefronts && storefronts.length > 0) {
      const loadComponents = async () => {
        const components = await loadStorefrontComponents(storefronts);
        setLoadedComponents(components);
      };
      loadComponents();
    }
  }, [storefronts]);

  useEffect(() => {
    console.log("loadedComponents: ", loadedComponents);  
  }, [loadedComponents]);

  useEffect(()=>{
    setPlotPositions(plotRef.current.position)
  },[])

  useEffect(()=>{
    console.log(plotPositions)
  },[plotPositions])

  return (
    <group {...props} dispose={null}>
      <mesh ref={plotRef} geometry={nodes.mall_storefront_plot.geometry} material={materials.Mall_storefront_plot} position={[0, 0.001, 0]} />
      <mesh geometry={nodes.mall_storefront_plot_spacer.geometry} material={materials.Mall_storefront_plot_spacer} scale={[1, 0, 1]} />
      <Suspense fallback={<div>Loading storefronts...</div>}>
        {loadedComponents.map(({ id, Component }) => (
          <Component key={id} position={plotPositions} />
        ))}
      </Suspense>
    </group>
  )
}

useGLTF.preload('/models/mall_layout1.glb')
