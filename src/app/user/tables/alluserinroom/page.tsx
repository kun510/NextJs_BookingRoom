"use client";
import React, { useEffect, useState } from 'react';
import styles from "./style.module.css";
import { RentData } from '@/type/type';
import { useRouter } from 'next/navigation';
export default function page() {
  const [rentData, setRentData] = useState<RentData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hostId = localStorage.getItem("userId");
  const router = useRouter();
  const handleAddBillClick = (RentID: number, roomId: number) => {
    localStorage.setItem('selectedRentId', RentID.toString());
    localStorage.setItem('selectedRoomIdRent', roomId.toString());
    router.push('../forms/addbill');
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/host/usersByHost?hostId=${hostId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json() as RentData[]; 
        setRentData(data);
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
          <div className={styles.listroom_title}>Danh sách Người thuê trọ</div>
          <span className={styles.listroom_showall}>Show All</span>
        </div>
        {rentData?.length ? (
        <table className={styles.listroom_table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Ảnh NgườI Dùng</th>
              <th>Số Điện Thoại</th>
              <th>Email</th>
              <th>Phòng</th>
              <th>Dãy trọ</th>
              <th>Thêm Hoá Đơn</th>
            </tr>
          </thead>
          <tbody>
              {rentData.map((user: RentData, index) => (
                <tr key={user.user.id}>
                  <td>{index + 1}</td>
                  <td>{user.user.name || 'N/A'}</td>
                  <td>
                  <img src={user.user.img} alt="User Image" />
                  </td>
                  <td>{user.user.phone}</td>
                  <td>{user.user.email}</td>
                  <td>{user.room.id}</td>
                  <td>{user.room.boardingHostel.area}</td>
                  <td>
                    <button
                      className={styles.btntype}
                      onClick={() => handleAddBillClick(user.id, user.room.id)}>
                      Thêm Hoá Đơn
                    </button>
                  </td>
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
