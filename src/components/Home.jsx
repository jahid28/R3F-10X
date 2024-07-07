import React, { useState } from "react";
import { Suspense, lazy } from "react";
import "../css/Home.css";
import { RGBELoader } from "three-stdlib";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { easing } from "maath";
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

import {
  BrowserRouter as Router,
  NavLink
} from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
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

  function toggle(e) {
    document.getElementById('header').classList.toggle('active')
    document.getElementById('tog').classList.toggle('active')
}

function removeToggle() {
    document.getElementById('header').classList.remove('active')
    document.getElementById('tog').classList.remove('active')

}
  return (
    <div
      className="homeCont"
      style={{ overflow: "hidden", position: "relative" }}
    >

      <div className="nav">
      <div className='menu' onClick={toggle}><RxHamburgerMenu/></div>

<div id='header' className="header">
    <ul>
        <p onClick={removeToggle}><NavLink className='allLists' to="/"><p className='allLinks navHome'>Home</p></NavLink></p>
        <p onClick={removeToggle}><NavLink className='allLists' to="/about"><p className='allLinks navAbout'>About</p></NavLink></p>
    </ul>
</div>
      </div>



      <button
        onClick={() => {
          setNum((e) => e - 1);
        }}
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
        <p className="info">Glass material effect</p>
      )}
      {num == 2 && <p className="info">Thunder cloud with some camera shake</p>}
      {num == 3 && (
        <p className="info">
          Car Modifier : Click on body/rims/tyres/grill to change their colors
        </p>
      )}
      {num == 4 && <p className="info">Bowling ball physics using cannon</p>}
      {num == 5 && <p className="info">Animating a model</p>}
      {num == 6 && <p className="info">Particles system</p>}
      {num == 7 && <p className="info">Post Processing stuff</p>}
      {num == 8 && <p className="info">react-spring animation with stars & trail effect</p>}
      {num == 9 && <p className="info">CSV with Pivot controls</p>}
      {num == 10 && <p className="info">Portal magic</p>}

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
      <axesHelper args={[50]} />

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

      {props.num != 6 && props.num != 8 && <Grid/>}
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

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [5 + state.pointer.x * 2, 5 + state.pointer.y * 2, 15],
      0.4,
      delta
    );
    // easing.damp3(state.camera.position, [5 + state.pointer.x, 5 +Math.atan2(state.pointer.x, state.pointer.y) * 2, 15], 0.4, delta)
    state.camera.lookAt(0, 5, 0);
  });
}
