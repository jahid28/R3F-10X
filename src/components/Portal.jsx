import React, { useRef } from "react";
import {
  useGLTF,
  MeshPortalMaterial,
  CameraControls,
  Text,
  Sky,
  OrbitControls,
  ContactShadows,
  Environment,
  Float,
} from "@react-three/drei";

export default function Portal() {
  return (
    <group>

      <mesh position={[0, 2, 0]}>
        <planeGeometry args={[4, 4]} />
        <MeshPortalMaterial>
          <OrbitControls
            enablePan={false}
            dampingFactor={0.05}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            makeDefault
            maxDistance={30}
            minDistance={10}
            enableDamping
            enableZoom
            />

          <Sky />
          <Environment preset="city" />
          <mesh position={[0, 2, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"red"} />
          </mesh>

          <mesh position={[0, 0, 0]} rotation={[Math.PI/3,0,0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
          
        </MeshPortalMaterial>
      </mesh>

    </group>
  );
};

