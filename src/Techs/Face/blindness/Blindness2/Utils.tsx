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
  contexts: any,
  size: any,
  cols: any
) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction: any) => {
      const keypoints = prediction.scaledMesh;

      for (var i = 0; i < keypoints.length; i++) {
        const selectedWord = TEXT_BUNDLE[i % TEXT_BUNDLE.length];

        let x = keypoints[i][0] / cols;
        let y = keypoints[i][1] / cols;

        x = (x - size.width / (2 * cols)) * 2 + size.width / (2 * cols);
        y = (y - size.height / (2 * cols)) * 2 + size.height / (2 * cols);

        contexts.forEach((ctx: any, i: number) => {
          ctx.save();
          ctx.fillStyle =
            i % 2 === 0 ? `rgba(255, 255, 255, .5)` : `rgba(0, 0, 0, .5)`;
          ctx.fillText(selectedWord, x, y);
          ctx.fill();
          ctx.restore();
        });
      }
    });
  }
};
