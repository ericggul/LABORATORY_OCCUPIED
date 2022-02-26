import * as S from "./styles";
import * as THREE from "three";
import { useRef, Suspense, useState, useCallback, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { PLYLoader } from "three-stdlib";
import { OrbitControls } from "@react-three/drei";
import { useAnimatedLayout } from "./hooks/layouts";
import { useControls, folder } from "leva";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      plyLoader: any;
    }
  }
}

const LENGTH = 8;

const data = new Array(LENGTH ** 3).fill(0).map((d, id) => ({
  id,
}));
const scratchObject3D = new THREE.Object3D();
function updateInstancedMeshMatrices({ mesh, data }: any) {
  if (!mesh) return;
  for (let i = 0; i < data.length; i++) {
    const { x, y, z, rotateX, rotateY, rotateZ } = data[i];
    scratchObject3D.scale.setScalar(0.01);
    scratchObject3D.position.set(x, y, z);
    scratchObject3D.rotation.set(rotateX, rotateY, rotateZ);
    scratchObject3D.updateMatrix();
    mesh.setMatrixAt(i, scratchObject3D.matrix);
  }

  mesh.instanceMatrix.needsUpdate = true;
}

const Model = ({ layout }: any) => {
  const obj = useLoader(
    PLYLoader,
    "/assets/test1-resized.ply",
    (loader: any) => {
      console.log(loader);
    },
    (xhr: any) => {
      console.log((xhr.loaded / xhr.total) * 100 + "%loaded");
    }
  );
  obj.computeVertexNormals();

  const meshRef = useRef<any>(!null);

  console.log(data[100]);

  useAnimatedLayout({
    data,
    layout,
    onChange: () => {
      updateInstancedMeshMatrices({ mesh: meshRef.current, data });
    },
  });
  useEffect(() => {
    updateInstancedMeshMatrices({ mesh: meshRef.current, data });
  }, [data, layout]);

  //controls
  const { metalness, roughness } = useControls({
    material: folder({
      metalness: { value: 0.7, min: 0, max: 1, step: 0.01 },
      roughness: { value: 0.3, min: 0, max: 1, step: 0.01 },
    }),
  });

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, data.length]}
        geometry={obj}
      >
        <meshStandardMaterial
          vertexColors={true}
          metalness={metalness}
          roughness={roughness}
        />
      </instancedMesh>
    </>
  );
};

const PointLight = () => {
  const { lightPosX, lightPosY, lightPosZ, lightColor, lightIntensity } =
    useControls({
      lightOne: folder({
        lightPosX: { value: 100, min: -200, max: 200, step: 0.1 },
        lightPosY: { value: 100, min: -200, max: 200, step: 0.1 },
        lightPosZ: { value: 100, min: -200, max: 200, step: 0.1 },
        lightColor: "#F6DA77",
        lightIntensity: { value: 1, min: 0, max: 3, step: 0.01 },
      }),
    });

  return (
    <pointLight
      position={[lightPosX, lightPosY, lightPosZ]}
      color={lightColor}
      intensity={lightIntensity}
    />
  );
};

export default function Artifacts() {
  const [layout, setLayout] = useState("circle");

  return (
    <>
      <S.Container>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ alpha: false, antialias: false }}
          camera={{ fov: 75, position: [0, 0, 200], near: 1, far: 5000 }}
        >
          <ambientLight intensity={0.4} />
          <PointLight />
          <pointLight
            position={[-50, 80, -100]}
            color="#FFF500"
            intensity={0.5}
          />
          <pointLight
            position={[100, -150, -100]}
            color="#FCFAD1"
            intensity={0.8}
          />
          <Suspense fallback={null}>
            <Model layout={layout} />
          </Suspense>
          <OrbitControls enableDamping dampingFactor={0.01} />
        </Canvas>
      </S.Container>
      <S.Controls>
        <S.Button
          onClick={() => setLayout("circle")}
          current={layout === "circle"}
        >
          Circle
        </S.Button>
        <S.Button
          onClick={() => setLayout("sphere")}
          current={layout === "sphere"}
        >
          Sphere
        </S.Button>
        <S.Button
          onClick={() => setLayout("pyramides")}
          current={layout === "pyramides"}
        >
          Pyramides
        </S.Button>
        <S.Button onClick={() => setLayout("cube")} current={layout === "cube"}>
          Cube
        </S.Button>
        <S.Button
          onClick={() => setLayout("tower")}
          current={layout === "tower"}
        >
          Tower
        </S.Button>
      </S.Controls>
    </>
  );
}
