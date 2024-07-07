import React, { useRef } from "react";
import { useGLTF, Stars, Environment, Trail } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { Planet } from "../models/Planet";
import * as THREE from "three";
import {
  EffectComposer,
  HueSaturation,
  BrightnessContrast,
  Bloom,
} from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { useControls, button } from "leva";

export default function Space(props) {
  const { nodes, materials } = useGLTF("/rocket2.glb");

  //usespring
  const ref = useRef();
  const { rx } = useSpring({
    from: { rx: 0 },
    to: [
      {
        rx: -2 * Math.PI,
      },
    ],
    config: { friction: 6, mass: 1, tension: 30 },
    loop: true,
    // reset: true,
    immediate: true,
    delay: 1000,
  });

  // const { ...config } = useControls({
  //   bloom: { value: 1, max: 5, min: 0, step: 0.1 },
  // });
  return (
    <group>
      
        <EffectComposer disableNormalPass multisampling={8}>
        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={1}
        />
      </EffectComposer>
     
      {/* <Environment preset="night" /> */}
      {/* <pointLight position={[5, 0, 5]} intensity={20} color="white" /> */}
      <Planet />

      <Stars
        radius={100}
        speed={4}
        count={400}
        factor={10}
        saturation={0}
        fade
      />
      <animated.group scale={0.5} rotation-x={rx} {...props} dispose={null}>
        <group
          position={[2.948, 0, 1.163]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.248}
        >
          <group position={[-11.884, -9.597, 0]} rotation={[-0.008, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.phong1SG}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4_1.geometry}
              material={materials.blinn1SG}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4_2.geometry}
              material={materials.blinn2SG}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4_3.geometry}
              material={materials.blinn3SG}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4_4.geometry}
              material={materials.blinn5SG}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4_5.geometry}
              material={materials.phong2SG}
            />
          </group>
        </group>
      </animated.group>
      <Comet rotation={[Math.PI / 2, Math.PI / 2, 0]} />
    </group>
  );
}

useGLTF.preload("/rocket2.glb");

function Comet({ radius = 80, speed = 1, ...props }) {
  const comet1 = useRef();
  // useFrame((state) => {
  //   const t = state.clock.getElapsedTime() * speed
  //   ref.current.position.set(Math.sin(t) * radius, (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25, 0)
  // })

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    comet1.current.position.set(
      Math.sin(t) * radius,
      (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
      0
    );
  });
  return (
    <group {...props} position={[0, 3, 10]}>
      <Trail
        width={5}
        length={2}
        color={new THREE.Color(2, 7, 7)}
        attenuation={(t) => t}
      >
        <mesh ref={comet1}>
          <sphereGeometry args={[0.25]} />
          <meshBasicMaterial color={[10, 10, 10]} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}
