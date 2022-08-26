import { useEffect, useRef } from "react";
import QRCode from "qrcodejs";
import * as S from "./styles";

export default function QRCodeComponent() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      var qrcode = new QRCode(ref.current, {
        text: "http://jindo.dev.naver.com/collie",
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });

      return () => qrcode.clear();
    }
  }, [ref]);

  return <S.Container ref={ref}></S.Container>;
}
