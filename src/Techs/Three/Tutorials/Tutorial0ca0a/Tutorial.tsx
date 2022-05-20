import * as S from "./styles";
import * as THREE from "three";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Instances,
  Instance,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import {
  EffectComposer,
  DepthOfField,
  SSAO,
} from "@react-three/postprocessing";

type GLTFResult = GLTF & {
  nodes: {
    Mesh_0: THREE.Mesh;
  };
  materials: {
    ["Scene_-_Root"]: THREE.MeshStandardMaterial;
  };
};

function Banana({ z }: any) {
  const ref = useRef<any>(null!);
  const [clicked, setClicked] = useState(false);

  const { nodes, materials } = useGLTF(
    "/assets/3DModels/banana.glb"
  ) as GLTFResult;

  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(
    camera,
    new THREE.Vector3(0, 0, z)
  );

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.set(
        (data.rX += 0.001),
        (data.rY += 0.001),
        (data.rZ += 0.003)
      );
      ref.current.position.set(data.x * width, (data.y += 0.01), z);
      if (data.y > height * 0.7) {
        data.y = -height * 0.7;
      }
    }
  });
  return (
    <mesh
      ref={ref}
      geometry={nodes.Mesh_0.geometry}
      material={materials["Scene_-_Root"]}
      material-emmisve="orange"
      rotation={[-2, 1.4, 3]}
    />
  );
}

export default function Tutorial({ count = 100, depth = 80 }: any) {
  return (
    <S.Container>
      <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30 }}>
        <color attach="background" args={["#ffbf40"]} />
        {/* <ambientLight intensity={0.2} /> */}
        <pointLight position={[10, 10, 10]} intensity={1} color="yellow" />
        <Suspense fallback={null}>
          {Array.from({ length: count }, (e, i) => (
            <Banana key={i} z={-(i / count) * depth - 20} />
          ))}
          <Environment preset="sunset" />
          <EffectComposer>
            <DepthOfField
              target={[0, 0, depth / 2]}
              focalLength={0.5}
              bokehScale={1}
              height={700}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </S.Container>
  );
}
