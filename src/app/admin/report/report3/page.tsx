"use client";

import React, { useEffect, useState } from 'react';
import styles from "./report3.module.css";
import { Interface } from '@/type/type';

const RoomComponent: React.FC<{ report: Interface }> = ({ report }) => {
  const adminId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const handleBanClick = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Admin/banHost?adminId=${adminId}&hostId=${report.room.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        alert('Bạn Không Phải là Admin');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('Host banned successfully!');
      alert('Host banned successfully!');
      window.location.reload()
    } catch (error) {
      console.error('Error banning host:', error);
    }
  };

  return (
    <tr>
      <td>{report.stt}</td>
      <td>{report.room.boardingHostel.address}</td>
      <td>{report.user.phone}</td>
      <td>{report.room.user.phone}</td>
      <td>{report.user.name}</td>
      <td>{report.room.user.name}</td>
      <td>
        <img src={report.img1} alt="Report img" />
        <img src={report.img2} alt="Report img" />
        <img src={report.img3} alt="Report img" />
      </td>
      <td>{report.reason}</td>
      <td>
        <button className={styles.btntype} onClick={handleBanClick}>
          Cấm
        </button>
      </td>
    </tr>
  );
};

export default function page() {
  const [reportData, setReportData] = useState<Interface[]>([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch('http://localhost:8080/Admin/getReport3');
        const data: Interface[] = await response.json();
        setReportData(data);
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
              <th>Address</th>
              <th>Phone User Report</th>
              <th>Phone Host</th>
              <th>Name Report</th>
              <th>Name Host</th>
              <th>Report Img</th>
              <th>Content</th>
              <th>Chi Tiết</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report, index) => (
              <RoomComponent key={index} report={{ ...report, stt: index + 1 }} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
