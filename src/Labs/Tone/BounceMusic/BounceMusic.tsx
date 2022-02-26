import style from "./BounceMusic.module.scss";
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
          width: "calc(min(100vw, 400px))",
          height: "calc(min(100vw, 400px))",
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

  edgeWidth: any;
  edgeHeight: any;

  particles: any;
  particlesNum: any;
  particleRadius: any;

  edgesHorizontal: any;
  edgesVertical: any;
  edges: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.particlesNum = 0;

    this.edgesHorizontal = [];
    this.edgesVertical = [];

    //Edge Allocation: Left 0 Top 1 Right 2 Bottom 3
    this.edges = [];

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

    this.edgeWidth = 30;
    this.edgeHeight = 100;
    this.particleRadius = 10;

    this.edgeSetup();

    this.wrapper.addEventListener("click", (e: any) => {
      if (
        e.offsetX > this.edgeWidth + this.particleRadius &&
        e.offsetX < this.stageWidth - this.edgeWidth - this.particleRadius &&
        e.offsetY > this.edgeWidth + this.particleRadius &&
        e.offsetY < this.stageHeight - this.edgeWidth - this.particleRadius
      ) {
        this.addParticle(e.offsetX, e.offsetY);
      }
    });
  }

  edgeSetup() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    //Edge Allocation: Left 0 Top 1 Right 2 Bottom 3
    let tempArray = [];
    for (let y = 0; y < this.stageHeight; y += this.edgeHeight) {
      tempArray.push(new Edge(0, y, false, this.edgeWidth, this.edgeHeight));
    }
    this.edges.push(tempArray);
    tempArray = [];
    for (let x = 0; x < this.stageWidth; x += this.edgeHeight) {
      tempArray.push(new Edge(x, 0, true, this.edgeHeight, this.edgeWidth));
    }
    this.edges.push(tempArray);
    tempArray = [];
    for (let y = 0; y < this.stageHeight; y += this.edgeHeight) {
      tempArray.push(
        new Edge(
          this.stageWidth - this.edgeWidth,
          y,
          false,
          this.edgeWidth,
          this.edgeHeight
        )
      );
    }
    this.edges.push(tempArray);
    tempArray = [];
    for (let x = 0; x < this.stageWidth; x += this.edgeHeight) {
      tempArray.push(
        new Edge(
          x,
          this.stageHeight - this.edgeWidth,
          true,
          this.edgeHeight,
          this.edgeWidth
        )
      );
    }
    this.edges.push(tempArray);
    console.log(this.edges);
  }

  addParticle(x: any, y: any) {
    this.particlesNum += 1;
    this.particles.push(
      new Particle(x, y, this.particleRadius, "rgb(0, 0, 0)")
    );
  }

  animate() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    const collision = (loc: any, status: any) => {
      this.edges[status][Math.floor(loc / this.edgeHeight)].onAttack(this.ctx);
    };

    for (let i = 0; i < this.particlesNum; i++) {
      this.particles[i].animate(
        this.ctx,
        this.stageWidth,
        this.stageHeight,
        this.edgeWidth,
        collision
      );
    }

    this.edges.map((edgeSets: any) =>
      edgeSets.map((edge: any) => edge.animate(this.ctx))
    );

    window.requestAnimationFrame(this.animate.bind(this));
  }
}

class Edge {
  x: any;
  y: any;
  horizontal: any;
  note: any;
  xWidth: any;
  yHeight: any;

  collided: any;
  deaccel: any;

  synth: any;

  constructor(x: any, y: any, horizontal: any, width: any, height: any) {
    this.x = x;
    this.y = y;
    this.horizontal = horizontal;
    this.xWidth = width;
    this.yHeight = height;

    this.collided = 0;
    this.deaccel = -0.01;

    this.synth = new Tone.Synth().toDestination();
    this.note = getRandomArray([
      "C3",
      "E3",
      "G3",
      "C4",
      "E4",
      "G4",
      "C5",
      "E5",
      "G5",
    ]);
  }

  onAttack(ctx: any) {
    this.collided = 1;

    ctx.fillRect(this.x, this.y, this.xWidth, this.yHeight);
    this.synth.triggerAttackRelease(this.note, "8n");
  }

  animate(ctx: any) {
    if (this.collided > 0) {
      this.collided = Math.max(0, this.collided + this.deaccel);
    }
    ctx.fillStyle = `rgba(100, 100, 100, ${this.collided})`;
    ctx.fillRect(this.x, this.y, this.xWidth, this.yHeight);
  }
}

class Particle {
  x: any;
  y: any;
  radius: any;
  color: any;

  vx: any;
  vy: any;
  sinValue: any;
  cosValue: any;

  constructor(x: any, y: any, radius: any, color: any) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.vx = getRandom(-1, 1);
    this.vy = getRandom(-1, 1);
    this.sinValue = getRandom(-1, 1);
    this.cosValue = Math.sqrt(1 - this.sinValue ** 2);
  }

  animate(
    ctx: any,
    stageWidth: any,
    stageHeight: any,
    edgeWidth: any,
    collision: any
  ) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < this.radius + edgeWidth) {
      this.vx *= -1;
      collision(this.y, 0);
    }
    if (this.x > stageWidth - this.radius - edgeWidth) {
      this.vx *= -1;
      collision(this.y, 2);
    }

    if (this.y < this.radius + edgeWidth) {
      this.vy *= -1;
      collision(this.x, 1);
    }
    if (this.y > stageHeight - this.radius - edgeWidth) {
      this.vy *= -1;
      collision(this.x, 3);
    }

    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 3, 5)";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

export default BounceMusic;
