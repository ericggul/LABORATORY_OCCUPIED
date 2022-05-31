import style from "./style.module.scss";
import { useEffect } from "react";
import TestImg from "../../../assets/test1.jpeg";
import TestImg2 from "../../../assets/test2.png";
import TestImg3 from "../../../assets/test3.jpeg";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

export default function Display({ url }: any) {
  useEffect(() => {
    const render = new App(url ? url : TestImg3);
    return () => {
      render.destroy();
    };
  }, [url]);
  return <div id="wrapper" className={style.wrapper} />;
}

class App {
  image: any;

  canvas: any;
  tmpCanvas: any;
  wrapper: any;
  ctx: any;
  tmpCtx: any;

  pixelRatio: number;

  stageWidth: any;
  stageHeight: any;

  //pixel
  pixelSize: any;
  radius: any;

  //image
  isLoaded: boolean;
  imgPos: any;
  imgData: any;

  //Dots
  dots: any;
  cols: any;
  rows: any;

  //animation
  animationRequest: any;

  //time
  now: any;
  then: any;
  delta: any;
  interval: any;
  elapsedTime: any;

  constructor(image: any) {
    this.canvas = document.createElement("canvas");
    this.wrapper = document.getElementById("wrapper");
    this.wrapper.appendChild(this.canvas);

    this.tmpCanvas = document.createElement("canvas");
    this.tmpCanvas.setAttribute("style", "opacity: 0");
    this.wrapper.appendChild(this.tmpCanvas);

    this.ctx = this.canvas.getContext("2d");
    this.tmpCtx = this.tmpCanvas.getContext("2d");

    this.pixelRatio = 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.isLoaded = false;
    this.image = new Image();
    this.image.crossOrigin = "Anonymous";
    this.image.src = image;

    this.image.onload = () => {
      this.isLoaded = true;
      this.drawImage();
    };
  }

  destroy() {
    cancelAnimationFrame(this.animationRequest);
    this.canvas.remove();
    this.tmpCanvas.remove();
    this.imgData = null;
    this.isLoaded = false;
  }

  resize() {
    this.dots = [];

    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.tmpCanvas.width = this.stageWidth;
    this.tmpCanvas.height = this.stageHeight;

    this.pixelSize = 24;
    this.radius = 10;
    if (this.isLoaded) {
      this.drawImage();
    }
  }

  drawImage() {
    const stageRatio = this.stageWidth / this.stageHeight;
    const imgRatio = this.image.width / this.image.height;

    this.imgPos = {
      x: 0,
      y: 0,
      width: this.stageWidth,
      height: this.stageHeight,
    };

    //image size adjust
    if (imgRatio < stageRatio) {
      this.imgPos.width = Math.round(
        this.image.width * (this.stageHeight / this.image.height)
      );
      this.imgPos.x = Math.round((this.stageWidth - this.imgPos.width) / 2);
      this.imgPos.y = 0;
    } else {
      this.imgPos.height = Math.round(
        this.image.height * (this.stageWidth / this.image.width)
      );
      this.imgPos.y = Math.round((this.stageHeight - this.imgPos.height) / 2);
      this.imgPos.x = 0;
    }

    //draw image
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.imgPos.x,
      this.imgPos.y,
      this.imgPos.width,
      this.imgPos.height
    );

