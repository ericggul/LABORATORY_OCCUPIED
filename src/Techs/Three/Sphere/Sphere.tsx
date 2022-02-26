import * as S from "./styles";
import * as THREE from "three";
import * as Tone from "tone";
import { useRef, Suspense, useState, useCallback, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Instances,
  Instance,
  Environment,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import { Synth } from "tone";
import BlueDanubeAudio from "../../../assets/BlueDanube.mp3";

const SphereMesh = () => {
  const ref = useRef<THREE.Mesh>(null!);

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[10, 32, 32]} />
      <meshStandardMaterial roughness={0.4} metalness={0.8} color="pink" />
    </mesh>
  );
};

const CameraControls = ({ handleData }: any) => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef<any>(null!);

  console.log(camera);
  useFrame((state) => {
    console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z);
    handleData({
      x: camera.rotation.x,
      y: camera.rotation.y,
      z: camera.rotation.z,
    });
    controls.current.update();
  });
  return <OrbitControls ref={controls} args={[camera, domElement]} />;
};

const RotationData = ({ data }: any) => {
  // const pitchShift = new Tone.PitchShift().toDestination();
  // const player = new Tone.Player(BlueDanubeAudio).connect(pitchShift);
  // player.loop = true;
  // const toneFFT = new Tone.FFT();
  // pitchShift.connect(toneFFT);
  return (
    <S.Text>
      {data.x.toFixed(2)} <br />
      {data.y.toFixed(2)} <br />
      {data.z.toFixed(2)}
    </S.Text>
  );
};

export default function Sphere() {
  const [posData, setPosData] = useState({ x: 0, y: 0, z: 0 });

  const handleData = useCallback(
    (data) => {
      // pitchShift.pitch = data.x;
      setPosData(data);
    },
    [posData]
  );

  return (
    <S.Container>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ alpha: false, antialias: false }}
        camera={{ fov: 75, position: [0, 0, 60], near: 10, far: 150 }}
      >
        <color attach="background" args={["#f0f0f0"]} />
        <fog attach="fog" args={["white", 60, 110]} />
        <ambientLight intensity={1.5} />
        <SphereMesh />
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -30, 0]}
          opacity={0.6}
          width={130}
          height={130}
          blur={1}
          far={40}
        />
        <Suspense fallback={null}>
          <Environment preset="forest" />
        </Suspense>
        <CameraControls handleData={handleData} />
      </Canvas>
      <RotationData data={posData} />
    </S.Container>
  );
}
