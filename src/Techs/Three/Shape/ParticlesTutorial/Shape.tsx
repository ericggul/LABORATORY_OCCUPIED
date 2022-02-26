import * as S from "./styles";
import * as THREE from "three";
import * as Tone from "tone";
import { useRef, Suspense, useState, useCallback, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const LENGTH = 30000;
const parameters = {
  wing: 7,
  wingRadius: 7,
  spin: 0.2,
  randomness: 0.2,
  randomnessPower: 3,
};
const INNER_COLOR = "#ff4b6c";
const OUTER_COLOR = "#2b3f87";
const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

export default function Shape() {
  const [vertices, setVertices] = useState<Float32Array>();
  const [colors, setColors] = useState<Float32Array>();

  useEffect(() => {
    let tempVertices = new Float32Array(LENGTH * 3);
    let tempColors = new Float32Array(LENGTH * 3);
    for (let i = 0; i < LENGTH; i++) {
      const radius = getRandom(0, parameters.wingRadius);
      const tilt = radius * parameters.spin;
      const angle = ((i % parameters.wing) / parameters.wing) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        parameters.randomness *
        (Math.random() < 0.5 ? -1 : 1) *
        radius;
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        parameters.randomness *
        (Math.random() < 0.5 ? -1 : 1) *
        radius;
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        parameters.randomness *
        (Math.random() < 0.5 ? -1 : 1) *
        radius;

      tempVertices[i * 3] = radius * Math.cos(angle + tilt) + randomX;
      tempVertices[i * 3 + 1] = radius * Math.sin(angle + tilt) + randomY;
      tempVertices[i * 3 + 2] = randomZ;

      const innerColor = new THREE.Color(INNER_COLOR);
      const outerColor = new THREE.Color(OUTER_COLOR);

      const mixedColor = innerColor.clone();
      mixedColor.lerp(outerColor, radius / parameters.wingRadius);

      tempColors[i * 3] = mixedColor.r;
      tempColors[i * 3 + 1] = mixedColor.g;
      tempColors[i * 3 + 2] = Math.random();

      setVertices(tempVertices);
      setColors(tempColors);
    }
  }, []);

  console.log(colors);

  const Points = () => {
    return (
      <points>
        <bufferGeometry attach="geometry">
          {vertices && (
            <bufferAttribute
              attachObject={["attributes", "position"]}
              array={vertices}
              count={LENGTH}
              itemSize={3}
            />
          )}
          {colors && (
            <bufferAttribute
              attachObject={["attributes", "color"]}
              array={colors}
              count={LENGTH}
              itemSize={3}
            />
          )}
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          attach="material"
          vertexColors={true}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    );
  };

  return (
    <S.Container>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 75, near: 0.1, far: 200, position: [0, 0, 3] }}
      >
        <color attach="background" args={["black"]} />
        <Points />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} color="#3afbff" intensity={1} />
        <OrbitControls enableDamping />
      </Canvas>
    </S.Container>
  );
}
