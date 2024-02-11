import React, { useState, useEffect } from "react";
import "../../main.js";
import "../../css/demo1.min.css"
import axios from "axios";

const SpecialSection = () => {
  const [data, setdata] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/getallproducts")
      .then((res) => {
       
        setdata(res.data.allproducts);
      })
      .catch((err) => {
        
      });
  }, []);
  axios
    .get("http:localhost:3000/getallproducts")
    .then((res) => {})
    .catch((err) => {});
  return (
    <section className="benefit-section appear-animate fadeIn appear-animation-visible" style={{ background: "rgb(250, 250, 248)",animationDuration: "1.2s"}}>
    <div className="container">
    <h4 className="subtitle title-underline2 text-uppercase text-center"><span>Why Top Products?</span>
    </h4>
    <h2 className="title justify-content-center text-center pb-6 mb-10">100% Natural, 100% Organic</h2>
    <figure className="img-back floating">
    <img className="layer spec-img" src="images/demos/demo1/banner/banner1.jpg"  alt="banner"/>
    </figure>
    <div className="row appear-animate fadeIn appear-animation-visible" style={{ animationDuration: "1.2s" }}>
    <div className="col-md-6">
    <div className="icon-box ml-md-4">
    <span className="icon-box-icon">
    <i className="p-icon-heartbeat-solid" style={{ fontSize: "2.05em" }}></i>
    </span>
    <div className="icon-box-content">
    <h4 className="icon-box-title">Good for Health</h4>
    <p>Lorem ipsum dolor sit amet, consectetur
    eiusmod tempor incididunt ut labore.</p>
    </div>
    </div>
    </div>
    <div className="col-md-6 pos-right">
    <div className="icon-box mr-md-4">
    <span className="icon-box-icon" style={{ marginBottom: "1.9rem" }}>
    <i className="p-icon-quality"></i>
    </span>
    <div className="icon-box-content">
    <h4 className="icon-box-title">High Nutrition</h4>
    <p>Lorem ipsum dolor sit amet, consectetur
    eiusmod tempor incididunt ut labore.</p>
    </div>
    </div>
    </div>
    <div className="col-md-6">
    <div className="icon-box ml-md-4">
    <span className="icon-box-icon" style={{ marginBottom: "1.9rem" }}>
    <i className="p-icon-fruit"></i>
    </span>
    <div className="icon-box-content">
    <h4 className="icon-box-title">Always Fresh</h4>
    <p>Lorem ipsum dolor sit amet, consectetur
    eiusmod tempor incididunt ut labore.</p>
    </div>
    </div>
    </div>
    <div className="col-md-6 pos-right">
    <div className="icon-box mr-md-4">
    <span className="icon-box-icon" style={{ marginBottom: "1.9rem" }}>
    <i className="p-icon-filter" style={{ fontSize: "1.9em" }}></i>
    </span>
    <div className="icon-box-content">
    <h4 className="icon-box-title">No Fertilizer</h4>
    <p>Lorem ipsum dolor sit amet, consectetur
    eiusmod tempor incididunt ut labore.</p>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
  );
};

export default SpecialSection;
