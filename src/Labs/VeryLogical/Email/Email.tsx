import style from "./Email.module.scss";
import { useState, useCallback, useEffect } from "react";
import emailjs from "emailjs-com";

interface Props {
  i: number;
}

const TEXT = `
당신은 문제의 의미를 '잘못' 파악했습니다.

퀴즈의 우승자에게 갈 상금 일백만원은 다른 우승자에게 주어집니다.

당신의 멍청함에 풍요로움이 깃들기를 기원하며

`;

const textParser = (text: string, repeat: number) => {
  var output = text;

  for (let i = 0; i < repeat; i++) {
    console.log(output);

    const parse = Math.floor(Math.random() * output.length);

    const output2 =
      output.substring(parse, output.length) + output.substring(0, parse);
    output = output2;
  }
  console.log(output);
};

function Email() {
  textParser(TEXT, 500);

  useEffect(() => {
    var templateParams = {
      to_email: "skyp0714@gmail.com",
      message: TEXT,
    };

    emailjs
      .send(
        "service_2v0tsti",
        "template_77f67xk",
        templateParams,
        "user_5bBJJFLmLNe5Vvk1DKln2"
      )
      .then((result) => {
        console.log(result.text);
      });
  }, []);

  return <div className={style.container}></div>;
}

export default Email;
