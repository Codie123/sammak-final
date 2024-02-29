import React from "react";
import { useState, useEffect } from "react";
import Herohome from "./herohome/Herohome";
import Heroshop from "./heroshop/Heroshop";
import Heroabout from "./heroabout/Heroabout";
import Herocontact from "./herocontact/Herocontact";
import axios from "axios";
import { useContext } from "react";
import AllContext from "../src/Context/Context";
import Herocart from "./herocart/Herocart";
import { ToastContainer, toast } from "react-toastify";
import toast1, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "react-js-loader";
import { RotatingLines } from "react-loader-spinner";
import { jwtDecode } from "jwt-decode";
function Header({ homeValue, shopValue, contactValue, aboutValue }) {
  
  const [loginuser, setloginuser] = useState({ email: "", password: "" });
  const [registeruser, setregisteruser] = useState({
    emailId: "",
    password: "",
    userName: "",
  });
  const [cartdata, setcartdata] = useState("");
  const [loading, setloading] = useState(false);
  const [decode, setdecode] = useState("");

  const navigate = useNavigate();
  const {
    loggedin,
    setloggedin,
    home,
    sethome,
    shop,
    setshop,
    about,
    setabout,
    contact,
    setcontact,
    setcart,
    cart,
    search,
    setsearch,
    loginopen,
    setloginopen,
    viewcart,
    setviewcart,
  } = useContext(AllContext);
  sethome(homeValue);
  setshop(shopValue);
  setabout(aboutValue);
  setcontact(contactValue);

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
      setloading(false);
    } else {
      axios
        .post(`${import.meta.env.VITE_URL}/v1/auth/createUser`, registeruser)
        .then((res) => {
          setloading(false);

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
        .catch((err) => {
          setloading(false);
        });
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

  function isTokenExpired(token) {
    const expiration = new Date(token.exp * 1000);
    return Date.now() >= expiration;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("cart");
    localStorage.removeItem("orders");
    localStorage.removeItem("recentItems");
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

  if (localStorage.getItem("orders")) {
    let orders = JSON.parse(localStorage.getItem("orders"));

    let recentItems = orders.reduce((acc, item) => {
      if (!acc.includes(item.productName)) {
        acc.push(item.productName);
      }
      return acc;
    }, []);

    // Store recentItems as a string in localStorage
    localStorage.setItem("recent", JSON.stringify(recentItems));
  }

  let products = JSON.parse(localStorage.getItem("products"));
  let recent = JSON.parse(localStorage.getItem("recent")); // Parse the stored string as an array
  if (products && recent) {
    let filtered = products.filter((product) => {
      return recent.includes(product.productName);
    });

    // Store filtered array as a string in localStorage
    localStorage.setItem("recentItems", JSON.stringify(filtered));
  }

  const removeFromCart = (productId) => {
    if (cart) {
      let newcart = cart.filter((item) => item.id !== productId);
      setcart(newcart);
      localStorage.setItem("cartinfo", JSON.stringify(newcart));
    }
  };

  const handlecheckout = () => {
    if (!loggedin) {
      toast1.error("Please Login to checkout", {
        autoClose: 3000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
      });
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="header-left">
              <a href="tel:#" className="call">
                <i className="p-icon-phone-solid"></i>
                <span>+456 789 000</span>
              </a>
              <span className="divider"></span>
              <a className="contact">
                <i className="p-icon-map"></i>
                <span>Saudi Arabia,Jazan, KSA</span>
              </a>
            </div>
            <div className="header-right">
              <span className="divider"></span>

              <div className="social-links">
                <a
                  href="#"
                  className="social-link fab fa-facebook-f"
                  title="Facebook"
                ></a>
                <a
                  href="#"
                  className="social-link fab fa-twitter"
                  title="Twitter"
                ></a>
                <a
                  href="#"
                  className="social-link fab fa-pinterest"
                  title="Pinterest"
                ></a>
                <a
                  href="#"
                  className="social-link fab fa-linkedin-in"
                  title="Linkedin"
                ></a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="header-middle has-center sticky-header fix-top sticky-content"
          id="morph"
        >
          <div className="container">
            <div className="header-left">
              <a className="mobile-menu-toggle" title="Mobile Menu">
                <i className="p-icon-bars-solid"></i>
              </a>
              <a href="/" className="logo">
                <img src="/images/logo.png" alt="logo" />
              </a>
            </div>
            <div className="header-center">
              <nav className="main-nav">
                <ul className="menu">
                  <li className={home ? "active" : ""}>
                    <a
                      href="/"
                      onClick={() => {
                        sethome(true);
                        setshop(false);
                        setabout(false);
                        setcontact(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Home
                    </a>
                  </li>
                  <li className={shop ? "active" : ""}>
                    <a
                      href="/shopview"
                      onClick={() => {
                        sethome(false);
                        setshop(true);
                        setabout(false);
                        setcontact(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Shop
                    </a>
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    className={about ? "active" : ""}
                  >
                    <a
                      href="/about"
                      onClick={() => {
                        sethome(false);
                        setshop(false);
                        setabout(true);
                        setcontact(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      About Us
                    </a>
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    className={contact ? "active" : ""}
                  >
                    <a
                      href="/contact"
                      onClick={() => {
                        sethome(false);
                        setshop(false);
                        setabout(false);
                        setcontact(true);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="header-right">
              <div
                className={
                  viewcart
                    ? "dropdown login-dropdown opened off-canvas"
                    : "dropdown login-dropdown off-canvas"
                }
              >
                {loggedin ? (
                  <>
                    <div className="d-flex">
                      <button
                        className="log-out"
                        onClick={() => {
                          navigate("/setting");
                          window.location.reload();
                        }}
                      >
                        <svg
                          width="23"
                          height="23"
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.1663 20.125V18.2083C19.1663 17.1917 18.7625 16.2166 18.0436 15.4978C17.3247 14.7789 16.3497 14.375 15.333 14.375H7.66634C6.64968 14.375 5.67465 14.7789 4.95576 15.4978C4.23688 16.2166 3.83301 17.1917 3.83301 18.2083V20.125"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.5003 10.5417C13.6174 10.5417 15.3337 8.82543 15.3337 6.70833C15.3337 4.59124 13.6174 2.875 11.5003 2.875C9.38323 2.875 7.66699 4.59124 7.66699 6.70833C7.66699 8.82543 9.38323 10.5417 11.5003 10.5417Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          logout();
                        }}
                        style={{
                          position: "relative",
                          left: "-1vh",
                          cursor: "pointer",
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="d-flex">
                    <button >
                      <a className="login-toggle " data-toggle="login-modal">

                       <span>Login/Signup</span>
                        <svg
                          width="23"
                          height="23"
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.1663 20.125V18.2083C19.1663 17.1917 18.7625 16.2166 18.0436 15.4978C17.3247 14.7789 16.3497 14.375 15.333 14.375H7.66634C6.64968 14.375 5.67465 14.7789 4.95576 15.4978C4.23688 16.2166 3.83301 17.1917 3.83301 18.2083V20.125"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.5003 10.5417C13.6174 10.5417 15.3337 8.82543 15.3337 6.70833C15.3337 4.59124 13.6174 2.875 11.5003 2.875C9.38323 2.875 7.66699 4.59124 7.66699 6.70833C7.66699 8.82543 9.38323 10.5417 11.5003 10.5417Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </button>

                    <div className="dropdown cart-dropdown off-canvas mr-0 mr-lg-2">
                      <a href="#" className="cart-toggle link">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 1.66675L2.5 5.00008V16.6667C2.5 17.1088 2.67559 17.5327 2.98816 17.8453C3.30072 18.1578 3.72464 18.3334 4.16667 18.3334H15.8333C16.2754 18.3334 16.6993 18.1578 17.0118 17.8453C17.3244 17.5327 17.5 17.1088 17.5 16.6667V5.00008L15 1.66675H5Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M2.5 5H17.5"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M13.3337 8.33325C13.3337 9.21731 12.9825 10.0652 12.3573 10.6903C11.7322 11.3154 10.8844 11.6666 10.0003 11.6666C9.11627 11.6666 8.26842 11.3154 7.6433 10.6903C7.01818 10.0652 6.66699 9.21731 6.66699 8.33325"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <span className="cart-count">{cart.length}</span>
                      </a>

                      <div
                        className="canvas-overlay"
                        onClick={() => {
                          setviewcart(false);
                        }}
                      ></div>

                      <div className="dropdown-box">
                        <div className="canvas-header">
                          <h4 className="canvas-title">Shopping Cart</h4>
                       
                          <a
                            href="#"
                            className="btn btn-dark btn-link btn-close"
                          >
                            <i className="p-icon-arrow-long-right"></i>
                            <span className="sr-only">Cart</span>
                          </a>
                        </div>
                        <div className="products scrollable">
                          {cart.length > 0 ? (
                            cart.map((data, index) => (
                              <div className="product product-mini" key={index}>
                                <figure className="product-media">
                                  <a>
                                    {data.images[0].imageUrl &&
                                    data.images[0].imageUrl.length > 0 ? (
                                      <img
                                        src={data.images[0].imageUrl}
                                        alt="product"
                                        width="84"
                                        height="105"
                                        style={{
                                          width: "80px",
                                        }}
                                      />
                                    ) : (
                                      <div>No Image Available</div>
                                    )}
                                  </a>
                                  <a
                                    title="Remove Product"
                                    className="btn-remove"
                                    onClick={() => {
                                      removeFromCart(data.id);
                                    }}
                                  >
                                    <i className="p-icon-times"></i>
                                    <span className="sr-only"></span>
                                  </a>
                                </figure>
                                <div className="product-detail d-flex flex-column">
                                  <a className="product-name">
                                    {data.productName}
                                  </a>
                                  <div className="price-box">
                                    <span className="product-quantity">
                                      {data.quantity}
                                    </span>
                                    <span className="product-price">
                                      {data.sellingPrice}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : cart.length === 0 ? (
                            <div
                              style={{
                                marginTop: "2vh",
                                marginLeft: "5vw",
                              }}
                            >
                              No items are present
                            </div>
                          ) : (
                            <span style={{ position: "relative", top: "2vh" }}>
                              {" "}
                              <Loader
                                type="bubble-scale"
                                bgColor={"#163b4d"}
                                color={"blue"}
                                size={30}
                              />
                            </span>
                          )}
                        </div>

                        <div className="cart-total">
                          <label>Total:</label>
                          <span className="price">
                            {" "}
                            {cart.length > 0 &&
                              cart.reduce((acc, curr) => {
                                return acc + curr.quantity * curr.sellingPrice;
                              }, 0)}{" "}
                            SAR
                          </span>
                        </div>

                        <div className="cart-action">
                          <a
                            className="btn btn-outline btn-dim mb-2"
                            href="/viewcart"
                          >
                            View Cart
                          </a>
                            {loggedin?<a
                            onClick={() => {
                              handlecheckout();
                            }}
                            className="btn btn-dim"
                          >
                            <span>Go To Checkout</span>
                          </a>:" "}
                          
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="canvas-overlay"></div>
                <a
                  className="btn-close"
                  onClick={() => {
                    setviewcart(false);
                  }}
                ></a>

                <div className="dropdown-box scrollable">
                  <div className="login-popup">
                    <div className="form-box">
                      <div className="tab tab-nav-underline tab-nav-boxed">
                        <ul className="nav nav-tabs nav-fill mb-4">
                          <li className="nav-item">
                            <a
                              className="nav-link active lh-1 ls-normal"
                              href="#signin"
                            >
                              Login
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link lh-1 ls-normal"
                              href="#register"
                            >
                              Register
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content">

                          <ToastContainer />

                          <div className="tab-pane active" id="signin">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                setloading(true);
                                login();
                              }}
                            >
                              <div className="form-group">
                                <input
                                  type="text"
                                  id="singin-email"
                                  name="singin-email"
                                  placeholder="Username or Email Address"
                                  onInput={(e) => {
                                    setloginuser({
                                      ...loginuser,
                                      email: e.target.value,
                                    });
                                  }}
                                />
                                <input
                                  type="password"
                                  id="singin-password"
                                  name="singin-password"
                                  placeholder="Password"
                                  required=""
                                  onInput={(e) => {
                                    setloginuser({
                                      ...loginuser,
                                      password: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                              <div className="form-footer">
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    id="signin-remember"
                                    name="signin-remember"
                                  />
                                  <label htmlFor="signin-remember">
                                    Remember me
                                  </label>
                                </div>
                                <a href="/forgotpassword" className="lost-link">
                                  Lost your password?
                                </a>
                              </div>
                              <button
                                className="btn btn-dark btn-block"
                                type="submit"
                              >
                                Login
                                {loading && (
                                  <span
                                    style={{
                                      position: "relative",
                                      left: "4vh",
                                      top: "0.5vh",
                                    }}
                                  >
                                    <RotatingLines
                                      visible={true}
                                      height="20"
                                      width="25"
                                      color="	#87CEEB"
                                      strokeWidth="5"
                                      animationDuration="0.75"
                                      ariaLabel="rotating-lines-loading"
                                      wrapperStyle={{}}
                                      wrapperclassName=""
                                    />
                                  </span>
                                )}
                              </button>
                            </form>
                          </div>

                          <div className="tab-pane" id="register">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                setloading(true);
                                register();
                              }}
                            >
                              <div className="form-group">
                                <input
                                  type="text"
                                  id="register-user"
                                  name="register-user"
                                  placeholder="Username"
                                  required=""
                                  onInput={(e) => {
                                    setregisteruser({
                                      ...registeruser,
                                      userName: e.target.value,
                                    });
                                  }}
                                />
                                <input
                                  type="email"
                                  id="register-email"
                                  name="register-email"
                                  placeholder="Your Email Address"
                                  required=""
                                  onInput={(e) => {
                                    setregisteruser({
                                      ...registeruser,
                                      emailId: e.target.value,
                                    });
                                  }}
                                />
                                <input
                                  type="password"
                                  id="register-password"
                                  name="register-password"
                                  placeholder="Password"
                                  required=""
                                  onInput={(e) => {
                                    setregisteruser({
                                      ...registeruser,
                                      password: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                              <div className="form-footer mb-5">
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    id="register-agree"
                                    name="register-agree"
                                    required=""
                                  />
                                  <label htmlFor="register-agree">
                                    I agree to the privacy policy
                                  </label>
                                </div>
                              </div>
                              <button
                                className="btn btn-dark btn-block"
                                type="submit"
                              >
                                Register
                                {loading && (
                                  <span
                                    style={{
                                      position: "relative",
                                      left: "4vh",
                                      top: "0.5vh",
                                    }}
                                  >
                                    <RotatingLines
                                      visible={true}
                                      height="20"
                                      width="25"
                                      color="	#87CEEB"
                                      strokeWidth="5"
                                      animationDuration="0.75"
                                      ariaLabel="rotating-lines-loading"
                                      wrapperStyle={{}}
                                      wrapperclassName=""
                                    />
                                  </span>
                                )}
                              </button>
                            </form>
                          </div>

                        </div>
                      </div>
                    </div>
                    <button
                      title="Close (Esc)"
                      type="button"
                      className="mfp-close"
                    >
                      <span>×</span>
                    </button>
                  </div>
                </div>
              </div>
              {loggedin && (
                <div className="dropdown cart-dropdown off-canvas mr-0 mr-lg-2">
                  <a href="#" className="cart-toggle link">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 1.66675L2.5 5.00008V16.6667C2.5 17.1088 2.67559 17.5327 2.98816 17.8453C3.30072 18.1578 3.72464 18.3334 4.16667 18.3334H15.8333C16.2754 18.3334 16.6993 18.1578 17.0118 17.8453C17.3244 17.5327 17.5 17.1088 17.5 16.6667V5.00008L15 1.66675H5Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M2.5 5H17.5"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M13.3337 8.33325C13.3337 9.21731 12.9825 10.0652 12.3573 10.6903C11.7322 11.3154 10.8844 11.6666 10.0003 11.6666C9.11627 11.6666 8.26842 11.3154 7.6433 10.6903C7.01818 10.0652 6.66699 9.21731 6.66699 8.33325"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span className="cart-count">{cart.length}</span>
                  </a>

                  <div className="canvas-overlay"></div>

                  <div className="dropdown-box">
                    <div className="canvas-header">
                      <h4 className="canvas-title">Shopping Cart</h4>
                      <a href="#" className="btn btn-dark btn-link btn-close">
                        <i className="p-icon-arrow-long-right"></i>
                        <span className="sr-only">Cart</span>
                      </a>
                    </div>
                    <div className="products scrollable">
                      {cart.length > 0 ? (
                        cart.map((data, index) => (
                          <div className="product product-mini" key={index}>
                            <figure className="product-media">
                              <a>
                                {data.images[0].imageUrl &&
                                data.images[0].imageUrl.length > 0 ? (
                                  <img
                                    src={data.images[0].imageUrl}
                                    alt="product"
                                    width="84"
                                    height="105"
                                    style={{ height: "105px", width: "84px" }}
                                  />
                                ) : (
                                  <div>No Image Available</div>
                                )}
                              </a>
                              <a
                                title="Remove Product"
                                className="btn-remove"
                                onClick={() => {
                                  removeFromCart(data.id);
                                }}
                              >
                                <i className="p-icon-times"></i>
                              </a>
                            </figure>
                            <div className="product-detail">
                              <a className="product-name">{data.productName}</a>
                              <div className="price-box">
                                <span className="product-quantity">
                                  {data.quantity}
                                </span>
                                <span className="product-price">
                                  {data.sellingPrice}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : cartdata.length === 0 ? (
                        <div
                          style={{
                            marginTop: "2vh",
                            marginLeft: "5vw",
                          }}
                        >
                          No items are present
                        </div>
                      ) : (
                        <span style={{ position: "relative", top: "2vh" }}>
                          {" "}
                          <Loader
                            type="bubble-scale"
                            bgColor={"#163b4d"}
                            color={"blue"}
                            size={30}
                          />
                        </span>
                      )}
                    </div>

                    <div className="cart-total">
                      <label>Total:</label>
                      <span className="price">
                        {" "}
                        {cart.length > 0 &&
                          cart.reduce((acc, curr) => {
                            return acc + curr.quantity * curr.sellingPrice;
                          }, 0)}{" "}
                        SAR
                      </span>
                    </div>

                    <div className="cart-action">
                      <a
                        className="btn btn-outline btn-dim mb-2"
                        href="/viewcart"
                      >
                        View Cart
                      </a>

                        {loggedin?<a href="/checkout" className="btn btn-dim">
                        <span>Go To Checkout</span>
                      </a>:" "}
                               
                      
            
                      
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* {loggedin && (
              <img
                style={{ height: "40px" }}
                src="images/settingiconpng.png"
                alt="img"
                className="settingimg"
                onClick={() => {
                  navigate("/setting");
                }}
              />
            )} */}
          </div>
        </div>

        <div className="mobile-menu-wrapper">
          <div className="mobile-menu-overlay"></div>

          <a className="mobile-menu-close" href="#">
            <i className="p-icon-times"></i>
          </a>

          <div className="mobile-menu-container scrollable">
            <ul className="mobile-menu mmenu-anim">
              <li>
                <a href="/" style={{ cursor: "pointer" }}>
                  Home
                </a>
              </li>
              <li>
                <a href="/shopview" style={{ cursor: "pointer" }}>
                  Shop
                </a>
              </li>
              <li>
                <a style={{ cursor: "pointer" }} href="/about">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" style={{ cursor: "pointer" }}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
