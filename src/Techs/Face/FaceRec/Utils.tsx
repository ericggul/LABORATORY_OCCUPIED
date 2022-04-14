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
  ctx: any,
  width: number,
  height: number,
  time: number
) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction: any) => {
      const keypoints = prediction.scaledMesh;

      for (var i = 0; i < keypoints.length; i++) {
        // const selectedWord =
        //   TEXT_BUNDLE[Math.floor(Math.random() * TEXT_BUNDLE.length)];
        const selectedWord = TEXT_BUNDLE[i % TEXT_BUNDLE.length];

        ctx.save();

        ctx.rotate = (time * Math.PI) / 1000;
        ctx.fillStyle = `rgba(255, 255, 255, .5)`;
        ctx.fillText(selectedWord, keypoints[i][0], keypoints[i][1]);

        ctx.fill();

        ctx.restore();
      }
    });
  }
};

const animateCanvas = (ctx: any, x: any, y: any, word: any) => {
  let now = Date.now();
  let start = Date.now();
  let then = Date.now();

  let animationRequest: any;
  // draw();
  // function draw() {
  //   now = Date.now();
  //   let delta = now - then;
  //   if (delta > 5) {
  //     then = now;
  //     ctx.fillText(word, x, y);
  //     ctx.fillStyle = `rgba(255, 255, 255, .1)`;
  //   }
  //   animationRequest = window.requestAnimationFrame(draw);
  // }
  // function cancel() {
  //   window.cancelAnimationFrame(animationRequest);
  // }

  // setTimeout(() => {
  //   cancel();
  // }, 500);
};
