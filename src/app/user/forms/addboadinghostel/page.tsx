"use client";
import React, { useState } from "react";
import styles from "./addboading.module.css";

export default function AddBoardingPage() {
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const hostId = localStorage.getItem("userId");
  const handleImageChange = (event:any) => {
    setImage(event.target.files[0]);
  };
  const areas = ["Hai Chau", "Thanh Khe", "Lien Chieu", "Ngu Hanh Son", "Cam Le", "Hoa Trung", "Son Tra", "Hoa Vang"];
  const [selectedArea, setSelectedArea] = useState("");
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("area", selectedArea);
    formData.append("address", address);

    if (image !== null) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(`http://localhost:8080/host/addBoardingHostel?hostId=${hostId}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message); 
      } else {
        console.error("Failed to add Boarding Hostel");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.form_title}>Thêm Dãy Trọ</div>
        {successMessage && <div className={styles.success_message}>{successMessage}</div>}
        <label className={styles.form_label}>Khu Vực</label>
        <select
          className={styles.form_ip}
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="" disabled>Select an area</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        <label className={styles.form_label}>Địa Chỉ</label>
        <input
          className={styles.form_ip}
          type="text"
          placeholder="21 Tiên Sơn 17"
          onChange={(e) => setAddress(e.target.value)}
        />
        <label className={styles.form_label}>Img</label>
        <input
          className={styles.form_ip}
          type="file"
          onChange={handleImageChange}
        />
        <div className={styles.btn} onClick={handleSubmit}>
          Thêm
        </div>
      </div>
    </div>
  );
}

