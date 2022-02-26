import * as S from "./styles";
import * as THREE from "three";
import { useRef, Suspense, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Instances,
  Instance,
  Environment,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, SSAO } from "@react-three/postprocessing";

const SphereMesh = () => {
  const ref = useRef<THREE.Mesh>(null!);
  const camera = useThree((state) => state.camera);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.position.set(
      Math.cos(t) + Math.sin(t) * 3,
      Math.sin(t / 3) + Math.cos(t / 6) * 15,
      Math.cos(t)
    );
    ref.current.rotation.x = ref.current.rotation.y = Math.cos(t);
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[10, 10, 10]} />
      <meshStandardMaterial roughness={0.4} metalness={0.8} color="pink" />
    </mesh>
  );
};

export default function BounceBalls() {
  return (
    <S.Container>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ alpha: false, antialias: false }}
        camera={{ fov: 90, position: [0, 0, 60], near: 10, far: 150 }}
      >
        <color attach="background" args={["#f0f0f0"]} />
        <fog attach="fog" args={["white", 60, 110]} />
        <ambientLight intensity={1.5} />
        <SphereMesh />
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -30, 0]}
          opacity={0.6}
          width={130}
          height={130}
          blur={1}
          far={40}
        />
        <Suspense fallback={null}>
          <Environment preset="forest" />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </S.Container>
  );
}
