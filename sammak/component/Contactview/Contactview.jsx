import React from "react";
import { useState, useEffect } from "react";
import Herohome from "../herohome/Herohome";
import Heroshop from "../heroshop/Heroshop";
import Heroabout from "../heroabout/Heroabout";
import Herocontact from "../herocontact/Herocontact";
import axios from "axios";
import { useContext } from "react";
import AllContext from "../../src/Context/Context";
import Herocart from "../herocart/Herocart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "react-js-loader";
import { RotatingLines } from "react-loader-spinner";
import "../../main.js";
import "../../css/style.css";
import Footer from "../Footer.jsx";
import { jwtDecode } from "jwt-decode";
import Header from "../Header.jsx";

function Contactview() {
  const [loginuser, setloginuser] = useState({ email: "", password: "" });
  const [registeruser, setregisteruser] = useState({
    emailId: "",
    password: "",
    userName: "",
  });
  const [cartdata, setcartdata] = useState("");
  const [about, setabout] = useState(false);
  const [shop, setshop] = useState(false);
  const [home, sethome] = useState(false);
  const [contact, setcontact] = useState(true);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { loggedin, setloggedin, cart, search, setsearch } =
    useContext(AllContext);

  const config = {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };

  function isTokenExpired(token) {
    const expiration = new Date(token.exp * 1000);
    return Date.now() >= expiration;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("cart");
    localStorage.removeItem("orders");
    window.location.reload();
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const load = jwtDecode(localStorage.getItem("token"));

      if (!isTokenExpired(load)) {
        const expiration = new Date(load.exp * 1000).getTime();
        const currentTime = Date.now();
        const timeUntilExpiration = expiration - currentTime;
        setTimeout(logout, timeUntilExpiration);
      } else {
        logout();
      }
    }
  }, []);

  return (
    <>
      <Header
        homeValue={false}
        shopValue={false}
        aboutValue={false}
        contactValue={true}
      />
      <Herocontact />
      <Footer />
    </>
  );
}

export default Contactview;
