import * as S from "./styles";
import { useCallback, useState, useEffect, useRef } from "react";

import Reality from "../../../../assets/Reality.mp3";
import ReactAudioPlayer from "react-audio-player";

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

export default function AudioTesting() {
  const audio: HTMLAudioElement = new Audio(Reality);
  const audioRef = useRef<any>(!null);
  const [rap, setRap] = useState<any>(!null);
  const [wave, setWave] = useState<any>(!null);

  //Initial Play Button
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (rap && rap.audioEl) {
      console.log(rap.audioEl.current);
      let canvasEl = new App(rap.audioEl.current);
      canvasEl.audioCtx.resume();
      setWave(canvasEl);
    }
  }, [rap]);

  const handleClick = () => {
    console.log("click");

    setButtonClicked(true);
  };

  return (
    <>
      <div id="CanvasWrapper" style={{ width: "100vw", height: "100vh" }} />
      {!buttonClicked && (
        <S.Button onClick={handleClick}>Play the Song</S.Button>
      )}
      {buttonClicked && (
        <ReactAudioPlayer src={Reality} autoPlay ref={(el) => setRap(el)} />
      )}
      {buttonClicked && <S.Container />}
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

  pointArray: any;

  time: any;

  color: any;

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

    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.95;

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

    this.pointArray = [];

    this.sizeCalculator();

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
    this.color = { h: 184, s: 20, l: 46 };
    for (let i = 0; i < 129; i++) {
      this.pointArray.push(
        new Point(
          getRandom(0, this.stageWidth),
          getRandom(0, this.stageHeight),
          `hsla(${this.color.h},  ${getRandom(
            this.color.s - 10,
            this.color.s + 10
          )}%, ${getRandom(50, 100)}%, 0.07)`,
          this.cellSize * 10
        )
      );
    }

    this.loopingFunction();
  }

  loopingFunction() {
    this.time++;
    requestAnimationFrame(this.loopingFunction.bind(this));
    this.analyser.getByteFrequencyData(this.data);
    this.draw(this.data);
  }

  draw(data: any) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    data.forEach((value: any, i: number) => {
      this.pointArray[i].draw(this.ctx, value);
    });
  }
}

class Point {
  x: any;
  y: any;
  color: any;
  cellSize: any;
  constructor(x: any, y: any, color: any, cellSize: any) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.cellSize = cellSize;
  }

  draw(ctx: any, value: any) {
    const size = (value / 255) * this.cellSize;
    ctx.beginPath();
    var gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      size * 1
    );
    // Add three color stops
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, `transparent`);

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    // ctx.arc(this.x, this.y, size, 0, Math.PI * 2, false);
    ctx.fillRect(this.x - size / 2, this.y - size / 2, size, size);
    ctx.fill();
    ctx.closePath();
  }
}
