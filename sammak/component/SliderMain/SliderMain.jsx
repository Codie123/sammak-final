import React, { useRef, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import AllContext from "../../src/Context/Context";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import '../../main.js'
import './slider.css'
function SliderMain(props) {
  const onAutoplayTimeLeft = (s, time, progress) => {};
  const { heroSilderData, setheroSliderData } = useContext(AllContext);

  return (
    <div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
        style={{ height: "80vh", }}
      >
        {heroSilderData.length > 0 &&
          Array.isArray(heroSilderData) &&
          heroSilderData.map((data, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  src={data.imageUrl}
                  alt="img"
                  style={{ width: "100%", height: "80vh" }}
                />
                <div className="cuz-slider-cnt">
                 <div className="cuz-slider-wrapper" >
                 <h1
                    
                    >
                      {data.heroTitle}
                    </h1>
                    <p>{data.description}</p>

                    <a className="cuz-hero-shop-btn">Shop</a>
                 </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default SliderMain;
