"use client";
import { useEffect, useState } from 'react';
import React from "react";
import styles from "./allhost.module.css";
import { InterfaceUser } from '@/type/type';

export default function page() {
  const [userData, setUserData] = useState<InterfaceUser[]>([]);
  useEffect(() => {
    const apiUrl = 'http://localhost:8080/Admin/getAllHost';
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container_main}>
        <div className={styles.listroom_title_head}>
            <div className={styles.listroom_title}>Danh sách Host</div>
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
                <td><img src={user.img.toString()} alt="Avatar" /></td>
                <td>
                  <button className={styles.btntype}>Xem</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
