"use client";
import React from "react";
import { useEffect, useState } from 'react';
import styles from "./MenuAdmincomponent.module.css";
import Link from "next/link"
import { InterfaceUser } from '@/type/type';
export default function MenuAdminComponent() {
  const [openForm, setOpenForm] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [userData, setUserData] = useState<InterfaceUser[]>([]);
  const userId = localStorage.getItem('userId');
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
        <div className={styles.menu_header}>ADMIN</div>
      </Link>
      {userData.length > 0 && userData.map((user, index) => (
        <div className={styles.menu_infor}>
          <div key={index} className={styles.menu_infor_container}>
            <img src={user.img.toString()} alt="Avatar" className={styles.menu_infor_avatar}/> 
            <div className={styles.menu_infor_detail}>
              <div className={styles.menu_infor_name}>{user.name}</div>
              <div className={styles.menu_infor_role}>{user.role.role}</div>
            </div>
          </div>
        </div>
      ))}
     
      <div className={styles.menu_content}>
        <Link href="/admin/dashboard">
          <div className={styles.menu_content_item}>
            <div className={styles.menu_content_itemleft}>
              <img src="/iconSpeed.png" className={styles.menu_content_icon} />
              <div className={styles.menu_content_title}>Dashboard</div>
            </div>
          </div>
        </Link>
        <Link href="/admin/users">
          <div className={styles.menu_content_item}>
            <div className={styles.menu_content_itemleft}>
              <img src="/iconList.png" className={styles.menu_content_icon} />
              <div className={styles.menu_content_title}>Users</div>
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
            <div className={styles.menu_content_title}>Host</div>
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
            <Link href="/admin/host/allhost">
              <div className={styles.menu_chil_item}>All Host</div>
            </Link>
            <Link href="/admin/host/hostconfirm">
              <div className={styles.menu_chil_item}>Host Confirm</div>
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
            <div className={styles.menu_content_title}>Boarding Hostel</div>
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
            <Link href="/admin/boardinghostel/allboarding">
              <div className={styles.menu_chil_item}>All Boarding Hostel</div>
            </Link>
            <Link href="/admin/boardinghostel/boardingconfirm">
              <div className={styles.menu_chil_item}>Boarding Hostel Confirm</div>
            </Link>
           
          </div>
        )}
        <div
          className={styles.menu_content_item}
          onClick={() => {
            setOpenReport(!openReport);
          }}
        >
          <div className={styles.menu_content_itemleft}>
            <img src="/iconKeyboard.png" className={styles.menu_content_icon} />
            <div className={styles.menu_content_title}>Report</div>
          </div>
          <div>
            <img
              src="/iconArrow.png"
              className={styles.menu_content_icon_arr}
            />
          </div>
        </div>
        {openReport && (
          <div className={styles.menu_chil}>
            <Link href="/admin/report/report1">
              <div className={styles.menu_chil_item}>Report 1</div>
            </Link>
            <Link href="/admin/report/report2">
              <div className={styles.menu_chil_item}>Report 2</div>
            </Link>
            <Link href="/admin/report/report3">
              <div className={styles.menu_chil_item}>Report 3</div>
            </Link>
          </div>
        )}
        <Link href="/admin/accountban">
          <div className={styles.menu_content_item}>
            <div className={styles.menu_content_itemleft}>
              <img src="/iconList.png" className={styles.menu_content_icon} />
              <div className={styles.menu_content_title}>Account is Ban</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
