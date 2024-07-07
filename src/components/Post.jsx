import { Environment } from "@react-three/drei";
import React from "react";
import {
  EffectComposer,
  HueSaturation,
  BrightnessContrast,
  Bloom,
  DepthOfField,
  N8AO,
  DotScreen,
  Autofocus,
  ASCII,
  ColorDepth,
  GodRays,
  LensFlareEffect,
  LensFlare,
  Noise,
  Pixelation,
  SMAA,
  SSAO,
  SSR,
  Scanline,
  Sepia,
  TiltShiftEffect,
  Vignette,
  WaterEffect,
  WaterEffectImpl,
  wrapEffect,
  ShockWave,
  SelectiveBloom,
  FXAA,
  Glitch,
  LUT,
  ChromaticAberration,
  ColorAverage,
  Grid,
  Depth,
} from "@react-three/postprocessing";

import { useControls } from "leva";

const Post = () => {
  const { ...config } = useControls({
    bloom: { value: 0, min: 0, max: 10, step: 1 },
    sepia: { value: 0, min: 0, max: 10, step: 0.1 },
    vignette: { value: 0, min: 0, max: 4, step: 0.4 },
    pixelation: { value: 0, min: 0, max: 40, step: 2 },
    noise: { value: 0, min: 0, max: 1, step: 0.1 },
    hue: { value: 0, min: 0, max: 360, step: 1 },
    ascii: { value: false },
    glitch: { value: false },
    wetWindowEffect: { value: false },
  });
  return (
    <group>


      <EffectComposer multisampling={8}>
        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={config.bloom}
        />
        <Sepia intensity={config.sepia} />
        <Vignette eskil={false} offset={0.1} darkness={config.vignette} />
        <Pixelation granularity={config.pixelation} />

        {config.ascii && <ASCII font="merry" speed={1} size={1} />}
        {config.glitch && (
          <Glitch delay={[1, 2]} duration={[0.1, 0.2]} strength={[0.1, 0.2]} />
        )}
        {config.wetWindowEffect && (
          <DepthOfField
            focusDistance={0.5}
            focalLength={0.2}
            bokehScale={20}
            height={20}
          />
        )}
        <HueSaturation hue={config.hue} saturation={0} />

        <Noise opacity={config.noise} />
      </EffectComposer>

      <mesh position={[0, 0.5, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"#c26368"} />
      </mesh>

      <mesh position={[-2, 0.8, 0]}>
        <sphereGeometry args={[0.8]} />
        <meshStandardMaterial color={"#65a692"} />
      </mesh>

      <mesh position={[2, 0.5, 0]}>
        <coneGeometry args={[1, 1, 32]} />
        <meshStandardMaterial color={"#ccbb5a"} />
      </mesh>

      <mesh position={[0, 0.5, -1]}>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshStandardMaterial color={"#804c8c"} />
      </mesh>
    </group>
  );
};

export default Post;
