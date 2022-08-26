import * as S from "./styles";

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import { numberParse } from "./numberParse";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getParsedIntRandom = (a: number, b: number) =>
  numberParse(Math.floor(getRandom(a, b)));
const getWeightedParsedIntRandom = () =>
  numberParse(Math.floor(10 ** getRandom(2, 6)));

export default function ChakraUI() {
  return (
    <S.Container>
      {new Array(200).fill(0).map((e, i) => (
        <S.Row>
          {new Array(400).fill(0).map((e, i) => (
            <Stat>
              <StatArrow type={Math.random() < 0.4 ? "increase" : "decrease"} />
            </Stat>
          ))}
        </S.Row>
      ))}
    </S.Container>
  );
}
