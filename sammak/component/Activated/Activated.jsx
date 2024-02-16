import React, { useEffect } from "react";
import "./Activated.css"; // Import CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Activated = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Redirecting to home", {
      position: "top-center",
      autoClose: 4000,
      closeOnClick: false,
    });
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="payment-complete-container">
        <div className="payment-complete-content">
          <FontAwesomeIcon icon={faCheckCircle} className="tick-icon" />
          <h2>Your Account Is Activated Successfully</h2>
          <p>Please Login, To Continue Shopping</p>
        </div>
      </div>
    </>
  );
};

export default Activated;
