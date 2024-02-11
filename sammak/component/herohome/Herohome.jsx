import React, { useState, useEffect, useContext } from "react";
import HeroSlider from "../heroSlider/HeroSlider";
import style from "./Herohome.module.css";
import axios from "axios";
import Loader from "react-js-loader";
import AllContext from "../../src/Context/Context";
import { useNavigate } from "react-router-dom";
import SliderMain from "../SliderMain/SliderMain";
import SpecialSection from "../SpecialSection/SpecialSection";
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
            {/* Hero section  */}
            <SliderMain />
            {/* <Slider /> */}

            {/* top products  */}
            <section
              className="container mt-10 pt-7 mb-7 appear-animate fadeIn appear-animation-visible"
              style={{ animationDuration: "1.2s" }}
            >
              <h2 className="title-underline2 text-center mb-2">
                <span>Top Products</span>
              </h2>
              <div className="tab tab-nav-center product-tab product-tab-type2">
                <div className="tab-content">
                  <div className="tab-pane active" id="canned">
                    <div className="page-content mb-10 shop-page shop-horizontal">
                      <div className="container">
                        <div className="row product-wrapper cols-lg-5 cols-md-4 cols-sm-3 cols-2">
                          {data.length > 0 &&
                            Array.isArray(data) &&
                            data
                              .map((field, index) => (
                                <div
                                  className="product-wrap"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                  key={index}
                                  onClick={() => {
                                    setid(field.id);
                                    localStorage.setItem("id", field.id);
                                    onCart();
                                    window.location.reload();
                                  }}
                                >
                                  <div className="product shadow-media text-center">
                                    <figure
                                      className="product-media"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <a>
                                        <img
                                          src={
                                            field.images.length > 0
                                              ? field.images[0].imageUrl
                                              : ""
                                          }
                                          alt="product"
                                          style={{
                                            width: "295",
                                            height: "369",
                                          }}
                                          className="homelistingimg"
                                        />
                                        <img
                                          src={
                                            field.images.length > 0
                                              ? field.images[0].imageUrl
                                              : ""
                                          }
                                          alt="product"
                                          style={{
                                            width: "295",
                                            height: "369",
                                          }}
                                        />
                                      </a>

                                      {/* Product actions */}
                                    </figure>
                                    <div className="product-details">
                                      <div className="ratings-container">
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
                                      <h5 className="product-name">
                                        <a
                                          href="product-simple.html"
                                          style={{
                                            color: "#163b4d",
                                            fontWeight: "600",
                                            scale: "1.1",
                                          }}
                                        >
                                          {field.productName}
                                        </a>
                                      </h5>
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
                                  </div>
                                </div>
                              ))
                              .slice(0, 5)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <SpecialSection />
          </div>
        </main>
      )}
    </div>
  );
}

export default Herohome;
