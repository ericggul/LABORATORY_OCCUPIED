import style from "./TwoFourtyTwo.module.scss";

function TwoFourtyTwo() {
  const handleClick = () => {};

  const Component = () => {
    return <div className={style.comp}>242</div>;
  };

  return (
    <div className={style.container}>
      {new Array(2000).fill(0).map((e, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export default TwoFourtyTwo;
