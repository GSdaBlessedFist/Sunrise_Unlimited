import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useGLTF,PerspectiveCamera,useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber';
import { gsap } from "gsap";
import { loadStorefrontComponents } from '../../lib/loadStorefrontComponents';
import { useStorefront } from '../../Providers/StorefrontProvider';
import p from '../../helpers/consoleHelper';
import Tablet from '../Message_Tablet/Tablet';

const SOURCE = "Mall Layout ";
const srcColor = 100;

export default function Mall_Layout1({enterLayout,storefronts, ...props }) {
  const { scene,nodes, materials,cameras } = useGLTF('/models/mall_layout1.glb')
  const [loadedComponents, setLoadedComponents] = useState([]);
  //const [plotPosition, setPlotPosition] = useState([0, 0, 0]);
  const { set } = useThree();

  const plotRef = useRef();
  const [plotPositions,setPlotPositions] = useState([]);

  const entryCameraRef = useRef();
  const [transitionComplete, setTransitionComplete] = useState(false);

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ///////////////TEXTURES///////////////////////////////////
  

  
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

  //EntryCamera transition logic
  useEffect(() => {
    if (!transitionComplete && entryCameraRef.current) {
      const camera = entryCameraRef.current;
  
      // Animate the position
      gsap.to(camera.position, {
        duration: 4.5,
        x: 0,
        y: 1.829,
        z: 19.75,
        ease: "power4.out",
        onComplete: () => setTransitionComplete(true),
      });
  
      // Animate the FOV
      gsap.from(camera, {
        duration: 4.5,
        fov: 65,
        ease: "power4.out",
        onUpdate: () => {
          camera.updateProjectionMatrix(); // Ensure the FOV change is applied
        },
      });
    }
  }, [transitionComplete]);

  useEffect(()=>{
    p(SOURCE,materials,srcColor,"materials:")
  },[]);

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////// 
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="downTheMiddleEMPTY-2nd_floor" position={[0, -2.289, 0]} />
        <group name="downTheMiddleEMPTY" position={[0, 2, 0]} />
        {/* <group name="TABLET" position={[-1.303, 1.045, 6.298]} rotation={[0, Math.PI / 2, 0]}>
          <group name="tablet_stand" position={[0, -0.093, 0]} scale={1.25}>
            <mesh name="tablet-stand" geometry={nodes['tablet-stand'].geometry} material={materials.tablet_frame} />
            <mesh name="tablet-stand_1" geometry={nodes['tablet-stand_1'].geometry} material={materials.tablet_screen} />
            <mesh name="tablet-stand_2" geometry={nodes['tablet-stand_2'].geometry} material={materials.tablet_borderLighting} />
            <mesh name="tablet-stand_3" geometry={nodes['tablet-stand_3'].geometry} material={materials.tablet_screenAxis} />
          </group>
          <group name="tablet_screen" position={[0, -0.093, 0]} scale={1.25}>
            <mesh name="tablet-stand004" geometry={nodes['tablet-stand004'].geometry} material={materials.tablet_frame} />
            <mesh name="tablet-stand004_1" geometry={nodes['tablet-stand004_1'].geometry} material={materials.tablet_screen} />
            <mesh name="tablet-stand004_2" geometry={nodes['tablet-stand004_2'].geometry} material={materials.tablet_borderLighting} />
          </group>
        </group> */}
        {/* <Tablet position={[0, 0.001, 0]} /> */}
        <group name="frontArea" position={[0.119, 4.155, 6.876]} rotation={[-0.918, 0, 0]} />
        <PerspectiveCamera ref={entryCameraRef} name="entry_Camera" makeDefault={true} far={1000} near={0.1} fov={22.895} position={[9.272, 2.307, 8.244]} rotation={[-0.636, 0.491, 0.335]} />
        <spotLight intensity={20311.125} angle={0.454} penumbra={0.686} decay={2} position={[-2.406, -0.722, -3.848]} rotation={[-Math.PI / 2, 0, -0.262]} scale={[0.425, 0.425, 0.465]} target={nodes.Spot001.target}>
          <primitive object={nodes.Spot001.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight intensity={27175.707} angle={0.436} penumbra={0.15} decay={2} position={[2.764, -0.722, -3.848]} rotation={[-Math.PI / 2, 0, 0]} target={nodes.Spot002.target}>
          <primitive object={nodes.Spot002.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight intensity={27175.707} angle={0.436} penumbra={0.15} decay={2} position={[-2.406, -0.722, 1.055]} rotation={[-Math.PI / 2, 0, 0]} target={nodes.Spot003.target}>
          <primitive object={nodes.Spot003.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight intensity={27175.707} angle={0.436} penumbra={0.15} decay={2} position={[2.764, -0.722, 1.055]} rotation={[-Math.PI / 2, 0, 0]} target={nodes.Spot004.target}>
          <primitive object={nodes.Spot004.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight intensity={5321.003} angle={0.528} penumbra={0.15} decay={2} position={[8.386, 3.19, -0.708]} rotation={[-0.697, 0.62, -0.401]} target={nodes.Spot.target}>
          <primitive object={nodes.Spot.target} position={[0, 0, -1]} />
        </spotLight>
        <group name="stairs">
          <mesh name="Plane001" geometry={nodes.Plane001.geometry} material={materials.mall_stair_basic} />
          <mesh name="Plane001_1" geometry={nodes.Plane001_1.geometry} material={materials.mall_stairRails_bars} />
          <mesh name="Plane001_2" geometry={nodes.Plane001_2.geometry} material={materials['mall_stairRails_top.001']} />
          <mesh name="Plane001_3" geometry={nodes.Plane001_3.geometry} material={materials.mall_stairRails_lighting} />
          <mesh name="Plane001_4" geometry={nodes.Plane001_4.geometry} material={materials.mall_seeThru_divider} />
        </group>
        <mesh ref={plotRef} name="mall_storefront_plot" geometry={nodes.mall_storefront_plot.geometry} material={materials.Mall_storefront_plot} position={[0, 0.001, 0]} />
        <Suspense fallback={<div>Loading storefronts...</div>}>
          {loadedComponents.map(({ id, Component, componentPath }) => (
            <Component key={id} position={plotPositions} />
          ))}
        </Suspense>
        <mesh name="STOREPLACEHOLDER" geometry={nodes.STOREPLACEHOLDER.geometry} material={materials.storefrontplaceholder} position={[0.004, 0.006, 0]} />
        <group name="person-placehlder" position={[-0.891, -4.953, 1.924]} rotation={[0, 1.39, 0]}>
          <mesh name="human_block001" geometry={nodes.human_block001.geometry} material={materials['storefront_displaycase-baseColor.001']} />
          <mesh name="human_block001_1" geometry={nodes.human_block001_1.geometry} material={materials['person-placeholder_front']} />
        </group>
        <mesh name="STOREPLACEHOLDER002" geometry={nodes.STOREPLACEHOLDER002.geometry} material={materials.storefrontplaceholder} position={[0.004, -4.5, 0]} />
        <group name="theGamePad-logo">
          <mesh name="path1002" geometry={nodes.path1002.geometry} material={materials['mall_theGamePad_basic.001']} />
          <mesh name="path1002_1" geometry={nodes.path1002_1.geometry} material={materials['mall_theGamePad_border.001']} />
          <mesh name="path1002_2" geometry={nodes.path1002_2.geometry} material={materials['mall_theGamePad_inner.001']} />
          <mesh name="path1002_3" geometry={nodes.path1002_3.geometry} material={materials['mall_theGamePad_backing.001']} />
        </group>
        <group name="mall_floor_gamepadFloor">
          <mesh name="Plane003" geometry={nodes.Plane003.geometry} material={materials['mall_wall_GamePad-wall_1']} />
          <mesh name="Plane003_1" geometry={nodes.Plane003_1.geometry} material={materials.mall_seeThru_divider} />
          <mesh name="Plane003_2" geometry={nodes.Plane003_2.geometry} material={materials['mall_GamePad_glass-border']} />
          <mesh name="Plane003_3" geometry={nodes.Plane003_3.geometry} material={materials.mall_floor_basic} />
          <mesh name="Plane003_4" geometry={nodes.Plane003_4.geometry} material={materials['mall_stairRails_top.001']} />
          <mesh name="Plane003_5" geometry={nodes.Plane003_5.geometry} material={materials.mall_stairRails_lighting} />
        </group>
        <group name="mall_rail_lights-entry">
          <mesh name="Mesh003" geometry={nodes.Mesh003.geometry} material={materials.mall_rail_top} />
          <mesh name="Mesh003_1" geometry={nodes.Mesh003_1.geometry} material={materials.mall_rail_lightholder} />
          <mesh name="Mesh003_2" geometry={nodes.Mesh003_2.geometry} material={materials.mall_rail_reflective} />
          <mesh name="Mesh003_3" geometry={nodes.Mesh003_3.geometry} material={materials['mall_rail_flourescent-main']} />
          <mesh name="Mesh003_4" geometry={nodes.Mesh003_4.geometry} material={materials['mall_rail_flourescent-secondary']} />
          <mesh name="Mesh003_5" geometry={nodes.Mesh003_5.geometry} material={materials['mall_rail_flourescent-third']} />
          <mesh name="Mesh003_6" geometry={nodes.Mesh003_6.geometry} material={materials.mall_post} />
        </group>
        <group name="mall_floor_firstFloor">
          <mesh name="mall_floor_main" geometry={nodes.mall_floor_main.geometry} material={materials.mall_floor_basic} />
          <mesh name="mall_floor_main_1" geometry={nodes.mall_floor_main_1.geometry} material={materials.mall_floor_sides} />
        </group>
        <group name="mall_guardWalls">
          <mesh name="Plane002" geometry={nodes.Plane002.geometry} material={materials.mall_guardWalls_basic} />
          <mesh name="Plane002_1" geometry={nodes.Plane002_1.geometry} material={materials['mall_rail_flourescent-main']} />
          <mesh name="Plane002_2" geometry={nodes.Plane002_2.geometry} material={materials.mall_guardWalls_top} />
        </group>
        <mesh name="mall_floor_firstFloor-walls" geometry={nodes['mall_floor_firstFloor-walls'].geometry} material={materials.mall_wall_basic} />
      </group>
    </group>
  )
}

useGLTF.preload('/mall_layout1.glb')
