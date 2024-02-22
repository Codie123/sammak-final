import React, { useRef, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation,Parallax } from "swiper/modules";
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
        
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          height: "85vh",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
   
      >
         

        
        {heroSilderData.length > 0 &&
          Array.isArray(heroSilderData) &&
          heroSilderData.map((data, index) => {
            return (
              
              <SwiperSlide key={index}>
                <img
                data-swiper-parallax="-10%"
                  src={data.imageUrl}
                  alt="img"
                  style={{ width: "100%", height: "85vh" }}
                />
                <div className="cuz-slider-cnt">
                 <div className="cuz-slider-wrapper" >
                 <h1
                 data-swiper-parallax="-500" 
                    
                    >
                      {data.heroTitle}
                    </h1>
                    <p data-swiper-parallax="-400">{data.description}</p>

                    <a href="/shopview"  className="cuz-hero-shop-btn" data-swiper-parallax="-300" >See Our Collections  
                            <svg width="20" height="15" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.9336 9.46679C21.9336 9.17382 21.8164 8.90429 21.5821 8.68164L13.8125 0.935546C13.5547 0.677734 13.3086 0.583984 13.0274 0.583984C12.4531 0.583984 12.0078 1.00586 12.0078 1.59179C12.0078 1.87304 12.1016 2.14257 12.2891 2.33007L14.9141 5.00195L19.5664 9.24414L19.8008 8.6582L16.0274 8.42382H1.20312C0.59375 8.42382 0.171875 8.85742 0.171875 9.46679C0.171875 10.0762 0.59375 10.5098 1.20312 10.5098H16.0274L19.8008 10.2754L19.5664 9.70117L14.9141 13.9317L12.2891 16.6035C12.1016 16.7793 12.0078 17.0606 12.0078 17.3418C12.0078 17.9278 12.4531 18.3496 13.0274 18.3496C13.3086 18.3496 13.5547 18.2442 13.7891 18.0215L21.5821 10.252C21.8164 10.0293 21.9336 9.75976 21.9336 9.46679Z" fill="white" fill-opacity="0.85"/>
                            </svg>
                    </a>
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
