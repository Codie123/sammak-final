import React, { useState, useEffect, useRef } from "react";
import style from "./SpecialSection.module.css";
import whyhead from "../../public/whyhead.png";
import whybody from "../../public/whybody.png";
import whyvideo from "../../public/main.mp4";
const SpecialSection = () => {
  const videoRef = useRef();
  useEffect(() => {
    const video = videoRef.current;

    video.removeAttribute("controls");

    video.play();

    return () => {};
  }, []);
  return (
    <>
      <h1
        style={{
          fontFamily: "Poppins",
          fontWeight: "500",
          textAlign: "center",
          fontSize: "5vh",
          marginBottom: "7vh",
        }}
      >
        Why Our Products ?
      </h1>
      <div className={style.main}>
        <div className={style.whybody}>
          <img src={whyhead} alt="why our product" />
          <img src={whybody} alt="why our product" />
        </div>
        <div className={`${style.whyvideo}`}>
          <video ref={videoRef} loop autoPlay muted>
            <source src={whyvideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
};

export default SpecialSection;
