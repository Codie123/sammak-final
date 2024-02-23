import React, { useState, useEffect, useContext } from "react";
import HeroSlider from "../heroSlider/HeroSlider";
import style from "./Herohome.module.css";
import axios from "axios";
import Loader from "react-js-loader";
import AllContext from "../../src/Context/Context";
import { useNavigate } from "react-router-dom";
import SliderMain from "../SliderMain/SliderMain";
import SpecialSection from "../SpecialSection/SpecialSection";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../../main.js";
function Herohome() {
  const [data, setdata] = useState([]);
  const {
    id,
    setid,
    cart,
    setcart,
    productinfo,
    setproductinfo,
    data1,
    setdata1,
  } = useContext(AllContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/Product/post`)
      .then((res) => {
        setdata(res.data.result);
        setdata1(res.data.result);
        setproductinfo(res.data.result);
        localStorage.setItem("products", JSON.stringify(res.data.result));
      })
      .catch((err) => {});
  }, []);

  const onCart = () => {
    navigate("/shop");
  };
  let recentItems = JSON.parse(localStorage.getItem("recentItems"));

  return (
    <div>
      {data.length === 0 ? (
        <div className={style.beforeload}>
          {" "}
          <div className={style.home_loader}>
            {" "}
            <Loader
              type="bubble-scale"
              bgColor={"#163b4d"}
              color={"blue"}
              size={50}
            />
          </div>
        </div>
      ) : (
        <main className="main">
          <div className="page-content">
            {/* <div className="scroll-watch">

          </div> */}

            {/* Hero section  */}
            <SliderMain />
            {/* <Slider /> */}

            {/* top products  */}
            <section
              className="container mt-10 pt-7 mb-7 appear-animate fadeIn appear-animation-visible"
              style={{ animationDuration: "1.2s" }}
            >
              <h2 className="title-underline2 shop-title text-center mb-2">
                <span>Top Products</span>
              </h2>
              <div className="row tab-pane active">
                {data.length > 0 &&
                  Array.isArray(data) &&
                  data
                    .map((field, index) => (
                      <div
                        className="product-wrap shop-home col col-sm-6 col-lg-3"
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
                        <div
                          className="product-media"
                          style={{ cursor: "pointer" }}
                        >
                          <LazyLoadImage
                            alt="product"
                            style={{
                              width: "295",
                              height: "369",
                            }}
                            effect="blur"
                            src={
                              field.images.length > 0
                                ? field.images[0].imageUrl
                                : ""
                            }
                          />
                        </div>

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
                    ))
                    .slice(0, 4)}
              </div>
              <div className="row justify-content-center">
                <button
                  className="view-all"
                  onClick={() => navigate("/shopview")}
                >
                  View More
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.33631e-05 5.00001C8.33515e-05 5.13262 0.0527614 5.25979 0.14653 5.35356C0.240298 5.44733 0.367475 5.50001 0.500083 5.50001L12.2931 5.50001L9.14608 8.64601C9.0996 8.6925 9.06272 8.74769 9.03756 8.80843C9.0124 8.86916 8.99945 8.93426 8.99945 9.00001C8.99945 9.06575 9.0124 9.13085 9.03756 9.19159C9.06272 9.25233 9.0996 9.30752 9.14608 9.35401C9.19257 9.4005 9.24776 9.43737 9.3085 9.46253C9.36924 9.48769 9.43434 9.50064 9.50008 9.50064C9.56583 9.50064 9.63093 9.48769 9.69167 9.46253C9.75241 9.43737 9.8076 9.4005 9.85408 9.35401L13.8541 5.35401C13.9006 5.30756 13.9376 5.25239 13.9628 5.19164C13.988 5.1309 14.001 5.06578 14.001 5.00001C14.001 4.93424 13.988 4.86912 13.9628 4.80838C13.9376 4.74763 13.9006 4.69246 13.8541 4.64601L9.85408 0.646009C9.8076 0.599521 9.75241 0.562645 9.69167 0.537486C9.63093 0.512327 9.56583 0.499378 9.50008 0.499378C9.43434 0.499378 9.36924 0.512327 9.3085 0.537486C9.24776 0.562645 9.19257 0.599521 9.14608 0.646009C9.0996 0.692497 9.06272 0.747686 9.03756 0.808425C9.0124 0.869165 8.99945 0.934266 8.99945 1.00001C8.99945 1.06575 9.0124 1.13085 9.03756 1.19159C9.06272 1.25233 9.0996 1.30752 9.14608 1.35401L12.2931 4.50001L0.500083 4.50001C0.367475 4.50001 0.240298 4.55269 0.14653 4.64645C0.0527615 4.74022 8.33747e-05 4.8674 8.33631e-05 5.00001Z"
                      fill="#88B4BE"
                    />
                  </svg>
                </button>
              </div>
            </section>

            {/* Recent products */}
            {recentItems.length > 0 ? (
              <section
                className="container mt-10 pt-7 mb-7 appear-animate fadeIn appear-animation-visible"
                style={{
                  animationDuration: "1.2s",
                }}
              >
                <h2 className="title-underline2 shop-title text-center mb-2">
                  <span>Order again</span>
                </h2>
                <div className="row tab-pane active">
                  {recentItems.length > 0 &&
                    Array.isArray(recentItems) &&
                    recentItems
                      .map((field, index) => (
                        <div
                          className="product-wrap shop-home col col-sm-6 col-lg-3"
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
                          <div
                            className="product-media"
                            style={{ cursor: "pointer" }}
                          >
                            <LazyLoadImage
                              alt="product"
                              style={{
                                width: "295",
                                height: "369",
                              }}
                              effect="blur"
                              src={
                                field.images.length > 0
                                  ? field.images[0].imageUrl
                                  : ""
                              }
                            />
                          </div>

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
                      ))
                      .slice(0, 4)}
                </div>
              </section>
            ) : (
              ""
            )}

            <SpecialSection />
          </div>
        </main>
      )}
    </div>
  );
}

export default Herohome;
