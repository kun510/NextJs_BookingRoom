"use client";
import React, { useEffect, useState } from 'react';
import styles from "./report1.module.css";
import { Interface } from '@/type/type';

const RoomComponent: React.FC<{ report: Interface }> = ({ report }) => {
  const handleNotification = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: "Bạn Đã bị báo cáo cấp độ 1, nếu có gì thắc mắc vui lòng liên hệ Admin",
          data: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string"
          },
          img:"string",
          title: "Thông Báo Report",
          token: report.room.user.token_device
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Notification sent successfully!');
      alert("Notification sent successfully!")
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <tr>
      <td>{report.stt}</td>
      <td>{report.room.boardingHostel.address}</td>
      <td>{report.user.phone}</td>
      <td>{report.user.name}</td>
      <td>
        <img src={report.img1} alt="Report img" />
        <img src={report.img2} alt="Report img" />
        <img src={report.img3} alt="Report img" />
      </td>
      <td>{report.reason}</td>
      <td>
        <button className={styles.btntype} onClick={handleNotification}>Thông báo</button>
      </td>
    </tr>
  );
};

export default function page() {
  const [reportData, setReportData] = useState<Interface[]>([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch('http://localhost:8080/Admin/getReport1');
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
              <th>Phone</th>
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
