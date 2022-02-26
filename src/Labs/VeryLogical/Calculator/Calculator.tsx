import style from "./Calculator.module.scss";
import { useState, useCallback } from "react";

interface Props {
  i: number;
}

function Calculator() {
  const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
  const [input, setInput] = useState<any>(0);
  const [inputStack, setInputStack] = useState(0);
  const [savedCalcCommand, setSavedCalcCommand] = useState("");
  const [currentDisplay, setCurrentDisplay] = useState("0");
  const [resetDisplay, setResetDisplay] = useState(false);
  const [answer, setAnswer] = useState();

  const addString = useCallback(
    (string) => {
      if (resetDisplay) {
        setResetDisplay(false);
        if (string === ".") {
          setCurrentDisplay("0.");
          return;
        } else {
          setCurrentDisplay(string);
          return;
        }
      } else if (currentDisplay === "0" && string !== ".") {
        setCurrentDisplay(string);
        return;
      }
      setCurrentDisplay((disp) => disp + string);
    },
    [currentDisplay, resetDisplay]
  );

  const calculate = useCallback(() => {
    const floatDisplay = parseFloat(currentDisplay);
    console.log(input, floatDisplay);
    if (savedCalcCommand === "+") {
      return input + floatDisplay;
    } else if (savedCalcCommand === "-") {
      return input - floatDisplay;
    } else if (savedCalcCommand === "/") {
      return input / floatDisplay;
    } else if (savedCalcCommand === "X") {
      return input * floatDisplay;
    } else if (savedCalcCommand === "mod") {
      return input % floatDisplay;
    } else if (!savedCalcCommand) {
      return floatDisplay;
    }
  }, [currentDisplay, input, savedCalcCommand]);

  const handleCalcClick = useCallback(
    (calc) => {
      setInputStack((st) => st + 1);
      const result = calculate();
      console.log("handle", result);
      setInput(result);
      setSavedCalcCommand(calc);
      setResetDisplay(true);
    },
    [inputStack, currentDisplay, savedCalcCommand, resetDisplay]
  );

  console.log(resetDisplay);

  const execute = useCallback(() => {
    const result = calculate();
    console.log(result);
    let displayResult = 0;
    if (Number.isInteger(result)) {
      displayResult = Math.round((result * getRandom(0.01, 10)) % 100000);
    } else {
      displayResult = Math.round(result * getRandom(0.01, 10) * 100) / 100;
    }
    setInput(displayResult);
    setAnswer(result);
    setCurrentDisplay(displayResult.toString());
    setResetDisplay(true);
  }, [currentDisplay]);

  const reset = useCallback(() => {
    setCurrentDisplay("0");
    setInput(0);
    setSavedCalcCommand("");
  }, [currentDisplay, input]);

  return (
    <div className={style.container}>
      <div className={style.result}>{currentDisplay}</div>
      <div className={style.calculator}>
        <div className={style.square} onClick={reset}>
          C
        </div>
        {/* <div className={style.square} onClick={() => calculate('root')}>&#8730;</div> */}
        <div className={style.square} />
        <div className={style.square} onClick={() => handleCalcClick("mod")}>
          %
        </div>
        <div className={style.square} onClick={() => handleCalcClick("/")}>
          &#247;
        </div>

        <div className={style.square} onClick={() => addString("7")}>
          7
        </div>
        <div className={style.square} onClick={() => addString("8")}>
          8
        </div>
        <div className={style.square} onClick={() => addString("9")}>
          9
        </div>
        <div className={style.square} onClick={() => handleCalcClick("X")}>
          &#215;
        </div>

        <div className={style.square} onClick={() => addString("4")}>
          4
        </div>
        <div className={style.square} onClick={() => addString("5")}>
          5
        </div>
        <div className={style.square} onClick={() => addString("6")}>
          6
        </div>
        <div className={style.square} onClick={() => handleCalcClick("-")}>
          -
        </div>

        <div className={style.square} onClick={() => addString("1")}>
          1
        </div>
        <div className={style.square} onClick={() => addString("2")}>
          2
        </div>
        <div className={style.square} onClick={() => addString("3")}>
          3
        </div>
        <div className={style.square} onClick={() => handleCalcClick("+")}>
          +
        </div>

        <div className={style.square} />
        <div className={style.square} onClick={() => addString("0")}>
          0
        </div>
        <div className={style.square} onClick={() => addString(".")}>
          .
        </div>
        <div className={style.square} onClick={execute}>
          =
        </div>
      </div>
    </div>
  );
}

export default Calculator;
