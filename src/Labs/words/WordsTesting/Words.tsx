import style from "./Words.module.scss";

const TEXT = "Esquivons Les Ecchymoses des Esquimaux aux Mots Exquis ";
const LENGTH = 16;

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Background() {
  return <div className={style.whole}></div>;
}

function Words() {
  const CURRENCIES = ["&#36;"];
  return (
    <div className={style.container} id="CanvasWrapper">
      <code>{CURRENCIES[0]}</code>
    </div>
  );
}
export default Words;
