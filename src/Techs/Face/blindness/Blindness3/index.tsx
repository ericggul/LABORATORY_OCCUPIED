import style from "./FaceRec.module.scss";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";

//THREE JS
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function FaceRec() {
  const { width, height } = useWindowDimensions();
  const webCamRef = useRef<any>(null);

  //size control
  const size = useMemo(
    () =>
      width / height > 0.5625
        ? { width: width, height: width * 0.5625 }
        : { width: height * 1.6, height: height },
    [width, height]
  );

  console.log(width, height);
  console.log(size);

  useEffect(() => {
    tf.getBackend();
    runFacemesh();
  }, []);

  const [model, setModel] = useState<any>(null);
  const runFacemesh = async () => {
    setModel(await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh));
  };

  const Points = ({ model, size }: any) => {
    //THREE Related
    const { viewport } = useThree();

    const [length, setLength] = useState(0);
    const [vertices, setVertices] = useState<Float32Array>();
    const [colors, setColors] = useState<Float32Array>();

    const pointsRef = useRef<any>(null);

    useEffect(() => {
      if (model) {
        const interval = setInterval(() => {
          detect();
        }, 100);
        return () => clearInterval(interval);
      }
    }, [model]);

    const detect = async () => {
      if (
        typeof webCamRef.current !== "undefined" &&
        webCamRef.current !== null &&
        webCamRef.current.video.readyState === 4
      ) {
        const predictions = await model.estimateFaces({
          input: webCamRef.current.video,
        });

        if (predictions.length > 0) {
          let scaledMesh = predictions[0].scaledMesh;
          setLength(scaledMesh.length);
          const LENGTH = scaledMesh.length;
          let tempVertices = new Float32Array(LENGTH * 3);
          let tempColors = new Float32Array(LENGTH * 3);

          scaledMesh.forEach((keypoint: any, i: number) => {
            tempVertices[i * 3] =
              ((keypoint[0] - size.width / 2) * viewport.width) / size.width;
            tempVertices[i * 3 + 1] =
              -((keypoint[1] - size.height / 2) * viewport.height) /
              size.height;
            tempVertices[i * 3 + 2] =
              (keypoint[2] * viewport.width) / size.width;

            tempColors[i * 3] = getRandom(0, 1);
            tempColors[i * 3 + 1] = getRandom(0, 1);
            tempColors[i * 3 + 2] = getRandom(0, 1);
          });
          setVertices(tempVertices);
          setColors(tempColors);
        }
      }
    };

    useFrame(() => {
      if (pointsRef && pointsRef.current && vertices) {
        console.log(pointsRef.current.geometry);
        console.log(vertices);
        pointsRef.current.geometry.setAttribute("position", vertices);

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.geometry.attributes.color.needsUpdate = true;
      }
    });

    return (
      <points ref={pointsRef}>
        <bufferGeometry attach="geometry">
          {vertices && (
            <bufferAttribute
              attachObject={["attributes", "position"]}
              array={vertices}
              count={length}
              itemSize={3}
            />
          )}
          {colors && (
            <bufferAttribute
              attachObject={["attributes", "color"]}
              array={colors}
              count={length}
              itemSize={3}
            />
          )}
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          attach="material"
          vertexColors={true}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    );
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
        className={style.threeContainer}
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
      >
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 75, near: 0.1, far: 200, position: [0, 0, 10] }}
        >
          <color attach="background" args={["black"]} />
          <pointLight position={[0, 3, 10]} intensity={1} color="white" />
          <ambientLight intensity={0.3} />
          <Points model={model} size={size} />
        </Canvas>
      </div>
    </div>
  );
}

export default FaceRec;
