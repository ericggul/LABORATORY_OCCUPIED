export function shuffle(array: any) {
  let currentIdx = array.length;
  let randomIdx;
  let newArray = array;

  while (currentIdx > 0) {
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx--;

    [newArray[currentIdx], newArray[randomIdx]] = [
      array[randomIdx],
      array[currentIdx],
    ];
  }

  return array;
}

export function getRandomFromArray(array: any) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomFromArrayWithWeight(array: any, weight: any) {
  let cumulatedWeight = weight;

  if (weight.length > 1) {
    for (let i = 1; i < weight.length; i++) {
      cumulatedWeight[i] += cumulatedWeight[i - 1];
    }
  }

  const randomNumber = Math.random() * cumulatedWeight[weight.length - 1];
  let returnIdx = 0;

  for (let i = 0; i < weight.length; i++) {
    if (randomNumber < cumulatedWeight[i]) {
      returnIdx = i;
      break;
    }
  }

  return array[returnIdx];
}
