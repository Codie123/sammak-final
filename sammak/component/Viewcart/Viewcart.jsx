import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import AllContext from "../../src/Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-js-loader";
import "../../main.js";
function Viewcart() {
  //
  const [loginuser, setloginuser] = useState({ email: "", password: "" });
  const [registeruser, setregisteruser] = useState({
    emailId: "",
    password: "",
    userName: "",
  });

  const [cartdata, setcartdata] = useState([]);

  //

  const [data, setdata] = useState("");

  //
  const navigate = useNavigate();

  //

  useEffect(() => {
    let storedProduct = localStorage.getItem("products");
    let productId = localStorage.getItem("id");
    if (storedProduct && productId) {
      let parseProduct = JSON.parse(storedProduct);
      productId = parseInt(productId);
      let filterproduct = parseProduct.filter((fil) => {
        return fil.id === productId;
      });

      setdata(filterproduct);
    }
  }, []);

  //

  const {
    loggedin,
    setloggedin,
    home,
    sethome,
    shop,
    setshop,
    about,
    setabout,
    setcart,
    contact,
    setcontact,
    cart,
    id,
    productinfo,
    viewcart,
    setviewcart,
  } = useContext(AllContext);

  //
  let cartmin = cart.reduce((acc, curr) => {
    let data = [
      {
        cleaningType: curr.smallDescription,
        id: curr.id,
        quantity: curr.quantity,
      },
    ];
    return acc.concat(data);
  }, []);
  console.log(cartmin);

  //

  //update quantity
  const updatedecrement = (productId, newQuantity) => {
    if (cart) {
      const updatedCart = cart.map((item) => {
        if (item.id === productId) {
          if (item.quantity === 1) {
            return {
              ...item,
              quantity: 1,
            };
          } else {
            return {
              ...item,
              quantity: newQuantity,
            };
          }
        }
        return item;
      });
      setcart(updatedCart);
      localStorage.setItem("cartinfo", JSON.stringify(updatedCart));
    }
  };
  const updateincrement = (productId, newQuantity) => {
    if (cart) {
      const updatedCart = cart.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });
      setcart(updatedCart);
      localStorage.setItem("cartinfo", JSON.stringify(updatedCart));
    }
  };

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };
  const handlecheckout = () => {
    if (!loggedin) {
      setviewcart(true);
    }

  };

  const removeFromCart = (productId) => {
    if (cart) {
      let newcart = cart.filter((item) => item.id !== productId);
      setcart(newcart);
      localStorage.setItem("cartinfo", JSON.stringify(newcart));
    }
  };

  return (
    <>
      <ToastContainer />
      <Header homeValue={false} />

      <main className="main cart">
        <div className="page-content pt-8 pb-10 mb-4">
          <div className="step-by">
            <h3 className="title title-step active">
              <a>1.Shopping Cart</a>
            </h3>
            <h3 className="title title-step">
              <a href="/checkout">2.Checkout</a>
            </h3>
            <h3 className="title title-step">
              <a>3.Order Complete</a>
            </h3>
          </div>
          {cart.length === 0 ? (
            <div className="loader-viewpage">
              {" "}
              <Loader
                type="bubble-scale"
                bgColor={"#163b4d"}
                color={"blue"}
                size={50}
              />
            </div>
          ) : (
            <div className="container mt-7 mb-2">
              <div className="row">
                <div className="col-lg-8 col-md-12 pr-lg-6">
                  <table className="shop-table cart-table">
                    <thead>
                      <tr>
                        <th>
                          <span>Product</span>
                        </th>
                        <th></th>
                        <th>
                          <span>Price</span>
                        </th>
                        <th>
                          <span>quantity</span>
                        </th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.length > 0 &&
                        cart.map((cart, index) => (
                          <tr key={index}>
                            <td className="product-thumbnail">
                              <figure>
                                <a>
                                  {cart.images[0].imageUrl &&
                                  cart.images[0].imageUrl.length > 0 ? (
                                    <img
                                      src={cart.images[0].imageUrl}
                                      width="90"
                                      height="112"
                                      alt="product"
                                    />
                                  ) : (
                                    <div>no images</div>
                                  )}
                                </a>
                              </figure>
                            </td>
                            <td className="product-name">
                              <div className="product-name-section">
                                <a href="product-simple.html">
                                  {cart.productName}
                                </a>
                              </div>
                            </td>
                            <td className="product-subtotal">
                              <span className="amount">
                                {cart.sellingPrice.toFixed(2)}
                              </span>
                            </td>
                            <td className="product-quantity">
                              <div className="input-group">
                                <button
                                  className="quantity-minus p-icon-minus-solid"
                                  onClick={() => {
                                    updatedecrement(cart.id, cart.quantity - 1);
                                  }}
                                ></button>
                                <input
                                  className=" form-control"
                                  type="number"
                                  value={cart.quantity}
                                  min="1"
                                  max="1000000"
                                />
                                <button
                                  className="quantity-plus p-icon-plus-solid"
                                  onClick={() => {
                                    updateincrement(cart.id, cart.quantity + 1);
                                  }}
                                ></button>
                              </div>
                            </td>
                            <td className="product-price">
                              <span className="amount">
                                {cart.quantity * cart.sellingPrice}
                              </span>
                            </td>
                            <td className="product-remove">
                              <a
                                onClick={() => {
                                  removeFromCart(cart.id);
                                }}
                                className="btn-remove"
                                title="Remove this product"
                              >
                                <i className="p-icon-times"></i>
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="cart-actions mb-6 pt-6">
                    <a className="btn btn-dim btn-icon-left mr-4 mb-4">
                      <i className="p-icon-arrow-long-left"></i>Continue
                      Shopping
                    </a>
                  </div>
                </div>
                <aside className="col-lg-4 sticky-sidebar-wrapper">
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 20}"
                  >
                    <div className="summary mb-4">
                      <h3 className="summary-title">Cart Totals</h3>

                      <table className="shipping mb-2">
                        <tbody>
                          {cart.length > 0 &&
                            cart.map((cart, index) => (
                              <tr className="summary-subtotal" key={index}>
                                <td>
                                  <h4>
                                    {cart.productName} x &nbsp;
                                    {cart.quantity}
                                  </h4>
                                </td>
                                <td>
                                  <p></p>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>

                      <table className="total">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle">Total</h4>
                            </td>
                            <td>
                              <p className="summary-total-price ls-s">
                                {cart.length > 0 &&
                                  cart.reduce((acc, curr) => {
                                    return (
                                      acc + curr.quantity * curr.sellingPrice
                                    );
                                  }, 0)}
                              </p>
                              SAR
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <a
                        onClick={handlecheckout}
                        className="btn btn-dim btn-checkout btn-block"
                      >
                        Proceed to checkout
                      </a>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Viewcart;
