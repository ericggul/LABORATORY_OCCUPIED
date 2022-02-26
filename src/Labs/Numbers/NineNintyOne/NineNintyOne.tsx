import style from "./NineNintyOne.module.scss";

function NineNintyOne() {
  const handleClick = () => {};

  const Component = () => {
    return <div className={style.comp}>991</div>;
  };

  return (
    <div className={style.container}>
      {new Array(2000).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default NineNintyOne;
