import style from "./Tone.module.scss";
import * as Tone from "tone";
import { useState, useCallback, useEffect } from "react";

interface Props {
  i: number;
}

function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

function getRandomArray(array: any) {
  return array[Math.floor(Math.random() * array.length)];
}

const BUTTON_WIDTH = 50;

function BounceMusic() {
  const sizeConverter = (size: number) =>
    Math.floor(size / BUTTON_WIDTH) * BUTTON_WIDTH;

  useEffect(() => {
    const draw = new App();
  }, []);

  return (
    <div className="container">
      <div
        id="CanvasWrapper"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
    </div>
  );
}

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  elementInterval: any;
  elementWidth: any;
  elementHeight: any;

  columnNumber: any;
  rowNumber: any;
  elements: any;

  pointArray: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    //Edge Allocation: Left 0 Top 1 Right 2 Bottom 3
    this.elements = [];

    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    this.elementInterval = 3;
    this.elementWidth = 3;
    this.elementHeight = 3;

    this.columnNumber = Math.ceil(this.stageWidth / this.elementWidth);
    this.rowNumber = Math.ceil(this.stageHeight / this.elementHeight);

    this.elementSetup();

    window.addEventListener("resize", this.resize.bind(this));
  }

  elementSetup() {
    this.pointArray = [];
    for (let i = 0; i < this.columnNumber; i++) {
      let tempArray = [];
      for (let j = 0; j < this.rowNumber; j++) {
        tempArray.push(
          new Element(
            i * this.elementWidth,
            j * this.elementHeight,
            this.elementHeight,
            this.elementWidth
          )
        );
      }
      this.elements.push(tempArray);
    }

    this.construct();
  }

  construct() {
    for (let i = 0; i < 100; i++) {
      this.pointArray.push({
        x: getRandom(0, this.columnNumber),
        y: getRandom(0, this.rowNumber),
        intensity: getRandom(0, 0.5),
      });
    }

    this.elements.map((cols: any, i: number) =>
      cols.map((square: any, j: number) => {
        let distanceSet = 0;

        this.pointArray.map((point: any) => {
          distanceSet +=
            point.intensity /
            Math.max(Math.sqrt((i - point.x) ** 2 + (j - point.y) ** 2), 0.5);
        });

        square.setOpacity(distanceSet);
        square.animate(this.ctx);
      })
    );
  }

  animate() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.elements.map((sets: any) =>
      sets.map((set: any) => set.animate(this.ctx))
    );

    window.requestAnimationFrame(this.animate.bind(this));
  }
}

class Element {
  x: any;
  y: any;
  height: any;
  width: any;

  opacity: any;
  opacityAmplitude: any;
  speed: any;

  constructor(x: any, y: any, height: any, width: any) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.opacity = 0;
    this.speed = getRandom(0.05, 0.06);
  }

  setOpacity(val: any) {
    this.opacityAmplitude = val;
  }

  animate(ctx: any) {
    this.opacity += (this.opacityAmplitude - this.opacity) * this.speed;
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default BounceMusic;
