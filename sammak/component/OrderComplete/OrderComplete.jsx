import React from "react";
import { useState, useEffect } from "react";
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

function OrderComplete() {
  const [loginuser, setloginuser] = useState({ email: "", password: "" });
  const [registeruser, setregisteruser] = useState({
    emailId: "",
    password: "",
    userName: "",
  });
  const [cartdata, setcartdata] = useState("");
  const [shop, setshop] = useState(true);
  const [home, sethome] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const {
    loggedin,
    setloggedin,
    about,
    setabout,
    contact,
    setcontact,
    cart,
    search,
    setsearch,
  } = useContext(AllContext);

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

  useEffect(() => {
    if (!loggedin) {
      navigate("/");
    }
  });
  return (
    <>
      <ToastContainer />
      <Header />

      <div className="main order">
        <div className="page-content pt-8 pb-10 mb-10">
          <div className="step-by pr-4 pl-4">
            <h3 className="title title-step">
              <a>1. Shopping Cart</a>
            </h3>
            <h3 className="title title-step">
              <a>2. Checkout</a>
            </h3>
            <h3 className="title title-step active">
              <a>3. Order Complete</a>
            </h3>
          </div>
          <div className="container mt-7">
            <div className="order-message">
              <div className="icon-box d-inline-flex align-items-center">
                <div className="icon-box-icon mb-0">
                  <svg
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 50 50"
                    enableBackground="new 0 0 50 50"
                    xmlSpace="preserve"
                  >
                    <g>
                      <path
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="bevel"
                        strokeMiterlimit="10"
                        d="
                      M33.3,3.9c-2.7-1.1-5.6-1.8-8.7-1.8c-12.3,0-22.4,10-22.4,22.4c0,12.3,10,22.4,22.4,22.4c12.3,0,22.4-10,22.4-22.4
                      c0-0.7,0-1.4-0.1-2.1"
                      ></path>
                      <polyline
                        fill="none"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="bevel"
                        strokeMiterlimit="10"
                        points="
                      48,6.9 24.4,29.8 17.2,22.3 	"
                      ></polyline>
                    </g>
                  </svg>
                </div>
                <h3 className="icon-box-title">
                  Thank you. Your Order has been received.
                </h3>
              </div>
            </div>
            <div className="order-results row cols-xl-6 cols-md-3 cols-sm-2 mt-10 pt-2 mb-4">
              {/* Order results go here */}
            </div>
            <h2 className="detail-title mb-6">Order Details</h2>
            <div className="order-details">
              <table className="order-details-table">
                <thead>
                  <tr className="summary-subtotal">
                    <td>
                      <h3 className="summary-subtitle">Your Order</h3>
                    </td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {/* Product details go here */}
                  <tr className="summary-subtotal">
                    <td>
                      <h4 className="summary-subtitle">Subtotal:</h4>
                    </td>
                    <td className="summary-value font-weight-normal">
                      {" "}
                      {cart &&
                        cart.length > 0 &&
                        cart
                          .reduce((acc, curr) => {
                            return acc + curr.quantity * curr.sellingPrice;
                          }, 0)
                          .toFixed(2)}{" "}
                      SAR
                    </td>
                  </tr>
                  <tr className="summary-subtotal">
                    <td>
                      <h4 className="summary-subtitle">Payment method:</h4>
                    </td>
                    <td className="summary-value">Cash on delivery</td>
                  </tr>
                  <tr className="summary-subtotal">
                    <td>
                      <h4 className="summary-subtitle">Total:</h4>
                    </td>
                    <td>
                      <p className="summary-total-price">
                        {cart &&
                          cart.length > 0 &&
                          cart
                            .reduce((acc, curr) => {
                              return acc + curr.quantity * curr.sellingPrice;
                            }, 0)
                            .toFixed(2)}{" "}
                        SAR
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderComplete;
