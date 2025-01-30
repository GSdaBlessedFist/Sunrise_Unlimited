import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF,PerspectiveCamera,useTexture, Html } from '@react-three/drei'
import { useThree,invalidate, useFrame } from '@react-three/fiber';
import * as THREE from "three";
import '../../lib/extendThree';
import { gsap } from "gsap";
import { useCamera } from '../../Providers/CameraProvider';
import { loadStorefrontComponents } from '../../lib/loadStorefrontComponents';
import { useStorefront } from '../../Providers/StorefrontProvider';
import p from '../../helpers/consoleHelper';
import Tablet from '../Message_Tablet/Tablet';
import ActionMarker from "../ActionMarker/ActionMarker";
import {useEntryDoorsAction}  from '../../Providers/EntryDoorsProvider';
import WasdUIModal from "../modals/wasdModal/WasdUIModal";
import CameraControls from "../CameraControls";
import Portal from '../modals/Portal';
import Image from 'next/image';

const SOURCE = "Mall Layout off";
const srcColor = 100;

export default function Mall_Layout1({enterLayout,storefronts, ...props }) {
  const { scene,nodes, materials,cameras } = useGLTF('/models/mall_layout1.glb');
  const {welcomeIsOpen,slidingDoorsOpen,handleSlidingDoors} = useEntryDoorsAction();
  const [loadedComponents, setLoadedComponents] = useState([]);
  //const [plotPosition, setPlotPosition] = useState([0, 0, 0]);
  const { set,camera } = useThree();

  const plotRef = useRef();
  const [plotPositions,setPlotPositions] = useState([]);
  const firstFloorRef = useRef();
  const entranceSensorRef = useRef();

  const entryCameraRef = useRef();
  const bigScreenCameraRef = useRef();
  const [transitionComplete, setTransitionComplete] = useState(false);
  const { activeCamera,activateWASDControls,setActivateWASDControls } = useCamera();
  
  const entrySlidedoorLeftRef = useRef();
  const entrySlidedoorRightRef = useRef();
  const enterActionRef = useRef();
  const [entranceSensorCollision,setEntranceSensorCollision] = useState(false);

  const [isWASDModalVisible,setIsWASDModalVisible] = useState(true);
  
  const personRef = useRef();
  const bigScreenRef = useRef();

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  
  function slidingDoorsAction(state=1){
    //@state: open =1 || closed = -1
    const leftDoorPos = entrySlidedoorLeftRef.current.position;
    const rightDoorPos = entrySlidedoorRightRef.current.position;
    gsap.to(leftDoorPos,{x:-1 * state,duration: 3.5})
    gsap.to(rightDoorPos,{x:1 * state,duration: 3.5},"<")
  }

  function handleEnterActionMarkerClick(){
    if(transitionComplete){
      slidingDoorsAction(1)
      handleSlidingDoors(true)
    }   
  };


  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  //////////////////////////MATERIALS//////////////////////////

  const mallEntrySlidingdoorGlassMaterial = useMemo(()=>({
    color: '#7777ff',
    transparent: true,
    opacity: 0.55,
    roughness: 1,
    metalness: 0.9,
    transmission: 0.9,
    ior: 1.2,
  }),[])
    
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  
  useEffect(()=>{
    setPlotPositions(plotRef.current.position)
  },[])

  useEffect(()=>{
    //console.log(plotPositions)
  },[plotPositions])

  useEffect(() =>{
    p(SOURCE,storefronts,srcColor + 32,"storefronts:")
  },
  [storefronts])

  //Loading storefronts
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

  //EntryCamera transition logic
  useEffect(() => {
    if (!transitionComplete && entryCameraRef.current) {
      const camera = entryCameraRef.current;
      //console.log(camera);
      // Animate the position
      gsap.to(camera.position, {
        duration: 4.5,
        x: 0,
        y: 1.676,
        // z: 23.356,
        z: 20,
        ease: "power4.out",
        onComplete: () => setTransitionComplete(true),
      });
  
      // Animate the FOV
      // gsap.from(camera, {
      //   duration: 4.5,
      //   fov: 65,
      //   ease: "power4.out",
      //   onUpdate: () => {
      //     camera.updateProjectionMatrix(); // Ensure the FOV change is applied
      //   },
      // });
    }
  }, [transitionComplete]);

  //Camera switching
  useEffect(() => {
    if (activeCamera) {
      if (activeCamera === "entry_Camera" && entryCameraRef.current) {
        set({ camera: entryCameraRef.current });
      } else if (activeCamera === "big-screens_Camera" && bigScreenCameraRef.current) {
        set({ camera: bigScreenCameraRef.current });     
      }
    }
  }, [activeCamera, set, bigScreenCameraRef, bigScreenRef, entryCameraRef]);
  




  
  useFrame(() => {
  if (!entranceSensorRef.current) return;

  // Define a small bounding box representing the camera
  const cameraBoundingBox = new THREE.Box3().setFromCenterAndSize(
    camera.position,
    new THREE.Vector3(0.5, 4, 0.5) // Adjust these values based on the camera size
  );

  // Ensure entrance sensor has a valid bounding box
  const entranceObject = entranceSensorRef.current;
  const entranceSensorBoundingBox = new THREE.Box3().setFromObject(entranceObject);

  if (entranceSensorBoundingBox.isEmpty()) {
    entranceSensorBoundingBox.setFromCenterAndSize(
      entranceObject.position,
      new THREE.Vector3(2, 1, .2) // Adjust these values based on the entrance size
    );
  }

  // Collision detection
  const hasCollided = cameraBoundingBox.intersectsBox(entranceSensorBoundingBox);

  if (hasCollided && !entranceSensorCollision) {
    //console.log("Camera entered entrance sensor zone");
    setEntranceSensorCollision(true);
  } else if (!hasCollided && entranceSensorCollision) {
    //console.log("Camera left entrance sensor zone");
    setEntranceSensorCollision(false);
  }
});

  useEffect(() => {
    // if(camera && entranceSensorCollision){
    //   gsap.to(camera,{fov: 75,duration:2})
    //   camera.updateMatrixWorld()
    // }
  },[entranceSensorCollision]);


  
  useEffect(() => {
    const firstFloorBoundingBox = new THREE.Box3().setFromObject(firstFloorRef.current)
    console.log(firstFloorBoundingBox);
  },[firstFloorRef.current]);

  useEffect(()=>{
    if(!slidingDoorsOpen){
      setIsWASDModalVisible(false)      
    }
  },[slidingDoorsOpen]);


  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////// 

  return (<>
  {/* ///////////////////////////// */}
  {/* vvvvvvvv INCLUDE   vvvvvvv */}

    {!welcomeIsOpen && transitionComplete && !slidingDoorsOpen?(
      <ActionMarker ref={enterActionRef} position={[0, 2, 0]} onClick={handleEnterActionMarkerClick} label={"Enter"} />
    ):null}
    
    {slidingDoorsOpen && (
      <Html position={[0, 2, -1]} fullscreen transform={true} distanceFactor={4} className='pointer-events-none relative z-50 drop-shadow-2xl' >
        <WasdUIModal setActivateWASDControls={setActivateWASDControls}/>
      </Html>
    )}

    {activateWASDControls && (<CameraControls/>)}

  {/* ^^^^^^^^  INCLUDE ^^^^^^^ */}
  {/* ///////////////////////////// */}
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="downTheMiddleEMPTY-2nd_floor" />
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
        </group> 
        </group> */}
        {/* <Tablet position={[0, 0.001, 0]} /> */}
        <group name="frontArea" position={[0.119, 4.155, 6.876]} rotation={[-0.918, 0, 0]} />
        <spotLight intensity={20311.125} angle={0.454} penumbra={0.686} decay={2} rotation={[-Math.PI / 2, 0, 0]} target={nodes.Spot001.target}>
          <primitive object={nodes.Spot001.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight intensity={27175.707} angle={0.436} penumbra={0.15} decay={2} rotation={[-Math.PI / 2, 0, 0]} target={nodes.Spot002.target}>
          <primitive object={nodes.Spot002.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight intensity={27175.707} angle={0.436} penumbra={0.15} decay={2} rotation={[-Math.PI / 2, 0, 0]} target={nodes.Spot003.target}>
          <primitive object={nodes.Spot003.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight intensity={27175.707} angle={0.436} penumbra={0.15} decay={2} rotation={[-Math.PI / 2, 0, 0]} target={nodes.Spot004.target}>
          <primitive object={nodes.Spot004.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight intensity={5321.003} angle={0.528} penumbra={0.15} decay={2} position={[8.386, 3.19, -0.708]} rotation={[-0.697, 0.62, -0.401]} target={nodes.Spot.target}>
          <primitive object={nodes.Spot.target} position={[0, 0, -1]} />
        </spotLight>
        {/* REPLACE */}
        <PerspectiveCamera ref={entryCameraRef} name="entry_Camera" makeDefault={activeCamera === "entry_Camera"} far={1000} near={0.1} fov={50} position={[0, 1.65, 21.0]} rotation={[0.015, 0, 0]} />
        <PerspectiveCamera ref={bigScreenCameraRef} name="big-screens_Camera" makeDefault={activeCamera === "big-screens_Camera"} far={1000} near={0.1} fov={32.269} position={[-10.889, -0.406, 1.278]} rotation={[2.99, -0.363, 3.124]} />
        <group name="stairs">
          <mesh name="Plane001" geometry={nodes.Plane001.geometry} material={materials.mall_stair_basic} />
          <mesh name="Plane001_1" geometry={nodes.Plane001_1.geometry} material={materials.mall_stairRails_bars} />
          <mesh name="Plane001_2" geometry={nodes.Plane001_2.geometry} material={materials['mall_stairRails_top.001']} />
          <mesh name="Plane001_3" geometry={nodes.Plane001_3.geometry} material={materials.mall_stairRails_lighting} />
          <mesh name="Plane001_4" geometry={nodes.Plane001_4.geometry} material={materials.mall_seeThru_divider} />
          <mesh name="Plane001_5" geometry={nodes.Plane001_5.geometry} material={materials.mall_stairs_side} />
        </group>
        {/* REPLACE */}
        <mesh ref={bigScreenRef} name="mall_bigScreen" geometry={nodes.mall_bigScreen.geometry} material={materials.mall_bigScreen} position={[-7.356, 3.537, 18.399]} rotation={[Math.PI / 2, 0, 0]} scale={[10.567, 7.193, 6.376]} />
          <mesh ref={plotRef} name="mall_storefront_plot" geometry={nodes.mall_storefront_plot.geometry} material={materials.Mall_storefront_plot} position={[0, 0.001, 0]} />
            <Suspense fallback={<div>Loading storefronts...</div>}>
              {loadedComponents.map(({ id, Component, componentPath }) => (
                <Component key={id} position={plotPositions} />
              ))}
            </Suspense>
        {/* <mesh name="STOREPLACEHOLDER" geometry={nodes.STOREPLACEHOLDER.geometry} material={materials.storefrontplaceholder} position={[0.004, 0.006, 0]} /> */}
        <group name="person-placehlder" position={[-10.935, -1.187, 1.009]} rotation={[Math.PI, -0.531, Math.PI]}>
          <mesh name="human_block001" geometry={nodes.human_block001.geometry} material={materials['storefront_displaycase-baseColor.001']} />
          <mesh name="human_block001_1" geometry={nodes.human_block001_1.geometry} material={materials['person-placeholder_front']} />
        </group>
        {/* <mesh name="STOREPLACEHOLDER002" geometry={nodes.STOREPLACEHOLDER002.geometry} material={materials.storefrontplaceholder} position={[0.004, -4.5, 0]} /> */}
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
        <group ref={firstFloorRef} name="mall_floor_firstFloor">
          <mesh name="mall_floor_main" geometry={nodes.mall_floor_main.geometry} material={materials.mall_floor_basic} />
          <mesh name="mall_floor_main_1" geometry={nodes.mall_floor_main_1.geometry} material={materials.mall_floor_sides} />
        </group>
        <group name="mall_guardWalls">
          <mesh name="Plane002" geometry={nodes.Plane002.geometry} material={materials.mall_guardWalls_basic} />
          <mesh name="Plane002_1" geometry={nodes.Plane002_1.geometry} material={materials['mall_rail_flourescent-main']} />
          <mesh name="Plane002_2" geometry={nodes.Plane002_2.geometry} material={materials.mall_guardWalls_top} />
        </group>
        <mesh name="mall_floor_firstFloor-walls" geometry={nodes['mall_floor_firstFloor-walls'].geometry} material={materials.mall_wall_basic} />
        {/* ADD SENSOR REF */}
        <mesh ref={entranceSensorRef} name="mall_entranceSensor" geometry={nodes.mall_entranceSensor.geometry} material={nodes.mall_entranceSensor.material} position={[0, 0.013, 0]} />
        <mesh name="mall_entrySlidedoor_frame" geometry={nodes.mall_entrySlidedoor_frame.geometry} material={materials.mall_entrySlidingdoor_border} position={[0, 0.229, 18.445]} scale={[3.75, 0.75, 0.75]} />
        {/* ADD SLIDINGDOORLEFT REF */}
        <group ref={entrySlidedoorLeftRef} name="mall_entrySlidedoor-glass_Left" position={[0, 1.236, 18.628]} scale={[3.75, 0.761, 0.75]}>
          {/* <mesh name="mall_entrySlidedoor-glass_Left_1" geometry={nodes['mall_entrySlidedoor-glass_Left_1'].geometry} material={materials.mall_entrySLidingdoor_glassWlogo} /> */}
          {/* REPLACE */}
          <mesh name="mall_entrySlidedoor-glass_Left_1" geometry={nodes['mall_entrySlidedoor-glass_Left_1'].geometry}>
            <meshPhysicalMaterial {...mallEntrySlidingdoorGlassMaterial} />
          </mesh>
          <mesh name="mall_entrySlidedoor-glass_Left_2" geometry={nodes['mall_entrySlidedoor-glass_Left_2'].geometry} material={materials.mall_entrySlidingdoor_border} />
          {/* NOT NEEDED */}
          {/* <mesh name="mall_entrySlidedoor-glass_Left_3" geometry={nodes['mall_entrySlidedoor-glass_Left_3'].geometry} material={materials.mall_entrySLidingdoor_glassWlogo} /> */}
        </group>
        <mesh name="mall_building_walls" geometry={nodes.mall_building_walls.geometry} material={materials.mall_building_walls} position={[0, 0, 0.056]} />
        {/* ADD SLIDINGDOORRIGHT REF */}
        <group ref={entrySlidedoorRightRef} name="mall_entrySlidedoor-glass_Right" position={[0, 1.236, 18.628]} scale={[3.75, 0.761, 0.75]}>
          {/* <mesh name="mall_entrySlidedoor-glass_Right_1" geometry={nodes['mall_entrySlidedoor-glass_Right_1'].geometry} material={materials.mall_entrySLidingdoor_glassWlogo} /> */}
          {/* REPLACE */}
          <mesh name="mall_entrySlidedoor-glass_Right_1" geometry={nodes['mall_entrySlidedoor-glass_Right_1'].geometry}>
            <meshPhysicalMaterial {...mallEntrySlidingdoorGlassMaterial} />
          </mesh>
          <mesh name="mall_entrySlidedoor-glass_Right_2" geometry={nodes['mall_entrySlidedoor-glass_Right_2'].geometry} material={materials.mall_entrySlidingdoor_border} />
        </group>
      </group>
    </group>
  </>)
}

useGLTF.preload('/mall_layout1.glb')
