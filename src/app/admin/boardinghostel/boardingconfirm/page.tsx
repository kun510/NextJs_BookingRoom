"use client";
import React, { useEffect, useState } from 'react';
import styles from "./boardingconfirm.module.css";

interface Room {
  id: number;
  address: string;
  area: string;
  img: string;
  status: string;
  numberRoom: number;
  numberOfStars: number;
}

const adminId = localStorage.getItem("userId");

const RoomComponent: React.FC<{ room: Room }> = ({ room }) => {
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  const handleAction = async (boardingId: number, isConfirm: boolean) => {
    const apiEndpoint = isConfirm
      ? `http://localhost:8080/Admin/ConfirmBoarding?adminId=${adminId}&boardingId=${boardingId}`
      : `http://localhost:8080/Admin/CancelBoarding?adminId=${adminId}&boardingId=${boardingId}`;

    try {
      const response = await fetch(apiEndpoint, {
        method: 'PUT',
      });
      const data = await response.json();

      // Set confirmation message
      setConfirmationMessage(`Đã ${isConfirm ? 'xác nhận' : 'từ chối'} boarding`);

      // Reload the page after a delay (you can adjust the delay as needed)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(`Error ${isConfirm ? 'confirming' : 'rejecting'} boarding:`, error);

      // You can handle errors here and show a different notification if needed
    }
  };

  return (
    <tr>
     
      <td>{room.id}</td>
      <td>{room.area}</td>
      <td>{room.address}</td>
      <td>
        <img src={room.img} alt={`Room ${room.id}`} />
      </td>
      <td>{room.status}</td>
      <td>
        <button
          className={styles.btntype}
          onClick={() => handleAction(room.id, true)}
        >
          Duyệt
        </button>
        <button
          className={styles.btncancel}
          onClick={() => handleAction(room.id, false)}
        >
          Từ chối
        </button>
       
      </td>
      {confirmationMessage && (
        <td>
          <div className={styles.notification}>{confirmationMessage}</div>
        </td>
      )}
    </tr>
  );
};

export default function Page() {
  const [roomData, setRoomData] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch('http://localhost:8080/Admin/getConfirm');
        const data = await response.json();
        setRoomData(data);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();
  }, []);

  return (
    <div className={styles.container}>
       
      <div className={styles.container_main}>
        <div className={styles.listroom_title_head}>
          <div className={styles.listroom_title}>Danh sách dãy trọ cần duyệt</div>
          <span className={styles.listroom_showall}>Show All</span>
        </div>
        <table className={styles.listroom_table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Khu Vực</th>
              <th>Địa Chỉ</th>
              <th>Img</th>
              <th>Trang Thái</th>
              <th>Xác nhận</th>
              <th>Thông báo xác nhận</th>
            </tr>
          </thead>
          <tbody>
            {roomData.map((room, index) => (
              <RoomComponent key={index} room={room} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



