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

export const drawMesh = (predictions: any, ctx: any, size: any) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction: any) => {
      const keypoints = prediction.scaledMesh;
      console.log(keypoints);

      for (var i = 0; i < keypoints.length; i++) {
        const selectedWord = TEXT_BUNDLE[i % TEXT_BUNDLE.length];

        let x = keypoints[i][0];
        let y = keypoints[i][1];
        let z = keypoints[i][2];

        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, .5)`;
        ctx.fillText(selectedWord, x, y);
        ctx.fill();
        ctx.restore();
      }
    });
  }
};
