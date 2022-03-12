import style from "./Particles.module.scss";
import { useState, useEffect, useCallback } from "react";

const CENTER = { x: 0.34, y: 0.73 };

const distrub = (): any => {
  return Math.random() * Math.random();
};

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Particles() {
  const [draw, setDraw] = useState<any>(null);
  useEffect(() => {
    setDraw(new Canvas());
  }, []);
  useEffect(() => {
    if (draw) {
      document.addEventListener("click", () => draw.capture());
      return () => document.removeEventListener("click", () => draw.capture());
    }
  }, [draw]);

  return (
    <div
      id="CanvasWrapper"
      style={{ width: "100vw", height: "100vh", background: "white" }}
    />
  );
}

class Canvas {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  bundlesNumber: any;
  perBundleNumber: any;
  bundles: any;

  scale: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
    document.addEventListener("mousemove", (e) =>
      this.draw(e.clientX, e.clientY)
    );
    document.addEventListener("touchmove", (e) =>
      this.draw(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
    );
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.scale = 1;
    this.canvas.width = this.stageWidth * this.scale;
    this.canvas.height = this.stageHeight * this.scale;

    this.ctx.scale(this.scale, this.scale);
    this.bundlesNumber = 300;
    this.bundles = [];

    this.init();
  }

  init() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    for (let i = 0; i < this.bundlesNumber; i++) {
      this.bundles.push(
        new Bundle(
          this.stageWidth,
          this.stageHeight,
          getRandom(1, getRandom(10, getRandom(10, 80)))
        )
      );
    }
  }

  draw(mouseX: any, mouseY: any) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.bundles.map((bundle: any) => {
      bundle.draw(this.ctx, { x: mouseX, y: mouseY });
    });
  }

  capture() {
    console.log("handling..");
    let dataURL = this.canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "image.png";
    link.href = dataURL;

    link.click();
    console.log("downloaded..");
    link.remove();
  }
}

class Bundle {
  stageWidth: any;
  stageHeight: any;
  particles: any;
  particleNumber: any;

  bundleCenter: any;
  bundleMouseVector: any;

  opacity: any;
  opacitySpeed: any;
  time: any;

  color: any;

  constructor(stageWidth: any, stageHeight: any, particleNumber: any) {
    this.particles = [];
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.particleNumber = particleNumber;
    this.bundleCenter = {
      x: getRandom(0, stageWidth),
      y: getRandom(0, stageHeight),
    };
    this.bundleMouseVector = {
      x: getRandom(-30, 30),
      y: getRandom(-30, 30),
    };
    this.init();

    this.opacity = getRandom(0, 0.3);
    this.opacitySpeed = getRandom(0.01, getRandom(0.01, 0.05));
    this.time = 0;

    this.color =
      Math.random() < 0.5
        ? { r: 50, g: 100, b: 100 }
        : { r: 100, g: 50, b: 50 };
  }

  init() {
    for (let i = 0; i < this.particleNumber; i++) {
      this.particles.push(
        new Particle(
          {
            x: getRandom(0, this.stageWidth),
            y: getRandom(0, this.stageHeight),
          },
          {
            x: 1,
            y: 1,
          },
          getRandom(0, Math.PI * 2),
          this.bundleCenter,
          this.bundleMouseVector
        )
      );
    }
  }

  draw(ctx: any, pos: any) {
    this.time++;
    const opacity =
      Math.sin(this.time * this.opacitySpeed) * this.opacity + 0.01;
    this.particles.map((particle: any) => {
      particle.draw(ctx, opacity, pos, this.color);
    });
  }
}

class Particle {
  pos: any;
  endPos: any;
  size: any;
  rotation: any;
  color: any;

  bundleCenter: any;
  bundleMouseVector: any;

  vector: any;
  vectorSpeed: any;

  constructor(
    pos: any,
    size: any,
    rotation: any,
    bundleCenter: any,
    bundleMouseVector: any
  ) {
    this.pos = pos;
    this.endPos = { x: 0, y: 0 };
    this.size = size;
    this.rotation = rotation;
    this.bundleCenter = {
      x:
        bundleCenter.x +
        (Math.random() < 0.5 ? -1 : 1) * getRandom(0, getRandom(0, 2)),
      y:
        bundleCenter.y +
        (Math.random() < 0.5 ? -1 : 1) * getRandom(0, getRandom(0, 2)),
    };
    this.bundleMouseVector = bundleMouseVector;
    this.vector = {
      distance: getRandom(0, getRandom(0, getRandom(0, 1000))),
      theta: getRandom(0, Math.PI * 2),
    };
    this.vectorSpeed = {
      distance: getRandom(0, 100),
      theta: getRandom(-Math.PI * 0.005, Math.PI * 0.005),
    };
  }

  draw(ctx: any, opacity: any, pos: any, color: any) {
    this.pos.x =
      pos.x +
      this.vector.distance * Math.cos(this.vector.theta) +
      this.bundleMouseVector.x;
    this.pos.y =
      pos.y +
      this.vector.distance * Math.sin(this.vector.theta) +
      this.bundleMouseVector.y;
    this.endPos.x = pos.x - this.vector.distance * Math.cos(this.vector.theta);
    this.endPos.y = pos.y - this.vector.distance * Math.sin(this.vector.theta);

    this.vector.distance += 0;
    this.vector.theta += this.vectorSpeed.theta;

    ctx.strokeStyle = `rgba(${color.r}, ${color.g},${color.b}, ${opacity})`;
    ctx.strokeWidth = 0.1;
    ctx.beginPath();
    ctx.bezierCurveTo(
      this.bundleCenter.x,
      this.bundleCenter.y,
      this.endPos.x,
      this.endPos.y,
      this.pos.x,
      this.pos.y
    );
    ctx.stroke();
  }
}

export default Particles;
