import style from "./TFT.module.scss";

function TFT() {
  const handleClick = () => {};

  const Component = () => {
    return <div className={style.comp}>243</div>;
  };

  return (
    <div className={style.container}>
      {new Array(2500).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default TFT;
