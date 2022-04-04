import * as S from "./styles";
import { useRef, useMemo } from "react";
import { extend, Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water2.js";

extend({ Water });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      water: any;
    }
  }
}

const WaterPlane = () => {
  const ref = useRef<any>(!null);
  const geom = useMemo(() => new THREE.PlaneGeometry(30, 30), []);
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
  );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const config = useMemo(
    () => ({
      color: 0x0064b5,
      scale: 4,
      flowDirection: new THREE.Vector2(2, 2),
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals,
    }),
    []
  );
  return (
    <water
      ref={ref}
      args={[geom, config]}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    />
  );
};

export default function Cylinders() {
  const ref = useRef<any>(!null);

  console.log(ref.current);

  return (
    <S.Container>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ alpha: false, antialias: false }}
        camera={{ fov: 45, position: [0, 30, 0], near: 1, far: 1000 }}
      >
        <ambientLight intensity={0.7} color="#fff" />
        <pointLight position={[2, 5, 5]} intensity={1} color="#fff" />
        <directionalLight position={[-5, -10, 5]} intensity={1} color="#fff" />

        {/* <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#3f7b9d" />
        </mesh> */}

        <WaterPlane />
        <OrbitControls />
      </Canvas>
    </S.Container>
  );
}