    this.tmpCtx.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.imgPos.x,
      this.imgPos.y,
      this.imgPos.width,
      this.imgPos.height
    );

    //get img data
    this.imgData = this.tmpCtx?.getImageData(
      0,
      0,
      this.stageWidth,
      this.stageHeight
    );

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    this.drawDots();
  }

  drawDots() {
    this.dots = [];
    this.cols = Math.ceil(this.imgPos.width / this.pixelSize);
    this.rows = Math.ceil(this.imgPos.height / this.pixelSize);

    for (let i = 0; i < this.rows; i++) {
      const y = (i + 0.5) * this.pixelSize;
      const pixelY =
        Math.max(Math.min(y, this.imgPos.height), 0) + this.imgPos.y;
      for (let j = 0; j < this.cols; j++) {
        const x = (j + 0.5) * this.pixelSize;
        const pixelX =
          Math.max(Math.min(x, this.imgPos.width), 0) + this.imgPos.x;

        //retrive data
        const pixelIndex = (pixelX + pixelY * this.stageWidth) * 4;

        const red = this.imgData.data[pixelIndex + 0];
        const green = this.imgData.data[pixelIndex + 1];
        const blue = this.imgData.data[pixelIndex + 2];

        //create dot: to do
        const dot = new Dot(
          { x: x + this.imgPos.x, y: y + this.imgPos.y },
          this.radius,
          this.pixelSize,
          { red, green, blue }
        );
        this.dots.push(dot);
      }
    }

    this.startAnimate();
  }

  startAnimate() {
    this.now = Date.now();
    this.then = Date.now();
    this.interval = 5;
    this.delta = 0;
    this.elapsedTime = 0;

    setTimeout(() => {
      this.animate();
    }, 1000);
  }

  animate() {
    //time setting
    this.now = Date.now();
    this.delta = this.now - this.then;

    if (this.delta > this.interval) {
      this.then = Date.now();
      this.elapsedTime++;

      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

      this.dots.forEach((dot: any) => {
        dot.animate(this.ctx, this.elapsedTime);
      });

      if (this.elapsedTime === 3700) {
        this.finished();
      }
    }

    this.animationRequest = requestAnimationFrame(this.animate.bind(this));
  }

  finished() {
    this.destroy();
    window.location.href =
      "https://laboratory-occupied.com/television-display-finished";
  }
}

class Dot {
  pos: any;
  originalRadius: any;

  radius: any;
  radiusTarget: any;
  radiusSpeed: any;
  radiusDelta: any;

  finalRadiusDisminishingSpeed: any;

  pixelSize: any;
  rgb: any;

  //rotate
  rotation: any;
  rotationSpeed: any;

  //radial corner
  cornerRadius: any;
  cornerRadiusTarget: any;

  cornerSpeed: any;
  cornerDelta: any;

  //color
  colorSpeed: any;
  colorDelta: any;

  blank: boolean;

  opacity: any;

  constructor(pos: any, radius: any, pixelSize: any, rgb: any) {
    this.pos = pos;

    this.originalRadius = radius;
    this.radiusSpeed = getRandom(0.05, 0.15);
    this.radiusDelta = getRandom(0, 100);
    this.radius = this.originalRadius;
    this.radiusTarget =
      this.originalRadius * (Math.sin(this.radiusDelta) * 0.3 + 0.7);

    this.rotation = 0;
    this.rotationSpeed = getRandom(0.1, 0.15);

    this.cornerRadius = 0;
    this.cornerRadiusTarget = getRandom(0, this.originalRadius);
    this.cornerSpeed = getRandom(-0.01, 0.01);
    this.cornerDelta = getRandom(0, 100);

    this.colorSpeed = (Math.PI * 2) / 50;
    this.colorDelta = getRandom(0, 100);

    this.pixelSize = pixelSize;
    this.rgb = rgb;
    this.blank = false;

    this.opacity = 0;
    this.finalRadiusDisminishingSpeed = 0.1;
  }

