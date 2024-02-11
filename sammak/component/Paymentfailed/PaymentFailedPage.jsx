import React from "react";
import styles from "./PaymentFailedPage.module.css"; // Import CSS module
import { FaExclamationCircle } from "react-icons/fa"; // Import icon from react-icons library
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PaymentFailedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Redirecting to home", {
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
    <div className={styles["payment-failed-container"]}>
      <FaExclamationCircle className={styles["error-icon"]} />
      <h1>Payment Failed</h1>
      <p>Sorry, your payment was unsuccessful.</p>
      <p>Please try again or contact support for assistance.</p>
    </div>
    </>
  );
}

export default PaymentFailedPage;
