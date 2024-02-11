import React, { useEffect, useState, useContext } from "react";
import axios, { Axios } from "axios";
import AllContext from "../../src/Context/Context";
import '../../main.js'
function HeroSlider(props) {
  const { heroSilderData, setheroSliderData } = useContext(AllContext);

  return (
    <>
      <section className="intro-section">
        <div
          className="
          tBody intro-slider owl-carousel owl-theme owl-nav-arrow row animation-slider cols-1 gutter-no mb-8"
          data-owl-options="{'nav': true, 'dots': false, 'loop': true, 'items': 1, 'responsive': {'0': {'nav': false, 'autoplay': true}, '768': {'nav': true}}}"
        >
          {heroSilderData.length > 0 &&
            heroSilderData.map((data, index) => (
              <div
                className="banner banner-fixed banner1"
                data-index="1"
                key={index}
              >
                <figure>
                  <img
                    src={data.imageUrl}
                    alt="banner"
                    style={{
                      backgroundColor: "#f8f6f6",
                      height: "500px",
                      width: "1903px",
                      zIndex: "0",
                    }}
                  />
                </figure>
                <div className="banner-content y-50 pb-1">
                  <h4
                    className="banner-subtitle title-underline2 font-weight-normal text-white slide-animate appear-animate appear-animation-visible"
                    data-animation-options="{
                                                'name': 'fadeInUpShorter',
                                                'delay': '.2s'
                                            }"
                    style={{
                      animationDuration: "1.2s",
                      animationDelay: "0.2s",
                    }}
                  >
                    <span>{data.heroTitle}</span>
                  </h4>
                  <h3
                    className="banner-title text-White lh-1 mb-7 slide-animate appear-animate appear-animation-visible"
                    data-animation-options="{
                                                'name': 'fadeInUpShorter',
                                                'delay': '.4s'
                                            }"
                    style={{
                      animationDuration: "1.2s",
                      animationDelay: "0.4s",
                    }}
                  >
                    Panda Birthday
                    <br />
                    Collection
                  </h3>
                  <a
                    href="shop.html"
                    className="btn btn-dark slide-animate appear-animate appear-animation-visible"
                    data-animation-options="{
                                                'name': 'fadeInUpShorter',
                                                'delay': '.6s'
                                            }"
                    style={{
                      animationDuration: "1.2s",
                      animationDelay: "0.6s",
                    }}
                  >
                    SHop now<i className="p-icon-arrow-long-right"></i>
                  </a>
                </div>
              </div>
            ))}

          {/* Add the second banner content here */}
        </div>
        <div className="container">
          <div
            className="owl-carousel owl-theme owl-box-border row cols-md-3 cols-sm-2 cols-1 appear-animate"
            data-owl-options="{'nav': false, 'dots': false, 'loop': false, 'responsive': {'0': {'items': 1, 'autoplay': true}, '576': {'items': 2, 'autoplay': true}, '768': {'items': 3, 'dots': false}}}"
          >
            <div className="icon-box icon-box-side">
              {/* Icon box content */}
            </div>
            {/* Add more icon boxes as needed */}
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSlider;