  animate(ctx: any, time: any) {
    if (time >= 0 && time < 50) {
      this.opacity += 0.02;
    }
    const t = time - 100;

    let CYCLE = 100;

    if (t > 0 && t < CYCLE * 16) {
      //size radius adjust
      const radiusCycle = t % CYCLE;

      if (t < CYCLE * 12) {
        if (radiusCycle >= 0 && radiusCycle < 50) {
          this.radius -= (this.originalRadius - this.radiusTarget) * 0.02;
        } else if (radiusCycle >= 60 && radiusCycle < 80) {
          this.radius += (this.originalRadius - this.radiusTarget) * 0.05;
        }
      } else if (t < CYCLE * 16) {
        if (radiusCycle >= 0 && radiusCycle < 50) {
          this.radius -= (this.originalRadius * 1.5 - this.radiusTarget) * 0.02;
        } else if (radiusCycle >= 60 && radiusCycle < 80) {
          this.radius += (this.originalRadius * 1.5 - this.radiusTarget) * 0.05;
        }
      }

      //corner radius adjust
      if (t > CYCLE * 4) {
        if (t < CYCLE * 4.5) {
          if (radiusCycle >= 0 && radiusCycle < 50) {
            this.cornerRadius -= this.cornerRadiusTarget * 0.02;
          } else if (radiusCycle >= 60 && radiusCycle < 80) {
            this.cornerRadius += this.cornerRadiusTarget * 0.05;
          }
        }
        //blank adjust
        if (Math.random() < 0.001) {
          this.blank = !this.blank;
        }

        //rotaion adjust
        if (t > CYCLE * 8) {
          this.rotation += this.rotationSpeed;
          if (t % CYCLE === 0) {
            if ((t / CYCLE) % 2 === 0) {
              this.rotationSpeed = getRandom(0.1, 0.2);
            } else {
              this.rotationSpeed = getRandom(-0.05, 0.05);
            }
          }
        }

        //color adjust
        if (t > CYCLE * 10 && t % CYCLE === CYCLE / 2) {
          this.rgb.red = 255 - this.rgb.red;
        }
      }
    } else if (t === CYCLE * 16) {
      this.radiusTarget = this.originalRadius * getRandom(0, 1.5);
    } else if (t > CYCLE * 16 && t < CYCLE * 24) {
      const SEMI_CYCLE = CYCLE / 2;
      const localT = t - CYCLE * 16;
      const radiusCycle = localT % SEMI_CYCLE;

      //radius
      if (radiusCycle >= 0 && radiusCycle < 25) {
        this.radius -= (this.originalRadius * 1.5 - this.radiusTarget) * 0.04;
      } else if (radiusCycle >= 30 && radiusCycle < 40) {
        this.radius += (this.originalRadius * 1.5 - this.radiusTarget) * 0.1;
      }

      if (localT > SEMI_CYCLE * 4) {
        //corner radius
        this.cornerRadius +=
          Math.sin(localT * this.cornerSpeed + this.cornerDelta) * 0.05;

        //color
        this.rgb.red +=
          Math.cos(localT * this.colorSpeed + this.colorDelta) * 1;
        this.rgb.blue -=
          Math.cos(localT * this.colorSpeed + this.colorDelta) * 1;
        this.rgb.red = Math.min(Math.max(this.rgb.red, 0), 255);
        this.rgb.blue = Math.min(Math.max(this.rgb.blue, 0), 255);
      }
      if (localT > SEMI_CYCLE * 8) {
        //blank adjust
        if (Math.random() < radiusCycle * 0.0001) {
          this.blank = !this.blank;
        }
      }
      if (localT > SEMI_CYCLE * 8) {
        this.rotation += this.rotationSpeed;
      }
      if (localT === SEMI_CYCLE * 12) {
        this.rotationSpeed =
          getRandom(0.1, 0.2) * (Math.random() < 0.5 ? -1 : 1);
      }
    } else if (t === CYCLE * 24) {
      this.radiusTarget = this.originalRadius * getRandom(0, 2);
    } else if (t > CYCLE * 24 && t < CYCLE * 28) {
      const QUARTER_CYCLE = CYCLE / 4;
      const localT = t - CYCLE * 24;
      const radiusCycle = localT % QUARTER_CYCLE;

      //radius
      if (radiusCycle >= 0 && radiusCycle < 12) {
        this.radius -= (this.originalRadius - this.radiusTarget) / 12;
      } else if (radiusCycle >= 15 && radiusCycle < 20) {
        this.radius += (this.originalRadius - this.radiusTarget) * 0.2;
      }

      if (localT % QUARTER_CYCLE === 0) {
        this.rotationSpeed =
          getRandom(0.1, 0.2) * ((localT / QUARTER_CYCLE) % 2 === 0 ? -1 : 1);
      }
      if (localT > QUARTER_CYCLE * 8) {
        this.rotation += this.rotationSpeed;
      }
    } else if (t === CYCLE * 28) {
      this.radiusTarget = this.originalRadius * getRandom(0, 0.5);
    } else if (t > CYCLE * 28 && t < CYCLE * 30) {
      const OCTO_CYCLE = 10;
      const localT = t - CYCLE * 28;
      const radiusCycle = localT % OCTO_CYCLE;

      //radius
      if (radiusCycle >= 0 && radiusCycle < 6) {
        this.radius -= (this.originalRadius - this.radiusTarget) / 6;
      } else if (radiusCycle >= 7 && radiusCycle < 10) {
        this.radius += (this.originalRadius - this.radiusTarget) / 3;
      }
    } else if (t >= CYCLE * 30 && t < CYCLE * 31) {
      const SHORT_CYCLE = 5;
      const localT = t - CYCLE * 30;
      const radiusCycle = localT % SHORT_CYCLE;
      //radius
      if (radiusCycle >= 0 && radiusCycle < 2) {
        this.radius -= (this.originalRadius - this.radiusTarget) / 2;
      } else if (radiusCycle >= 3 && radiusCycle < 4) {
        this.radius += this.originalRadius - this.radiusTarget;
      }
    } else if (t >= CYCLE * 31 && t < CYCLE * 35) {
      this.finalRadiusDisminishingSpeed -= 0.01;
      this.radius += this.finalRadiusDisminishingSpeed;
      this.cornerRadius -= 0.25;
      this.cornerRadius = Math.max(this.cornerRadius, 0);
      this.radius = Math.max(this.radius, 0);
    }

    if (t < CYCLE * 35) {
      ctx.fillStyle = `rgba(${this.rgb.red}, ${this.rgb.green}, ${this.rgb.blue}, ${this.opacity})`;
      this.blank ? this.drawBlank(ctx) : this.drawRounded(ctx);
    }

    //color adjust
    this.rgb.red += Math.sin(time * 0.01) * 0.1;
  }

