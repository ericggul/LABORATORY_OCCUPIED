export const fibonacci = (a: number) => {
  let curr = 1;
  let prev = 0;
  let prev2 = 0;
  for (let i = 0; i < a; i++) {
    prev2 = curr;
    curr = curr + prev;
    prev = prev2;
  }
  return curr;
};
