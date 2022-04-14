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
      style={{ width: "100vw", height: "100vh", background: "black" }}
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
    this.perBundleNumber = 30;
    this.bundles = [];

    this.init();
  }

  init() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    for (let i = 0; i < this.bundlesNumber; i++) {
      this.bundles.push(
        new Bundle(this.stageWidth, this.stageHeight, this.perBundleNumber)
      );
    }
  }

  draw(mouseX: any, mouseY: any) {
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
  constructor(stageWidth: any, stageHeight: any, particleNumber: any) {
    this.particles = [];
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.particleNumber = particleNumber;

    this.init();
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
            x: getRandom(0.1, 0.4),
            y: getRandom(0.1, 0.4),
          },
          getRandom(0, Math.PI * 2)
        )
      );
    }
  }

  draw(ctx: any, pos: any) {
    const opacity = getRandom(0.3, 0.5);
    this.particles.map((particle: any) => {
      particle.draw(ctx, opacity, pos);
    });
  }
}

class Particle {
  pos: any;
  size: any;
  rotation: any;
  color: any;

  movementSpeed: any;
  movementAcc: any;

  constructor(pos: any, size: any, rotation: any) {
    this.pos = pos;
    this.size = size;
    this.rotation = rotation;
    this.movementSpeed = {
      x: getRandom(getRandom(-0.2, 0), getRandom(0, 0.2)),
      y: getRandom(-0.1, 0.1),
    };
    this.movementAcc = {
      x: getRandom(-0.0005, 0.0005),
      y: getRandom(-0.001, 0.0015),
    };
    this.color = {
      r: getRandom(200, 250),
      g: getRandom(0, 250),
      b: getRandom(40, 250),
    };
  }

  draw(ctx: any, opacity: any, pos: any) {
    const currentPos = this.pos;
    let randomness =
      Math.random() < 0.01 ? getRandom(-100, -70) : getRandom(0.8, 1.2);
    this.pos.x += ((pos.x - currentPos.x) / 100) * randomness;

    this.pos.y += ((pos.y - currentPos.y) / 100) * randomness;

    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g},${this.color.b}, ${opacity})`;

    ctx.translate(this.pos.x, this.pos.y);

    ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);

    ctx.translate(-this.pos.x, -this.pos.y);
  }
}

export default Particles;
