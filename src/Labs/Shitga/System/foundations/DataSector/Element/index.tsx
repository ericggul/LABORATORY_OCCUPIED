import { useMemo } from "react";
import style from "./style.module.scss";
import { numberParse } from "../../../utils/numberParse";

export default function Element({ data }: any) {
  const traingleUp = useMemo(() => data.currentPrice > data.prevPrice, [data]);
  return (
    <div className={style.element}>
      <div className={style.upperRow}>
        <div className={style.header}>{data.header}</div>
        <div
          className={style.mover}
          style={{ color: traingleUp ? "#3affd0" : "#ff3a3a" }}
        >
          <div className={style.triangle}>
            {traingleUp ? (
              <div className={style.triangleUp} />
            ) : (
              <div className={style.triangleDown} />
            )}
          </div>

          <div className={style.moverNumbers}>
            <div className={style.absolute}>
              {numberParse(data.currentPrice - data.prevPrice)}
            </div>
            <div className={style.relative}>{`${(
              ((data.currentPrice - data.prevPrice) / data.prevPrice) *
              100
            ).toFixed(1)}%`}</div>
          </div>
        </div>
      </div>
      <div className={style.lowerRow}>
        <div
          className={style.price}
          style={{
            fontSize:
              numberParse(data.currentPrice).length > 7
                ? "calc(min(max(1.25vw, 9.6px), 1rem) * 2)"
                : "calc(min(max(1.25vw, 9.6px), 1rem) * 3)",
          }}
        >
          {numberParse(data.currentPrice)}
        </div>
        <div
          className={style.currency}
          style={{ textTransform: data.capital ? "lowercase" : "uppercase" }}
        >
          {data.currency}
        </div>
      </div>
    </div>
  );
}
