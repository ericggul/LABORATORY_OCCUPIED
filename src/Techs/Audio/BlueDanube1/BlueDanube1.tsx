import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";
import { request } from "http";
import BlueDanubeAudio from "../../../assets/BlueDanube.mp3";

function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}
const PI2 = Math.PI * 2;

export default function BlueDanube() {
  var wave: any;
  const [buttonClicked, setButtonClicked] = useState(false);
  const audio: HTMLAudioElement = new Audio(BlueDanubeAudio);

  useEffect(() => {
    wave = new App(audio);
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

  constructor(audioElement: any) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.wrapper = document.getElementById("CanvasWrapper");
    this.wrapper.appendChild(this.canvas);

    this.audioElement = audioElement;
    var AudioContext = window.AudioContext || window.webkitAudioContext;
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
    // if(this.data[100]>100 && this.data[100]<200 ){
    //     this.ctx.beginPath();

    //     this.ctx.fillStyle = '#494b4f';
    //     this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    // }

    this.data.forEach((value: any, i: number) => {
      this.ctx.beginPath();

      this.ctx.fillStyle = `rgba(${value * (1 - i / 1024)}, ${
        value * (1 - i / 1024)
      }, ${value}, 0.1)`;
      this.ctx.fillRect(
        this.stageWidth / 2 - value / 3,
        (this.stageHeight * 1) / 6 - value / 3,
        (value * 2) / 3,
        (value * 2) / 3
      );
      this.ctx.fill();

      this.ctx.fillStyle = `rgba(${value * (i / 1024)}, ${
        value * (1 - i / 1024)
      }, ${value}, 0.2)`;
      this.ctx.fillRect(
        this.stageWidth / 2 - value / 2,
        this.stageHeight / 2 - value / 2,
        value,
        value
      );
      this.ctx.fill();

      this.ctx.fillStyle = `rgba(${value * (1 - i / 1024)}, ${
        value * (1 - i / 1024)
      }, ${value}, 0.1)`;
      this.ctx.fillRect(
        this.stageWidth / 2 - value / 3,
        (this.stageHeight * 5) / 6 - value / 3,
        (value * 2) / 3,
        (value * 2) / 3
      );
      this.ctx.fill();

      if (this.stageWidth > 800) {
        //Left, Right
        this.ctx.fillStyle = `rgba(${value * (1 - i / 1024)}, ${
          value * (1 - i / 1024)
        }, ${value}, 0.1)`;
        this.ctx.fillRect(
          this.stageWidth / 2 - this.stageHeight / 3 - value / 3,
          this.stageHeight / 2 - value / 3,
          (value * 2) / 3,
          (value * 2) / 3
        );
        this.ctx.fill();

        this.ctx.fillStyle = `rgba(${value * (1 - i / 1024)}, ${
          value * (1 - i / 1024)
        }, ${value}, 0.1)`;
        this.ctx.fillRect(
          this.stageWidth / 2 + this.stageHeight / 3 - value / 3,
          this.stageHeight / 2 - value / 3,
          (value * 2) / 3,
          (value * 2) / 3
        );
        this.ctx.fill();
      }

      this.ctx.closePath();
    });
  }
}