  drawRounded(ctx: any) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rotation);
    ctx.moveTo(-this.radius, -this.radius + this.cornerRadius);
    ctx.quadraticCurveTo(
      -this.radius,
      -this.radius,
      -this.radius + this.cornerRadius,
      -this.radius
    );
    ctx.lineTo(this.radius - this.cornerRadius, -this.radius);
    ctx.quadraticCurveTo(
      this.radius,
      -this.radius,
      +this.radius,
      -this.radius + this.cornerRadius
    );
    ctx.lineTo(this.radius, this.radius - this.cornerRadius);
    ctx.quadraticCurveTo(
      this.radius,
      this.radius,
      this.radius - this.cornerRadius,
      this.radius
    );
    ctx.lineTo(-this.radius + this.cornerRadius, this.radius);
    ctx.quadraticCurveTo(
      -this.radius,
      this.radius,
      -this.radius,
      this.radius - this.cornerRadius
    );
    ctx.lineTo(-this.radius, -this.radius + this.cornerRadius);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawBlank(ctx: any) {
    ctx.beginPath();
    ctx.moveTo(
      this.pos.x - this.radius,
      this.pos.y - this.radius + this.cornerRadius
    );
    ctx.quadraticCurveTo(
      this.pos.x - this.radius,
      this.pos.y - this.radius,
      this.pos.x - this.radius + this.cornerRadius,
      this.pos.y - this.radius
    );
    ctx.moveTo(
      this.pos.x + this.radius - this.cornerRadius,
      this.pos.y - this.radius
    );
    ctx.quadraticCurveTo(
      this.pos.x + this.radius,
      this.pos.y - this.radius,
      this.pos.x + this.radius,
      this.pos.y - this.radius + this.cornerRadius
    );
    ctx.moveTo(
      this.pos.x + this.radius,
      this.pos.y + this.radius - this.cornerRadius
    );
    ctx.quadraticCurveTo(
      this.pos.x + this.radius,
      this.pos.y + this.radius,
      this.pos.x + this.radius - this.cornerRadius,
      this.pos.y + this.radius
    );
    ctx.moveTo(
      this.pos.x - this.radius + this.cornerRadius,
      this.pos.y + this.radius
    );
    ctx.quadraticCurveTo(
      this.pos.x - this.radius,
      this.pos.y + this.radius,
      this.pos.x - this.radius,
      this.pos.y + this.radius - this.cornerRadius
    );
    ctx.moveTo(
      this.pos.x - this.radius,
      this.pos.y - this.radius + this.cornerRadius
    );
    ctx.closePath();
    ctx.fill();
  }
}
