import React, { useState } from "react";
import { Suspense, lazy } from "react";
import "../css/Home.css";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import {
  Center,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial,
  PerspectiveCamera,
} from "@react-three/drei";

import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const GlassEffect = lazy(() => import("./GlassEffect"));
const Cloud = lazy(() => import("./Cloud"));
const CarModifier = lazy(() => import("./CarModifier"));
const Physics = lazy(() => import("./Physics"));
const Animation = lazy(() => import("./Animation"));
const Particles = lazy(() => import("./Particles"));
const Post = lazy(() => import("./Post"));
const Space = lazy(() => import("./Space"));
const Csv = lazy(() => import("./Csv"));
const Portal = lazy(() => import("./Portal"));

export default function Home() {
  const [num, setNum] = useState(1);
  return (
    <div
      className="homeCont"
      style={{ overflow: "hidden", position: "relative" }}
    >
      <button
        onClick={() => {
          setNum((e) => e - 1);
        }}
        //if disabled then the button will be greyed ou
        
        disabled={num <= 1}

        id="prev"
      >
        <IoIosArrowDropleftCircle />
      </button>
      <button
        disabled={num >= 10}
        onClick={() => {
          setNum((e) => e + 1);
        }}
        id="next"
      >
        <IoIosArrowDroprightCircle />
      </button>

      {num == 1 && (
        <p className="info">
          1. Glass material effect (
          <a
          target="_blank"
            className="code"
            href="https://github.com/jahid28/R3F-10X/blob/main/src/components/GlassEffect.jsx"
          >
            Code
          </a>
          )
        </p>
      )}
      {num == 2 && (
        <p className="info">
          2. Thunder cloud with some camera shake (
          <a
          target="_blank"
            className="code"
            href="https://github.com/jahid28/R3F-10X/blob/main/src/components/Cloud.jsx"
          >
            Code
          </a>
          )
        </p>
      )}
      {num == 3 && (
        <p className="info">
          3. Car Modifier : Click on body/rims/tyres/grill to change their
          colors (
          <a
          target="_blank"
            className="code"
            href="https://github.com/jahid28/R3F-10X/blob/main/src/components/CarModifier.jsx"
          >
            Code
          </a>
          )
        </p>
      )}
      {num == 4 && (
        <p className="info">
          4. Bowling ball physics using cannon(
          <a
          target="_blank"
            className="code"
            href="https://github.com/jahid28/R3F-10X/blob/main/src/components/Physics.jsx"
          >
            Code
          </a>
          )
        </p>
      )}
      {num == 5 && (
        <p className="info">
          5. Animating a model(
          <a
          target="_blank"
            className="code"
            href="https://github.com/jahid28/R3F-10X/blob/main/src/components/Animation.jsx"
          >
            Code
          </a>
          )
        </p>
      )}
      {num == 6 && (
        <p className="info">
          6. Particles system(
          <a
          target="_blank"
            className="code"
            href="https://github.com/jahid28/R3F-10X/blob/main/src/components/Particles.jsx"
          >
            Code
          </a>
          )
        </p>
      )}
      {num == 7 && (
        <p className="info">
          7. Post Processing stuff(
          <a
          target="_blank"
            className="code"
            href="https://github.com/jahid28/R3F-10X/blob/main/src/components/Post.jsx"
          >
            Code
          </a>
          )
        </p>
      )}
      {num == 8 && (
        <p className="info">
          8. react-spring animation with stars & trail effect(
          <a
          target="_blank"
            className="code"
            href="https://github.com/jahid28/R3F-10X/blob/main/src/components/Space.jsx"
          >
            Code
          </a>
          )
        </p>
      )}
      {num == 9 && (
        <p className="info">
          9. CSV with Pivot controls(
          <a
          target="_blank"
            className="code"
            href="https://github.com/jahid28/R3F-10X/blob/main/src/components/Csv.jsx"
          >
            Code
          </a>
          )
        </p>
      )}
      {num == 10 && (
        <p className="info">
          10. Portal magic(
          <a
          target="_blank"
            className="code"
            href="https://github.com/jahid28/R3F-10X/blob/main/src/components/Portal.jsx"
          >
            Code
          </a>
          )
        </p>
      )}

      <Suspense
        fallback={
          <div
            style={{
              width: "100vw",
              height: "100vh",
              position: "absolute",
              top: "0",
              backgroundColor: "gray",
              display: "grid",
              placeItems: "center",
              fontSize: "4rem",
              zIndex: "100000000",
            }}
          >
            Loading...
          </div>
        }
      >
        <div className="canvasDiv">
          <CanvasFunc num={num} />
        </div>
      </Suspense>
    </div>
  );
}

const CanvasFunc = (props) => {
  return (
    <Canvas>
      {/* <axesHelper args={[50]} /> */}

      <PerspectiveCamera
        fov={45}
        near={0.1}
        far={1000000}
        position={[8, 15, 8]}
        makeDefault
      />

      {props.num == 6 || props.num == 8 ? (
        <color attach="background" args={["black"]} />
      ) : (
        <color attach="background" args={["gray"]} />
      )}

      <pointLight intensity={500} color={"white"} position={[10, 6, 10]} />
      <pointLight intensity={500} color={"white"} position={[-10, 6, -10]} />
      <pointLight intensity={500} color={"white"} position={[10, 6, -10]} />
      <pointLight intensity={500} color={"white"} position={[-10, 6, 10]} />

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
        // minAzimuthAngle={-Math.PI/2-.3}
        // maxAzimuthAngle={Math.PI / 2+.3}
      />

      {props.num == 1 && <GlassEffect />}
      {props.num == 2 && <Cloud />}
      {props.num == 3 && <CarModifier />}
      {props.num == 4 && <Physics />}
      {props.num == 5 && <Animation />}
      {props.num == 6 && <Particles />}
      {props.num == 7 && <Post />}
      {props.num == 8 && <Space />}
      {props.num == 9 && <Csv />}
      {props.num == 10 && <Portal />}

      {props.num != 6 && props.num != 8 && <Grid />}
      {/* {props.num != 4 && props.num != 7 && <Grid args={[100,100]} cellColor={"white"} sectionColor={"white"}/>} */}

      {/* <Rig/> */}
    </Canvas>
  );
};

const Grid = ({ number = 23, lineWidth = 0.026, height = 0.5 }) => (
  <Instances position={[0, 0, 0]}>
    <planeGeometry args={[lineWidth, height]} />
    <meshBasicMaterial color="#999" />
    {Array.from({ length: number }, (_, y) =>
      Array.from({ length: number }, (_, x) => (
        <group
          key={x + ":" + y}
          position={[
            x * 2 - Math.floor(number / 2) * 2,
            -0.01,
            y * 2 - Math.floor(number / 2) * 2,
          ]}
        >
          <Instance rotation={[-Math.PI / 2, 0, 0]} />
          <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
        </group>
      ))
    )}
    <gridHelper args={[100, 100, "#bbb", "#bbb"]} position={[0, -0.01, 0]} />
  </Instances>
);

// function Rig() {
//   useFrame((state, delta) => {
//     easing.damp3(
//       state.camera.position,
//       [5 + state.pointer.x * 2, 5 + state.pointer.y * 2, 15],
//       0.4,
//       delta
//     );
//     // easing.damp3(state.camera.position, [5 + state.pointer.x, 5 +Math.atan2(state.pointer.x, state.pointer.y) * 2, 15], 0.4, delta)
//     state.camera.lookAt(0, 5, 0);
//   });
// }
