import React, { useState } from 'react';
import styles from './ResetPassword.module.css'; // Import CSS Modules style
import '../../../main.js'
const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission, possibly sending a reset password link to the provided email
    console.log('Email submitted:', email);
    // You can add your axios call or other logic here
  };

  return (
    <div className={styles.forgotPasswordContainer}>
    <form onSubmit={handleSubmit} className={styles.forgotPasswordForm}>
      <h2 className={styles.forgotPasswordFormTitle}>Forgot Password</h2>
      <div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className={styles.inputField}
          required
        />
      </div>
      <button type="submit" className={styles.button}>Reset Password</button>
    </form>
  </div>
  );
};

export default ResetPassword;
