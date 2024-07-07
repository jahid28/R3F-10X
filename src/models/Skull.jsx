import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Skull(props) {
  const { nodes, materials } = useGLTF('/skull.glb')
  return (
    <group scale={3} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0.019, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial.geometry}
            material={materials.Rosa_material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.defaultMat_material}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/skull.glb')