export const numberParse = (input: number) => {
  let output = "";
  if (input < Math.pow(10, 3)) {
    output = input.toString();
  } else {
    let leftOff = input % 1000;
    let leftOffString = leftOff.toString();
    if (leftOff < 10) {
      leftOffString = "00" + leftOff.toString();
    } else if (leftOff < 100) {
      leftOffString = "0" + leftOff.toString();
    }

    const top = (input - leftOff) / 1000;
    output = numberParse(top) + "," + leftOffString;
  }

  return output;
};
