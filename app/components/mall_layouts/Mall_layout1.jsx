import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useGLTF,PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber';
import { loadStorefrontComponents } from '../../lib/loadStorefrontComponents';
import { useStorefront } from '../../Providers/StorefrontProvider';
import p from '../../helpers/consoleHelper';

const SOURCE = "Mall Layout off";
const srcColor = 100;

export default function Mall_Layout1({ storefronts, ...props }) {
  const { scene,nodes, materials,cameras } = useGLTF('/models/mall_layout1.glb')
  const [loadedComponents, setLoadedComponents] = useState([]);
  const { set } = useThree();

  const plotRef = useRef();
  const [plotPositions,setPlotPositions] = useState([]);

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  
  useEffect(()=>{
    setPlotPositions(plotRef.current.position)
  },[])

  useEffect(()=>{
    console.log(plotPositions)
  },[plotPositions])

  ////////////////////////////////////////////////////////

  useEffect(() =>{
    p(SOURCE,storefronts,srcColor + 32,"storefronts:")
  },
  [storefronts])

  useEffect(() => {
    if (storefronts && storefronts.length !== 0) {
      const loadComponents = async () => {
        const components = await loadStorefrontComponents(storefronts);
        //p(SOURCE,components,srcColor + 10,"components loaded:")// <-----ISSUE HERE
        setLoadedComponents(components);
      };
      loadComponents();
    }
  }, [storefronts]);

  useEffect(() => {
    //p(SOURCE,loadedComponents,srcColor + 10,"loadedComponents:") 
  }, [loadedComponents]);

  
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera makeDefault={true} name="layout1_camera" far={100} near={0.1} fov={22.895} position={[8.765, 1.647, 7.462]} rotation={[-0.018, 0.874, 0.014]} />
      <mesh ref={plotRef} geometry={nodes.mall_storefront_plot.geometry} material={materials.Mall_storefront_plot} position={[0, 0.001, 0]} />
      <Suspense fallback={<div>Loading storefronts...</div>}>
        {loadedComponents.map(({ id, Component,componentPath }) => (
          <Component key={id} position={plotPositions} />
        ))}
      </Suspense>
    </group>
  )
}

useGLTF.preload('/models/mall_layout1.glb')
