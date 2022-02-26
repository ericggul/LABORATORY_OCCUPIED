import style from "./FaceRec.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import classNames from "classnames";
import { drawMesh } from "./Utils";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function FaceRec() {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  const { width, height } = useWindowDimensions();
  const isMobile = width < 760 ? true : false;

  const [cameraSize, setCameraSize] = useState({
    width: width,
    height: height,
  });
  const [canvasSize, setCanvasSize] = useState({
    width: width,
    height: height,
  });

  console.log(cameraSize);
  console.log(canvasSize);

  useEffect(() => {
    const camHeightCal = (width: any, height: any) => {
      if (height / width > 0.75) {
        return { width: width, height: width * 0.75 };
      } else {
        return { width: height * 1.333, height: height };
      }
    };
    setCameraSize(camHeightCal(width, height));
    setCanvasSize(camHeightCal(width + 2, height + 2));
  }, [width, height]);

  const runFacemesh = async () => {
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );
    const canvas = canvasRef.current;
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    const ctx = canvasRef.current.getContext("2d");
    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    setInterval(() => {
      detect(net, ctx);
    }, 100);
  };

  //Simulation et Simulacres
  //Just like this part of video

  const detect = useCallback(
    async (net: any, ctx: any) => {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const face = await net.estimateFaces({ input: video });
        
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
        drawMesh(face, ctx, canvasSize.width, canvasSize.height);
    
        // requestAnimationFrame(()=> {drawMesh(face,ctx, canvasSize.width, canvasSize.height)})
      }
    },
    [webcamRef]
  );

  useEffect(() => {
    tf.getBackend();
    runFacemesh();
  }, []);

  return (
    <div className={style.container}>
      <Webcam
        ref={webcamRef}
        className={style.webcam}
        style={{
          width: `${cameraSize.width}px`,
          height: `${cameraSize.height}px`,
        }}
      />
      <canvas
        ref={canvasRef}
        className={style.canvas}
        style={{
          width: `${canvasSize.width}px`,
          height: `${canvasSize.height}px`,
        }}
      />
    </div>
  );
}

export default FaceRec;
