import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../main.js";
import "../../css/style.css";
function Herocontact() {
  const [contactData, setcontactData] = useState({
    contactEmail: "",
    contactMessage: "",
    contactName: "",
    contactSubject: "",
  });

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ` + token,
    },
  };

  const handleContact = () => {
    if(!(localStorage.getItem('token'))){
      toast.error('Please login To Continue',{
        autoClose: 2000,
        position: "top-center",
      })
    }else{
      if (
        contactData.contactEmail === "" ||
        contactData.contactMessage === "" ||
        contactData.contactName === "" ||
        contactData.contactSubject === ""
      ) {
        toast.error("Enter all the field", {
          autoClose: 2000,
          position: "top-center",
        });
        }else{
      axios
      .post(`${import.meta.env.VITE_URL}/contactUs/post`, contactData, config)
      .then((res) => {
        
        if (res.data.status === 200) {
          toast.success("Comment Sent Successfully ", {
            autoClose: 2000,
            position: "top-center",
          });
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
      })
      .catch((err) => {});
        }
     
    }
   
  };
  return (
    <main className="main">
    <ToastContainer />
    <div className="page-header contact-hero">
      <h1 className="page-title font-weight-light text-capitalize pt-2">
        Contact Us
      </h1>
    </div>
    <nav className="breadcrumb-nav has-border">
      <div className="container">
        <ul className="breadcrumb">
          <li>
            <a href="/">Home</a>
          </li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
    <div className="page-content contact-page">
      <div className="container">
        <section className="mt-10 pt-8">
          <h2 className="title title-center mb-8">Contact Information</h2>
          <div
            className="owl-carousel owl-theme row cols-lg-4 cols-md-3 cols-sm-2 cols-1 mb-10"
            data-owl-options={`{
                              'nav': false,
                              'dots': false,
                              'loop': false,
                              'margin': 20,
                              'autoplay': true,
                              'responsive': {
                                  '0': {
                                      'items': 1,
                                      'autoplay': true
                                  },
                                  '576': {
                                      'items': 2
                                  },
                                  '768': {
                                      'items': 3
                                  },
                                  '992': {
                                      'items': 4,
                                      'autoplay': false
                                  }
                              }
                          }`}
          >
            <div className="icon-box text-center">
              <span className="icon-box-icon mb-4">
                <i className="p-icon-map"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">Address</h4>
                <p className="text-dim">Ash Shati, Jazan 82725, Saudi Arabia</p>
              </div>
            </div>
            <div className="icon-box text-center">
              <span className="icon-box-icon mb-4">
                <i className="p-icon-phone-solid"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">Phone Number</h4>
                <p className="text-dim">+966557217862</p>
              </div>
            </div>
            <div className="icon-box text-center">
              <span className="icon-box-icon mb-4">
                <i className="p-icon-message"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">E-mail Address</h4>
                <p className="text-dim">
                  <a
                    href="/cdn-cgi/l/email-protection"
                    className="__cf_email__"
                    data-cfemail="bdd0dcd4d1fdd8c5dcd0cdd1d893ded2d0"
                  >
                    [email&#160;protected]
                  </a>
                </p>
              </div>
            </div>
            <div className="icon-box text-center">
              <span className="icon-box-icon mb-4">
                <i className="p-icon-clock"></i>
              </span>
              <div className="icon-box-content">
                <h4 className="icon-box-title">Opening Hours</h4>
                <p className="text-dim">Sat-Thu: 5:30Am - 11:30Pm</p>
                <p className="text-dim">Fri:5:30–11 AM, 1–11:30 PM</p>
                
              </div>
            </div>
          </div>
          <hr />
        </section>
        <section className="mt-10 pt-2 mb-10 pb-8">
          <div className="row align-items-center">
            <div className="col-md-6">
              <figure>
                <img
                  src="images/subpage/contact/1.jpg"
                  width="600"
                  height="557"
                  alt="About Image"
                />
              </figure>
            </div>
            <div className="col-md-6 pl-md-4 mt-8 mt-md-0">
              <h2 className="title mb-1">Leave a Comment</h2>
              <p className="mb-6">
              
              </p>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      placeholder="Your Name"
                      required=""
                      onInput={(e) => {
                        setcontactData({
                          ...contactData,
                          contactName: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      placeholder="Your Email"
                      required=""
                      onInput={(e) => {
                        setcontactData({
                          ...contactData,
                          contactEmail: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <input
                      type="text"
                      id="contactSubject"
                      name="contactSubject"
                      placeholder="Your Subject"
                      required=""
                      onInput={(e) => {
                        setcontactData({
                          ...contactData,
                          contactSubject: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <textarea
                      id="contactMessage"
                      name="contactMessage"
                      placeholder="Your Message"
                      required=""
                      onInput={(e) => {
                        setcontactData({
                          ...contactData,
                          contactMessage: e.target.value,
                        });
                      }}
                    ></textarea>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleContact}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <div
        className="bg-light google-map"
        id="googlemaps"
        style={{ height: "45rem" }}
      >
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15269.979318882497!2d42.53487811738282!3d16.9008663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x160809631b3ebcf1%3A0x1aacf69da7759420!2z2LTYsdmD2Kkg2LPZhdin2YMg2KfZhNmF2K3Yr9mI2K_YqSwgc2FtbWFrIGNvbXBhbnkgbGltaXRlZA!5e0!3m2!1sen!2sae!4v1707409719396!5m2!1sen!2sae" width="100%" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </main>
  );
}

export default Herocontact;
