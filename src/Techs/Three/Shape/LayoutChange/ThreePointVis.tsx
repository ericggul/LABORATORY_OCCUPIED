import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { Canvas, Color } from "@react-three/fiber";
import Controls from "./Controls";
import { useLayout, useAnimatedLayout } from "./hooks/layouts";
import { usePointColors } from "./hooks/color";
import { useMousePointInteraction } from "./hooks/mouseInteraction";
import { a } from "@react-spring/three";
import Effects from "./Effects";

const ThreePointVis = ({ data, layout, selectedPoint, onPointSelect }: any) => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color={new THREE.Color("#ffffbb")}
        groundColor={new THREE.Color("#080820")}
        intensity={0.1}
      />

      <InstancedPoints
        data={data}
        layout={layout}
        selectedPoint={selectedPoint}
        onPointSelect={onPointSelect}
      />
      <Effects />
    </Canvas>
  );
};

const scratchObject3D = new THREE.Object3D();

function updateInstancedMeshMatrices({ mesh, data }: any) {
  if (!mesh) return;
  for (let i = 0; i < data.length; i++) {
    const { x, y, z } = data[i];
    scratchObject3D.position.set(x, y, z);
    scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0);
    scratchObject3D.updateMatrix();
    mesh.setMatrixAt(i, scratchObject3D.matrix);
  }

  mesh.instanceMatrix.needsUpdate = true;
}

const InstancedPoints = ({
  data,
  layout,
  selectedPoint,
  onPointSelect,
}: any) => {
  const meshRef = useRef<any>(!null);
  const numPoints = data.length;

  const { colorAttrib, colorArray } = usePointColors({ data, selectedPoint });
  const { handlePointerDown, handleClick } = useMousePointInteraction({
    data,
    selectedPoint,
    onPointSelect,
  });

  const { animationProgress } = useAnimatedLayout({
    data,
    layout,
    onChange: () => {
      updateInstancedMeshMatrices({ mesh: meshRef.current, data });
    },
  });

  useEffect(() => {
    updateInstancedMeshMatrices({ mesh: meshRef.current, data });
  }, [data, layout]);

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, numPoints]}
        frustumCulled={false}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
      >
        <cylinderGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]}>
          <instancedBufferAttribute
            ref={colorAttrib}
            attachObject={["attributes", "color"]}
            args={[colorArray, 3]}
          />
        </cylinderGeometry>
        <meshStandardMaterial attach="material" vertexColors={true} />
      </instancedMesh>
      {selectedPoint && (
        <a.group
          position={animationProgress.interpolate(() => [
            selectedPoint.x,
            selectedPoint.y,
            selectedPoint.z,
          ])}
        >
          <pointLight
            distance={10}
            position={[0, 0, 0.3]}
            intensity={3}
            decay={20}
            color="#3f3"
          />
          <pointLight
            position={[0, 0, 0]}
            decay={1}
            distance={5}
            intensity={1.5}
            color="#2f0"
          />
        </a.group>
      )}
    </>
  );
};

export default ThreePointVis;
