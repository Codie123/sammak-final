import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import AllContext from "../../src/Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-js-loader";
import "../../main.js";
function Viewcart() {
  //
  const [loginuser, setloginuser] = useState({ email: "", password: "" });
  const [registeruser, setregisteruser] = useState({
    emailId: "",
    password: "",
    userName: "",
  });

  const [cartdata, setcartdata] = useState([]);

  //

  const [data, setdata] = useState("");

  //
  const navigate = useNavigate();

  //

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
  }, []);

  //

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
  } = useContext(AllContext);

  //
  const home1 = () => {
    sethome(true);
    setshop(false);
    setabout(false);
    setcontact(false);
  };
  const shop1 = () => {
    sethome(false);
    setshop(true);
    setabout(false);
    setcontact(false);
  };
  const about1 = () => {
    sethome(false);
    setshop(false);
    setabout(true);
    setcontact(false);
  };
  const contact1 = () => {
    sethome(false);
    setshop(false);
    setabout(false);
    setcontact(true);
  };

  //
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
    }

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
  };

  //
  const login = () => {
    if (loginuser.email === "" || loginuser.password === "") {
      toast.error("Enter both Password and Email", {
        autoClose: 700,
        position: "top-right",
        closeOnClick: true,
      });
    }
    axios
      .post(`${import.meta.env.VITE_URL}/v1/auth/login`, loginuser)
      .then((res) => {
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
      .catch((err) => {});
  };

  // get items for the cart
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ` + token,
    },
  };

  //
  useEffect(() => {
    if (!loggedin) {
      navigate("/");
    }
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
      .catch((err) => {
        navigate("/");
      });
  }, []);

  //

  //
  const handlecheckout = () => {
    navigate("/checkout");
  };

  const handledeletecart = (index, productid, cartid) => {
    setcartdata(
      cartdata.filter((cart, cartIndex) => {
        return cartIndex !== index;
      })
    );

    axios
      .delete(
        `${
          import.meta.env.VITE_URL
        }/CartMaster/deleteByProductId/${productid}/${parseInt(
          localStorage.getItem("userid")
        )}/${cartid}`,
        config
      )
      .then((res) => {})
      .catch((err) => {});
  };
  const onIncrement = (index, id, cartId) => {
    const updatedCartData = [...cartdata];

    updatedCartData[index] = {
      ...updatedCartData[index],
      quantity: updatedCartData[index].quantity + 1,
    };
    updatedCartData[index].subtotal =
      updatedCartData[index].quantity *
      updatedCartData[index].productResponse.sellingPrice;

    setcartdata(updatedCartData);

    axios
      .put(
        `${
          import.meta.env.VITE_URL
        }/CartMaster/UpdateCart/${id}/${localStorage.getItem(
          "userid"
        )}/${cartId}/${updatedCartData[index].quantity}`,
        {},
        config
      )
      .then((res) => {})
      .catch((err) => {});
  };

  const onDecrement = (index, id, cartId) => {
    const updatedCartData = [...cartdata];

    updatedCartData[index] = {
      ...updatedCartData[index],
      quantity: updatedCartData[index].quantity - 1,
    };
    if (updatedCartData[index].quantity === 0) {
      updatedCartData[index].quantity = 1;
    }
    updatedCartData[index].subtotal =
      updatedCartData[index].quantity *
      updatedCartData[index].productResponse.sellingPrice;

    setcartdata(updatedCartData);

    axios
      .put(
        `${
          import.meta.env.VITE_URL
        }/CartMaster/UpdateCart/${id}/${localStorage.getItem(
          "userid"
        )}/${cartId}/${updatedCartData[index].quantity}`,
        {},
        config
      )
      .then((res) => {})
      .catch((err) => {});
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

  const handleDelete = (index, id, cartid) => {
    let newCartdata =
      cartdata.length > 0 &&
      cartdata.filter((data, ind) => {
        return ind !== index;
      });
    setcartdata(newCartdata);
    axios
      .delete(
        `http://13.200.180.167:9731/CartMaster/deleteByProductId/${id}/${parseInt(
          localStorage.getItem("userid")
        )}/${cartid}`,
        config
      )
      .then((res) => {})
      .catch((err) => {});
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
                <img src="images/logo.png" alt="logo" width="171" height="41" />
              </a>
            </div>
            <div className="header-center">
              <nav className="main-nav">
                <ul className="menu">
                  <li className={home ? "active" : ""}>
                    <a
                      onClick={() => {
                        home1();
                        navigate("/");
                      }}
                    >
                      Home
                    </a>
                  </li>
                  <li className={shop ? "active" : ""}>
                    <a
                      onClick={() => {
                        shop1();
                        navigate("/");
                      }}
                    >
                      Shop
                    </a>
                  </li>
                  <li className={about ? "active" : ""}>
                    <a
                      onClick={() => {
                        about1();
                        navigate("/");
                      }}
                    >
                      About Us
                    </a>
                  </li>
                  <li className={contact ? "active" : ""}>
                    <a
                      onClick={() => {
                        contact1();
                        navigate("/");
                      }}
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
              <div className="dropdown login-dropdown off-canvas">
                {loggedin ? (
                  <button
                    onClick={() => {
                      localStorage.clear();
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
                  <a className="login-toggle" href="" data-toggle="login-modal">
                    <i className="p-icon-user-solid mr-2"></i>
                    <span className="">login/Signup</span>
                  </a>
                )}

                <div className="canvas-overlay"></div>
                <a href="#" className="btn-close"></a>
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
                                <a href="#" className="lost-link">
                                  Lost your password?
                                </a>
                              </div>
                              <button
                                className="btn btn-dark btn-block"
                                type="submit"
                              >
                                Login
                              </button>
                            </form>
                            <div className="form-choice text-center">
                              <label>or Login With</label>
                              <div className="social-links social-link-active">
                                <a
                                  href="#"
                                  title="Facebook"
                                  className="social-link social-facebook fab fa-facebook-f"
                                ></a>
                                <a
                                  href="#"
                                  title="Twitter"
                                  className="social-link social-twitter fab fa-twitter"
                                ></a>
                                <a
                                  href="#"
                                  title="Linkedin"
                                  className="social-link social-linkedin fab fa-linkedin-in"
                                ></a>
                              </div>
                            </div>
                          </div>
                          <div className="tab-pane" id="register">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
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
                              </button>
                            </form>
                            <div className="form-choice text-center">
                              <label className="ls-m">or Register With</label>
                              <div className="social-links social-link-active">
                                <a
                                  href="#"
                                  title="Facebook"
                                  className="social-link social-facebook fab fa-facebook-f"
                                ></a>
                                <a
                                  href="#"
                                  title="Twitter"
                                  className="social-link social-twitter fab fa-twitter"
                                ></a>
                                <a
                                  href="#"
                                  title="Linkedin"
                                  className="social-link social-linkedin fab fa-linkedin-in"
                                ></a>
                              </div>
                            </div>
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
                        {cartdata.length > 0 && cartdata.length}
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
                                  {data.productResponse.sellingPrice.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
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
                        {cartdata.length > 0 &&
                          cartdata
                            .reduce((acc, curr) => {
                              return acc + curr.subtotal;
                            }, 0)
                            .toFixed(2)}
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
        <div className="mobile-menu-wrapper">
          <div className="mobile-menu-overlay"></div>

          <a className="mobile-menu-close" href="#">
            <i className="p-icon-times"></i>
          </a>

          <div className="mobile-menu-container scrollable">
            <ul className="mobile-menu mmenu-anim">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/shopview">Shop</a>
              </li>
              <li>
                <a className="mobile-menu-overlay" onClick={about1}>
                  About Us
                </a>
              </li>
              <li>
                <a className="mobile-menu-overlay" onClick={contact1}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main className="main cart">
        <div className="page-content pt-8 pb-10 mb-4">
          <div className="step-by">
            <h3 className="title title-step active">
              <a>1.Shopping Cart</a>
            </h3>
            <h3 className="title title-step">
              <a href="/checkout">2.Checkout</a>
            </h3>
            <h3 className="title title-step">
              <a>3.Order Complete</a>
            </h3>
          </div>
          {cartdata.length === 0 ? (
            <div className="loader-viewpage">
              {" "}
              <Loader
                type="bubble-scale"
                bgColor={"#163b4d"}
                color={"blue"}
                size={50}
              />
            </div>
          ) : (
            <div className="container mt-7 mb-2">
              <div className="row">
                <div className="col-lg-8 col-md-12 pr-lg-6">
                  <table className="shop-table cart-table">
                    <thead>
                      <tr>
                        <th>
                          <span>Product</span>
                        </th>
                        <th></th>
                        <th>
                          <span>Price</span>
                        </th>
                        <th>
                          <span>quantity</span>
                        </th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartdata.length > 0 &&
                        cartdata.map((cart, index) => (
                          <tr key={index}>
                            <td className="product-thumbnail">
                              <figure>
                                <a>
                                  {cart.productResponse.productImages &&
                                  cart.productResponse.productImages.length >
                                    0 ? (
                                    <img
                                      src={
                                        cart.productResponse.productImages[0]
                                          .imageUrl
                                      }
                                      width="90"
                                      height="112"
                                      alt="product"
                                    />
                                  ) : (
                                    <div>no images</div>
                                  )}
                                </a>
                              </figure>
                            </td>
                            <td className="product-name">
                              <div className="product-name-section">
                                <a href="product-simple.html">
                                  {cart.productResponse.productName}
                                </a>
                              </div>
                            </td>
                            <td className="product-subtotal">
                              <span className="amount">
                                {cart.productResponse.sellingPrice.toFixed(2)}
                              </span>
                            </td>
                            <td className="product-quantity">
                              <div className="input-group">
                                <button
                                  className="quantity-minus p-icon-minus-solid"
                                  onClick={() => {
                                    onDecrement(
                                      index,
                                      cart.productResponse.productId,
                                      cart.cartId
                                    );
                                  }}
                                ></button>
                                <input
                                  className=" form-control"
                                  type="number"
                                  value={cart.quantity}
                                  min="1"
                                  onChange={() => {}}
                                  max="1000000"
                                />
                                <button
                                  className="quantity-plus p-icon-plus-solid"
                                  onClick={() => {
                                    onIncrement(
                                      index,
                                      cart.productResponse.productId,
                                      cart.cartId
                                    );
                                  }}
                                ></button>
                              </div>
                            </td>
                            <td className="product-price">
                              <span className="amount">
                                {cart.subtotal.toFixed(2)}
                              </span>
                            </td>
                            <td className="product-remove">
                              <a
                                onClick={() => {
                                  handledeletecart(
                                    index,
                                    cart.productResponse.productId,
                                    cart.cartId
                                  );
                                }}
                                className="btn-remove"
                                title="Remove this product"
                              >
                                <i className="p-icon-times"></i>
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="cart-actions mb-6 pt-6">
                    <a className="btn btn-dim btn-icon-left mr-4 mb-4">
                      <i className="p-icon-arrow-long-left"></i>Continue
                      Shopping
                    </a>
                  </div>
                </div>
                <aside className="col-lg-4 sticky-sidebar-wrapper">
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 20}"
                  >
                    <div className="summary mb-4">
                      <h3 className="summary-title">Cart Totals</h3>

                      <table className="shipping mb-2">
                        <tbody>
                          {cartdata.length > 0 &&
                            cartdata.map((cart, index) => (
                              <tr className="summary-subtotal" key={index}>
                                <td>
                                  <h4>
                                    {cart.productResponse.productName} x &nbsp;
                                    {cart.quantity}
                                  </h4>
                                </td>
                                <td>
                                  <p>{cart.subtotal.toFixed(2)} SAR</p>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>

                      <table className="total">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle">Total</h4>
                            </td>
                            <td>
                              <p className="summary-total-price ls-s">
                                {cartdata.length > 0 &&
                                  cartdata
                                    .reduce((acc, curr) => {
                                      return acc + curr.subtotal;
                                    }, 0)
                                    .toFixed(2)}{" "}
                                SAR
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <a
                        onClick={handlecheckout}
                        className="btn btn-dim btn-checkout btn-block"
                      >
                        Proceed to checkout
                      </a>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Viewcart;
