"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import { BoardingData } from '@/type/type';


export default function Home() {
  const [countRoom, setUserCount] = useState<number | null>(null);
  const [hostCount, setHostCount] = useState<number | null>(null);
  const [RoomCount, setRoomCount] = useState<number | null>(null);

  const [boardingData, setboardingData] = useState<BoardingData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hostId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsecountRoom = await fetch(`http://localhost:8080/host/CountRoom?HostId=${hostId}`); 
        const responsecountRoomEmpty = await fetch(`http://localhost:8080/host/CountRoomEmptyReal?HostId=${hostId}`); 
        const responsecountRent = await fetch(`http://localhost:8080/host/CountRent?HostId=${hostId}`); 
        const response = await fetch(`http://localhost:8080/host/RoomEmptyByBoarding?hostId=${hostId}`);
        if (!response.ok && !responsecountRoom.ok && !responsecountRoomEmpty.ok && !responsecountRent.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json() as BoardingData[]; 
        const dataUser = await responsecountRoom.json();
        const dataHost = await responsecountRoomEmpty.json();
        const dataRoom = await responsecountRent.json();
        setboardingData(data);
        setHostCount(dataHost);
        setUserCount(dataUser);
        setRoomCount(dataRoom);
      } catch (error) {
        setError(`Error fetching data: ${error}`);
      }
    };
    fetchData();
  }, [hostId]);



  return (
    <div className={styles.dasboard}>
      <div className={styles.statistical}>
        <div className={styles.statistical_container}>
          <div className={styles.box}>
            <img className={styles.box_img} src="/GraphChart.png" alt="" />
            <div>
              <div className={styles.box_title}>Tổng Số Phòng Trọ</div>
              <div className={styles.box_parameter}>{countRoom !== null ? (
                <p>{countRoom}</p>) : (<p>Loading...</p>)}</div>
            </div>
          </div>
          <div className={styles.box}>
            <img className={styles.box_img} src="/Chart.png" alt="" />
            <div>
              <div className={styles.box_title}>Số Phòng Trống</div>
              <div className={styles.box_parameter}>{hostCount !== null ? (
                  <p>{hostCount}</p>) : (<p>Loading...</p>)}</div>
            </div>
          </div>
          <div className={styles.box}>
            <img className={styles.box_img} src="/ChartBar.png" alt="" />
            <div>
              <div className={styles.box_title}>Số Người Thuê</div>
              <div className={styles.box_parameter}>{RoomCount !== null ? (
                  <p>{RoomCount}</p>) : (<p>Loading...</p>)}</div>
            </div>
          </div>
          
        </div>
      </div>
      <div className={styles.listroom}>
        <div className={styles.listroom_title_head}>
          <div className={styles.listroom_title}>Danh sách phòng Trống</div>
          <span className={styles.listroom_showall}>Show All</span>
        </div>
        {boardingData?.length ? (
        <table className={styles.listroom_table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Khu Vực</th>
              <th>Địa Chỉ</th>
              <th>Ảnh dãy trọ</th>
              <th>Trạng Thái</th>
              <th>Số phòng trống</th>
            </tr>
          </thead>
          <tbody>
          {boardingData.map((room: BoardingData, index) => (
                <tr key={room.boardingHost.id}>
                  <td>{index + 1}</td>
                  <td>{room.boardingHost.area}</td>
                  <td>{room.boardingHost.address}</td>
                  <td>
                    <img src={room.boardingHost.img} alt="Room Image" />
                  </td>
                  <td>{room.boardingHost.status}</td>
                  <td> {room.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>0</p>
        )}
      </div>
    </div>
  );
}
