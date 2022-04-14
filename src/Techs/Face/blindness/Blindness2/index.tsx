import style from "./FaceRec.module.scss";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import classNames from "classnames";
import { drawMesh } from "./Utils";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";

const ROWS = 3;
const COLS = 3;
const NUMS = ROWS * COLS;

function FaceRec() {
  const { width, height } = useWindowDimensions();
  const webCamRef = useRef<any>(null);

  const canvasRefs = useRef<any>([]);

  //size control
  const size = useMemo(
    () =>
      width / height > 0.5625
        ? { width: width, height: width * 0.5625 }
        : { width: height * 1.6, height: height },

    [width, height]
  );

  useEffect(() => {
    if (
      canvasRefs &&
      canvasRefs.current &&
      canvasRefs.current.length === NUMS
    ) {
      tf.getBackend();
      runFacemesh();
    }
  }, [canvasRefs]);

  const runFacemesh = async () => {
    const model = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );

    //Initialize Canvas
    let contexts: any = [];
    canvasRefs.current.forEach((canvas: any, i: number) => {
      canvas.width = size.width / COLS;
      canvas.height = size.height / ROWS;
      const ctx = canvas.getContext("2d");
      ctx.font = "10px Times New Roman";
      ctx.textAlign = "center";
      contexts.push(ctx);
    });

    setInterval(() => {
      detect(contexts, model);
    }, 100);
  };

  const detect = async (contexts: any, model: any) => {
    if (
      typeof webCamRef.current !== "undefined" &&
      webCamRef.current !== null &&
      webCamRef.current.video.readyState === 4
    ) {
      const predictions = await model.estimateFaces({
        input: webCamRef.current.video,
      });

      if (predictions.length > 0) {
        contexts.forEach((ctx: any, i: number) => {
          ctx.fillStyle = i % 2 === 0 ? "black" : "white";
          ctx.fillRect(0, 0, size.width / COLS, size.height / ROWS);
        });
        drawMesh(predictions, contexts, size, COLS);
      }
    }
  };

  return (
    <div className={style.container}>
      <Webcam
        audio={false}
        ref={webCamRef}
        height={size.height}
        width={size.width}
        videoConstraints={{
          width: size.width,
          height: size.height,
          facingMode: "user",
        }}
      />
      <div className={style.canvasContainer}>
        {new Array(NUMS).fill(0).map((_, i) => (
          <canvas
            key={i}
            className={style.canvas}
            ref={(el) => (canvasRefs.current[i] = el)}
          />
        ))}
      </div>
    </div>
  );
}

export default FaceRec;
