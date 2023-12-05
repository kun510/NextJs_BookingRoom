"use client";
import { useEffect, useState } from "react";
import styles from "./widget.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { Notification } from "@/type/type";
import { Evaluation } from "@/type/type";
import moment from 'moment';

export default function page() {
   const currentDate = new Date(); 
   const [notifications, setNotifications] = useState<Notification[]>([]);
   const [review, setReview] = useState<Evaluation[]>([]);
   const hostId = localStorage.getItem("userId");
   useEffect(() => {
    const fetchData = async () => {
      try {
        if (!hostId) {
          console.error("User ID not found in localStorage");
          return;
        }

        const response = await fetch(`http://localhost:8080/user/getNotificationReceiver?idUserReceiver=${hostId}`);
        const responseReview = await fetch(`http://localhost:8080/user/getReviewHost?hostId=${hostId}`);
      
        if (!response.ok && !responseReview.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const dataReview = await responseReview.json();
        setNotifications(data);
        setReview(dataReview);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [hostId]);


  return (
    <div className={styles.widget}>
      <div className={styles.statistical_container}>
        <div className={styles.box}>
          <div className={styles.box_head}>
            <div className={styles.box_head_title}>Notification</div>
            <div className={styles.box_head_showall}>Show All</div>
          </div>
          {notifications.map((notification, index) => (
          <div className={styles.box_item}>
            <img className={styles.box_item_avatar} src={notification.user_id_sender.img} alt="" />
            <div className={styles.box_item_content}>
              <div className={styles.box_item_content_title}>
                <div className={styles.box_item_content_title_name}>
                  {notification.user_id_sender.name}
                </div>
                <div className={styles.box_item_content_title_time}>
                  {/* {notification.time} */}
                  {moment(notification.time).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </div>
              <div className={styles.box_item_content_text}>
                {notification.content}
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className={styles.box}>
          <div className={styles.box_head}>
            <div className={styles.box_head_title}>Calender</div>
            <div className={styles.box_head_showall}>Show All</div>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[
                "DatePicker",
                "MobileDatePicker",
                "DesktopDatePicker",
                "StaticDatePicker",
              ]}
            >
              <DemoItem>
                <StaticDatePicker defaultValue={dayjs(currentDate)} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className={styles.box}>
          <div className={styles.box_head}>
            <div className={styles.box_head_title}>Review Room</div>
            <div className={styles.box_head_showall}>Show All</div>
          </div>
          {review.map((reviews, index) => (
          <div className={styles.box_item}>
            <img className={styles.box_item_avatar} src={reviews.user.img} alt="" />
            <div className={styles.box_item_content}>
              <div className={styles.box_item_content_title}>
                <div className={styles.box_item_content_title_name}>
                {reviews.user.name}
                </div>
                <div className={styles.box_item_content_title_time}>
                {reviews.numberOfStars}
                </div>
              </div>
              <div className={styles.box_item_content_text}>
              {reviews.evaluate}
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
