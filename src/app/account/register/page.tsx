"use client";
import React, { useState } from 'react';
// import React from "react";
import styles from "./register.module.css";
export default function page() {
  const [formData, setFormData] = useState({
    address: '',
    email: '',
    img: '',
    name: '',
    password: '',
    phone: '',
  });
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };
  const handleFormSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Register successfully');
      } else {
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.title}>
            <div className={styles.form_title1}>#MANAGER</div>
            <div className={styles.form_title}>Register</div>
        </div>
        <label className={styles.form_label} htmlFor="content">
            UserName
        </label>
        <input
          className={styles.form_ip}
          type="text"
          id="content"
          placeholder="UserName"
          value={formData.name}
          onChange={handleInputChange}
          name="name"
        />
        <label className={styles.form_label} htmlFor="numroom">
          Phone
        </label>
        <input
          className={styles.form_ip}
          type="text"
          id="numroom"
          placeholder="Number Phone"
          value={formData.phone}
          onChange={handleInputChange}
          name="phone"
        />
        <label className={styles.form_label} htmlFor="cost">
          Email
        </label>
        <input
          className={styles.form_ip}
          type="text"
          id="cost"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
        />
        <label className={styles.form_label} htmlFor="pay">
          Password
        </label>
        <input
          className={styles.form_ip}
          type="text"
          id="pay"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          name="password"
        />
        <label className={styles.form_label} htmlFor="type">
          Confirm Password
        </label>
        <input
          className={styles.form_ip}
          type="text"
          id="type"
          placeholder="Confirm Password"
          name="password"
        />
      
        <div className={styles.btn}>Đăng Ký</div>
         <label className={styles.NextLogin} htmlFor="type">
                Already have an Account? 
                <span className={styles.SignIn} onClick={handleFormSubmit}>Sign In</span>
        </label>
      </div>
    </div>
  );
}
