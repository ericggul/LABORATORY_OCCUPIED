import * as S from "./styles";
import * as THREE from "three";
import * as Tone from "tone";
import { useRef, Suspense, useState, useCallback, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Instances,
  Instance,
  Environment,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import { Synth } from "tone";
import BlueDanubeAudio from "../../../assets/BlueDanube.mp3";
import { PlaneBufferGeometry } from "three";

const Sphere = () => {
  return (
    <mesh visible castShadow>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
};

const GroundPlane = () => {
  return (
    <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
};

const BackDrop = () => {
  return (
    <mesh receiveShadow position={[0, -1, -5]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
};

const KeyLight = ({ brightness, color }: any) => {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      castShadow
    />
  );
};

const FillLight = ({ brightness, color }: any) => {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[2, 1, 4]}
      castShadow
    />
  );
};

const RimLight = ({ brightness, color }: any) => {
  const ref = useRef<any>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.position.set(1, 4 * Math.sin(t), -2);
  });
  return (
    <rectAreaLight
      ref={ref}
      width={2}
      height={2}
      color={color}
      intensity={brightness}
      position={[1, 4, -2]}
      rotation={[0, 180, 0]}
      castShadow
    />
  );
};

export default function Shape() {
  return (
    <S.Container>
      <Canvas>
        <KeyLight brightness={5.6} color="#ffbdf4" />
        <FillLight brightness={2.6} color="#bdefff" />
        <RimLight brightness={54} color="#fff" />
        <Sphere />
        <GroundPlane />
        <BackDrop />
      </Canvas>
    </S.Container>
  );
}
