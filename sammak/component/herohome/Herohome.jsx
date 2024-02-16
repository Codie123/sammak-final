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
              <h2 className="title-underline2 shop-title text-center mb-2">
                <span>Top Products</span>
              </h2>
              <div className="row tab-pane active">
              {data.length > 0 &&
                            Array.isArray(data) &&
                            data
                              .map((field, index) => (
                                <div className="product-wrap shop-home col col-sm-6 col-lg-3"
                                  style={{display: "flex",flexDirection: "column",alignItems:"center",cursor:"pointer"}}
                                  key={index}
                                  onClick={() => {setid(field.id);localStorage.setItem("id", field.id);onCart();}}>
                                 
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
                                          style={{
                                            width: "295",
                                            height: "369",
                                          }}
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
                              ))
                              .slice(0, 4)}
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
