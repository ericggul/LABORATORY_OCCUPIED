import * as S from "./styles";
import * as THREE from "three";
import { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Instances, Instance } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { useControls, folder } from "leva";

function Plane(props: any) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="lightblue" side={THREE.DoubleSide} />
    </mesh>
  );
}

function Cube({ xLocation, yLocation }: any) {
  const [ref] = useBox(() => ({
    args: [HEIGHT, WIDTH, DEPTH],
    mass: Math.random() * 300,
    position: [xLocation, yLocation, 0],
  }));

  return <Instance ref={ref} />;
}

//Floors, rooms per floor
const FLOOR = 20;
const ROOMS = 30;

const HEIGHT = 10;
const WIDTH = 10;
const DEPTH = 10;

const locations = Array.from({ length: FLOOR * ROOMS }, (_, i: number) => ({
  xLocation: (Math.floor(i / FLOOR) - (ROOMS - 1) / 2) * WIDTH,
  yLocation: (i % FLOOR) * HEIGHT,
}));

const Cubes = () => {
  return (
    <Instances limit={locations.length}>
      <boxGeometry args={[HEIGHT, WIDTH, DEPTH]} />
      <meshPhongMaterial color="#f0f0f0" />
      {locations.map((data, i) => (
        <Cube key={i} {...data} />
      ))}
    </Instances>
  );
};

export default function Hilton() {
  const { intensity, color, posX, posY, posZ } = useControls({
    directionalLight: folder({
      intensity: { value: 3, min: 0, max: 5, step: 0.01 },
      color: "#ffffff",
      posX: { value: 10, min: -100, max: 100, step: 0.01 },
      posY: { value: 100, min: -100, max: 100, step: 0.01 },
      posZ: { value: 10, min: -100, max: 100, step: 0.01 },
    }),
  });

  return (
    <S.Container>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ alpha: false, antialias: false }}
        camera={{ fov: 105, position: [0, 100, 200] }}
      >
        <color attach="background" args={["lightblue"]} />
        <ambientLight intensity={0.3} />
        <directionalLight
          intensity={intensity}
          color={color}
          position={[posX, posY, posZ]}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Physics gravity={[0, -5, 0]} broadphase="SAP">
          <Plane position={[0, -70, 0]} />
          <Cubes />
        </Physics>
        <OrbitControls />
      </Canvas>
    </S.Container>
  );
}
