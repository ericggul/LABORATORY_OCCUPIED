import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";
import { request } from "http";
import Rage from "../../../assets/Rage.mp3";

function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

function shuffle(length: any) {
  var array = [];
  for (var i = 0; i < length; i++) {
    array.push(i);
  }

  var currentIndex = length,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function activation(a: any) {
  if (a < 50) {
    return 0;
  } else {
    return a;
  }
}

const PI2 = Math.PI * 2;

export default function AudioTesting() {
  const audio: HTMLAudioElement = new Audio(Rage);
  var wave: any;
  const [buttonClicked, setButtonClicked] = useState(false);

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
  columnNums: any;
  rowNums: any;
  columnWidth: any;
  rowHeight: any;
  cellSize: any;

  shuffledArray: any;

  time: any;

  constructor(audioElement: any) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.wrapper = document.getElementById("CanvasWrapper");
    this.wrapper.appendChild(this.canvas);
    this.time = 0;

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

    this.sizeCalculator();

    this.shuffledArray = shuffle(1025);
    console.log(this.shuffledArray);

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);
  }

  sizeCalculator() {
    if (this.space > 3) {
      this.columnNums = 64;
      this.rowNums = 16;
    } else if (this.space > 1.4) {
      this.columnNums = 40;
      this.rowNums = 25;
    } else if (this.space > 0.75) {
      this.columnNums = 32;
      this.rowNums = 32;
    } else if (this.space > 0.34) {
      this.columnNums = 25;
      this.rowNums = 40;
    } else {
      this.columnNums = 16;
      this.rowNums = 64;
    }
    this.columnWidth = this.stageWidth / this.columnNums;
    this.rowHeight = this.stageHeight / this.rowNums;
    this.cellSize = Math.min(this.columnWidth, this.rowHeight);
  }

  init() {
    this.loopingFunction();
  }

  loopingFunction() {
    this.time++;
    requestAnimationFrame(this.loopingFunction.bind(this));
    this.analyser.getByteFrequencyData(this.data);
    this.draw(this.data);
  }

  draw(data: any) {
    data = [...data];
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.data.forEach((value: any, i: number) => {
      const shuffledNumber = this.shuffledArray[i];
      const activated = activation(i);
      this.ctx.beginPath();
      this.ctx.fillStyle = `rgba(${value * (activated / 300)}, ${
        value * (1 - activated / 350)
      }, ${(shuffledNumber / 1024) * 255}, 0.3)`;
      // this.ctx.globalCompositeOperation = 'soft-light'

      const size = (value / 255) * this.cellSize * 5;

      this.ctx.arc(
        (shuffledNumber % this.columnNums) * this.columnWidth +
          this.columnWidth / 2,
        Math.floor(shuffledNumber / this.columnNums) * this.rowHeight +
          this.rowHeight / 2,
        (value / 255) * this.cellSize * 3,
        0,
        PI2,
        false
      );

      this.ctx.fill();
      this.ctx.closePath();
    });
  }
}
