import style from "./LoadingPage.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames";

function LoadingPage() {
  return <div className={style.container}>Loading</div>;
}

export default LoadingPage;
