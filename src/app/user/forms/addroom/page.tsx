"use client";

import React, { useState } from "react";
import styles from "./addroom.module.css";
import { useRouter } from 'next/navigation';
export default function page() {
  const router = useRouter();
    const [description, setdescription] = useState("");
    const [numberRoom, setnumberRoom] = useState(0);
    const [ElectricBill, setElectricBill] = useState(0);
    const [WaterBill, setWaterBill] = useState(0);
    const [price, setprice] = useState(0);
    const [people, setpeople] = useState(0);
    const [type, settype] = useState("");
    const [imageFile, setimageFile] = useState<File | null>(null);
    console.log(imageFile)
    let errorMessage: string;
    const userId = localStorage.getItem("userId");
    const boardingId = localStorage.getItem("BoardingId");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.set("description", description);
    formData.set("numberRoom", String(numberRoom));
    formData.set("ElectricBill", String(ElectricBill));
    formData.set("WaterBill", String(WaterBill));
    formData.set("price", String(price));
    formData.set("people", String(people));
    formData.set("type", type);
    if (imageFile !== null) {
      formData.append("image", imageFile);
    }
    try {
      const response = await fetch(
        `http://localhost:8080/host/addRoom?boardingId=${boardingId}&hostId=${userId}`,
        {
          method: "POST",
          body: formData,
        
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert(`Room added successfully. Response: ${JSON.stringify(result)}`);
        router.push('/user/tables/listroom');
      } else {
        console.error("Failed to add room:", response.statusText);
        alert(`Failed to add room. Error: ${errorMessage}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding room:", error.message);
        alert(`Error adding room: ${error.message}`);
      } else {
        console.error("Unknown error:", error);
        alert(`Failed to add room. Error: ${errorMessage}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.form_title}>Thêm Phòng</div>
        <label className={styles.form_label} htmlFor="description">
          Mô tả phòng
        </label>
        <input
          className={styles.form_ip}
          type="text"
          id="content"
          placeholder="Phòng đẹp, sạch sẽ thoáng mát"
          value={description}
          onChange={(e)=>{setdescription(e.target.value)}}
        />
        <label className={styles.form_label} htmlFor="numberRoom">
          Số Phòng
        </label>
        <input
          className={styles.form_ip}
          type="number"
          id="numroom"
          placeholder="3 phòng"
          value={numberRoom}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setnumberRoom(value);
          }}
        />
        <label className={styles.form_label} htmlFor="ElectricBill">
          Tiền điện theo tháng
        </label>
        <input
          className={styles.form_ip}
          type="number"
          id="costElectricity"
          placeholder="3000/1 chữ"
          value={ElectricBill}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setElectricBill(value);
          }}
        />
        <label className={styles.form_label} htmlFor="WaterBill">
          Tiền nước theo tháng
        </label>
        <input
          className={styles.form_ip}
          type="number"
          id="costWater"
          placeholder="50.000/1 người"
          value={WaterBill}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setWaterBill(value);
          }}
        />
        <label className={styles.form_label} htmlFor="price">
          Giá Phòng
        </label>
        <input
          className={styles.form_ip}
          type="number"
          id="roomPrice"
          placeholder="Hôm nay mất điện"
          value={price}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setprice(value);
          }}
        />
        <label className={styles.form_label} htmlFor="people">
          Số Người ở được tối đa
        </label>
        <input
          className={styles.form_ip}
          type="number"
          id="maxOccupancy"
          placeholder="3 người"
          value={people}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setpeople(value);
          }}
        />
        <label className={styles.form_label} htmlFor="type">
          Loại Phòng
        </label>
        <input
          className={styles.form_ip}
          type="text"
          id="roomType"
          placeholder="Hôm nay mất điện"
          value={type}
          onChange={(e)=>{settype(e.target.value)}}
        />
        <label className={styles.form_label} htmlFor="imageFile">
          Img
        </label>
        <input 
          type="file" 
          onChange={(e) => { 
            const file = e.target.files ? e.target.files[0] : null;
            setimageFile(file);
          }} 
        />
        <div className={styles.btn} onClick={handleSubmit}>Thêm</div>
      </div>
    </div>
  );
}

