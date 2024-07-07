import React, { useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import {
  PivotControls,
} from "@react-three/drei";
import * as THREE from "three";
import { Geometry, Base, Subtraction, Addition } from "@react-three/csg";

const Csv = () => {

  const csg = useRef();
  const box = new THREE.BoxGeometry();
  return (
    <group position={[0, 1, 0]}>
     
      <mesh position={[-3, 0.5, 0]}>
        <Geometry ref={csg} useGroups>
          <Base name="base" geometry={box} scale={[3, 3, 3]}>
            <meshStandardMaterial color="lime" />
          </Base>

          <PivotControls
            lineWidth={3}
            scale={3}
            anchor={[0, 0, 0]}
            onDrag={() => csg.current.update()}
          >
            <group scale={2} position={[0.5, 0.5, 1]}>
              <Subtraction>
                <dodecahedronGeometry />
                <meshStandardMaterial color="hotpink" side={THREE.DoubleSide} />
              </Subtraction>
            </group>
          </PivotControls>
        </Geometry>
      </mesh>
    
      <PivotControls
        activeAxes={[true, true, true]}
        rotation={[0, 0, 0]}
        scale={2}
        anchor={[0.8, 0, 0.8]}
      >
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#9e263c" />
        </mesh>
      </PivotControls>

    </group>
  );
};

export default Csv;
