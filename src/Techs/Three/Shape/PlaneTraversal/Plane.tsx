import * as S from "./styles";
import * as THREE from "three";
import * as Tone from "tone";
import {
  useRef,
  Suspense,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const LENGTH = 101;
const data = new Array(LENGTH ** 2).fill(0).map((d, id) => ({
  id,
  xPos: (id % LENGTH) - (LENGTH - 1) / 2,
  yPos: Math.floor(id / LENGTH) - (LENGTH - 1) / 2,
  zPos: getRandom(0, 0.1),
  scaleDelta: getRandom(0, Math.PI * 2),
}));

const DEFAULT_COLOR = new THREE.Color("#1A23E7");
const TRANSIT_COLOR = new THREE.Color("#4468E7");

const scratchObject3D = new THREE.Object3D();

const updateInstancedMeshMatrices = ({ mesh, data }: any) => {
  if (!mesh) return;

  for (let i = 0; i < data.length; i++) {
    const { xPos, yPos, zPos, xRotate, yRotate, scale } = data[i];
    scratchObject3D.position.set(xPos * 0.3, yPos * 0.3, zPos);
    scratchObject3D.rotation.set(xRotate, yRotate, 0);
    scratchObject3D.scale.setScalar(scale);
    scratchObject3D.updateMatrix();
    mesh.setMatrixAt(i, scratchObject3D.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
};

const scratchColor = new THREE.Color();

const useColors = ({ data }: any) => {
  const colorAttrib = useRef<any>(!null);
  const colorArray = useMemo(() => new Float32Array(data.length * 3), [data]);
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      scratchColor.lerpColors(DEFAULT_COLOR, DEFAULT_COLOR, i / data.length);
      scratchColor.toArray(colorArray, i * 3);
    }
    colorAttrib.current.needsUpdate = true;
  }, [data, colorArray]);

  return { colorAttrib, colorArray };
};

const RectangleSets = ({ data }: any) => {
  const meshRef = useRef<any>(!null);
  const { colorAttrib, colorArray } = useColors({ data });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < data.length; i++) {
      data[i].xRotate =
        ((Math.floor(i / LENGTH) - (LENGTH - 1) / 2) / ((LENGTH - 1) / 2)) *
          Math.PI *
          2 +
        t * 0.3418;

      data[i].yRotate =
        (((i % LENGTH) - (LENGTH - 1) / 2) / ((LENGTH - 1) / 2)) * Math.PI * 3 +
        t * 0.7349;

      data[i].scale = Math.sin(t + data[i].scaleDelta) * 0.2;
    }

    updateInstancedMeshMatrices({ mesh: meshRef.current, data });
  });

  return (
    <instancedMesh
      ref={meshRef}
      frustumCulled={false}
      args={[undefined, undefined, data.length]}
    >
      <boxGeometry attach="geometry" args={[0.4, 0.4, 0.4]}>
        <instancedBufferAttribute
          ref={colorAttrib}
          attachObject={["attributes", "color"]}
          args={[colorArray, 3]}
        />
      </boxGeometry>
      <meshStandardMaterial attach="material" vertexColors={true} />
    </instancedMesh>
  );
};

export default function Shape() {
  return (
    <S.Container>
      <Canvas
        gl={{ alpha: false }}
        camera={{ near: 0.01, far: 110, fov: 70, position: [0, 0, 10] }}
      >
        <color attach="background" args={["#0E0310"]} />
        <fog attach="fog" args={["#0E0310"]} near={1} far={100} />

        <ambientLight intensity={0.5} />
        <pointLight
          position={[40, 40, 3]}
          intensity={3}
          color="#9393FA"
          castShadow
        />
        <pointLight
          position={[-40, 40, -3]}
          intensity={2}
          color="#0606C8"
          castShadow
        />
        <pointLight
          position={[40, -40, 5]}
          intensity={1}
          color="#E3E3FB"
          castShadow
        />
        <pointLight
          position={[-40, -40, -5]}
          intensity={2}
          color="#5555FD"
          castShadow
        />
        <RectangleSets data={data} />
        <OrbitControls enableDamping dampingFactor={0.3} />
      </Canvas>
    </S.Container>
  );
}
