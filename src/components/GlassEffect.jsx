import React, { useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import {
  Center,
  Text3D,
  Environment,
  Lightformer,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial,
  PivotControls,
} from "@react-three/drei";
import { useControls, button } from "leva";
import {
  EffectComposer,
  HueSaturation,
  BrightnessContrast,
  Bloom,
  GodRays,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { Geometry, Base, Subtraction, Addition } from "@react-three/csg";

const GlassEffect = () => {
  const torus = useRef(null);

  useFrame(() => {
    if (torus.current) {
      torus.current.rotation.x += 0.01;
      torus.current.rotation.y += 0.02;
    }
  });

  const { ...config } = {
    backside: true,
    backsideThickness: 0.3,
    samples: 16,
    resolution: 1024,
    transmission: 1,
    clearcoat: 0,
    clearcoatRoughness: 0,
    thickness: 0.3,
    chromaticAberration: 0.1,
    anisotropy: 0.3,
    roughness: 0.1,
    distortion: 0.5,
    distortionScale: 0.1,
    temporalDistortion: 0,
    ior: 1.6,
  };
  const csg = useRef();
  const box = new THREE.BoxGeometry();
  return (
    <group position={[0, 1, 0]}>
     
      <mesh ref={torus}>
        <torusGeometry args={[1, 0.4, 50, 80]} />
        {/* <meshStandardMaterial color="yellow" /> */}
        <MeshTransmissionMaterial {...config} />
      </mesh>

    
        <mesh position={[0, 0, -3]}>
          <boxGeometry args={[2, 2, 2]} />
          {/* <MeshTransmissionMaterial {...config} /> */}
          <meshStandardMaterial color="gold" />
        </mesh>

    </group>
  );
};

export default GlassEffect;
