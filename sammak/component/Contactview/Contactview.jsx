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

  let newdata = JSON.stringify(registeruser);
  const register = () => {
    if (
      registeruser.emailId === "" ||
      registeruser.password === "" ||
      registeruser.userName === ""
    ) {
      toast.error("Please enter all the field", {
        autoClose: 700,
        closeOnClick: true,
        position: "top-right",
      });
    } else {
      axios
        .post(`${import.meta.env.VITE_URL}/v1/auth/createUser`, registeruser)
        .then((res) => {
          if (res.data.status === 200) {
            toast.success("Registered successfully", {
              position: "top-right",
              autoClose: 400,
              closeOnClick: true,
            });
            setTimeout(() => {
              toast.info(
                "Please click link from your email for activation and login back!",
                {
                  autoClose: 3000,
                  position: "top-right",
                }
              );
            }, 1000);
          }
        })
        .catch((err) => {});
    }
  };

  const login = () => {
    if (loginuser.email === "" || loginuser.password === "") {
      toast.error("Enter both Password and Email", {
        autoClose: 700,
        position: "top-right",
        closeOnClick: true,
      });
      setloading(false);
    } else {
      axios
        .post(`${import.meta.env.VITE_URL}/v1/auth/login`, loginuser)
        .then((res) => {
          setloading(false);

          localStorage.setItem("userid", res.data.result.userId);
          localStorage.setItem("token", res.data.result.accessToken);
          if (res.data.result.accessToken) {
            toast.success("Loggedin Succefully", {
              autoClose: 1000,
              position: "top-right",
              closeOnClick: true,
            });

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch((err) => {
          setloading(false);
          if (err) {
            toast.error("Incorrect email or password", {
              autoClose: 1000,
              position: "top-right",
              closeOnClick: true,
            });
          }
        });
    }
  };

  const config = {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_URL}/CartMaster/getAll/${localStorage.getItem(
          "userid"
        )}`,
        config
      )
      .then((res) => {
        localStorage.setItem(
          "cart",
          JSON.stringify(res.data.result.cartItemResponseList)
        );
        setcartdata(res.data.result.cartItemResponseList);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {}, [search]);

  const handleDelete = (index, id, cartid) => {
    let newCartdata =
      cartdata.length > 0 &&
      cartdata.filter((data, ind) => {
        return ind !== index;
      });
    setcartdata(newCartdata);
    axios
      .delete(
        `${
          import.meta.env.VITE_URL
        }/CartMaster/deleteByProductId/${id}/${parseInt(
          localStorage.getItem("userid")
        )}/${cartid}`,
        config
      )
      .then((res) => {})
      .catch((err) => {});
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
