"use client";
import React from "react";
import { useEffect, useState } from 'react';
import styles from "./Menucomponent.module.css";
import Link from "next/link";
import { InterfaceUser } from '@/type/type';
export default function MenuComponent() {
  const [openForm, setOpenForm] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  const [userData, setUserData] = useState<InterfaceUser[]>([]);
 // const userId = localStorage.getItem('userId');
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const apiUrl = `http://localhost:8080/user/getCurrent?UserId=${userId}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]);
  return (
    <div className={styles.menu}>
      <Link href="/">
        <div className={styles.menu_header}>MANAGER</div>
      </Link>
      {userData.length > 0 && userData.map((user, index) => (
        <div key={index} className={styles.menu_infor}>
          <img src={user.img.toString()} alt="" className={styles.menu_infor_avatar} />
          <div className={styles.menu_infor_detail}>
            <div className={styles.menu_infor_name}>{user.name}</div>
            <div className={styles.menu_infor_role}>{user.role.role}</div>
          </div>
        </div>
      ))}
      <div className={styles.menu_content}>
        <Link href="/user/dashboard">
          <div className={styles.menu_content_item}>
            <div className={styles.menu_content_itemleft}>
              <img src="/iconSpeed.png" className={styles.menu_content_icon} />
              <div className={styles.menu_content_title}>Dashboard</div>
            </div>
          </div>
        </Link>
        <Link href="/user/widget">
          <div className={styles.menu_content_item}>
            <div className={styles.menu_content_itemleft}>
              <img src="/iconList.png" className={styles.menu_content_icon} />
              <div className={styles.menu_content_title}>Widget</div>
            </div>
          </div>
        </Link>
        <div
          className={styles.menu_content_item}
          onClick={() => {
            setOpenForm(!openForm);
          }}
        >
          <div className={styles.menu_content_itemleft}>
            <img src="/iconKeyboard.png" className={styles.menu_content_icon} />
            <div className={styles.menu_content_title}>Dashboard</div>
          </div>
          <div>
            <img
              src="/iconArrow.png"
              className={styles.menu_content_icon_arr}
            />
          </div>
        </div>
        {openForm && (
          <div className={styles.menu_chil}>
            <Link href="/user/forms/notificatin">
              <div className={styles.menu_chil_item}>Notification</div>
            </Link>
            <Link href="/user/forms/addboadinghostel">
              <div className={styles.menu_chil_item}>Add Boarding Hotel</div>
            </Link>
          </div>
        )}
        <div
          className={styles.menu_content_item}
          onClick={() => {
            setOpenTable(!openTable);
          }}
        >
          <div className={styles.menu_content_itemleft}>
            <img src="/iconKeyboard.png" className={styles.menu_content_icon} />
            <div className={styles.menu_content_title}>Tables</div>
          </div>
          <div>
            <img
              src="/iconArrow.png"
              className={styles.menu_content_icon_arr}
            />
          </div>
        </div>
        {openTable && (
          <div className={styles.menu_chil}>
            <Link href="/user/tables/alluserinroom">
              <div className={styles.menu_chil_item}>All User In Room</div>
            </Link>
            <Link href="/user/tables/listboarding">
              <div className={styles.menu_chil_item}>List Boarding</div>
            </Link>
            <Link href="/user/tables/listrent">
              <div className={styles.menu_chil_item}>List Rent</div>
            </Link>
            <Link href="/user/tables/listroom">
              <div className={styles.menu_chil_item}>List Room</div>
            </Link>
            <Link href="/user/tables/notification">
              <div className={styles.menu_chil_item}>Notification</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
