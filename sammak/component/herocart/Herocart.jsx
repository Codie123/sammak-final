import React, { useContext, useEffect, useState } from "react";
import "./Herocart.css";
import Header from "../Header";
import Footer from "../Footer";
import AllContext from "../../src/Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "react-js-loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import "../../main.js";
import "../../vendor/owl-carousel/owl.carousel.min.js";
import { jwtDecode } from "jwt-decode";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation,Virtual } from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
function Herocart() {
  const [loginuser, setloginuser] = useState({ email: "", password: "" });
  const [registeruser, setregisteruser] = useState({
    emailId: "",
    password: "",
    userName: "",
  });
  const [loading, setloading] = useState(false);
  const [addCartLogin, setaddCartLogin] = useState(false);
  const [quantity, setquantity] = useState(1);
  const [cartdata, setcartdata] = useState("");
  const [data, setdata] = useState("");
  const [cleaning, setcleaning] = useState("Cleaning Method 1");
  const [data1, setdata1] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let storedProduct = localStorage.getItem("products");
    let productId = localStorage.getItem("id");
    if (storedProduct && productId) {
      let parseProduct = JSON.parse(storedProduct);
      productId = parseInt(productId);
      let filterproduct = parseProduct.filter((fil) => {
        return fil.id === productId;
      });

      setdata(filterproduct);
    }
    axios
      .get(`${import.meta.env.VITE_URL}/Product/post`)
      .then((res) => {
        setdata1(res.data.result);

        localStorage.setItem("products", JSON.stringify(res.data.result));
      })
      .catch((err) => {});
  }, [localStorage.getItem("id")]);

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
    cart,
    id,
    productinfo,
    isloggedin,
    setid,
  } = useContext(AllContext);

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

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ` + token,
    },
  };

  const handleAddcart = () => {
    if (!isloggedin) {
      setaddCartLogin(true);
    } else {
      setaddCartLogin(false);
    }

    axios
      .post(
        `${import.meta.env.VITE_URL}/cart/addToCart/${localStorage.getItem(
          "id"
        )}/${localStorage.getItem("userid")}/${quantity}/${cleaning}`,
        {},
        config
      )
      .then((res) => {
        toast.success('Added to cart',{
          autoClose: 1000,
          position: "top-center",
          closeOnClick: true,
        })
        axios
          .get(
            `${
              import.meta.env.VITE_URL
            }/CartMaster/getAll/${localStorage.getItem("userid")}`,
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
      })
      .catch((err) => {});
  };

  const addquantity = () => {
    setquantity(quantity + 1);
  };
  const minusquantity = () => {
    if (quantity === 1) {
      setquantity(1);
    } else {
      setquantity(quantity - 1);
    }
  };

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
      .catch((err) => {});
  };

  if (data) {
  }

  function isTokenExpired(token) {
    const expiration = new Date(token.exp * 1000);
    return Date.now() >= expiration;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("orders");
    localStorage.removeItem("userid");
    localStorage.removeItem("cart");
    window.location.reload();
    navigate("/");
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
    window.scrollTo(0, 0); 
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

  const onCart = () => {
    navigate("/shop");

    if (data) {
      window.scrollTo({ top: 100, behavior: "smooth" });
    }
  };
  const products = JSON.parse(localStorage.getItem("products"));

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
              <a href="contact.html" className="contact">
                <i className="p-icon-map"></i>
                <span>Saudi Arabia,Jazan, KSA</span>
              </a>
            </div>
            <div className="header-right">
              <div className="dropdown switcher">
                <a href="#currency">USD</a>
                <ul className="dropdown-box">
                  <li>
                    <a href="#USD">USD</a>
                  </li>
                  <li>
                    <a href="#EUR">EUR</a>
                  </li>
                </ul>
              </div>

              <div className="dropdown switcher">
                <a href="#language">
                  <img
                    src="images/flagus.jpg"
                    width="14"
                    height="10"
                    className="mr-1"
                    alt="flagus"
                  />
                  ENG
                </a>
                <ul className="dropdown-box">
                  <li>
                    <a href="#USD">
                      <img
                        src="images/flagus.jpg"
                        width="14"
                        height="10"
                        className="mr-1"
                        alt="flagus"
                      />
                      ENG
                    </a>
                  </li>
                  <li>
                    <a href="#EUR">
                      <img
                        src="images/flagfr.jpg"
                        width="14"
                        height="10"
                        className="mr-1"
                        alt="flagfr"
                      />
                      FRH
                    </a>
                  </li>
                </ul>
              </div>
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

        <div className="header-middle has-center sticky-header fix-top sticky-content">
          <div className="container">
            <div className="header-left">
              <a href="#" className="mobile-menu-toggle" title="Mobile Menu">
                <i className="p-icon-bars-solid"></i>
              </a>
              <a href="/" className="logo">
                <img
                  src="/images/logo.png"
                  alt="logo"
                  width="171"
                  height="41"
                />
              </a>
            </div>
            <div className="header-center">
              <nav className="main-nav">
                <ul className="menu">
                  <li className={""}>
                    <a
                      onClick={() => {
                        navigate("/");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Home
                    </a>
                  </li>
                  <li className={"active"}>
                    <a
                      onClick={() => {
                        navigate("/shopview");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Shop
                    </a>
                  </li>
                  <li className={about ? "active" : ""}>
                    <a
                      onClick={() => {
                        navigate("/about");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      About Us
                    </a>
                  </li>
                  <li className={contact ? "active" : ""}>
                    <a
                      onClick={() => {
                        navigate("/contact");
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
              <div className="header-search hs-toggle">
                <a className="search-toggle" href="#" title="Search">
                  <i className="p-icon-search-solid"></i>
                </a>
                <form action="#" className="form-simple">
                  <input
                    type="search"
                    autoComplete="off"
                    placeholder="Search in..."
                    required=""
                  />
                  <button className="btn btn-search" type="submit">
                    <i className="p-icon-search-solid"></i>
                  </button>
                </form>
              </div>
              <div
                className={`dropdown login-dropdown off-canvas ${
                  addCartLogin ? "opened" : ""
                } off-canvas`}
              >
                {loggedin ? (
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("orders");
                      localStorage.removeItem("userid");
                      localStorage.removeItem("cart");
                      window.location.reload();
                    }}
                    style={{
                      position: "relative",
                      left: "-1vh",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <a
                    className="login-toggle "
                    href=""
                    data-toggle="login-modal"
                  >
                    <i className="p-icon-user-solid mr-2"></i>
                    <span className="">login/Signup</span>
                  </a>
                )}

                <div
                  className="canvas-overlay"
                  onClick={() => setaddCartLogin(false)}
                ></div>
                <a
                  href="#"
                  className="btn-close"
                  onClick={() => setaddCartLogin(false)}
                ></a>
                <div className="dropdown-box scrollable">
                  <div className="login-popup">
                    <div className="form-box">
                      <div className="tab tab-nav-underline tab-nav-boxed">
                        <ToastContainer />
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
                                      wrapperClass=""
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
                                    required={true}
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
                                      wrapperClass=""
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
                    <i className="p-icon-cart-solid">
                      <span className="cart-count">
                        {cartdata.length > 0 ? cartdata.length : 0}
                      </span>
                    </i>
                  </a>
                  <div className="canvas-overlay"></div>
                  <div className="dropdown-box">
                    <div className="canvas-header">
                      <h4 className="canvas-title">Shopping Cart</h4>
                      <a href="#" className="btn btn-dark btn-link btn-close">
                        close<i className="p-icon-arrow-long-right"></i>
                        <span className="sr-only">Cart</span>
                      </a>
                    </div>
                    <div className="products scrollable">
                      {cartdata.length > 0 ? (
                        cartdata.map((data, index) => (
                          <div className="product product-mini" key={index}>
                            <figure className="product-media">
                              <a href="product-simple.html">
                                {data.productResponse.productImages &&
                                data.productResponse.productImages.length >
                                  0 ? (
                                  <img
                                    src={
                                      data.productResponse.productImages[0]
                                        .imageUrl
                                    }
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
                                  handleDelete(
                                    index,
                                    data.productResponse.productId,
                                    data.cartId
                                  );
                                }}
                              >
                                <i className="p-icon-times"></i>
                                <span className="sr-only">Close</span>
                              </a>
                            </figure>
                            <div className="product-detail">
                              <a href="product.html" className="product-name">
                                {data.productResponse.productName}
                              </a>
                              <div className="price-box">
                                <span className="product-quantity">
                                  {data.quantity}
                                </span>
                                <span className="product-price">
                                  {data.productResponse.sellingPrice}
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
                      <label>Subtotal:</label>
                      <span className="price">
                        {" "}
                        {cartdata.length > 0 &&
                          cartdata.reduce((acc, curr) => {
                            return acc + curr.subtotal;
                          }, 0)}{" "}
                        SAR
                      </span>
                    </div>

                    <div className="cart-action">
                      <a
                        className="btn btn-outline btn-dim mb-2"
                        onClick={() => {
                          navigate("/viewcart");
                        }}
                      >
                        View Cart
                      </a>
                      <a
                        onClick={() => {
                          navigate("/checkout");
                        }}
                        className="btn btn-dim"
                      >
                        <span>Go To Checkout</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {loggedin && (
              <img
                style={{ height: "40px" }}
                src="images/settingiconpng.png"
                alt="img"
                className="settingimg"
                onClick={() => {
                  navigate("/setting");
                }}
              />
            )}
          </div>
        </div>
      </header>

      <main className="main single-product">
        <nav className="breadcrumb-nav">
          <div className="container">
            <div className="product-navigation">
              <ul className="breadcrumb">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/shop">Products</a>
                </li>
                <li>Product Name</li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="page-content">
          <div className="container">
            <div className="product product-single product-simple row mb-8">
              <div className="col-md-7">
                <Swiper rewind={true} navigation={true} modules={[Navigation]} className="mySwiper">
                      {data &&
                        data.length > 0 &&
                        data[0].images.map((data1, index) => {
                          return (
                            <SwiperSlide key={index} className="shop-slider">
                              <img
                                src={data1.imageUrl}
                                data-zoom-image={data1.imageUrl}
                                alt="1"
                                style={{ width: 800, height: 600 }}
                              />
                            </SwiperSlide>
                          );
                        })}
        
                </Swiper>
              </div>
              <div className="col-md-5">
                <div className="product-details">
                  <h1 className="product-name">
                    {data.length > 0 && data[0].productName}
                  </h1>

                  <p className="product-price mb-1">
                    <del className="old-price">
                      {" "} SAR {" "} {data.length > 0 && data[0].originalPrice}{" "}
                    </del>
                    <ins className="new-price">
                      {" "} SAR {" "} {data.length > 0 && data[0].sellingPrice} {" "}
                    </ins>
                  </p>
                  <p className="product-short-desc">
                    {data.length > 0 && data[0].productDescription}
                  </p>
                  <p className="product-short-desc">
                    {data.length > 0 && data[0].smallDescription}
                  </p>

                  <div className="product-form mb-2 pt-1">
                    <select
                      name="cleaning"
                      id="cl-method"
                      onChange={(e) => {
                        setcleaning(e.target.value);
                      }}
                      value={cleaning}
                    >
                      <option value="Cleaning Method 1">
                        Cleaning method 1
                      </option>
                      <option value="Cleaning Method 2">
                        Cleaning method 2
                      </option>
                      <option value="Cleaning Method 3">
                        Cleaning method 3
                      </option>
                      <option value="Cleaning Method 4">
                        Cleaning method 4
                      </option>
                      <option value="Cleaning Method 5">
                        Cleaning method 5
                      </option>
                    </select>
                  </div>
                  <div className="product-variation-price"></div>
                  <div className="product-form product-qty pt-1">
                    <div className="product-form-group">
                      <div className="input-group">
                        <button
                          className="quantity-minus p-icon-minus-solid"
                          onClick={minusquantity}
                        ></button>
                       <input className="quantity form-control" type="number" min="1" max="1000000" value={quantity}/>
                        <button
                          className="quantity-plus p-icon-plus-solid"
                          onClick={addquantity}
                        ></button>
                      </div>
                      <button
                        className="btn-cart ls-normal font-weight-semi-bold"
                        disabled={false}
                        onClick={handleAddcart}
                      >
                        <i className="p-icon-cart-solid"></i>ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-content">
              <div className="content-specification mt-10 pt-3">
                <h2 className="title title-line title-underline">
                  <span> Specifications </span>
                </h2>
                <ul className="list-none">
                  <li>
                    <label>WEIGHT</label>
                    <p>1 kg</p>
                  </li>
                  <li>
                    <label>DIMENSIONS</label>
                    <p>10 × 10 × 10 cm</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <section className="mt-3">
            <h2 className="text-center mb-7">Related Products</h2>
            <div className="row tab-pane active">
            <Swiper
                modules={[Virtual, Navigation, Pagination]}
              
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768:{
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1025:{
                    slidesPerView: 4,
                    spaceBetween: 20,
                  }
                  
                }}
               
                navigation={true}
                virtual
            >
                {data1.length > 0 && Array.isArray(data1) ? (data1.map((field, index) => (
                              
                              <SwiperSlide key={field} virtualIndex={index} >
                               <div
                                                className="product-wrap shop-home col "
                                                style={{
                                                  display: "flex",flexDirection: "column",alignItems:"center",cursor:"pointer"
                                                }}
                                                key={index}
                                                onClick={() => {
                                                  setid(field.id);
                                                  localStorage.setItem("id", field.id);
                                                  onCart();
                                                }}
                                              >
                                                
                                                  <figure
                                                    className="product-media"
                                                    style={{ cursor: "pointer" }}
                                                  >
                                                      <img
                                                        src={
                                                          field.images.length > 0
                                                            ? field.images[0].imageUrl
                                                            : ""
                                                        }
                                                        alt="product"
                                                        style={{ width: "295", height: "369" }}
                                                      />
                                                 
                
                                                    {/* Product actions */}
                                                  </figure>
                                                  <div className="product-details">
                                                  <div className="ratings-container">
                                                        <div className="d-flex align-items-center">
                                                        <div className="ratings-full">
                                                          <span
                                                            className="ratings"
                                                            style={{ width: "60%" }}
                                                          ></span>
                                                          <span className="tooltiptext tooltip-top"></span>
                                                        </div>
                                                        <a
                                                          href="javascript:void(0);"
                                                          className="rating-reviews"
                                                        >
                                                          ({Math.floor(Math.random() * 20 + 5)})
                                                        </a>
                                                        </div>
                                                        <span className="product-price">
                                                        <del className="old-price">
                                                          {field.originalPrice} SAR
                                                        </del>
                                                        <ins
                                                          className="new-price"
                                                          style={{ fontWeight: "bold" }}
                                                        >
                                                        {field.sellingPrice} SAR
                                                        </ins>
                                                      </span>
                
                                                      </div>
                                                      <div className="product-name-container">
                                                        <h5 className="product-name"  style={{
                                                            color: "#163b4d",
                                                            fontWeight: "600",
                                                            fontSize:"1.3em"
                                                          }}>
                                                        
                                                          {field.productName}
                
                                                        </h5>
                                                     
                                                      </div>
                                                   
                                                  </div>
                                              
                                              </div>
                            </SwiperSlide>
                                             
                
                                            ))
                                            .slice(0, 4)
                                            ) : (
                                              <div style={{ marginLeft: "30vw" }}>
                                                <Loader
                                                  type="bubble-scale"
                                                  bgColor={"#163b4d"}
                                                  color={"blue"}
                                                  size={30}
                                                />
                                              </div>
                                            )}

              </Swiper>
         

              </div>
          </section>
        </div>
        <div className="mobile-menu-wrapper">
          <div className="mobile-menu-overlay"></div>

          <a className="mobile-menu-close" href="#">
            <i className="p-icon-times"></i>
          </a>

          <div className="mobile-menu-container scrollable">
            <form action="#" className="inline-form">
              <input
                type="search"
                name="search"
                autoComplete="off"
                placeholder="Search your keyword..."
                required=""
              />
              <button className="btn btn-search" type="submit">
                <i className="p-icon-search-solid"></i>
              </button>
            </form>

            <ul className="mobile-menu mmenu-anim">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/shopview">Shop</a>
              </li>
              <li>
                <a href="about.html">About Us</a>
              </li>
              <li>
                <a href="contact.html">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Herocart;
