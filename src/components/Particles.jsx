import React, { useEffect, useMemo, useState, useRef, Suspense } from "react";

import {
  ContactShadows,
  Environment,
  Float,
  useGLTF,
  Html,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { Skull } from "../models/Skull";

const Particles = (props) => {
  const [particles, setParticles] = useState(true);
  const [gg, setGG] = useState([]);
  const { ...config } = useControls({
    size: { value: 0.015, min: 0.001, max: 0.1 },
    count: { value: 12025, min: 3025, max: 17025,step:500 },

  });

  function combineFloat32Arrays(...arrays) {
    let totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
    let combinedArray = new Float32Array(totalLength);
    let offset = 0;

    for (let arr of arrays) {
      combinedArray.set(arr, offset);
      offset += arr.length;
    }

    return combinedArray;
  }

  const { nodes, materials } = useGLTF("/skull.glb");

  function toFloat32Array() {
    let arr1 = new Float32Array(
      nodes.defaultMaterial.geometry.attributes.position.array
    );
    let arr2 = new Float32Array(
      nodes.defaultMaterial_1.geometry.attributes.position.array
    );

    setGG(combineFloat32Arrays(arr1, arr2));

  }

  useEffect(() => {
    if (nodes) {
      toFloat32Array();
    }
  }, [nodes]);
  const points = useRef();

  setTimeout(() => {
    console.log(gg.length / 3);
  }, 5000);

  return (
    <group>
      <Html scale={1} rotation={[0, 0, 0]} position={[0, 4, 0]}>
        {particles ? (
          <button
            onClick={() => {
              setParticles(false);
            }}
            style={{
              backgroundColor: "navy",
              borderRadius:"5px",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            
            }}
          >
            Model
          </button>
        ) : (
          <button
            onClick={() => {
              setParticles(true);
            }}
            style={{
              backgroundColor: "navy",
              borderRadius:"5px",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            
            }}
            
          >
            Particles
          </button>
        )}
      </Html>

      <EffectComposer disableNormalPass multisampling={8}>
        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={.4}
        />
      </EffectComposer>

      <ContactShadows
        renderOrder={2}
        frames={1}
        resolution={1024}
        scale={12}
        blur={1}
        opacity={0.6}
        far={100}
      />

      <Float speed={2} rotationIntensity={1}>
        {/* <rectAreaLight
          rotation={[3.14, 3.14, 0]}
          intensity={22}
          position={[5, 6, 2]}
          width={0.5}
          color={"white"}
          height={0.5}
        /> */}

        {particles ? (
          <group>
            {gg.length > 0 && (
              <points
                rotation={[0, 0, 0]}
                scale={3}
                position={[0, 0,0]}
                ref={points}
              >
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={config.count}
                    // count={025}
                    array={gg}
                    itemSize={3}
                  />
                </bufferGeometry>
                <pointsMaterial
                  size={config.size}
                  color="#918756"
                  sizeAttenuation
                  depthWrite={true}
                />
              </points>
            )}
          </group>
        ) : (
          <group>
            <Skull />
          </group>
        )}
      </Float>

      <Environment preset="city" />

   
    </group>
  );
};

export default Particles;
