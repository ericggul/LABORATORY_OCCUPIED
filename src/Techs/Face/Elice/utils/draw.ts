import { TRIANGULATION } from "./triangulation";
import {
  GREEN,
  LABEL_TO_COLOR,
  NUM_IRIS_KEYPOINTS,
  NUM_KEYPOINTS,
  RED,
} from "./params";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

const getRandom = (min: any, max: any) => Math.random() * (max - min) + min;

function distance(a: any, b: any) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

function drawPath(
  ctx: any,
  points: any,
  closePath: any,
  width: any,
  midpoint: any,
  left: any = true
) {
  function convertXRight(val: any) {
    return left
      ? width / 4 + (val - midpoint)
      : (3 * width) / 4 - (val - midpoint);
  }

  const region = new Path2D();
  region.moveTo(convertXRight(points[0][0]), points[0][1]);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(convertXRight(point[0]), point[1]);
  }

  if (closePath) {
    region.closePath();
  }

  ctx.stroke(region);
}

export function drawResults(
  ctx: any,
  faces: any,
  triangulateMesh: any,
  boundingBox: any,
  width: any,
  height: any
) {
  ctx.clearRect(0, 0, width, height);

  let box = faces[0].box;
  let midpoint = (box.xMin + box.xMax) / 2;

  function convertXLeft(val: any) {
    return width / 4 + (val - midpoint);
  }

  faces.forEach((face: any) => {
    const keypoints = face.keypoints.map((keypoint: any) => [
      keypoint.x,
      keypoint.y,
    ]);

    if (boundingBox) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;

      const box = face.box;
      drawPath(
        ctx,
        [
          [box.xMin, box.yMin],
          [box.xMax, box.yMin],
          [box.xMax, box.yMax],
          [box.xMin, box.yMax],
        ],
        true,
        width,
        midpoint
      );
    }

    if (triangulateMesh) {
      ctx.strokeStyle = `rgb(150, 255, 200)`;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < TRIANGULATION.length / 3; i++) {
        const points = [
          TRIANGULATION[i * 3],
          TRIANGULATION[i * 3 + 1],
          TRIANGULATION[i * 3 + 2],
        ].map((index) => keypoints[index]);

        drawPath(ctx, points, true, width, midpoint, false);
      }
    }

    if (keypoints.length > NUM_KEYPOINTS) {
      ctx.strokeStyle = RED;
      ctx.lineWidth = 1;

      const leftCenter = keypoints[NUM_KEYPOINTS];
      const leftDiameterY = distance(
        keypoints[NUM_KEYPOINTS + 4],
        keypoints[NUM_KEYPOINTS + 2]
      );
      const leftDiameterX = distance(
        keypoints[NUM_KEYPOINTS + 3],
        keypoints[NUM_KEYPOINTS + 1]
      );

      ctx.beginPath();
      ctx.ellipse(
        convertXLeft(leftCenter[0]),
        leftCenter[1],
        leftDiameterX / 2,
        leftDiameterY / 2,
        0,
        0,
        2 * Math.PI
      );
      ctx.stroke();

      if (keypoints.length > NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS) {
        const rightCenter = keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS];
        const rightDiameterY = distance(
          keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 2],
          keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 4]
        );
        const rightDiameterX = distance(
          keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 3],
          keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 1]
        );

        ctx.beginPath();
        ctx.ellipse(
          convertXLeft(rightCenter[0]),
          rightCenter[1],
          rightDiameterX / 2,
          rightDiameterY / 2,
          0,
          0,
          2 * Math.PI
        );
        ctx.stroke();
      }
    }

    const contours: any = faceLandmarksDetection.util.getKeypointIndexByContour(
      faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
    );

    for (const [label, contour] of Object.entries(contours) as any) {
      ctx.strokeStyle = "white";

      ctx.lineWidth = 3;
      const path = contour.map((index: any) => keypoints[index]);

      if (path.every((value: any) => value != undefined)) {
        drawPath(ctx, path, false, width, midpoint);
      }
    }
  });
}
