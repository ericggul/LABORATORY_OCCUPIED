import style from "./style.module.scss";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { GLTF } from "three-stdlib";
import {
  EffectComposer,
  DepthOfField,
  SSAO,
} from "@react-three/postprocessing";

function Hands(props: any) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    "/assets/hands/hand3-transformed.glb"
  ) as any;

  const { viewport, camera } = useThree();

  const { width, height } = viewport.getCurrentViewport(
    camera,
    new THREE.Vector3(0, 0, 0)
  );

  useFrame((state) => {
    let t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.set(
        0,
        t / 5,
        -Math.sin(t / 13) / 10 + Math.PI / 10
      );
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[0, 0.02, -0.03]}
        material-wireframe={true}
        material-color="#e3faff"
      />
    </group>
  );
}

function HandsModel() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: false }}
      camera={{ near: 0.01, position: [0, 0, 20], far: 110, fov: 40 }}
    >
      <ambientLight intensity={0.2} />

      <fog args={["white", 1, 30]} />
      <spotLight position={[10, 10, 10]} intensity={1.3} color="#4682dd" />
      <spotLight position={[-30, -20, 10]} intensity={0.5} color="#0ee5e5" />

      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        opacity={0.6}
        width={130}
        height={130}
        blur={1}
        far={40}
      />
      <Suspense fallback={null}>
        <Hands scale={2} />
        <Environment preset="city" />
        <EffectComposer>
          <DepthOfField
            target={[0, 0, 200 / 2]}
            focalLength={0.5}
            bokehScale={0.1}
            height={1000}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

export default HandsModel;
