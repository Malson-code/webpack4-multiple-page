import React from "react";
import { render } from "react-dom";
import "./index.less";
import "../../public/common";

const Home = () => {
  return <div className="home">Home entry!</div>;
};

render(<Home />, document.getElementById("app"));
