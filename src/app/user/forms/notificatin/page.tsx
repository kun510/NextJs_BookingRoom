"use client";
import React, { useState, useEffect } from "react";
import styles from "./notificatin.module.css";

export default function NotificationPage() {
  const [notificationData, setNotificationData] = useState({
    body: "",
    data: {
      additionalProp1: "string",
      additionalProp2: "string",
      additionalProp3: "string",
    },
    img: "string",
    title: "",
    token: "string",
  });

  const [tokens, setTokens] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //const hostIdString  = localStorage.getItem("userId");
  const hostIdString = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const hostId = parseInt(hostIdString ?? "0", 10);
 
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/gettoken?hostId=${hostId}`);
        if (response.ok) {
          const data = await response.json();
          setTokens(data);
        } else {
          console.error("Error fetching tokens:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchTokens();
  }, [hostId]); 

  const handleInputChange = (e:any) => {
    const { id, value } = e.target;
    setNotificationData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const sendNotification = async () => {
    try {
      for (const token of tokens) {
        const response = await fetch("http://localhost:8080/user/notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...notificationData,
            token: token,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Notification sent successfully:", data);
          setSuccessMessage("Notification sent successfully");
          setErrorMessage("");
        } else {
          const errorData = await response.text();
          console.error("Error sending notification:", errorData);
          setErrorMessage(`Error: ${errorData}`);
          setSuccessMessage("");
        }
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setErrorMessage("Error during fetch");
      setSuccessMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.form_title}>Thêm Thông Báo</div>
        <label className={styles.form_label} htmlFor="title">
          Tiêu đề
        </label>
        <input
          className={styles.form_ip}
          type="text"
          id="title"
          placeholder="Chủ phòng thông báo"
          value={notificationData.title}
          onChange={handleInputChange}
        />
        <label className={styles.form_label} htmlFor="body">
          Nội Dung
        </label>
        <input
          className={styles.form_ip}
          type="text"
          id="body"
          placeholder="Hôm nay mất điện"
          value={notificationData.body}
          onChange={handleInputChange}
        />
        <div className={styles.btn} onClick={sendNotification}>
          Gửi
        </div>
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
    </div>
  );
}
