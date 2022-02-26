import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";
import { request } from "http";
import Rage from "../../../assets/Rage.mp3";

function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export default function Audio() {
  var wave: any;
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    wave = new App();
  }, []);

  const handleClick = () => {
    console.log("click");
    wave.audioCtx.resume();
    wave.audioElement.play();

    setButtonClicked(true);
  };

  return (
    <>
      <div
        id="CanvasWrapper"
        style={{ width: "100vw", height: "100vh", background: "black" }}
      />
      {!buttonClicked && (
        <S.Button onClick={handleClick}>Play the Song</S.Button>
      )}
      <audio id="source" src={Rage} />
    </>
  );
}

class App {
  canvas: any;
  ctx: any;
  wrapper: any;

  audioElement: any;
  analyser: any;
  audioCtx: any;
  source: any;

  data: any;

  stageWidth: any;
  stageHeight: any;
  space: any;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.wrapper = document.getElementById("CanvasWrapper");
    this.wrapper.appendChild(this.canvas);

    this.audioElement = document.getElementById("source");
    this.audioCtx = new AudioContext();
    this.analyser = this.audioCtx.createAnalyser();

    this.analyser.fftSize = 2048;
    this.source = this.audioCtx.createMediaElementSource(this.audioElement);
    this.data = new Uint8Array(this.analyser.frequencyBinCount);

    this.source.connect(this.analyser);
    this.source.connect(this.audioCtx.destination);

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.init();
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;
    this.space = this.stageWidth / this.stageHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);
  }

  init() {
    this.loopingFunction();
  }

  loopingFunction() {
    requestAnimationFrame(this.loopingFunction.bind(this));
    this.analyser.getByteFrequencyData(this.data);
    this.draw(this.data);

    // console.log(this.data);
  }

  draw(data: any) {
    data = [...data];
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.data.forEach((value: any, i: number) => {
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgb(${value * (i / 1024)}, ${
        value * (1 - i / 1024)
      }, ${value})`;

      this.ctx.moveTo((this.stageWidth * i) / 1024, this.stageHeight);
      this.ctx.lineTo((this.stageWidth * i) / 1024, this.stageHeight - value);
      this.ctx.lineTo(
        (this.stageWidth * (i + 1)) / 1024,
        this.stageHeight - value
      );
      this.ctx.lineTo((this.stageWidth * (i + 1)) / 1024, this.stageHeight);

      this.ctx.fill();
      this.ctx.closePath();
    });
  }
}
