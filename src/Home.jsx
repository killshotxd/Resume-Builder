import React from "react";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header/Header";

const Home = (props) => {
  const isAuth = props.auth ? true : false;

  return <>{isAuth ? <Header auth={isAuth} /> : <Auth />}</>;
};

export default Home;
