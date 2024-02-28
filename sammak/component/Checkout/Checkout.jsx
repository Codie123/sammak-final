import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import AllContext from "../../src/Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "react-js-loader";
import "../../main.js";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
function Checkout() {
  const [loginuser, setloginuser] = useState({ email: "", password: "" });
  const [registeruser, setregisteruser] = useState({
    emailId: "",
    password: "",
    userName: "",
  });
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
  const [cartdata, setcartdata] = useState("");
  const [cod, setcod] = useState(false);
  const [total, settotal] = useState("");
  const [loading, setloading] = useState(false);

  const [checkoutform, setcheckoutform] = useState({
    additionalInfo: "non",
    address: "",
    city: "",
    country: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    pinCode: "",
    state: "",
  });
  useEffect(() => {
    if (!loggedin) {
      navigate("/");
    }
  }, []);

  const cartinfo = JSON.parse(localStorage.getItem("cartinfo"));
  const userid = localStorage.getItem("userid");

  const parseUserid = JSON.parse(userid);

  let totalamount =
    cartinfo &&
    cartinfo.length > 0 &&
    cartinfo.reduce((acc, curr) => {
      return acc + curr.quantity * curr.sellingPrice;
    }, 0);
  console.log(totalamount);

  const [paytabinfo, setpaytabinfo] = useState({
    callback: "String",
    cart_amount: `${totalamount}`,
    cart_currency: "SAR",
    cart_description: "Fish",
    cart_id: "12",
    customer_details: {
      city: "",
      country: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      state: "",
      street1: "",
      zip: "",
    },
    hide_shipping: true,
    paymentMode: "online",
    paypage_lang: "en",
    profile_id: 0,
    tran_class: "ecom",
    tran_type: "sale",
    userId: `${parseUserid}`,
  });

  //

  const [data, setdata] = useState("");
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
  }, []);

  const login = () => {
    axios
      .post(`${import.meta.env.VITE_URL}/v1/auth/login`, loginuser)
      .then((res) => {
        localStorage.setItem("userid", res.data.result.userId);
        localStorage.setItem("token", res.data.result.accessToken);
        window.location.reload();
      })
      .catch((err) => {});
  };
  useEffect(() => {
    let cart = localStorage.getItem("cart");

    if (cart) {
      let parseCart = JSON.parse(cart);
      setcartdata(parseCart);
    }
  }, []);

  const token = localStorage.getItem("token");

  let cartmin = cart.reduce((acc, curr) => {
    let data = [
      {
        cleaningType: curr.smallDescription,
        id: curr.id,
        quantity: curr.quantity,
      },
    ];
    return acc.concat(data);
  }, []);
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ` + token,
    },
  };
  const isAnyfieldEmpty = () => {
    return Object.values(checkoutform).some((value) => value === "");
  };
  const handlePlace = (e) => {
    e.preventDefault();
    setloading(true);
    if (isAnyfieldEmpty()) {
      toast.error("Enter all the fields", {
        autoClose: 700,
        position: "top-center",
        closeOnClick: true,
      });
    } else {
      axios
        .post(
          `${
            import.meta.env.VITE_URL
          }/Address/AddAddress/${localStorage.getItem("userid")}`,
          checkoutform,
          config
        )
        .then((res) => {
          axios
            .post(
              `${
                import.meta.env.VITE_URL
              }/cart/addListToCart?userId=${localStorage.getItem("userid")}`,
              cartmin,
              config
            )
            .then((res) => {
              handlepaytabs();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          toast.error("Oops! Something went wrong", {
            autoClose: 700,
            position: "top-center",
            closeOnClick: true,
          });
        });
    }
  };

  useEffect(() => {
    if (!loggedin) {
      navigate("/");
    }
  }, []);

  const handlepaytabs = () => {
    axios
      .post(`${import.meta.env.VITE_URL}/checkOut/fromCart`, paytabinfo, config)
      .then((response) => {
        setloading(false);
        if (cod) {
          navigate("/ordercomplete");
        } else {
          window.location.href = response.data.result;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      <ToastContainer />
      <Header
        homeValue={false}
        shopValue={true}
        aboutValue={false}
        contactValue={false}
      />

      <main className="main checkout">
        <div className="page-content pt-8 pb-10 mb-4">
          <div className="step-by pr-4 pl-4">
            <h3 className="title title-step">
              <a href="/viewcart">1. Shopping Cart</a>
            </h3>
            <h3 className="title title-step active">
              <a>2. Checkout</a>
            </h3>
            <h3 className="title title-step">
              <a>3. Order Complete</a>
            </h3>
          </div>
          <div className="container mt-7">
            <form onSubmit={handlePlace} className="form" autoComplete="off">
              <div className="row">
                <div className="col-lg-7 mb-6 mb-lg-0 check-detail">
                  <h3 className="title text-left mt-3 mb-6">Billing Details</h3>
                  <div className="row">
                    <div className="col-xs-6">
                      <label>First Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        name="first-name"
                        onInput={(e) => {
                          setcheckoutform({
                            ...checkoutform,
                            firstName: e.target.value,
                          });
                          setpaytabinfo({
                            ...paytabinfo,
                            customer_details: {
                              ...paytabinfo.customer_details,
                              firstName: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="col-xs-6">
                      <label>Last Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        name="last-name"
                        onInput={(e) => {
                          setcheckoutform({
                            ...checkoutform,
                            lastName: e.target.value,
                          });
                          setpaytabinfo({
                            ...paytabinfo,
                            customer_details: {
                              ...paytabinfo.customer_details,
                              lastName: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>

                  <label>Country / Region*</label>
                  <div className="select-box">
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      onInput={(e) => {
                        setcheckoutform({
                          ...checkoutform,
                          country: e.target.value,
                        });
                        setpaytabinfo({
                          ...paytabinfo,
                          customer_details: {
                            ...paytabinfo.customer_details,
                            country: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <label> Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address1"
                    placeholder="House number and street name"
                    onInput={(e) => {
                      setcheckoutform({
                        ...checkoutform,
                        address: e.target.value,
                      });
                      setpaytabinfo({
                        ...paytabinfo,
                        customer_details: {
                          ...paytabinfo.customer_details,
                          street1: e.target.value,
                        },
                      });
                    }}
                  />
                  <div className="row">
                    <div className="col-xs-6">
                      <label>Town / City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        onInput={(e) => {
                          setcheckoutform({
                            ...checkoutform,
                            city: e.target.value,
                          });
                          setpaytabinfo({
                            ...paytabinfo,
                            customer_details: {
                              ...paytabinfo.customer_details,
                              city: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="col-xs-6">
                      <label>State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        onInput={(e) => {
                          setcheckoutform({
                            ...checkoutform,
                            state: e.target.value,
                          });
                          setpaytabinfo({
                            ...paytabinfo,
                            customer_details: {
                              ...paytabinfo.customer_details,
                              state: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6">
                      <label>Postcode / ZIP*</label>
                      <input
                        type="number"
                        className="form-control"
                        name="zip"
                        onInput={(e) => {
                          setcheckoutform({
                            ...checkoutform,
                            pinCode: e.target.value,
                          });
                          setpaytabinfo({
                            ...paytabinfo,
                            customer_details: {
                              ...paytabinfo.customer_details,
                              zip: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="col-xs-6">
                      <label>Phone*</label>
                      <input
                        type="number"
                        className="form-control"
                        name="phone"
                        onInput={(e) => {
                          setcheckoutform({
                            ...checkoutform,
                            phoneNumber: e.target.value,
                          });
                          setpaytabinfo({
                            ...paytabinfo,
                            customer_details: {
                              ...paytabinfo.customer_details,
                              phone: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <label>Email Address*</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email-address"
                    onInput={(e) => {
                      setcheckoutform({
                        ...checkoutform,
                        email: e.target.value,
                      });
                      setpaytabinfo({
                        ...paytabinfo,
                        customer_details: {
                          ...paytabinfo.customer_details,
                          email: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <aside className="col-lg-5 sticky-sidebar-wrapper pl-lg-6">
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 50}"
                  >
                    <div className="summary pt-5">
                      <h3 className="title">Your Order</h3>
                      <table>
                        <thead>
                          <tr>
                            <th
                              style={{
                                position: "relative",
                                right: "-13vh",
                                padding: "2vh",
                                bottom: "2vh",
                                color: "",
                              }}
                            >
                              Product
                            </th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.length > 0 &&
                            cart.map((cart, index) => (
                              <tr key={index}>
                                <td className="product-name">
                                  {cart.productName}
                                  <span className="product-quantity">
                                    ×&nbsp;{cart.quantity}
                                  </span>
                                </td>
                                <td className="product-total text-body">
                                  {cart.quantity * cart.sellingPrice} SAR
                                </td>
                              </tr>
                            ))}

                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle">Total</h4>
                            </td>
                            <td className="summary-total-price ls-s">
                              {totalamount} SAR
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="payment accordion radio-type pb-5">
                        <h4 className="summary-subtitle ls-m pb-3">
                          Payment Methods
                        </h4>
                        <div className="card">
                          <div className="card-header">
                            <a
                              href="#collapse1"
                              className="collapse"
                              onClick={() => {
                                setpaytabinfo({
                                  ...paytabinfo,
                                  paymentMode: "online",
                                });
                                setcod(false);
                              }}
                            >
                              Online
                            </a>
                          </div>
                          <div
                            id="collapse1"
                            className="expanded"
                            style={{ display: "block" }}
                          >
                            <div className="card-body">
                              Pay with debit/Credit card
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header">
                            <a
                              href="#collapse2"
                              className="expand"
                              onClick={() => {
                                setpaytabinfo({
                                  ...paytabinfo,
                                  paymentMode: "COD",
                                });
                                setcod(true);
                              }}
                            >
                              Cash on delivery
                            </a>
                          </div>
                          <div id="collapse2" className="collapsed">
                            <div className="card-body">
                              Pay with cash upon delivery.
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-dim btn-block mt-6"
                        onClick={handlePlace}
                      >
                        Place Order
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
                    </div>
                  </div>
                </aside>
              </div>
            </form>
          </div>
        </div>
      </main>

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
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
