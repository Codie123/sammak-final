import React from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import "../../main.js";
import Herohome from "../../component/herohome/Herohome.jsx";
function Home(props) {
  return (
    <>
      <Header
        homeValue={true}
        shopValue={false}
        aboutValue={false}
        contactValue={false}
      />
      <Herohome />

      <Footer />
    </>
  );
}

export default Home;
