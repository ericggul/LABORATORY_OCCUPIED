import * as S from "./styles";
import * as THREE from "three";
import { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Instances, Instance } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { useControls, folder } from "leva";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [
      -Math.PI * getRandom(0.3, 0.7),
      Math.PI * getRandom(-0.1, 0.1),
      Math.PI * getRandom(-0.1, 0.1),
    ],
    position: [getRandom(-50, 50), getRandom(-50, 0), getRandom(-50, 50)],
  }));

  return <Instance ref={ref} />;
}

const Planes = () => {
  const length = 10;
  return (
    <Instances limit={length}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial transparent opacity={0} />
      {new Array(length).fill(0).map((_: any, i: number) => (
        <Plane key={i} />
      ))}
    </Instances>
  );
};

function Cube({ xLocation, yLocation }: any) {
  const [ref] = useBox(() => ({
    args: [getRandom(3, 10), getRandom(3, 10), getRandom(3, 10)],
    mass: Math.random() * 300,
    position: [xLocation, yLocation, 0],
  }));

  return <Instance ref={ref} />;
}

//Floors, rooms per floor
const FLOOR = 10;
const ROOMS = 10;

const HEIGHT = 10;
const WIDTH = 10;
const DEPTH = 10;

const locations = Array.from({ length: FLOOR * ROOMS }, (_, i: number) => ({
  xLocation: (Math.floor(i / FLOOR) - (ROOMS - 1) / 2) * WIDTH,
  yLocation: (i % FLOOR) * HEIGHT,
}));

const Cubes = () => {
  const { radius, tubeRadius, radialSegments, tublarSegments, p, q } =
    useControls({
      torusKnotGeometry: folder({
        radius: { value: 5, min: 3, max: 20, step: 0.01 },
        tubeRadius: { value: 1, min: 0.1, max: 5, step: 0.01 },
        radialSegments: { value: 65, min: 3, max: 200, step: 1 },
        tublarSegments: { value: 8, min: 3, max: 20, step: 1 },
        p: { value: 2, min: 1, max: 20, step: 1 },
        q: { value: 3, min: 1, max: 20, step: 1 },
      }),
    });

  return (
    <Instances limit={locations.length}>
      <torusKnotGeometry
        args={[radius, tubeRadius, radialSegments, tublarSegments, p, q]}
      />
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
        camera={{ fov: 105, position: [0, 10, 20] }}
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
          <Planes />
          <Cubes />
        </Physics>
      </Canvas>
    </S.Container>
  );
}
