import React, { useState } from "react";
import styles from "./password.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Password() {
  const [email, setEmail] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_URL}/v1/auth/forgotPassword`, email)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Check your email for reset link", {
            autoClose: 2000,
            position: "top-center",
            closeOnClick: true,
          });
        } else {
          toast.error("Something went wrong", {
            autoClose: 2000,
            position: "top-center",
            closeOnClick: true,
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong", {
          autoClose: 2000,
          position: "top-center",
          closeOnClick: true,
        });
      });
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles["forget-password"]}>
          <h1>Forgot Your Password?</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles["form-group"]}>
              <input
                type="email"
                placeholder="Enter your email address"
                onInput={(e) => {
                  setEmail({ ...email, email: e.target.value });
                }}
                required
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.button}>
              Reset Password
            </button>
          </form>
          <button className={styles["button-back"]} onClick={handleGoBack}>
            Go Back
          </button>{" "}
          {/* Add the new button */}
        </div>
      </div>
    </>
  );
}

export default Password;
