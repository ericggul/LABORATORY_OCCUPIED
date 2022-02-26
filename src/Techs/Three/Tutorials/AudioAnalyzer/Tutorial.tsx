import * as S from "./styles";
import * as THREE from "three";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Instances,
  Instance,
  CameraShake,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import {
  EffectComposer,
  DepthOfField,
  SSAO,
} from "@react-three/postprocessing";
import { TorusKnotGeometry } from "three";

const EDGE_LENGTH = 9;
const SIZE = 10;

const particles = Array.from({ length: EDGE_LENGTH ** 2 }, (_, i) => ({
  factor: THREE.MathUtils.randFloatSpread(Math.PI),
  speed: THREE.MathUtils.randFloat(0.05, 1),
  xVal: ((i % EDGE_LENGTH) - EDGE_LENGTH / 2) * SIZE * 2,
  zVal: (Math.floor(i / EDGE_LENGTH) - EDGE_LENGTH / 2) * SIZE * 2,
}));

function TorusKnots() {
  return (
    <Instances
      limit={particles.length}
      castShadow
      receiveShadow
      position={[0, 0, 0]}
    >
      <torusKnotGeometry args={[5, 0.5, 100, 10, 5, 4]} />
      <meshStandardMaterial roughness={0.5} color="#ffffff" />
      {particles.map((pr, i) => (
        <Knot data={pr} key={i} />
      ))}
    </Instances>
  );
}

function Knot({ data }: any) {
  const ref = useRef<any>(null!);

  useFrame((state: any) => {
    const t = state.clock.elapsedTime + data.factor;
    const time = data.factor + state.clock.elapsedTime * data.speed;
    ref.current.scale.setScalar(1);
    ref.current.position.set(
      data.xVal,
      30 - 30 * Math.max(Math.cos(t), 0),
      data.zVal
    );
    ref.current.rotation.set(t, time, time);
    ref.current.color.set(new THREE.Color(0, 0.5, 0.8));
  });

  return <Instance castShadow receiveShadow ref={ref} />;
}

function Light() {
  const ref = useRef<any>(null!);
  useFrame((_) => (ref.current.rotation.x = _.clock.elapsedTime));
  return (
    <group ref={ref}>
      <rectAreaLight
        width={15}
        height={100}
        position={[30, 30, -10]}
        intensity={100}
        color="#64EA9A"
      />
    </group>
  );
}

function Rig() {
  const [vec] = useState(() => new THREE.Vector3());
  const { camera, mouse } = useThree();
  // useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 100, 60), 0.05));
  return (
    <CameraShake
      maxYaw={0.01}
      maxPitch={0.01}
      maxRoll={0.01}
      yawFrequency={0.5}
      pitchFrequency={0.5}
      rollFrequency={0.4}
    />
  );
}

export default function Tutorial({ count = 100, depth = 80 }: any) {
  return (
    <S.Container>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [150, 0, 0], fov: 40 }}>
        <color attach="background" args={["#EBFCF6"]} />
        <ambientLight intensity={2} color="#CAA2E2" />
        <Light />
        <spotLight
          position={[500, 500, -30]}
          castShadow
          intensity={3}
          color="#740FB2"
        />
        <pointLight castShadow position={[100, 100, 100]} color="white" />

        <pointLight
          castShadow
          position={[-10, -10, -10]}
          color="red"
          intensity={3}
        />

        <mesh
          receiveShadow
          position={[0, -100, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <planeBufferGeometry args={[1000, 1000]} />
          <meshBasicMaterial color="pink" />
        </mesh>
        <TorusKnots />
        <OrbitControls enableDamping dampingFactor={0.05} />
        <Rig />
      </Canvas>
    </S.Container>
  );
}
