import React from "react";
import "../../main.js";
import "../../css/style.css"
import Footer from "../Footer.jsx";
function Heroabout() {
  return (
    <>
      <main className="main">
        <div className="page-header about-hero" >
          <h1 className="page-title">About Us</h1>
        </div>
        <nav className="breadcrumb-nav has-border">
          <div className="container">
            <ul className="breadcrumb">
              <li>
                <a href="/">Home</a>
              </li>
              <li>About Us</li>
            </ul>
          </div>
        </nav>
        <div className="page-content about-page">
          <div className="container">
            <section className="row align-items-center">
              <div className="col-lg-6">
                <figure>
                  <img
                    src="images/subpage/about/1.jpg"
                    width="610"
                    height="450"
                    alt="image"
                  />
                </figure>
              </div>
              <div className="col-lg-6">
                <div className="pl-lg-8 pr-lg-3 pt-5 pt-lg-0">
                  <h4 className="text-uppercase text-body font-weight-normal ls-1 mb-4">
                    What we sell
                  </h4>
                  <h2 className="desc-title mb-4">
                    We Provide Fresh,Chilled and frozen seafood
                  </h2>
                  <p className="mb-3 ml-1">
                   Sammak, a prominent and well-established seafood company headquartered in jazan, Kingdom of saudi arabia since the early 1990s.With three decades of experience,we take immense pride in delivering high-quality seafood products.
                  </p>
                  <p className="mb-8 ml-1">
                   Our core expertise lies in sourcing, processing, and distributing a diverse range of fresh,chilled,and frozen seafood.We source wild-caught seafood from the red sea and procure a diverse selection of fishes from major fish market auctions across saudi arabia.
                  </p>
                  <a
                    href="/shopview"
                    className="btn btn-outline btn-dark ml-1 mb-1"
                  >
                    Get To store<i className="p-icon-arrow-long-right"></i>
                  </a>
                </div>
              </div>
            </section>
          </div>

          

          <div className="container">
            <section className="row align-items-center">
            <div className="col-lg-6">
              <div className="pr-lg-3">
              <h4 className="text-uppercase text-body font-weight-normal ls-1 mt-5 mb-4">our
              delivery
              system</h4>
              <h2 className="desc-title mb-4">The Fastest &amp; Best Delivery ever met before</h2>
              <ul className="list list-circle text-dim">
              <li className="mb-4"><i className="far fa-circle"></i>Order Placement</li>
              <li className="mb-4"><i className="far fa-circle"></i>Processing and Packaging</li>
              <li className="mb-4"><i className="far fa-circle"></i>Delivery Logistics</li>
              <li className="mb-4"><i className="far fa-circle"></i>Customer Satisfaction and Feedback</li>
              </ul>
              </div>
              </div>
              <div className="col-lg-6">
                <figure>
                  <img
                    src="images/subpage/about/2.jpg"
                    width="610"
                    height="450"
                    alt="image"
                  />
                </figure>
              </div>
            </section>
          </div>

         
        </div>
      </main>
    </>
  );
}

export default Heroabout;
