const TEXT_BUNDLE = [
  "Innovation",
  "Transformation",
  "Digital",
  "Revolution",
  "AI",
  "Experience",
  "Deep Learning",
  "Fast Forward",
];

export const drawMesh = (
  predictions: any,
  ctx1: any,
  ctx2: any,
  size: any,
  canvasSize: any
) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction: any) => {
      const keypoints = prediction.scaledMesh;

      for (var i = 0; i < keypoints.length; i++) {
        const selectedWord = TEXT_BUNDLE[i % TEXT_BUNDLE.length];

        let x = (keypoints[i][0] * canvasSize.width) / size.width;
        let y = (keypoints[i][1] * canvasSize.width) / size.width;

        x = (x - canvasSize.width / 2) * 2 + canvasSize.width / 2;
        y = (y - canvasSize.height / 2) * 2 + canvasSize.height / 2;

        ctx1.save();
        ctx1.fillStyle = `rgba(255, 255, 255, .5)`;
        ctx1.fillText(selectedWord, x, y);
        ctx1.fill();
        ctx1.restore();

        ctx2.save();
        ctx2.fillStyle = `rgba(0, 0, 0, .5)`;
        ctx2.fillText(selectedWord, x, y);
        ctx2.fill();
        ctx2.restore();
      }
    });
  }
};
