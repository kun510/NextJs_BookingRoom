"use client";
import React, { useEffect, useState } from 'react';
import styles from "./style.module.css";
import { RoomData } from '@/type/type';

export default function page() {
  const [RoomData, setRoomData] = useState<RoomData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hostId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/host/RoomByHost?hostId=${hostId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json() as RoomData[]; 
        setRoomData(data);
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
          <div className={styles.listroom_title}>Danh sách phòng Trống</div>
          <span className={styles.listroom_showall}>Show All</span>
        </div>
        {RoomData?.length ? (
        <table className={styles.listroom_table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Địa Chỉ</th>
              <th>Khu Vực</th>
              <th>Img</th>
              <th>Type</th>
              <th>Status</th>
              <th>Dãy trọ</th>
            </tr>
          </thead>
          <tbody>
          {RoomData.map((room: RoomData, index) => (
                <tr key={room.id}>
                  <td>{index + 1}</td>
                  <td>{room.boardingHostel.area}</td>
                  <td>{room.boardingHostel.address}</td>
                  <td>
                    <img src={room.img} alt="Room Image" />
                  </td>
                  <td>{room.type}</td>
                  <td>{room.status}</td>
                  <td> {room.boardingHostel.id}</td>
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
