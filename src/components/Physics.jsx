import React, { useState, useEffect, useRef } from "react";
import { Physics, Debug, usePlane, useCompoundBody } from "@react-three/cannon";
import { useGLTF, Html, SoftShadows } from "@react-three/drei";

const PhysicsComp = () => {
  const [val, setVal] = useState(0);
  const [reset, setReset] = useState(false);

  return (
    <group>
      <Html scale={1} rotation={[0, 0, 0]} position={[0, 4, 0]}>
        <div style={{ display: "flex", position: "relative", left: "-12rem" }}>
          <button
            onClick={() => {
              if (val == 0) {
                setVal(1000);
              }
              setReset(false);
            }}
            style={{
              cursor: "pointer",
              width: "100px",
              color: "white",
              backgroundColor: "navy",
              border: "none",
              padding: "10px",
              borderRadius: "10px",
              marginRight: "2rem",
              fontSize: "1rem",
            }}
          >
            Low Force
          </button>
          <button
            onClick={() => {
              if (val == 0) {
                setVal(2000);
              }
              setReset(false);
            }}
            style={{
              cursor: "pointer",
              width: "130px",
              color: "white",
              backgroundColor: "navy",
              border: "none",
              padding: "10px",
              borderRadius: "10px",
              marginRight: "2rem",
              fontSize: "1rem",
            }}
          >
            Medium Force
          </button>
          <button
            onClick={() => {
              if (val == 0) {
                setVal(3000);
              }
              setReset(false);
            }}
            style={{
              cursor: "pointer",
              width: "110px",
              color: "white",
              backgroundColor: "navy",
              border: "none",
              padding: "10px",
              borderRadius: "10px",
              marginRight: "2rem",
              fontSize: "1rem",
            }}
          >
            High Force
          </button>
        </div>

        <button
          onClick={() => {
            setVal(0);
            setReset(true);
          }}
          style={{
            cursor: "pointer",
            // width: "10px",
            color: "white",
            backgroundColor: "navy",
            border: "none",
            padding: "5px",
            borderRadius: "5px",
            marginRight: "2rem",
            fontSize: "1rem",
            marginLeft: "-2rem",
            marginTop: "1rem",
          }}
        >
          Reset
        </button>
      </Html>

      <Physics iterations={6}>
        {/* <Debug scale={1.01} color="black"> */}
        <Plane rotation={[-Math.PI / 2, 0, 0]} />
        <Ball
          reset={reset}
          val={val}
          position={[1, 1, 1]}
          rotation={[0, 0, 0]}
        />

        <Pin reset={reset} position={[-1, 1, -1]} rotation={[0, 0, 0]} />
        <Pin reset={reset} position={[-1, 1, -1.3]} rotation={[0, 0, 0]} />
        <Pin reset={reset} position={[-1.3, 1, -1]} rotation={[0, 0, 0]} />
        <Pin reset={reset} position={[-1.3, 1, -1.3]} rotation={[0, 0, 0]} />
        <Pin reset={reset} position={[-1, 1, -1.6]} rotation={[0, 0, 0]} />
        <Pin reset={reset} position={[-1.6, 1, -1]} rotation={[0, 0, 0]} />
        <Pin reset={reset} position={[-1.3, 1, -1.6]} rotation={[0, 0, 0]} />
        <Pin reset={reset} position={[-1.6, 1, -1.3]} rotation={[0, 0, 0]} />
        <Pin reset={reset} position={[-1.9, 1, -1.0]} rotation={[0, 0, 0]} />
        <Pin reset={reset} position={[-1.0, 1, -1.9]} rotation={[0, 0, 0]} />
        {/* </Debug> */}
      </Physics>
    </group>
  );
};

export default PhysicsComp;

function Plane(props) {
  const [ref] = usePlane(() => ({ type: "Static", ...props }));
  return (
    <mesh ref={ref}>
      <planeGeometry args={[0, 0]} />
      <meshStandardMaterial color="#ffb385" />
    </mesh>
  );
}

function Pin(props) {
  const { nodes, materials } = useGLTF("/bowling_pin.glb");

  useEffect(() => {
    if (props.reset) {
      api.position.set(...props.position);
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0);
      api.rotation.set(0,0,0)
    }
  }, [props.reset]);

  const [ref,api] = useCompoundBody(() => ({
    mass: 0.5,
    ...props,
    shapes: [
      // {
      //   type: "Cylinder",
      //   position: [0, 0, 0],
      //   // rotation: [0, 0, 0],
      //   args: [0.06, 0.16, .8,10],
      // },
      {
        type: "Cylinder",
        position: [0, 0, 0],
        // rotation: [0, 0, 0],
        args: [0.07, 0.15, .7,10],
      },
      // {
      //   type: "Cylinder",
      //   position: [0, .17, 0],
      //   // rotation: [0, 0, 0],
      //   args: [0.06, 0.135, .52,20],
      // },
      // {
      //   type: "Cylinder",
      //   position: [0, -.24, 0],
      //   // rotation: [0, 0, 0],
      //   args: [0.14, 0.15, .28,20],
      // },
      // { type: 'Sphere', position: [1, 0, 0], rotation: [0, 0, 0], args: [0.65] }
    ],
  }));
  return (
    <group ref={ref}>
      <group scale={2.5} {...props} dispose={null} position={[0, -0.4, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.PinStripe}
        />
      </group>
    </group>
  );
}

function Ball(props) {
  useEffect(() => {
    if (props.reset) {
      api.position.set(...[1, 1, 1]);
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0);
    }
  }, [props.reset]);

  const [ref, api] = useCompoundBody(() => ({
    mass: 20,
    ...props,
    // position:pos,
    shapes: [
      {
        type: "Sphere",
        position: [0, 0, 0],
        // rotation: [0, 0, 0],
        args: [0.3],
      },
      // { type: 'Sphere', position: [1, 0, 0], rotation: [0, 0, 0], args: [0.65] }
    ],
  }));

  useEffect(() => {
    api.applyForce([-props.val, 0, -props.val], [1, 1, 1]);
  }, [props.val]);

  return (
    <group ref={ref}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#302b52" />
      </mesh>
    </group>
  );
}

useGLTF.preload("/bowling_pin.glb");
useGLTF.preload("/bowling_ball.glb");
