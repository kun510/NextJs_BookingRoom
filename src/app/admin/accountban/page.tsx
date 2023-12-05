"use client";

import React, { useEffect, useState } from 'react';
import styles from "./accountban.module.css";
import { InterfaceUser } from '@/type/type';

export default function page() {
  const [userData, setUserData] = useState<InterfaceUser[]>([]);
  const adminId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const handleRestoreClick = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/Admin/unBanHost?adminId=${adminId}&hostId=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        alert('Bạn không phải là Admin');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Host restored successfully!');
      alert('Host restored successfully!');
      setUserData((prevData) => prevData.filter(user => user.id !== userId));
      window.location.reload();
    } catch (error) {
      console.error('Error restoring host:', error);
    }
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch('http://localhost:8080/Admin/listBan');
        const data: InterfaceUser[] = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAPI();
  }, []); 

  return (
    <div className={styles.container}>
      <div className={styles.container_main}>
        <div className={styles.listroom_title_head}>
          <div className={styles.listroom_title}>Danh sách báo cáo</div>
          <span className={styles.listroom_showall}>Show All</span>
        </div>
        <table className={styles.listroom_table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Avt</th>
              <th>Chi Tiết</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.img ? <img src={user.img.toString()} alt="Avatar" /> : null}</td>
                <td>
                  <button className={styles.btntype} onClick={() => handleRestoreClick(user.id)}>
                    Phục Hồi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
