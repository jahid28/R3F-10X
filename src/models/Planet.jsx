import React, { useRef } from 'react'
import { useGLTF, useAnimations,Effects } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Planet(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/planet.glb')
  // const { actions } = useAnimations(animations, group)
  useFrame(()=>{
    group.current.rotation.y+=.002
  
  })
  return (
    <group scale={2} ref={group} {...props} dispose={null}>
    <group name="Sketchfab_Scene">
      <group name="Root" rotation={[-Math.PI / 2, 0, 0]}>
        <group name="Planet" rotation={[0, 0, Math.PI / 2]}>
          <mesh
            name="Planet_0"
            castShadow
            receiveShadow
            geometry={nodes.Planet_0.geometry}
            material={materials.PurplePlanet}
          />
          <group name="Clouds_0" rotation={[0, 0, -Math.PI / 2]} scale={1.013}>
            <mesh
              name="Clouds_0_0"
              castShadow
              receiveShadow
              geometry={nodes.Clouds_0_0.geometry}
              material={materials.Clouds_0}
            />
          </group>
        </group>
        <group name="Clouds_1" scale={1.019}>
          <mesh
            name="Clouds_1_0"
            castShadow
            receiveShadow
            geometry={nodes.Clouds_1_0.geometry}
            material={materials.Clouds_1}
          />
        </group>
      </group>
    </group>
  </group>
  )
}

useGLTF.preload('/planet.glb')