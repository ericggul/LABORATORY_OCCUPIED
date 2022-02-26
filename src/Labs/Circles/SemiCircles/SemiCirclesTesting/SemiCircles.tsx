import style from "./SemiCircles.module.scss";
import {
  shuffle,
  getRandomFromArray,
  getRandomFromArrayWithWeight,
} from "../../../../functions/arrays";
import { useState, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

const discreteGenerator = (a: number, interval: number) => {
  return Math.abs((a % interval) - interval / 2) + getRandom(-1, 1);
};

export default function SemiCircles() {
  useEffect(() => {
    const app = new App();
  }, []);

  return <div className={style.container} id="CanvasWrapper"></div>;
}

class App {
  wrapper: any;
  canvas: HTMLCanvasElement;
  ctx: any;
  stageWidth: number;
  stageHeight: number;

  unitRadius: number;
  unitSubdivisions: number;

  columnSets: Column[];
  columnSets2: Column[];

  columnSetsLength: number;
  xStart: number;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.columnSets = [];

    this.columnSets2 = [];

    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.unitRadius = 60;
    this.unitSubdivisions = 10;
    this.columnSetsLength = Math.ceil(this.stageWidth / this.unitRadius);
    this.xStart =
      (this.stageWidth - this.columnSetsLength * this.unitRadius) / 2 +
      this.unitRadius;

    this.resize();
  }

  resize() {
    this.columnSets = [];
    this.columnSets2 = [];

    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.columnSetsLength = Math.ceil(this.stageWidth / this.unitRadius) + 2;
    this.xStart =
      (this.stageWidth - this.columnSetsLength * this.unitRadius) / 2 +
      this.unitRadius;

    this.ctx.scale(1, 1);
    this.init();

    window.addEventListener("resize", this.resize.bind(this));
  }

  init() {
    for (let i = 0; i < this.columnSetsLength; i++) {
      this.columnSets.push(
        new Column(
          this.xStart + i * this.unitRadius,
          this.stageHeight,
          this.unitRadius,
          this.unitSubdivisions
        )
      );
    }

    for (let i = 0; i < this.columnSetsLength; i++) {
      this.columnSets2.push(
        new Column(
          this.xStart + i * this.unitRadius,
          this.stageHeight,
          this.unitRadius * 0.5,
          this.unitSubdivisions * 0.5
        )
      );
    }

    this.animate();
  }

  animate() {
    this.columnSets.map((cs) => cs.draw(this.ctx));
    this.columnSets2.map((cs) => cs.draw(this.ctx));
  }
}

//Single Column
class Column {
  x: number;
  height: number;
  unitRadius: number;
  subDivision: number;

  unitIndependency: number;

  unitSets: Unit[];
  unitSetsLength: number;
  yStart: number;

  constructor(
    x: number,
    height: number,
    unitRadius: number,
    subDivision: number
  ) {
    this.x = x;
    this.height = height;
    this.unitRadius = unitRadius;
    this.subDivision = subDivision;

    this.unitIndependency = Math.sqrt(3);
    this.unitSetsLength =
      Math.ceil(height / (unitRadius * this.unitIndependency)) + 2;

    this.yStart =
      -(
        this.unitSetsLength * unitRadius * this.unitIndependency -
        this.height
      ) /
        2 +
      this.unitRadius;
    this.unitSets = [];

    this.init();
  }

  init() {
    for (let i = 0; i < this.unitSetsLength; i++) {
      this.unitSets.push(
        new Unit(
          this.x,
          this.yStart + this.unitRadius * i * this.unitIndependency,
          this.unitRadius,
          this.subDivision,
          i % 2 === 0
        )
      );
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log(this.unitSets);
    this.unitSets.map((u) => u.draw(ctx));
  }
}

//Unit of Circles
class Unit {
  x: number;
  y: number;
  unitRadius: number;
  subDivision: number;
  left: boolean;

  circleSets: Circle[];
  colorH: any;

  constructor(
    x: number,
    y: number,
    unitRadius: number,
    subDivision: number,
    left: boolean
  ) {
    this.x = x;
    this.y = y;
    this.unitRadius = unitRadius;
    this.subDivision = subDivision;
    this.left = left;

    this.circleSets = [];
    this.colorH = getRandom(0, 350);
    this.init();
  }

  init() {
    for (let i = 0; i < this.subDivision; i++) {
      this.circleSets.push(
        new Circle(
          this.x,
          this.y,
          (this.unitRadius * (this.subDivision - i)) / this.subDivision,
          `hsl(${getRandom(200, 280)},
           ${getRandom(30, 50)}%, 
          ${30 + (i * 30) / this.subDivision}%)`,
          this.left
        )
      );
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.circleSets.map((c) => c.draw(ctx));
  }
}

class Circle {
  x: number;
  y: number;
  radius: number;
  color: any;
  left: boolean;

  constructor(x: number, y: number, radius: number, color: any, left: boolean) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.left = left;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      Math.PI * 0.5,
      Math.PI * 1.5,
      this.left
    );
    ctx.fill();
  }
}
