import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { loadStorefrontComponents } from '../../lib/loadStorefrontComponents';
import { useStorefront } from '../../Providers/StorefrontProvider';

export default function Mall_Layout2(props) {
  const { nodes, materials } = useGLTF('/models/mall_layout2.glb')

  {/* ////////////////////////////////////////////////////////////////// */}
  {/* ////////////////////////////////////////////////////////////////// */}
  {/* ////////////////////////////////////////////////////////////////// */}

  const [loadedComponents, setLoadedComponents] = useState([]);
  const {storefronts,targetStore} = useStorefront();

  const plotRefs = useRef([useRef(),useRef()]);
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
    console.log("targetStore: ", targetStore); 
    console.log("plotPositions: ", plotPositions); 
  }, [loadedComponents,targetStore,plotPositions]);

  useEffect(() => {
    setPlotPositions(plotRefs.current.map(ref => ref.current.position));
  }, [plotRefs]);

  {/* ////////////////////////////////////////////////////////////////// */}
  {/* ////////////////////////////////////////////////////////////////// */}
  {/* ////////////////////////////////////////////////////////////////// */}


  return (
    <group {...props} dispose={null}>
      <mesh
        ref={plotRefs.current[0]}
        geometry={nodes.mall_storefront_plot.geometry}
        material={materials.Mall_storefront_plot}
        position={[0, 0.001, 0]}
      />
      <mesh
        geometry={nodes.mall_storefront_plot_spacer.geometry}
        material={materials.Mall_storefront_plot_spacer}
        scale={[1, 0, 1]}
      />
      <mesh
        ref={plotRefs.current[1]}
        geometry={nodes.mall_storefront_plot2.geometry}
        material={materials.Mall_storefront_plot2}
        position={[9, 0.001, 0]}
      />
      <mesh
        geometry={nodes.mall_storefront_plot_spacer2.geometry}
        material={materials.Mall_storefront_plot_spacer}
        position={[9, 0, 0]}
        scale={[1, 0, 1]}
      />

      {/* ////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////// */}

      <Suspense fallback={<div>Loading storefronts...</div>}>
        {loadedComponents.map(({ id, Component, componentPath }) => {
          const isTargetStore = componentPath === targetStore.component;
          let position;
          if (isTargetStore) {
            position = plotPositions[0];
          } else {
            const nonTargetStorefronts = loadedComponents.filter(
              (comp) => comp.componentPath !== targetStore.component
            );
            const nonTargetIndex = nonTargetStorefronts.findIndex((comp) => comp.id === id);
            position = plotPositions[nonTargetIndex + 1];
          }
          return <Component key={id} position={position} />;
        })}
      </Suspense>

      {/* ////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////// */}
    </group>
  );
}

useGLTF.preload('/models/mall_layout2.glb')
