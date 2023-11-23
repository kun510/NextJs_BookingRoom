"use client";
import React, { useEffect, useState } from 'react';
import styles from './hostconfirm.module.css';

interface UserData {
  id: number;
  name: string;
  phone: string;
  password: string;
  address: String;
  email: String;
  img: String;
  confirmation_status: String;
}

export default function Page() {
  const [waitHostData, setWaitHostData] = useState<UserData[] | { message: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const adminId = localStorage.getItem("userId");
  const apiUrl = 'http://localhost:8080/Admin/getHostWait';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (Array.isArray(data)) {
          setWaitHostData(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAction = async (hostId: number, isConfirm: boolean) => {
    const apiEndpoint = isConfirm
      ? `http://localhost:8080/Admin/ConfirmHost?adminId=${adminId}&hostId=${hostId}`
      : `http://localhost:8080/Admin/CancelHost?adminId=${adminId}&hostId=${hostId}`;

    try {
      const response = await fetch(apiEndpoint, {
        method: 'PUT',
      });
      const data = await response.json();

      // Handle the response accordingly
      console.log(data);

      // Set confirmation message
      setConfirmationMessage(`Đã ${isConfirm ? 'xác nhận' : 'từ chối'} host`);

      // Reload the page after a delay (you can adjust the delay as needed)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setError(`Error ${isConfirm ? 'confirming' : 'rejecting'} host`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading data</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_main}>
        <div className={styles.listroom_title_head}>
          <div className={styles.listroom_title}>Danh sách host cần duyệt</div>
          <span className={styles.listroom_showall}>Show All</span>
        </div>
        {confirmationMessage && <div className={styles.confirmationMessage}>{confirmationMessage}</div>}
        <table className={styles.listroom_table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Avt</th>
              <th>Status</th>
              <th>Xác Nhận</th>
            </tr>
          </thead>
          <tbody>
            {waitHostData && !('message' in waitHostData) ? (
              waitHostData.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    <td>
                      <img src={user.img.toString()} alt="Avatar" />
                    </td>
                  </td>
                  <td>{user.confirmation_status}</td>
                  <td>
                    <button
                      className={styles.btntype}
                      onClick={() => handleAction(user.id,true)}
                    >
                      Duyệt
                    </button>
                    <button
                      className={styles.btncancel}
                      onClick={() => handleAction(user.id,false)}
                    >
                      Từ chối
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  {waitHostData && 'message' in waitHostData
                    ? waitHostData.message
                    : 'Không có host cần duyệt'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
