import React, { useEffect, useState } from "react";
import * as S from "./styles";

export default function DeviceMotion() {
  const [permission, setPermission] = useState(false);
  const [acc, setAcc] = useState({
    x: 0,
    y: 0,
    rotation: 0,
    frontToBack: 0,
    leftToRight: 0,
  });

  function motionDetector(e: any) {
    setAcc({
      x: e.acceleration.x,
      y: e.acceleration.y,
      rotation: e.rotationRate.alpha,
      frontToBack: e.rotationRate.beta,
      leftToRight: e.rotationRate.gamma,
    });
  }

  function permissionGrant() {
    (DeviceMotionEvent as any)
      .requestPermission()
      .then((res: any) => {
        alert(res);
        if (res === "granted") {
          setPermission(true);
          alert("true");
        }
      })
      .catch((err: any) => console.log(err));
  }

  useEffect(() => {
    if (permission) {
      window.addEventListener("devicemotion", motionDetector);

      return () => {
        window.removeEventListener("devicemotion", motionDetector);
      };
    }
  }, [permission]);

  return (
    <S.Container>
      <S.Button onClick={permissionGrant}>We need your permission</S.Button>
      {Object.entries(acc).map(([key, value], idx) => (
        <div>
          {key}
          {value.toFixed(2)}
        </div>
      ))}
      {Object.entries(orientation).map(([key, value], idx) => (
        <div>
          {key}
          {value.toFixed(2)}
        </div>
      ))}
    </S.Container>
  );
}
