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
      {new Array(20).fill(0).map((e, i) => (
        <StatGroup>
          {new Array(15).fill(0).map((e, i) => (
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>{getWeightedParsedIntRandom()}</StatNumber>
              <StatHelpText>
                <StatArrow
                  type={Math.random() < 0.4 ? "increase" : "decrease"}
                />
                23.36%
              </StatHelpText>
            </Stat>
          ))}
        </StatGroup>
      ))}
    </S.Container>
  );
}
