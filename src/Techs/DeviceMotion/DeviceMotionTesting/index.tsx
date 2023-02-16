import React, { useEffect, useState } from "react";
import * as S from "./styles";
import useDeviceMotion from "../hooks/useDeviceMotion";

const HelperBar = ({ value }: any) => {
  return (
    <S.HelperBarContainer>
      <S.HelperBar>
        <S.HelperTicker value={value} extreme={100}></S.HelperTicker>
      </S.HelperBar>
      <S.HelperValue>{value}</S.HelperValue>
    </S.HelperBarContainer>
  );
};

export default function DeviceMotion() {
  const [deviceMotionRequest, setDeviceMotionRequest] = useState(false);
  const { permission, acc } = useDeviceMotion(deviceMotionRequest);

  return (
    <S.Container onClick={() => setDeviceMotionRequest(true)}>
      <S.Button onClick={() => setDeviceMotionRequest(true)}>
        We need your permission
      </S.Button>
      {deviceMotionRequest ? "yes" : "no"}
      {Object.entries(acc).map(([key, value], idx) => (
        <>
          <div>{key}</div>
          <HelperBar value={Math.floor(value * 100) / 100} />
        </>
      ))}
    </S.Container>
  );
}
