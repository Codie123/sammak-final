import React, { useEffect } from "react";
import "./PaymentComplete.css"; // Import CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PaymentComplete = () => {
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
          <h2>Payment Completed</h2>
          <p>Thank you for your payment.</p>
        </div>
      </div>
    </>
  );
};

export default PaymentComplete;
