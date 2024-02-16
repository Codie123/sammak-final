import React from "react";
import styles from "./Timeout.module.css"; // Import CSS module
import { FaExclamationCircle } from "react-icons/fa"; // Import icon from react-icons library
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Timeout() {
  const navigate = useNavigate();

  return (
    <>
      <ToastContainer />
      <div className={styles["payment-failed-container"]}>
        <FaExclamationCircle className={styles["error-icon"]} />
        <h1>Registration failed</h1>
        <p> &#40; Timeout &#41; .</p>
        <p>Please try again</p>
      </div>
    </>
  );
}

export default Timeout;
