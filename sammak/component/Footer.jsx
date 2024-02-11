import React from "react";
import "../main.js";
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top"></div>

        <div className="footer-middle">
          <div className="footer-left">
            <ul className="widget-body">
              <li>
                <a href="tel:#" className="footer-icon-box">
                  <i className="p-icon-phone-solid"></i>
                  <span>+966598877123</span>
                </a>
              </li>
              <li>
                <a href="#" className="">
                  <i className="p-icon-map"></i>
                  <span>Jazan Saudi Arabia, KSA</span>
                </a>
              </li>
              <li>
                <a
                  href="/cdn-cgi/l/email-protection#afc2cec6c3efdfcec1cbce81ccc0c2"
                  className=""
                >
                  <i className="p-icon-message"></i>
                  <span>
                    <span
                      className="__cf_email__"
                      data-cfemail="94fdfaf2fbd4e4f5faf0f5baf7fbf9"
                    >
                      [email&#160;protected]
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="">
                  <i className="p-icon-clock"></i>
                  <span>Mon-Fri: 10:00 - 18:00</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-center">
            <a className="logo-footer">
              <img
                src="/images/logo.png"
                alt="logo-footer"
                width="171"
                height="41"
              />
            </a>
            <div className="social-links">
              <a
                href="#"
                className="social-link fab fa-facebook-f"
                title="Facebook"
              ></a>
              <a
                href="#"
                className="social-link fab fa-twitter"
                title="Twitter"
              ></a>
              <a
                href="#"
                className="social-link fab fa-pinterest"
                title="Pinterest"
              ></a>
              <a
                href="#"
                className="social-link fab fa-linkedin-in"
                title="Linkedin"
              ></a>
            </div>
          </div>
          <div className="footer-right">
            <div className="widget-newsletter">
              <h4 className="widget-title font-weight-bold"></h4>
              <p className="text-color-dim">
              
              Sammak, a prominent and well-established 
              <br/>
              seafood company headquartered in jazan,
                <br />
               Kingdom of saudi arabia since the early 1990s.
              </p>
              
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">Sammak.store© 2024. All Rights Reserved</p>
          <figure>
            <img
              src="images/payment.png"
              alt="payment"
              width="159"
              height="29"
            />
          </figure>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
