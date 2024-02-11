import React, { useEffect } from "react";
import "../../main.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
function CheckoutMain() {
  const navigate = useNavigate();

  const config = {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    //orderapi
    axios
      .get(
        `${
          import.meta.env.VITE_URL
        }/orderMaster/getAllOrdersById/${localStorage.getItem("userid")}`,
        config
      )
      .then((res) => {
        localStorage.setItem("orders", JSON.stringify(res.data.result));
      })
      .catch((err) => {});
    //address api
    axios
      .get(
        `${
          import.meta.env.VITE_URL
        }/Address/getAddressByUserId/${localStorage.getItem("userid")}`,
        config
      )
      .then((res) => {})
      .catch((err) => {});
  }, []);

  let orders = JSON.parse(localStorage.getItem("orders"));

  return (
    <>
      <main className="main account-page">
        <div className="page-header" style={{ backgroundColor: "#f9f8f4" }}>
          <h1 className="page-title">My Account</h1>
        </div>
        <nav className="breadcrumb-nav has-border">
          <div className="container">
            <ul className="breadcrumb">
              <li>
                <a href="/">Home</a>
              </li>
              <li>My account</li>
            </ul>
          </div>
        </nav>
        <div className="page-content mt-4 mb-10 pb-6">
          <div className="container">
            <div className="tab tab-vertical gutter-lg">
              <ul className="nav nav-tabs mb-8 col-lg-3 col-md-4">
                <li className="nav-item">
                  <a className="nav-link active" href="#dashboard">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#orders">
                    Orders
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link no-tab-item"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("cart");
                      localStorage.removeItem("userid");
                      navigate("/");
                      window.location.reload();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
              <div className="tab-content col-lg-9 col-md-8">
                <div className="tab-pane active" id="dashboard">
                  <p className="">
                    From your account dashboard you can view your &nbsp;
                    <a href="#orders" className="link-to-tab text-primary">
                      recent orders
                    </a>
                    .
                  </p>
                  <div className="row cols-lg-3 cols-xs-2 cols-1 nav">
                    <div className="ib-wrapper mb-4">
                      <div className="icon-box text-center ib-border">
                        <a href="#orders">
                          <span className="icon-box-icon">
                            <i className="p-icon-orders"></i>
                          </span>
                          <div className="icon-box-content">
                            <p>ORDERS</p>
                          </div>
                        </a>
                      </div>
                    </div>

                    <div
                      className="ib-wrapper mb-4"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("cart");
                        localStorage.removeItem("userid");
                        navigate("/");
                        window.location.reload();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="icon-box text-center ib-border">
                        <a className="no-tab-item">
                          <span className="icon-box-icon">
                            <i className="p-icon-logout"></i>
                          </span>
                          <div>
                            <p>LOGOUT</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="orders">
                  <table className="order-table">
                    <thead>
                      <tr style={{ textAlign: "center" }}>
                        <th>Order id</th>

                        <th>Product name</th>

                        <th>Quantity</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((order, index) => (
                        <tr key={index}>
                          <td className="order-number">
                            <a href="#">{order.orderId}</a>
                          </td>
                          <td className="order-date">
                            <span>{order.productName}</span>
                          </td>
                          <td className="order-status">
                            <span>{order.quantity}</span>
                          </td>

                          <td className="order-action">
                            <img
                              src={order.imageUrl}
                              style={{ height: "11vh", width: "10vw" }}
                              alt="img"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="tab-pane order" id="orders-view">
                  <h2 className="title text-left pb-1">Order Details</h2>
                  <div className="order-details">
                    <table className="order-details-table">
                      <thead>
                        <tr className="summary-subtotal">
                          <td>
                            <h3 className="summary-subtitle">Your Order</h3>
                          </td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="product-subtitle">Product</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="product-name">
                            Juice{" "}
                            <span>
                              <i className="p-icon-times"></i>1
                            </span>
                          </td>
                          <td className="product-price">$129.99</td>
                        </tr>
                        <tr>
                          <td className="product-name">
                            Greenhouse Cherry{" "}
                            <span>
                              <i className="p-icon-times"></i>2
                            </span>
                          </td>
                          <td className="product-price">$98.00</td>
                        </tr>
                        <tr className="summary-subtotal">
                          <td>
                            <h4 className="summary-subtitle">Subtotal:</h4>
                          </td>
                          <td className="summary-value font-weight-normal">
                            $325.99
                          </td>
                        </tr>
                        <tr className="summary-subtotal">
                          <td>
                            <h4 className="summary-subtitle">
                              Payment method:
                            </h4>
                          </td>
                          <td className="summary-value">Cash on delivery</td>
                        </tr>
                        <tr className="summary-subtotal">
                          <td>
                            <h4 className="summary-subtitle">Total:</h4>
                          </td>
                          <td>
                            <p className="summary-total-price">$325.99</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row mt-9">
                    <div className="col-sm-6">
                      <div className="card card-address">
                        <div className="card-body">
                          <h5 className="card-title lh-2 mb-2">
                            Billing Address
                          </h5>
                          <p>
                            John Doe
                            <br />
                            Panda Company
                            <br />
                            Steven street
                            <br />
                            El Carjon, CA 92020
                          </p>
                          <p>
                            <a
                              href="/cdn-cgi/l/email-protection"
                              className="_cf_email_"
                              data-cfemail="e886818b8d9f879a83d9dadda88f85898184c68b8785"
                            >
                              [email&#160;protected]
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="card card-address">
                        <div className="card-body">
                          <h5 className="card-title lh-2 mb-2">
                            Shipping Address
                          </h5>
                          <p>You have not set up this type of address yet.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-0 mb-6" />
                  <a href="#orders" className="btn btn-dark btn-sm back-order">
                    <i className="p-icon-arrow-long-left ml-0 mr-1"></i>Back to
                    list
                  </a>
                </div>
                <div className="tab-pane" id="downloads">
                  <p className="mb-4 text-body">No downloads available yet.</p>
                  <a href="shop.html" className="btn btn-dark">
                    Go to Shop<i className="p-icon-arrow-long-right"></i>
                  </a>
                </div>
                <div className="tab-pane" id="address">
                  <p>
                    The following addresses will be used on the checkout page by
                    default.
                  </p>
                  <div className="row">
                    <div className="col-sm-6 mb-4">
                      <div className="card card-address">
                        <div className="card-body">
                          <h5 className="card-title lh-2 mb-2">
                            Billing Address
                          </h5>
                          <p>
                            John Doe
                            <br />
                            Panda Company
                            <br />
                            Steven street
                            <br />
                            El Carjon, CA 92020
                          </p>
                          <a
                            href="#"
                            className="btn btn-link btn-primary btn-underline"
                          >
                            Edit your billing address
                            <i className="p-icon-arrow-long-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 mb-4">
                      <div className="card card-address">
                        <div className="card-body">
                          <h5 className="card-title lh-2 mb-2">
                            Shipping Address
                          </h5>
                          <p>You have not set up this type of address yet.</p>
                          <a
                            href="#"
                            className="btn btn-link btn-primary btn-underline"
                          >
                            Add <i className="p-icon-arrow-long-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="account">
                  <form action="#">
                    <div className="row">
                      <div className="col-sm-6 mb-4">
                        <label>First Name *</label>
                        <input
                          type="text"
                          name="first_name"
                          placeholder="John"
                          required=""
                        />
                      </div>
                      <div className="col-sm-6 mb-4">
                        <label>Last Name *</label>
                        <input
                          type="text"
                          name="last_name"
                          placeholder="Doe"
                          required=""
                        />
                      </div>
                    </div>
                    <label>Display Name *</label>
                    <input
                      type="text"
                      name="display_name"
                      required=""
                      placeholder="John Doe"
                      className="mb-4"
                    />
                    <span>
                      <small className="d-block mb-4">
                        This will be how your name will be displayed in the
                        account section and in reviews
                      </small>
                    </span>
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required=""
                      placeholder="nicework125@gmail.com"
                    />
                    <fieldset>
                      <legend>Password Change</legend>
                      <label>
                        Current password (leave blank to leave unchanged)
                      </label>
                      <input type="password" name="current_password" />
                      <label>
                        New password (leave blank to leave unchanged)
                      </label>
                      <input type="password" name="new_password" />
                      <label>Confirm new password</label>
                      <input type="password" name="confirm_password" />
                    </fieldset>
                    <button type="submit" className="btn btn-primary">
                      SAVE CHANGES
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CheckoutMain;
