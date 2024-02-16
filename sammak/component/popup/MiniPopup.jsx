import React from 'react';

const MiniPopup = () => {
  return (
    <div className="minipopup-box show" style={{ top: '0px' }}>
      <p className="minipopup-title">Successfully Added</p>
      <div className="product product-purchased product-mini mb-0">
        <figure className="product-media">
          <a href="product-simple.html">
            <img
              src="images/products/5-295x369.jpg"
              alt="product"
              width="90"
              height="90"
            />
          </a>
        </figure>
        <div className="product-detail">
          <a href="product-simple.html" className="product-name">
            Peanuts
          </a>
          <div className="price-box">
            <span className="product-quantity">1</span>
            <span className="product-price">
              <del className="old-price">$28.00</del>
              <ins className="new-price">$12.00</ins>
            </span>
          </div>
        </div>
      </div>
      <div className="action-group d-flex">
        <a href="cart.html" className="btn btn-sm btn-outline btn-primary btn-block">
          View Cart
        </a>
        <a href="checkout.html" className="btn btn-sm btn-primary btn-block">
          Check Out
        </a>
      </div>
    </div>
  );
};

export default MiniPopup;
