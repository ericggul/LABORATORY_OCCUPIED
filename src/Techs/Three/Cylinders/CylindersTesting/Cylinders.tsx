import * as S from "./styles";
import * as THREE from "three";
import { useRef, Suspense, useEffect, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Instances,
  Instance,
  Environment,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, SSAO } from "@react-three/postprocessing";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const LENGTH = 300;
const HEIGHT = 1;

const particles = Array.from({ length: LENGTH }, (_, i) => ({
  posRadius: LENGTH / 2 - Math.abs(LENGTH / 2 - i),
  posAngle: (i / LENGTH) * Math.PI * 4,
  yPos: (i - (LENGTH - 1) / 2) * HEIGHT,
  height: HEIGHT,
}));

export default function Cylinders() {
  const ref = useRef<any>(!null);

  console.log(ref.current);

  const colorAttrib = useRef<any>(!null);
  const colorArray = useMemo(() => new Float32Array(LENGTH * 3), []);

  useEffect(() => {
    for (let i = 0; i < LENGTH; i++) {
      const scratchColor = new THREE.Color(
        getRandom(0, 0.01),
        getRandom(0.6, 0.61),
        getRandom(0.8, 0.81)
      );
      scratchColor.toArray(colorArray, i * 3);
    }
  }, [colorArray]);

  return (
    <S.Container>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ alpha: false, antialias: false }}
        camera={{ fov: 45, position: [0, LENGTH * 0.8, 0], near: 1, far: 5000 }}
      >
        <ambientLight intensity={1.0} />
        <pointLight position={[30, 180, 50]} intensity={5} color="#ff0000" />
        <pointLight
          position={[-100, -10, -100]}
          intensity={1}
          color="#00ff00"
        />
        <Instances limit={particles.length} ref={ref} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1, 10, 32]}>
            <instancedBufferAttribute
              ref={colorAttrib}
              attachObject={["attributes", "color"]}
              args={[colorArray, 3]}
            />
          </cylinderGeometry>
          <meshStandardMaterial
            roughness={0}
            metalness={1}
            vertexColors={true}
          />
          {particles.map((data, i) => (
            <Cylinder key={i} {...data} />
          ))}
        </Instances>
        <Suspense fallback={null}>
          <Environment preset="forest" />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </S.Container>
  );
}

const Cylinder = ({ posRadius, yPos, posAngle, height, color }: any) => {
  const ref = useRef<any>(!null);

  useFrame((state) => {
    let t = state.clock.elapsedTime;

    ref.current.scale.set(posRadius * 0.3, 0.1, posRadius * 0.3);
    ref.current.position.set(
      posRadius * Math.cos(posAngle + t) * 0.1,
      yPos,
      posRadius * Math.sin(posAngle + t) * 0.1
    );
  });
  return <Instance ref={ref} />;
};
