import * as S from "./styles";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Instances, Instance } from "@react-three/drei";

const LENGTH = 31;
const DISTANCE = 3;
const particles = Array.from({ length: LENGTH ** 2 }, (_, i: number) => ({
  speed: THREE.MathUtils.randFloat(0.01, 1),
  xLoc: DISTANCE * (Math.floor(i / LENGTH) - (LENGTH - 1) / 2),
  yLoc: DISTANCE * ((i % LENGTH) - (LENGTH - 1) / 2),
  zLoc: 0,
}));

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const System = () => {
  const ref = useRef<any>(null);

  // useFrame(({ mouse }, delta) => {
  //   ref.current.rotation.y = THREE.MathUtils.damp(
  //     ref.current.rotation.y,
  //     mouse.x * 2,
  //     0.75,
  //     delta
  //   );

  //   ref.current.rotation.z = THREE.MathUtils.damp(
  //     ref.current.rotation.z,
  //     mouse.y * 2,
  //     0.1,
  //     delta
  //   );
  // });
  return (
    <Instances
      ref={ref}
      limit={1000}
      castShadow
      receiveShadow
      position={[0, 0, 0]}
    >
      <torusGeometry args={[10, 3, 100, 16]} />
      <meshPhongMaterial color="#f0f0f0" />
      {particles.map((data, i) => (
        <Box key={i} {...data} />
      ))}
    </Instances>
  );
};

const Box = (data: any) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [pointed, setPointed] = useState(false);
  const { mouse, viewport } = useThree();

  useEffect(() => {
    if (ref && ref.current && pointed) {
      ref.current.position.z = -5;
      setPointed(false);
    }
  }, [ref, pointed]);

  useFrame(({ clock, mouse }, delta) => {
    let t = clock.elapsedTime;

    ref.current.scale.setScalar(1.5);
    ref.current.position.x = data.xLoc;
    ref.current.position.y = data.yLoc;
    ref.current.position.z = THREE.MathUtils.damp(
      ref.current.position.z,
      data.zLoc,
      0.9,
      delta
    );
  });

  return <Instance ref={ref} onPointerOver={() => setPointed(true)} />;
};

export default function Particles() {
  return (
    <>
      <S.Container>
        <Canvas
          gl={{ alpha: false, antialias: false }}
          camera={{ position: [0, 0, 100], near: 0.01, far: 200, fov: 30 }}
          dpr={[1, 2]}
        >
          <System />
          <ambientLight intensity={1} color="hotpink" />
          <pointLight position={[0, 0, 10]} intensity={1} />
          <pointLight position={[-10, 10, 200]} intensity={3} color="blue" />
        </Canvas>
      </S.Container>
    </>
  );
}
