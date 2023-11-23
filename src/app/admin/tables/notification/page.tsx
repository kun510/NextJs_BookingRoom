"use client";
import React from "react";
import styles from "./style.module.css";
export default function page() {
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
              <th>Khu Vực</th>
              <th>Địa Chỉ Phòng</th>
              <th>Img</th>
              <th>Phone</th>
              <th>Duyệt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Trần Cường</td>
              <td>21 Tiên Sơn 17</td>
              <td>
                <img src="/avatar.png" alt="Room Image" />
              </td>
              <td>0358838507</td>
              <td>cuongtran@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
