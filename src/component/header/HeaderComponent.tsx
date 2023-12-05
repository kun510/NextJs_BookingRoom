"use client";
import React from "react";
import { useEffect, useState } from 'react';
import styles from "./HeaderComponent.module.css";
import { useRouter } from 'next/navigation';
import { InterfaceUser } from '@/type/type';
export default function HeaderComponent() {
  const router = useRouter();
  const [openMess, setOpenMess] = useState(false);
  const [openProfile, setopenProfile] = useState(false);
  const [userData, setUserData] = useState<InterfaceUser[]>([]);
 // const userId = localStorage.getItem('userId');
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const handleLogout = () => {
    localStorage.removeItem('userId');
    router.push('/');;
  };

  useEffect(() => {
    const apiUrl = `http://localhost:8080/user/getCurrent?UserId=${userId}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]);
  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <div>
          <img className={styles.header_icon} src="/iconMenu.png" alt="" />
        </div>
        <input
          type="text"
          className={styles.header_left_search}
          placeholder="Search"
        />
      </div>
      <div className={styles.header_right}>
       
        {userData.length > 0 && userData.map((user, index) => (
          <div onClick={() => {
            setopenProfile(!openProfile);
          }} key={index} className={styles.header_right_item}>
            <img className={styles.header_avatar} src={user.img.toString()} alt="" />
            {user.name}
            <img className={styles.header_icon_arr} src="/iconArrow.png" alt="" />
              {openProfile && (
              <div className={styles.header_right_menuchil}>
                <div className={styles.header_right_menuchil_item}>
                  <div>
                    <div className={styles.header_right_menuchil_content}>
                      Profile
                    </div>
                  </div>
                </div>
                <div className={styles.header_right_menuchil_item_2}>        
                  <div className={styles.header_right_menuchil_content}  onClick={handleLogout}>
                    Logout
                  </div>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
