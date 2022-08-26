import * as S from "./styles";

import { useState, useEffect, useRef } from "react";

import "@mediapipe/face_mesh";
import "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

import { drawResults } from "./utils/draw";

import useResize from "../../../hooks/useResize";

const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;
const getRandomFromArray = (array: any[]) =>
  array[Math.floor(Math.random() * array.length)];

export default function Elice() {
  //speech synthesis

  const SPEECH_ARRAY = [
    "안녕하세요.",
    `Software Engineer Track 2기 실습 코치를 맡은 최정윤입니다.`,
    `여러분들과 함께한 숨가쁜 3달, 거기에다 마지막 프로젝트 1달까지 진행하시느라 정말 수고 많으셨습니다.`,
    `그러나 지금까지의 과정은 그저 시작일 뿐입니다.`,
    `아직 시작일이 아닙니다.`,
    `단순히 취업을 위한 코딩을 넘어서, 인생의 중요한 실존적 양태로서 코딩이 다가왔으면 좋겠습니다.`,
    `기술이 변하는 속도는 빠르며, 여러분들이 이번 Software Engineer Track 2기를 거치면서 배운 내용은 대부분 빠른 시일 내에 업데이트될 것입니다.`,
    `정적인 지식을 암기적으로 학습하는 개발자가 아닌, 유동적인 기술의 흐름을 읽을 수 있는 개발자로 성장하는 기회를 잡으시길 바랍니다.`,
    `감사합니다.`,
  ];

  const LANG_ARRAY = [
    "ko-KR",
    // "fr-FR",
    // "it-IT",
    // "ja-JP",
    // "es-ES",
  ];

  function speak(text: any) {
    const synth = window.speechSynthesis;

    var msg = new SpeechSynthesisUtterance(text);
    msg.lang = getRandomFromArray(LANG_ARRAY);
    msg.pitch = getRandom(0.8, 1.2);
    msg.rate = getRandom(1, 1.2);
    window.speechSynthesis.speak(msg);
  }

  //speak
  const [speechNo, setSpeechNo] = useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleSpeak);
    return () => document.removeEventListener("keydown", handleSpeak);
  }, [speechNo]);

  function handleSpeak() {
    console.log(speechNo);
    speak(SPEECH_ARRAY[speechNo]);
    if (speechNo < SPEECH_ARRAY.length) {
      setSpeechNo((no) => no + 1);
    }
  }

  //prepare model
  const [detector, setDetector] = useState<any>(null);
  useEffect(() => {
    prepareModel();
  }, []);

  async function prepareModel() {
    if (detector !== null) {
      return;
    }

    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig: any = {
      runtime: "mediapipe",
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
    };
    let detect = await faceLandmarksDetection.createDetector(
      model,
      detectorConfig
    );

    setDetector(detect);
  }

  //prepare video
  const videoRef = useRef<any>(null);
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    if (videoRef && videoRef.current) {
      prepareVideo();
    }
  }, [videoRef]);

  async function prepareVideo() {
    if (videoRef.current === null) {
      return;
    }
    const video = videoRef.current;
    video.width = window.innerWidth;
    video.height = window.innerHeight;

    const videoConfig = {
      audio: false,
      video: {
        facingMode: "user",
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

    video.srcObject = stream;

    await new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });

    video.play();
    video.addEventListener(
      "canplay",
      () => {
        video.play();
      },
      false
    );
    setVideoReady(true);
  }

  // get video from live media device

  const animationRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    if (detector && videoReady && canvasRef && canvasRef.current) {
      detectFace();
    }
  }, [detector, videoReady, canvasRef]);

  const [windowWidth, windowHeight] = useResize();

  async function detectFace() {
    let ctx = canvasRef.current.getContext("2d");

    ctx.scale(1, 1);
    ctx.width = windowWidth;
    ctx.height = windowHeight;

    let result = await detector.estimateFaces(videoRef.current);
    animationRef.current = window.requestAnimationFrame(detectFace);

    drawResults(ctx, result, true, true, windowWidth, windowHeight);
  }

  useEffect(() => {
    if (animationRef && animationRef.current) {
      return () => window.cancelAnimationFrame(animationRef.current);
    }
  }, [animationRef]);

  return (
    <S.Container>
      <S.Video ref={videoRef}></S.Video>
      <S.Background />
      <S.Canvas
        ref={canvasRef}
        width={windowWidth}
        height={windowHeight}
      ></S.Canvas>
    </S.Container>
  );
}
