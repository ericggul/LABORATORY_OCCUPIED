import { lerp, random } from "./utils";

export interface SnowflakeProps {
  color: string;
  radius: [minimumRadius: number, maximumRadius: number];
  speed: [minimumSpeed: number, maximumSpeed: number];
  wind: [minimumWind: number, maximumWind: number];
  changeFrequency: number;
}

export type SnowflakeConfig = Partial<SnowflakeProps>;

export const defaultConfig: SnowflakeProps = {
  color: "#dee4fd",
  radius: [0.5, 3.0],
  speed: [1.0, 3.0],
  wind: [-0.5, 2.0],
  changeFrequency: 200,
};

interface SnowflakeParams {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
  nextSpeed: number;
  nextWind: number;
}

class Snowflake {
  public config: SnowflakeConfig;
  private params: SnowflakeParams;
  private framesSinceLastUpdate: number;

  public constructor(canvas: HTMLCanvasElement, config: SnowflakeConfig = {}) {
    this.config = config;

    this.params = {
      x: random(0, canvas.offsetWidth),
      y: random(-canvas.offsetHeight, 0),
      radius: random(...this.fullConfig.radius),
      speed: random(...this.fullConfig.speed),
      wind: random(...this.fullConfig.wind),

      nextSpeed: random(...this.fullConfig.wind),
      nextWind: random(...this.fullConfig.speed),
    };

    this.framesSinceLastUpdate = 0;
    this.settleMouse(canvas);
  }

  private get fullConfig() {
    return {
      ...defaultConfig,
      ...this.config,
    };
  }

  private settleMouse = (canvas: HTMLCanvasElement) => {
    window.addEventListener("mousemove", (e) => {
      this.fullConfig.wind = [
        (5 * e.offsetX) / canvas.offsetWidth - 2,
        (5 * e.offsetX) / canvas.offsetWidth + 0.5,
      ];
      this.fullConfig.speed = [
        (2 * e.offsetY) / canvas.offsetHeight - 1,
        (2 * e.offsetY) / canvas.offsetHeight + 1,
      ];
      console.log(
        e.offsetX / canvas.offsetWidth,
        e.offsetY / canvas.offsetHeight
      );
    });
  };

  public draw = (
    canvas: HTMLCanvasElement,
    inputCtx?: CanvasRenderingContext2D
  ) => {
    const ctx = inputCtx || canvas.getContext("2d");

    if (ctx) {
      ctx.beginPath();
      ctx.arc(this.params.x, this.params.y, this.params.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.fullConfig.color;
      ctx.closePath();
      ctx.fill();
    }
  };

  private translate = (canvas: HTMLCanvasElement, framesPassed: number = 1) => {
    const { x, y, wind, speed, nextWind, nextSpeed } = this.params;

    this.params.x = (x + wind * framesPassed) % canvas.offsetWidth;
    this.params.y = (y + speed * framesPassed) % canvas.offsetHeight;

    this.params.speed = lerp(speed, nextSpeed, 0.01);
    this.params.wind = lerp(wind, nextWind, 0.01);

    if (this.framesSinceLastUpdate++ > this.fullConfig.changeFrequency) {
      this.updateTargetParams();
      this.framesSinceLastUpdate = 0;
    }
  };

  private updateTargetParams = () => {
    this.params.nextSpeed = random(...this.fullConfig.speed);
    this.params.nextWind = random(...this.fullConfig.wind);
  };

  public update = (canvas: HTMLCanvasElement, framesPassed?: number) => {
    this.translate(canvas, framesPassed);
  };
}

export default Snowflake;
