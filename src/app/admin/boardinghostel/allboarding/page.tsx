"use client";
import React, { useEffect, useState } from 'react';
import styles from "./allboarding.module.css";
interface Room {
  id: number;
  img: string;
  user: {
    name: string;
  };
  boardingHostel: {
    area: string;
    address: string;
  };
}

interface RoomComponentProps {
  room: Room;
}
const RoomComponent: React.FC<RoomComponentProps> = ({ room }) => (
  <tr>
    <td>{room.id}</td>
    <td>{room.boardingHostel.area}</td>
    <td>{room.boardingHostel.address}</td>
    <td>
      <img src={room.img} alt={`Room ${room.id}`} />
    </td>
    <td>{room.user.name}</td>
    <td>
      <button className={styles.btntype}>Xem</button>
    </td>
  </tr>
);


export default function page() {
  const [roomData, setRoomData] = useState([]);
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/getallroom');
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
            <div className={styles.listroom_title}>Danh sách các phòng trọ</div>
            <span className={styles.listroom_showall}>Show All</span>
        </div>
        <table className={styles.listroom_table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Khu Vực</th>
              <th>Địa Chỉ</th>
              <th>Img</th>
              <th>Name Host</th>
              <th>Chi Tiết</th>
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
