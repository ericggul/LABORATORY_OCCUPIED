import React from "react";
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";

import * as S from "./styles";

function Tutorial() {
  return (
    <S.Main>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ alpha: false, antialias: false }}
        camera={{ fov: 75, position: [0, 0, 10], near: 1, far: 150 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[1, 1, 1]} color="white" />
        <mesh>
          <meshStandardMaterial roughness={0} color="#ff0000" />
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      </Canvas>
    </S.Main>
  );
}

export default Tutorial;
