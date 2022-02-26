import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";

const SELECTED_COLOR = "#6f6";
const DEFAULT_COLOR = "#fff";

const scratchColor = new THREE.Color();

export const usePointColors = ({ data, selectedPoint }: any) => {
  const colorAttrib = useRef<any>(!null);
  const colorArray = useMemo(() => new Float32Array(data.length * 3), [data]);

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      scratchColor.set(
        data[i] === selectedPoint ? SELECTED_COLOR : DEFAULT_COLOR
      );
      scratchColor.toArray(colorArray, i * 3);
    }
    colorAttrib.current.needsUpdate = true;
  }, [data, selectedPoint, colorArray]);

  return { colorAttrib, colorArray };
};
