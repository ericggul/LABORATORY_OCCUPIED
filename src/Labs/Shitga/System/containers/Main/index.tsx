import TelevisionSector from "../TelevisionSector";
import PriceSector from "../PriceSector";
import TimeSeriesSector from "../TimeSeriesSector";
import DataSector from "../DataSector";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  const [sectorState, setSectorState] = useState("data");

  useEffect(() => {
    const timer = setInterval(() => {
      let now = new Date();
      let min = now.getMinutes();
      let sec = now.getSeconds();

      if (min % 5 === 0 && sec === 0) {
        navigate("/television-display");
        return;
      } else if (sec === 0) {
        setSectorState("data");
      } else if (sec === 31) {
        setSectorState("price");
      } else if (sec === 39) {
        setSectorState("time-series");
      } else if (sec === 52) {
        setSectorState("television");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {sectorState === "data" ? (
        <DataSector />
      ) : sectorState === "price" ? (
        <PriceSector />
      ) : sectorState === "time-series" ? (
        <TimeSeriesSector />
      ) : (
        <TelevisionSector />
      )}
    </>
  );
}
