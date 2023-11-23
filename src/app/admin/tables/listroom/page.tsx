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
              <th>Địa Chỉ</th>
              <th>Khu Vực</th>
              <th>Img</th>
              <th>Type</th>
              <th>Status</th>
              <th>Fix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>21 Tiên Sơn 17</td>
              <td>Hải Châu </td>
              <td>
                <img src="/avatar.png" alt="Room Image" />
              </td>
              <td>Hostel</td>
              <td>
                <button className={styles.btntype}>Trống</button>
              </td>
              <td>
                <button className={styles.btnok}>Update</button>
                <button className={styles.btnnotok}>Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
