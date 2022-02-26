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
  elements: any;

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

    this.elementInterval = 25;
    this.elementWidth = 100;
    this.elementHeight = 100;

    this.elementSetup();
  }

  elementSetup() {
    for (
      let i = -this.elementWidth;
      i < this.stageWidth + this.elementWidth;
      i += this.elementInterval
    ) {
      let tempArray = [];
      for (
        let j = -this.elementHeight;
        j < this.stageHeight + this.elementHeight;
        j += this.elementInterval
      ) {
        tempArray.push(
          new Element(i, j, this.elementHeight, this.elementWidth)
        );
      }
      this.elements.push(tempArray);
    }

    this.wrapper.addEventListener("click", (e: any) => {
      const currentPosX = Math.floor(e.clientX / this.elementInterval);
      const currentPosY = Math.floor(e.clientY / this.elementInterval);
      const contains = this.elementWidth / this.elementInterval;

      console.log(contains);

      for (let i = 0; i < contains; i++) {
        for (let j = 0; j < contains; j++) {
          this.elements[currentPosX - i + contains][
            currentPosY - j + contains
          ].onAttack();
        }
      }
    });
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

  note: any;

  clicked: any;
  deaccel: any;

  synth: any;

  constructor(x: any, y: any, height: any, width: any) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;

    this.clicked = 0;
    this.deaccel = -0.03;

    this.synth = new Tone.Synth().toDestination();
    this.note = getRandomArray([
      "C2",
      "E2",
      "G2",
      "C3",
      "E3",
      "G3",
      "C4",
      "E4",
      "G4",
      "C5",
      "E5",
      "G5",
      "C6",
      "E6",
      "G6",
    ]);
  }

  onAttack() {
    this.clicked = 1;
    this.synth.triggerAttackRelease(this.note, "8n");
  }

  animate(ctx: any) {
    if (this.clicked > 0) {
      this.clicked = Math.max(0, this.clicked + this.deaccel);
    }
    ctx.fillStyle = `rgba(100, 100, 100, ${this.clicked})`;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default BounceMusic;
