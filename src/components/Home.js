import React from "react";
import Notes from "./Notes";
import "./css/Home.css";
import Alert from "./Alert";

const Home = () => {
  return (
    <div>
      <div style={{ height: "60px" }}>
        <Alert />
      </div>
      <Notes />
    </div>
  );
};

export default Home;
