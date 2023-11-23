"use client";
import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Notification } from "@/type/type";

export default function YourComponent() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const hostId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!hostId) {
          console.error("User ID not found in localStorage");
          return;
        }

        const response = await fetch(`http://localhost:8080/user/getNotificationReceiver?idUserReceiver=${hostId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [hostId]);

  return (
    <div className={styles.container}>
      <div className={styles.container_main}>
        <div className={styles.listroom_title_head}>
          <div className={styles.listroom_title}>Danh sách phòng Trống</div>
          <span className={styles.listroom_showall}>Show All</span>
        </div>
        <table className={styles.listroom_table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Người Gửi</th>
              <th>Thời Gian</th>
              <th>Nội dung</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{notification.user_id_sender.name}</td>
                <td>{notification.time}</td>
                <td>{notification.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
