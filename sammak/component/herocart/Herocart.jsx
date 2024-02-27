import React, { useContext, useEffect, useState } from "react";
import "./Herocart.css";
import Header from "../Header";
import Footer from "../Footer";
import AllContext from "../../src/Context/Context";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Loader from "react-js-loader";

import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import "../../main.js";
import "../../vendor/owl-carousel/owl.carousel.min.js";
import { jwtDecode } from "jwt-decode";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Virtual } from "swiper/modules";

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

  const [Allproduct, setAllProducts] = useState(
    JSON.parse(localStorage.getItem("products"))
  );
  const [allcart, setallcart] = useState(
    JSON.parse(localStorage.getItem("cartinfo"))
  );

  const [localcart, setlocalCart] = useState([]);

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
      console.log(filterproduct);
    }
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
    setcart,
    id,
    productinfo,
    isloggedin,
    setid,
  } = useContext(AllContext);
  // authentication

  // ends
  // configuration for api
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ` + token,
    },
  };
  // ends

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

  if (data) {
  }

  function isTokenExpired(token) {
    const expiration = new Date(token.exp * 1000);
    return Date.now() >= expiration; //return true or false
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

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If the product is already in the cart, update quantity
      updateQuantity(product.id, existingProduct.quantity + quantity);
      toast.success("Product added", {
        autoClose: 3000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
      });
    } else {
      // If the product is not in the cart, add it
      setcart((prevCart) => [
        ...prevCart,
        { ...product, smallDescription: cleaning, quantity: quantity },
      ]);
      localStorage.setItem(
        "cartinfo",
        JSON.stringify([...cart, { ...product, quantity: quantity,smallDescription: cleaning }])
      );
      toast.success("Product added", {
        autoClose: 3000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (cart) {
      const updatedCart = cart.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });
      setcart(updatedCart);
      localStorage.setItem("cartinfo", JSON.stringify(updatedCart));
    }
  };
  const removeFromCart = (productId) => {
    setcart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <>
      <Header
        homeValue={false}
        shopValue={true}
        aboutValue={false}
        contactValue={false}
      />

      <main className="main single-product">
        <nav className="breadcrumb-nav">
          <div className="container">
            <div className="product-navigation">
              <ul className="breadcrumb">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/shopview">Products</a>
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
                <Swiper
                  rewind={true}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
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
                      {" "}
                      SAR {data.length > 0 && data[0].originalPrice}{" "}
                    </del>
                    <ins className="new-price">
                      {" "}
                      SAR {data.length > 0 && data[0].sellingPrice}{" "}
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
                        <input
                          className="quantity form-control"
                          type="number"
                          min="1"
                          max="1000000"
                          value={quantity}
                        />
                        <button
                          className="quantity-plus p-icon-plus-solid"
                          onClick={addquantity}
                        ></button>
                      </div>
                      <button
                        className="btn-cart ls-normal font-weight-semi-bold"
                        disabled={false}
                        onClick={() => {
                          addToCart(data[0]);
                        }}
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
                slidesPerView={3}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1025: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
                navigation={true}
                virtual
              >
                {Allproduct.length > 0 && Array.isArray(Allproduct) ? (
                  Allproduct.map((field, index) => (
                    <SwiperSlide key={field} virtualIndex={index}>
                      <div
                        className="product-wrap shop-home col "
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          cursor: "pointer",
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
                            <h5
                              className="product-name"
                              style={{
                                color: "#163b4d",
                                fontWeight: "600",
                                fontSize: "1.3em",
                              }}
                            >
                              {field.productName}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )).slice(0, 4)
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
            <ul className="mobile-menu mmenu-anim">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/shopview">Shop</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Toaster />
      <Footer />
    </>
  );
}

export default Herocart;
