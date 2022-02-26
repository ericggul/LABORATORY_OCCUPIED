import React, { useState, useEffect, useRef, useCallback } from "react";
import { targetFrameTime } from "./config";
import {
  useComponentSize,
  useSnowfallStyle,
  useSnowflakes,
  useDeepMemo,
} from "./hooks";
import { SnowflakeProps, defaultConfig } from "./Snowflake";

export interface SnowfallProps extends Partial<SnowflakeProps> {
  snowflakeCount?: number;
  style?: React.CSSProperties;
}

const Snowfall = ({
  color = defaultConfig.color,
  changeFrequency = defaultConfig.changeFrequency,
  radius = defaultConfig.radius,
  wind = defaultConfig.wind,
  speed = defaultConfig.speed,
  snowflakeCount = 150,
  style,
}: SnowfallProps = {}) => {
  const mergedStyle = useSnowfallStyle(style);
  const canvasRef = useRef<HTMLCanvasElement>();
  const canvasSize = useComponentSize(canvasRef);
  const animationFrame = useRef(0);

  const lastUpdate = useRef(Date.now());
  const config = useDeepMemo<SnowflakeProps>({
    color,
    changeFrequency,
    radius,
    speed,
    wind,
  });
  const snowflakes = useSnowflakes(canvasRef, snowflakeCount, config);

  const updateCanvasRef = (element: HTMLCanvasElement) => {
    canvasRef.current = element;
  };

  const render = useCallback(
    (framesPassed: number = 1) => {
      const canvas = canvasRef.current;
      if (canvas) {
        snowflakes.forEach((snowflake) =>
          snowflake.update(canvas, framesPassed)
        );
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
          snowflakes.forEach((snowflake) => snowflake.draw(canvas, ctx));
        }
      }
    },
    [snowflakes]
  );

  const loop = useCallback(() => {
    const now = Date.now();
    const msPassed = Date.now() - lastUpdate.current;
    lastUpdate.current = now;

    const framesPassed = msPassed / targetFrameTime;

    render(framesPassed);

    animationFrame.current = requestAnimationFrame(loop);
  }, [render]);

  useEffect(() => {
    loop();
    return () => cancelAnimationFrame(animationFrame.current);
  }, [loop]);

  return (
    <canvas
      ref={updateCanvasRef}
      height={canvasSize.height}
      width={canvasSize.width}
      style={mergedStyle}
    />
  );
};

function Output() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Snowfall />
    </div>
  );
}

export default Output;
