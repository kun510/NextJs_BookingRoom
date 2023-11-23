"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from "./listboarding.module.css";
interface Room {
  id: number;
  address: string;
  area: string;
  img: string;
  status: string;
  numberRoom: number;
  numberOfStars: number;
  user:{
    id: number;
    name: string;
  }
}
const RoomComponent: React.FC<{ room: Room }> = ({ room }) => {
  const router = useRouter();
  const handleAddRoomClick = () => {
    localStorage.setItem('BoardingId', room.id.toString());
    router.push('../forms/addroom');
  };
  return (
    <tr>
      <td>{room.id}</td>
      <td>{room.area}</td>
      <td>{room.address}</td>
      <td>
        <img src={room.img} alt={`Room ${room.id}`} />
      </td>
      <td>{room.numberRoom}</td>
      <td>{room.status}</td>
      <td>
        <button
          className={styles.btntype}
          onClick={handleAddRoomClick}
        >
          Thêm phòng
        </button>
      </td>
    </tr>
  );
};
export default function page() {
  const [roomData, setRoomData] = useState<Room[]>([]);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/host/getBoaddingByHost?hostId=${userId}`);
        const data = await response.json();
        setRoomData(data);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();
  }, [userId]);

  return (
    <div className={styles.container}>
      <div className={styles.container_main}>
        <div className={styles.listroom_title_head}>
          <div className={styles.listroom_title}>Quản lý dãy trọ</div>
          <span className={styles.listroom_showall}>Show All</span>
        </div>
        <table className={styles.listroom_table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Khu Vực</th>
              <th>Địa Chỉ</th>
              <th>Ảnh</th>
              <th>Tổng số phòng</th>
              <th>Trạng thái</th>
              <th>Add Room</th>
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
