"use client";
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { RentData } from '@/type/type';

export default function page() {
  const [rentData, setRentData] = useState<RentData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hostId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/host/getRents?hostId=${hostId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json() as RentData[]; 
        setRentData(data);
      } catch (error) {
        setError(`Error fetching data: ${error}`);
      }
    };
    fetchData();
  }, [hostId]);

  return (
    <div className={styles.container}>
      <div className={styles.container_main}>
        <div className={styles.listroom_title_head}>
          <div className={styles.listroom_title}>Danh sách Thuê Phòng</div>
          <span className={styles.listroom_showall}>Show All</span>
        </div>
        {rentData?.length ? (
          <table className={styles.listroom_table}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Khu Vực</th>
                <th>Địa Chỉ Phòng</th>
                <th>Img</th>
                <th>Phone</th>
                <th>Xác Nhận</th>
              </tr>
            </thead>
            <tbody>
              {rentData.map((room: RentData, index) => (
                <tr key={room.id}>
                  <td>{index + 1}</td>
                  <td>{room.room.boardingHostel.area}</td>
                  <td>{room.room.boardingHostel.address}</td>
                  <td>
                    <img src={room.room.img} alt="Room Image" />
                  </td>
                  <td>{room.user.phone}</td>
                  <td>
                    <button className={styles.btnok}>Xác Nhận</button>
                    <button className={styles.btnnotok}>Từ Chối</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}