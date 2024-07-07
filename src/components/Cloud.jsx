import * as THREE from "three";
import {
  createContext,
  useContext,
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Clouds,
  Trail,
  Cloud,
  Line,
  CameraShake,
} from "@react-three/drei";
import { random } from "maath";

const context = createContext();

export default function ThunderCloud() {
  const shake = useRef();
  const [strike, setStrike] = useState(false);

  const light = useRef();
  const [flash] = useState(
    () =>
      new random.FlashGen({
        count: 10,
        minDuration: 200,
        maxDuration: 200,
        minInterval: 5000,
        maxInterval: 5000,
        nextBurstTime: 2,
        nextFlashEndTime: 2,
      })
  );
  useFrame((state, delta) => {
    const impulse = flash.update(state.clock.elapsedTime, delta);
    light.current.intensity = impulse * 100;
    if (impulse > 0) {
      setStrike(true);
    } else {
      setStrike(false);
    }

    if (impulse === 1) {
      shake.current.setIntensity(1);
    }
  });

  return (
    <group>
      {strike && (
        <group>
          <Strike />
          <Strike />
        </group>
      )}

      <context.Provider value={shake}>
        <CameraShake
          ref={shake}
          decay
          decayRate={0.95}
          maxYaw={0.05}
          maxPitch={0.01}
          yawFrequency={4}
          pitchFrequency={2}
          rollFrequency={2}
          intensity={0}
        />

        <Clouds limit={100} position={[0, 5, 0]}>
          <group position={[0, 1, 0]}>
            <Cloud
              seed={1}
              fade={20}
              position={[-2, 1, 0]}
              speed={0.2}
              growth={1}
              volume={10}
              opacity={1}
              bounds={[4, 0, 0]}
              color={"#403d3d"}
            />
            <Cloud
              seed={1}
              fade={20}
              position={[1, 1, 0]}
              speed={0.2}
              growth={1}
              volume={10}
              opacity={1}
              bounds={[4, 0, 0]}
              color={"#403d3d"}
            />
            <pointLight position={[0, 1.4, -0.1]} ref={light} color="yellow" />
          </group>
        </Clouds>
      </context.Provider>
    </group>
  );
}

function Strike() {
  const points = useMemo(() => {
    const randX = Math.random() * 6 - 3;
    const randY = Math.random() * 6 - 3;
    const randX2 = Math.random() * 6 - 3;
    const randY2 = Math.random() * 6 - 3;
    const mainLineStart = new THREE.Vector3(randX, 5, randY); // Start point of the main line
    const mainLineEnd = new THREE.Vector3(randX2, -4, randY2); // End point of the main line

    const mainLine = new THREE.LineCurve3(mainLineStart, mainLineEnd);
    const segments = new THREE.CurvePath();
    const segmentCount = 10;
    for (let i = 1; i < segmentCount; i++) {
      const t = i / segmentCount;
      const point = mainLine.getPoint(t);

      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      );
      const nextPoint = point.clone().add(offset);

      segments.add(new THREE.LineCurve3(point, nextPoint));
    }

    return segments.getPoints(100);
  }, []);

  return <Line worldUnits lineWidth={0.1} points={points} color="yellow" />;
}
