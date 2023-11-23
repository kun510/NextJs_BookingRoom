"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from 'react';
export default function Home() {
  const [userCount, setUserCount] = useState(null);
  const [hostCount, setHostCount] = useState(null);
  const [RoomCount, setRoomCount] = useState(null);
  const [ReportCount, setReportCount] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await fetch('http://localhost:8080/Admin/countUser'); 
        const responseHost = await fetch('http://localhost:8080/Admin/countHost'); 
        const responseRoom = await fetch('http://localhost:8080/Admin/countRoom'); 
        const responseReport = await fetch('http://localhost:8080/Admin/countReport'); 
        if (!responseUser.ok && !responseHost && !responseRoom &&responseReport ) {
          throw new Error('Failed to fetch data');
        }
        const dataUser = await responseUser.json();
        const dataHost = await responseHost.json();
        const dataRoom = await responseRoom.json();
        const dataReport = await responseReport.json();
        setUserCount(dataUser);
        setHostCount(dataHost);
        setRoomCount(dataRoom);
        setReportCount(dataReport);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 
  return (
    <div className={styles.dasboard}>
      <div className={styles.statistical}>
        <div className={styles.statistical_container}>
            <div className={styles.box}>
              <img className={styles.box_img} src="/GraphChart.png" alt="" />
              <div>
                <div className={styles.box_title}>Tổng số người dùng</div>
                <div className={styles.box_parameter}>
                {userCount !== null ? (
                  <p>{userCount}</p>) : (<p>Loading...</p>)}
                </div>
              </div>
            </div>
          <div className={styles.box}>
            <img className={styles.box_img} src="/Chart.png" alt="" />
            <div>
              <div className={styles.box_title}>Tổng số chủ trọ</div>
              <div className={styles.box_parameter}>
              {hostCount !== null ? (
                  <p>{hostCount}</p>) : (<p>Loading...</p>)}
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <img className={styles.box_img} src="/ChartBar.png" alt="" />
            <div>
              <div className={styles.box_title}>Số phòng </div>
              <div className={styles.box_parameter}>
                  {RoomCount !== null ? (
                  <p>{RoomCount}</p>) : (<p>Loading...</p>)}
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <img className={styles.box_img} src="/PieChart.png" alt="" />
            <div>
              <div className={styles.box_title}>Số báo cáo</div>
              <div className={styles.box_parameter}>
                  {ReportCount !== null ? (
                  <p>{ReportCount}</p>) : (<p>Loading...</p>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.listroom}>
        <div className={styles.listroom_title_head}>
          <div className={styles.listroom_title}>Danh sách trợ giúp</div>
          <span className={styles.listroom_showall}>Show All</span>
        </div>
        <table className={styles.listroom_table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Img</th>
              <th>Content</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Trần Cường </td>
                <td>0358838507</td>
              <td>
                <img src="/avatar.png" alt="Room Image" />
              </td>
              <td>App bị lỗi</td>
            </tr>
            <tr>
              <td>1</td>
              <td>21 Tiên Sơn 17 </td>
              <td>Hải Châu </td>
              <td>
                <img src="/avatar.png" alt="Room Image" />
              </td>
              <td>Nhà trọ cấp 4</td>
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
