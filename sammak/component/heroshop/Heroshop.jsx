import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AllContext from "../../src/Context/Context";
import Herocart from "../herocart/Herocart";
import { useNavigate } from "react-router-dom";
import Loader from "react-js-loader";
import style from "./Heroshop.module.css";
import "../../main.js";
import { CCard, CCardBody, CCardImage, CCardSubtitle, CCardTitle, CCol, CRow } from '@coreui/react'
function Heroshop() {
  const [data, setdata] = useState("");
  const {
    id,
    setid,
    cart,
    setcart,
    productinfo,
    setproductinfo,
    search,
    setsearch,
  } = useContext(AllContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/Product/post`)
      .then((res) => {
        setdata(res.data.result);
        setproductinfo(res.data.result);
        localStorage.setItem("products", JSON.stringify(res.data.result));
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    let newdata =
      data.length > 0 &&
      data.filter((info) => {
        info.productName.includes(search);
      });
    setdata(newdata);
  }, [search]);

  const onCart = () => {
    navigate("/shop");
  };

  return (
    <main className="main">
      {/* page Header */}
      <div className="page-header shop-hero cph-header pl-4 pr-4">
        <h1 className="page-title font-weight-light text-capitalize">
          Sammak Shop
        </h1>
        {/* Category container */}
      </div>
      {/* ends */}

      {/* breadcrumps  */}
      <nav className="breadcrumb-nav has-border">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Shop</li>
          </ul>
        </div>
      </nav>
      {/* ends */}

      {/* page content static container */}
      <div className="page-content mb-10 shop-page shop-horizontal">
        <div className="container">
          <CRow xs={{ cols: 1 }}  className="g-4">
            {/* Product 1 */}
            {data.length === 0 && (
              <div className={style.beforeload}>
                {" "}
                <div className={style.loader_content}>
                  {" "}
                  <Loader
                    type="bubble-scale"
                    bgColor={"#163b4d"}
                    color={"blue"}
                    size={50}
                  />
                </div>
              </div>
            )}


            {data.length > 0 &&
              Array.isArray(data) &&
              data.map((field, index) => (
              
                <CCol
                className="col-6 col-sm-4 col-md-4 col-lg-3"
                  key={index}
                 
                >
                  <CCard className="">
                  <CCardImage  src={
                            field.images.length > 0
                              ? field.images[0].imageUrl
                              : ""
                          } />

                    <CCardBody>
                    <div className="ratings-container">
                      <div className="ratings-full">
                        <span
                          className="ratings"
                          style={{ width: "60%" }}
                        ></span>
                        <span className="tooltiptext tooltip-top">3.00</span>
                      </div>
                          <a
                            href="javascript:void(0);"
                            className="rating-reviews"
                          >
                            ({Math.floor(Math.random() * 20 + 5)})
                          </a>
                    </div>
                      {/* <div className="ratings-container">
                        <div className="ratings-full">
                          <span
                            className="ratings"
                            style={{ width: "60%" }}
                          ></span>
                          <span className="tooltiptext tooltip-top">3.00</span>
                        </div>
                        <a
                          href="javascript:void(0);"
                          className="rating-reviews"
                        >
                          (12)
                        </a>
                      </div> */}
                      <CCardTitle>{field.productName}</CCardTitle>
                        
                     <CCardSubtitle>
                      <del className="old-price">
                        SAR {field.originalPrice} 
                        </del>
                        <ins
                          className="new-price"
                          style={{ fontWeight: "bold" }}
                        >
                          SAR {field.sellingPrice} 
                        </ins>
                       
                        </CCardSubtitle>
                        <div class="btn-cnt">
                          <a class="buy-btn" 
                           onClick={() => {
                            setid(field.id);
                            localStorage.setItem("id", field.id);
                            onCart();
                            window.location.reload();
                          }}
                          >Buy Now
                          </a>    
                        </div>
                      
                    </CCardBody>
                  </CCard>
                </CCol>
             
              ))}


            {/* Product 2 */}
            {/* ... Other products */}
          </CRow>
        </div>
      </div>
      {/* ends */}
      {cart ? <Herocart /> : ""}
    </main>
  );
}

export default Heroshop;
