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

const LENGTH = 31;
const data = new Array(LENGTH ** 3).fill(0).map((d, id) => ({
  id,
  xPos: ((id % LENGTH) % LENGTH) - (LENGTH - 1) / 2,
  yPos: (Math.floor(id / LENGTH) % LENGTH) - (LENGTH - 1) / 2,
  zPos: Math.floor(Math.floor(id / LENGTH) / LENGTH) - (LENGTH - 1) / 2,
}));
const DEFAULT_COLOR = new THREE.Color("#36b759");
const TRANSIT_COLOR = new THREE.Color("#4468E7");

const scratchObject3D = new THREE.Object3D();

const updateInstancedMeshMatrices = ({ mesh, data }: any) => {
  if (!mesh) return;

  for (let i = 0; i < data.length; i++) {
    const { x, y, z } = data[i];
    scratchObject3D.position.set(x, y, z);
    scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0);
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
      scratchColor.lerpColors(DEFAULT_COLOR, TRANSIT_COLOR, i / data.length);
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
      data[i].x = data[i].xPos + Math.cos(t * 0.5);
      data[i].y = data[i].yPos + Math.cos(t * 0.5);
      data[i].z = data[i].zPos + Math.cos(t * 0.5);
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
      <Canvas camera={{ position: [0, 0, 4] }}>
        <color attach="background" args={["#300D29"]} />
        <fog attach="fog" args={["#300D29"]} near={1} far={100} />
        <hemisphereLight
          color={new THREE.Color("#ffffbb")}
          groundColor={new THREE.Color("#080820")}
          intensity={0.1}
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1} castShadow />
        <pointLight
          position={[-5, -5, 2]}
          color="#91F6F0"
          intensity={3}
          decay={1}
          distance={10}
          castShadow
        />
        <RectangleSets data={data} />
        <OrbitControls enableDamping dampingFactor={0.3} />
      </Canvas>
    </S.Container>
  );
}
