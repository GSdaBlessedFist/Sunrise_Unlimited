import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Html, useGLTF } from "@react-three/drei";
import Tablet_UI from "./Tablet_UI/Tablet_UI";

export default function Tablet({ position = [0, 0, 0] }) {
  const { nodes, materials } = useGLTF("/models/mall_layout1.glb");
  const tabletRef = useRef();
  const tabletScreenRef = useRef();
  const uiRef = useRef();

  // useEffect(() => {
  //   if (uiRef.current) {
  //     const xAxis = new THREE.Vector3(1, 0, 0);
  //     const angle = THREE.MathUtils.degToRad(0);
  //     const uiQuaternion = new THREE.Quaternion().setFromAxisAngle(xAxis, angle);

  //     uiRef.current.setRotationFromQuaternion(uiQuaternion);
  //   }
  // }, []);
  useEffect(() => {
    if (tabletScreenRef.current) {
      console.log(tabletScreenRef.current)
      // Create rotation quaternion
      const xAxis = new THREE.Vector3(1, 0, 0); // Rotate around X-axis
      const angle = THREE.MathUtils.degToRad(30); // Rotation angle (45 degrees)
      const rotationQuaternion = new THREE.Quaternion().setFromAxisAngle(xAxis, angle);

      // Apply rotation to the tablet_screen group
      tabletScreenRef.current.setRotationFromQuaternion(rotationQuaternion);
      uiRef.current.setRotationFromQuaternion(rotationQuaternion);
      // If you want to rotate the UI similarly, apply the rotation to the uiRef
      // if (uiRef.current) {
      //   // Create a matching rotation quaternion for the UI
      //   uiRef.current.setRotationFromQuaternion(rotationQuaternion);
      // }
    }
  }, []);


  return (
    <group
      ref={tabletRef}
      name="TABLET"
      position={[-1.303, 1.045, 6.298]}
      rotation={[0, Math.PI / 2, 0]}>
      <group name="tablet_stand" position={[0, -0.093, 0]} scale={1.25}>
        <mesh
          name="tablet-stand"
          geometry={nodes["tablet-stand"].geometry}
          material={materials.tablet_frame}
        />
        <mesh
          name="tablet-stand_1"
          geometry={nodes["tablet-stand_1"].geometry}
          material={materials.tablet_screen}
        />
        <mesh
          name="tablet-stand_2"
          geometry={nodes["tablet-stand_2"].geometry}
          material={materials.tablet_borderLighting}
        />
        <mesh
          name="tablet-stand_3"
          geometry={nodes["tablet-stand_3"].geometry}
          material={materials.tablet_screenAxis}
        />
      </group>
      <group ref={tabletScreenRef} name="tablet_screen" position={[0, -0.093, 0]} scale={1.25} >
        <mesh
          name="tablet-stand004"
          geometry={nodes["tablet-stand004"].geometry}
          material={materials.tablet_frame}
        />
        <mesh
          name="tablet-stand004_1"
          geometry={nodes["tablet-stand004_1"].geometry}
          material={materials.tablet_screen}
        />
        <mesh
          name="tablet-stand004_2"
          geometry={nodes["tablet-stand004_2"].geometry}
          material={materials.tablet_borderLighting}
        />
        <group ref={uiRef}>
          <Html center>
            <div style={{ transform: "translate(0, -94%) scale(1.2)" }}>
              <Tablet_UI />
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}
