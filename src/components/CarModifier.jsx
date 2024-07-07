import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import {
  useGLTF,
  Lightformer,
  Environment,
  ContactShadows,
  Outlines,
  Html,
} from "@react-three/drei";
import { useControls } from "leva";
import { SpotLightHelper } from "three";


const CarModifier = () => {
  const { nodes, materials } = useGLTF("/dodge.glb");
  const html = useRef();
  const [bodyT, setBodyT] = React.useState(0);
  const [rimT, setRimT] = React.useState(0);
  const [tyreT, setTyreT] = React.useState(0);
  const [grillT, setGrillT] = React.useState(0);

  return (
    <group>
      <ContactShadows
        renderOrder={2}
        frames={1}
        resolution={1024}
        scale={20}
        blur={1}
        opacity={0.6}
        far={100}
      />

      {(bodyT == 5 || rimT == 5 || tyreT == 5 || grillT == 5) && (
        <Html scale={1} rotation={[0, 0, 0]} position={[0, 4, 0]}>
          <div style={{ display: "grid", placeItems: "center" }}>
            <input
              onChange={(e) => {
                if (bodyT == 5) {
                  materials["Material.003"].color.set(e.target.value);
                } else if (rimT == 5) {
                  materials["Material.001"].color.set(e.target.value);
                } else if (tyreT == 5) {
                  materials["Material.004"].color.set(e.target.value);
                } else if (grillT == 5) {
                  materials["Material.007"].color.set(e.target.value);
                }
              }}
              type="color"
              id="head"
              name="head"
              // value={bodyT==5 ? materials["Material.003"].color : rimT==3 ? "#a54c77" : "#a54c77"}
            />
            <p style={{ width: "110px" }}>Change Color</p>
          </div>
        </Html>
      )}
    

      <Environment resolution={512} preset="city">
        <Lightformer
          form="ring"
          color="white"
          intensity={10}
          scale={2}
          position={[0, 4, 0]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
        <Lightformer
          form="ring"
          color="red"
          intensity={10}
          scale={1}
          position={[0, 3.2, -4]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
          </Environment>

      <group scale={0.5} rotation={[0, Math.PI, 0]} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group position={[0.22, 0.143, 2.093]}>
            <mesh
              onClick={() => {
                if (rimT == 5) {
                  setRimT(0);
                } else {
                  setRimT(5);
                  setGrillT(0);
                  setBodyT(0);
                  setTyreT(0);
                }
              }}
              castShadow
              receiveShadow
              geometry={nodes.Object_8_1.geometry}
              material={materials["Material.001"]}
            >
              <Outlines
                screenspace
                // toneMapped={false}
                // polygonOffset
                // polygonOffsetFactor={100}
                // transparent
                opacity={1}
                color="yellow"
                angle={Math.PI}
                thickness={rimT}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_8_2.geometry}
              material={materials["Material.012"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_8_3.geometry}
              material={materials["Material.015"]}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_24.geometry}
            material={materials.Mesh00541Mtl}
            position={[0.219, 10.1, 2.515]}
          />
          <group position={[0.219, -0.713, 4.984]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_11.geometry}
              material={materials["Material.002"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_11_1.geometry}
              material={materials["Material.013"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_11_2.geometry}
              material={materials["Material.014"]}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials["Material.011"]}
            position={[0.159, -0.121, 3.296]}
          />
          <mesh
            onClick={() => {
              if (grillT == 5) {
                setGrillT(0);
              } else {
                setGrillT(5);
                setBodyT(0);
                setRimT(0);
                setTyreT(0);
              }
            }}
            castShadow
            receiveShadow
            geometry={nodes.Object_8.geometry}
            material={materials["Material.007"]}
            position={[0.231, -7.422, 3.525]}
          >
            <Outlines
              screenspace
              // toneMapped={false}
              // polygonOffset
              // polygonOffsetFactor={100}
              // transparent
              opacity={1}
              color="yellow"
              angle={Math.PI}
              thickness={grillT}
            />
          </mesh>
          <mesh
            onClick={() => {
              if (tyreT == 5) {
                setTyreT(0);
              } else {
                setTyreT(5);
                setGrillT(0);
                setBodyT(0);
                setRimT(0);
              }
            }}
            castShadow
            receiveShadow
            geometry={nodes.Object_12.geometry}
            material={materials["Material.004"]}
            position={[0.219, 0.322, 1.612]}
          >
            <Outlines
              screenspace
              // toneMapped={false}
              // polygonOffset
              // polygonOffsetFactor={100}
              // transparent
              opacity={1}
              color="yellow"
              angle={Math.PI}
              thickness={tyreT}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_14.geometry}
            material={materials["Material.008"]}
            position={[0.219, 1.159, 2.127]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_16.geometry}
            material={materials["Material.010"]}
            position={[0.23, -0.894, 4.37]}
          />
          <mesh
            onClick={() => {
              if (bodyT == 5) {
                setBodyT(0);
              } else {
                setBodyT(5);
                setTyreT(0);
                setGrillT(0);
                setRimT(0);
              }
            }}
            castShadow
            receiveShadow
            geometry={nodes.Object_18.geometry}
            material={materials["Material.003"]}
            position={[0.217, 0.655, 3.539]}
          >
            <Outlines
              screenspace
              // toneMapped={false}
              // polygonOffset
              // polygonOffsetFactor={100}
              // transparent
              opacity={1}
              color="yellow"
              angle={Math.PI}
              thickness={bodyT}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_20.geometry}
            material={materials["Material.006"]}
            position={[0.22, 0.509, 2.552]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials["Material.009"]}
          position={[0, 3.682, 8.181]}
          rotation={[0.588, 0, 0]}
        />
      </group>
    </group>
  );
};
useGLTF.preload("/dodge.glb");
export default CarModifier;
