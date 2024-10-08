/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 storefront_mr-chocolate.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Storefront_MrChocolate(props) {
  const { nodes, materials } = useGLTF('/models/storefront_mr-chocolate.glb')
  return (
    <group {...props} dispose={null} position={props.position}>
      <mesh geometry={nodes.storefront_floor.geometry} material={materials.storefront_floor} position={[0, 0.005, 0]} />
      <mesh geometry={nodes.human_block.geometry} material={materials['storefront_displaycase-baseColor']} position={[1.403, 0, -2.31]} scale={[0.756, 1, 0.756]} />
      <group position={[0, 0.005, 0]}>
        <mesh geometry={nodes.storefront_walls_1.geometry} material={materials['storefront_innerWall-right']} />
        <mesh geometry={nodes.storefront_walls_2.geometry} material={materials['storefront_innerWall-left']} />
        <mesh geometry={nodes.storefront_walls_3.geometry} material={materials.storefront_outerWall} />
      </group>
      <group position={[0, 0, 0.274]}>
        <mesh geometry={nodes['storefront_displaycase-Lshaped1_1'].geometry} material={materials['storefront_displaycase-glass']} />
        <mesh geometry={nodes['storefront_displaycase-Lshaped1_2'].geometry} material={materials['storefront_displaycase-baseColor']} />
        <mesh geometry={nodes['storefront_displaycase-Lshaped1_3'].geometry} material={materials['storefront_displaycase-innerWalls']} />
        <mesh geometry={nodes['storefront_displaycase-Lshaped1_4'].geometry} material={materials['storefront_displaycase-glassBorder']} />
      </group>
      <mesh geometry={nodes['storefront_displaycase-6face'].geometry} material={materials['storefront_display-6face_bottom']} />
      <group position={[0.265, 1.459, 1.793]} rotation={[0, 0.752, 0]}>
        <mesh geometry={nodes.Cube001.geometry} material={materials['storefront_sign-base']} />
        <mesh geometry={nodes.Cube001_1.geometry} material={materials['storefront_sign-pole']} />
        <mesh geometry={nodes.Cube001_2.geometry} material={materials['storefront_sign-board']} />
      </group>
      <group position={[-1.573, 2.366, -1.73]} rotation={[0, 0.678, 0]} scale={[1.473, 0.763, 0.025]}>
        <mesh geometry={nodes.Cube002.geometry} material={materials['storefront_tv-frame']} />
        <mesh geometry={nodes.Cube002_1.geometry} material={materials['storefront_tv-face']} />
      </group>
      <mesh geometry={nodes.storefront_ceiling.geometry} material={materials.storefront_ceiling} position={[0, 3.51, 0]} rotation={[0, 0, Math.PI]} />
    </group>
  )
}

useGLTF.preload('/models/storefront_mr-chocolate.glb')
