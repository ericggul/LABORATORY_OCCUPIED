import style from "./FaceRec.module.scss";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import classNames from "classnames";
import { drawMesh } from "./Utils";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";

function FaceRec() {
  const { width, height } = useWindowDimensions();
  const webCamRef = useRef<any>(null);
  const canvasRef1 = useRef<any>(null);
  const canvasRef2 = useRef<any>(null);

  //size control
  const size = useMemo(
    () =>
      width / height > 0.5625
        ? { width: width, height: width * 0.5625 }
        : { width: height * 1.6, height: height },

    [width, height]
  );

  const canvasSize = useMemo(
    () =>
      width / height > 1.5
        ? { width: width * 0.5, height: width * 0.5 * 0.5625 }
        : { width: height * 0.5 * 1.6, height: height * 0.5 },
    [width, height]
  );
  const canvasOrientation = useMemo(
    () => (width / height > 1.5 ? "row" : "column"),
    [width, height]
  );

  useEffect(() => {
    if (canvasRef1 && canvasRef1.current && canvasRef2 && canvasRef2.current) {
      tf.getBackend();
      runFacemesh();
    }
  }, [canvasRef1, canvasRef2]);

  const runFacemesh = async () => {
    const model = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );

    //Initialize Canvas
    const canvas1 = canvasRef1.current;
    canvas1.width = canvasSize.width;
    canvas1.height = canvasSize.height;
    const ctx1 = canvasRef1.current.getContext("2d");
    ctx1.font = "10px Times New Roman";
    ctx1.textAlign = "center";

    const canvas2 = canvasRef2.current;
    canvas2.width = canvasSize.width;
    canvas2.height = canvasSize.height;
    const ctx2 = canvasRef2.current.getContext("2d");
    ctx2.font = "10px Times New Roman";
    ctx2.textAlign = "center";

    let elapsedTime = 0;

    setInterval(() => {
      elapsedTime += 100;
      detect(ctx1, ctx2, model, elapsedTime);
    }, 100);
  };

  const detect = async (ctx1: any, ctx2: any, model: any, elapsedTime: any) => {
    if (
      typeof webCamRef.current !== "undefined" &&
      webCamRef.current !== null &&
      webCamRef.current.video.readyState === 4
    ) {
      const predictions = await model.estimateFaces({
        input: webCamRef.current.video,
      });

      if (predictions.length > 0) {
        ctx1.fillStyle = "black";
        ctx1.fillRect(0, 0, canvasSize.width, canvasSize.height);

        ctx2.fillStyle = "white";
        ctx2.fillRect(0, 0, canvasSize.width, canvasSize.height);

        drawMesh(predictions, ctx1, ctx2, size, canvasSize);
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
      <div
        className={style.canvasContainer}
        style={{ flexDirection: canvasOrientation }}
      >
        <div
          className={style.canvasWrapper}
          style={{
            background: "black",
            width: canvasOrientation === "row" ? "50vw" : "100vw",
            height: canvasOrientation === "row" ? "100vh" : "50vh",
          }}
        >
          <canvas
            className={style.canvas}
            ref={canvasRef1}
            style={{
              width: `${canvasSize.width}px`,
              height: `${canvasSize.height}px`,
            }}
          />
        </div>
        <div
          className={style.canvasWrapper}
          style={{
            background: "white",
            width: canvasOrientation === "row" ? "50vw" : "100vw",
            height: canvasOrientation === "row" ? "100vh" : "50vh",
          }}
        >
          <canvas
            className={style.canvas}
            ref={canvasRef2}
            style={{
              width: `${canvasSize.width}px`,
              height: `${canvasSize.height}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FaceRec;
