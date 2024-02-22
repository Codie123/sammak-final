import React, { useState, useEffect, useRef } from "react";
import style from "./SpecialSection.module.css";
import React from 'react'

export default function RecentorderedPr() {

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
        Recent Products ?
      </h1>

      <div className="container">
        <div className="row">
            <div className="cuz-rc-card">
                <div className="cuz-rc-img">
                    <img src="./images/products/rc-1.jpg" alt="" />
                </div>
                <div className="cuz-rc-details">
                    <span className="italic-head">
                        Fish For Nutritions
                    </span>
                    <h1 className="main-head">
                        Fish Name 1kg pack
                    </h1>
                    <p className="sub-head">Cleaning Method</p>
                    <button className="cuz-rc-btn">ADD TO CART <span className="cuz-rc-price">SAR</span></button>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
