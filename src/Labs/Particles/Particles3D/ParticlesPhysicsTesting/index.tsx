import * as S from "./styles";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";

const Plane = ({ ...args }) => {
  const [ref] = usePlane(() => ({ ...args })) as any;
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#171717" opacity={0.4} />
    </mesh>
  );
};
const Box = ({ ...args }) => {
  const [ref] = useBox(() => ({ ...args, mass: 1 })) as any;
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

const System = () => {
  const { mouse, viewport } = useThree();

  console.log(mouse, viewport);
  useFrame(({ mouse }) => {
    let x = (mouse.x * viewport.width) / 2;
    let y = (mouse.y * viewport.width) / 2;
  });
  return (
    <Physics gravity={[0, -1, 0]} broadphase="SAP">
      <Box position={[1, 1, 0]} />
      <Box position={[-1, -1, 0]} />
      <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} />
      <Plane rotation={[Math.PI / 2, 0, 0]} position={[0, 2, 0]} />
      <Plane rotation={[0, 0, -Math.PI / 2]} position={[2, 0, 0]} />
      <Plane rotation={[0, 0, Math.PI / 2]} position={[-2, 0, 0]} />
      {/* <Plane rotation={[0, 0, 0]} position={[0, 0, 2]} />
      <Plane rotation={[0, 0, 0]} position={[0, 0, -2]} /> */}
    </Physics>
  );
};

export default function Particles() {
  return (
    <S.Container>
      <Canvas
        gl={{ alpha: false, antialias: false }}
        camera={{ position: [0, 0, 10], near: 0.01, far: 100, fov: 30 }}
        dpr={[1, 2]}
      >
        <System />
        <ambientLight intensity={1} color="hotpink" />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.2} color="blue" />
        <OrbitControls />
      </Canvas>
    </S.Container>
  );
}
