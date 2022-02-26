import { useState, useEffect, useRef } from "react";
import { useSpring } from "@react-spring/three";
import * as easings from "d3-ease";

const LENGTH = 8;
const DISTANCE = 20;
const VARIANCE = -0.4;

const HEIGHT = 40;
const RADIUS = 30;

//Geometrical Primitives
//layout 1: Circle
//layout 2: Sphere
//layout 3: Cylinder
//Euclidean Attempts
//layout 4: Pyramides
//layout 5: Cubes
//layout 6: Tower
//Statistical Attempts
//layout 7: Quadratic Function
//layout 8: tanH
//layout 9: Bell Curve
//Regressive Shapes
//layout 10: Helix
//layout 11: White Jar
//layout 12: Giwa

export function circleLayout(data: any) {
  const numPoints = data.length;

  let theta = 0;

  for (let i = 0; i < numPoints; i++) {
    const datum = data[i];

    const r = Math.max(1, Math.sqrt(100 * i + 1) * 0.7);
    theta += Math.asin(1 / r) * 20;

    datum.x = r * Math.cos(theta);
    datum.y = r * Math.sin(theta);
    datum.z = -1000;

    datum.rotateX = Math.PI / 2;
    datum.rotateY = 0;
    datum.rotateZ = 0;
  }
}

export function sphereLayout(data: any) {
  const numPoints = data.length;

  for (let i = 0; i < numPoints; i++) {
    const datum = data[i];
    const theta = ((i % 16) / 16) * Math.PI;
    const phi = (Math.floor(i / 16) / 32) * Math.PI * 2;

    const r = 100;

    datum.x = r * Math.cos(phi) * Math.sin(theta);
    datum.y = r * Math.sin(phi) * Math.sin(theta);
    datum.z = -100 + r * Math.cos(theta);

    datum.rotateX = phi < Math.PI / 2 ? 0 : phi - Math.PI / 2;
    datum.rotateY = 0;
    datum.rotateZ = theta;
  }
}

export function cubeLayout(data: any) {
  const numPoints = data.length;

  for (let i = 0; i < numPoints; i++) {
    const datum = data[i];

    const xIndex =
      Math.floor(Math.floor(i / LENGTH) / LENGTH) - (LENGTH - 1) / 2;
    const yIndex = ((i % LENGTH) % LENGTH) - (LENGTH - 1) / 2;
    const zIndex = (Math.floor(i / LENGTH) % LENGTH) - (LENGTH - 1) / 2;
    datum.x = xIndex * DISTANCE;
    datum.y = yIndex * DISTANCE;
    datum.z = zIndex * DISTANCE;

    datum.rotateX = 0;
    datum.rotateY = 0;
    datum.rotateZ = 0;
  }
}

export function pyramidesLayout(data: any) {
  const numPoints = data.length;

  for (let i = 0; i < numPoints; i++) {
    const datum = data[i];

    const xIndex = ((i % LENGTH) % LENGTH) - (LENGTH - 1) / 2;
    const yIndex = Math.floor(i / LENGTH) % LENGTH;
    const zIndex =
      Math.floor(Math.floor(i / LENGTH) / LENGTH) - (LENGTH - 1) / 2;

    const adjustement = (LENGTH - yIndex - 1) * 0.15;
    datum.x = xIndex * DISTANCE * adjustement;
    datum.y = yIndex * DISTANCE;
    datum.z = zIndex * DISTANCE * adjustement;

    datum.rotateX = 0;
    datum.rotateY = 0;
    datum.rotateZ = 0;
  }
}

export function towerLayout(data: any) {
  const numPoints = data.length;

  for (let id = 0; id < numPoints; id++) {
    const datum = data[id];

    const xIndex = Math.cos(
      (Math.floor(id / HEIGHT) * 2 * Math.PI) / (LENGTH ** 3 / HEIGHT)
    );
    const yIndex = (id % HEIGHT) - (HEIGHT - 1) / 2;
    const zIndex = Math.sin(
      (Math.floor(id / HEIGHT) * 2 * Math.PI) / (LENGTH ** 3 / HEIGHT)
    );

    const adjustement = 1 + (yIndex * VARIANCE) / LENGTH;

    datum.x = xIndex * RADIUS * adjustement;
    datum.y = yIndex * DISTANCE;
    datum.z = zIndex * RADIUS * adjustement;

    datum.rotateX = 0;
    datum.rotateY = 0;
    datum.rotateZ = 0;
  }
}

export function useLayout({ data, layout }: any) {
  useEffect(() => {
    switch (layout) {
      case "circle":
        circleLayout(data);
        break;
      case "sphere":
        sphereLayout(data);
        break;
      case "pyramides":
        pyramidesLayout(data);
        break;
      case "tower":
        towerLayout(data);
        break;
      case "cube":
        cubeLayout(data);
        break;
    }
  }, [data, layout]);
}

function useSourceTargetLayout({ data, layout }: any) {
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      data[i].sourceX = data[i].x || 0;
      data[i].sourceY = data[i].y || 0;
      data[i].sourceZ = data[i].z || 0;

      data[i].sourceRotateX = data[i].rotateX || 0;
      data[i].sourceRotateY = data[i].rotateY || 0;
      data[i].sourceRotateZ = data[i].rotateZ || 0;
    }
  }, [data, layout]);
  useLayout({ data, layout });
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      data[i].targetX = data[i].x || 0;
      data[i].targetY = data[i].y || 0;
      data[i].targetZ = data[i].z || 0;

      data[i].targetRotateX = data[i].rotateX || 0;
      data[i].targetRotateY = data[i].rotateY || 0;
      data[i].targetRotateZ = data[i].rotateZ || 0;
    }
  }, [data, layout]);
}

function interpolateSourceTarget({ data, progress }: any) {
  for (let i = 0; i < data.length; i++) {
    data[i].x = data[i].sourceX * (1 - progress) + data[i].targetX * progress;
    data[i].y = data[i].sourceY * (1 - progress) + data[i].targetY * progress;
    data[i].z = data[i].sourceZ * (1 - progress) + data[i].targetZ * progress;

    data[i].rotateX =
      data[i].sourceRotateX * (1 - progress) + data[i].targetRotateX * progress;
    data[i].rotateY =
      data[i].sourceRotateY * (1 - progress) + data[i].targetRotateY * progress;
    data[i].rotateZ =
      data[i].sourceRotateZ * (1 - progress) + data[i].targetRotateZ * progress;
  }
}

export function useAnimatedLayout({ data, layout, onChange }: any) {
  useSourceTargetLayout({ data, layout });

  const prevLayout = useRef(layout);

  const animProps = useSpring({
    from: { animProgress: 0 },
    to: { animProgress: 1 },
    config: {
      duration: 5000,
      easing: easings.easeCubic,
      friction: 25,
      bounce: 20,
    },
    reset: layout !== prevLayout.current,
    onChange: (animProgress: any) => {
      const progress = animProgress.value.animProgress;
      interpolateSourceTarget({ data, progress });
      onChange({ progress });
    },
    onRest: () => {
      prevLayout.current = layout;
    },
  });

  return animProps;
}
