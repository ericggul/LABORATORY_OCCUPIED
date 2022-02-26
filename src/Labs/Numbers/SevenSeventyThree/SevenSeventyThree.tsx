import style from "./SevenSeventyThree.module.scss";

function SevenSeventyThree() {
  const handleClick = () => {};

  const Component = () => {
    return <div className={style.comp}>773</div>;
  };

  return (
    <div className={style.container}>
      {new Array(2000).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default SevenSeventyThree;
