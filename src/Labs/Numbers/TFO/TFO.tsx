import style from "./TFO.module.scss";

function TFO() {
  const handleClick = () => {};

  const Component = () => {
    return <div className={style.comp}>241</div>;
  };

  return (
    <div className={style.container}>
      {new Array(2500).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default TFO;
