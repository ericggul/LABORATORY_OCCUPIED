import { useEffect, useRef } from "react";
import { useSpring } from "@react-spring/three";
import * as THREE from "three";

export function gridLayout(data: any) {
  const numPoints = data.length;
  const numCols = Math.ceil(Math.sqrt(numPoints));
  const numRows = numCols;

  for (let i = 0; i < numPoints; i++) {
    const datum = data[i];
    const col = (i % numCols) - numCols / 2;
    const row = Math.floor(i / numCols) - numRows / 2;

    datum.x = col * 1.05;
    datum.y = row * 1.05;
    datum.z = 0;
  }
}

export function spiralLayout(data: any) {
  const numPoints = data.length;

  let theta = 0;
  for (let i = 0; i < numPoints; i++) {
    const datum = data[i];
    const r = Math.max(1, Math.sqrt(i + 1) * 0.7);
    theta += Math.asin(1 / r);

    datum.x = r * Math.cos(theta);
    datum.y = r * Math.sin(theta);
    datum.z = 0;
  }
}

export function useLayout({ data, layout = "grid" }: any) {
  useEffect(() => {
    switch (layout) {
      case "spiral":
        spiralLayout(data);
        break;
      case "grid":
      default: {
        gridLayout(data);
      }
    }
  }, [layout, data]);
}

export function useSourceTargetLayout({ data, layout }: any) {
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      data[i].sourceX = data[i].x || 0;
      data[i].sourceY = data[i].y || 0;
      data[i].sourceZ = data[i].z || 0;
    }
  }, [data, layout]);

  useLayout({ data, layout });

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      data[i].targetX = data[i].x || 0;
      data[i].targetY = data[i].y || 0;
      data[i].targetZ = data[i].z || 0;
    }
  }, [data, layout]);
}

function interpolateSourceTarget(data: any, progress: any) {
  for (let i = 0; i < data.length; i++) {
    data[i].x = (1 - progress) * data[i].sourceX + progress * data[i].targetX;
    data[i].y = (1 - progress) * data[i].sourceY + progress * data[i].targetY;
    data[i].z = (1 - progress) * data[i].sourceZ + progress * data[i].targetZ;
  }
}

export function useAnimatedLayout({ data, layout, onChange }: any) {
  useSourceTargetLayout({ data, layout });
  const prevLayout = useRef(layout);

  console.log(layout, prevLayout.current);

  const animProps = useSpring({
    from: { animationProgress: 0 },
    animationProgress: 1,
    config: { duration: 600 },
    reset: layout !== prevLayout.current,
    onChange: (animationProgress: any) => {
      const progress = animationProgress.value.animationProgress;
      interpolateSourceTarget(data, progress);
      onChange({ progress });
    },
    onRest: () => {
      prevLayout.current = layout;
    },
  });

  return animProps;
}
