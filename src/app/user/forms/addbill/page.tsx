"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './addbill.module.css';
import { format } from 'date-fns';

export default function Page() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [electricityConsumption, setElectricityConsumption] = useState('');
  const [amount, setAmount] = useState('');
  const [otherCost, setOtherCost] = useState('');
  const [message, setMessage] = useState('');


  const [hostId, setHostId] = useState(localStorage.getItem('userId') || '');
  const [rentId, setRentId] = useState(localStorage.getItem('selectedRentId') || '');
  const [roomId, setRoomId] = useState(localStorage.getItem('selectedRoomIdRent') || '');
  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 
  };

  const handleAddBill = async () => {
    const apiUrl = `http://localhost:8080/host/addBill?costsIncurred=${otherCost}&electricBill=${amount}&hostId=${hostId}&rentId=${rentId}`;

    const addBillData = {
      costsIncurred: otherCost,
      electricBill: amount,
    };

    try {
      const response: Response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addBillData),
      });

      const data = await response.json();
      console.log('Response:', response);
      console.log('Data:', data);

      if (response.ok) {
        console.log('Success:', data);
        setMessage('Bill Room added successfully');
        setTimeout(() => {
          router.push('../tables/alluserinroom');
        }, 5000);
      } else {
        console.error('Error Response:', response);
        console.error('Error Data:', data);
        setMessage('Failed to add bill due to server error');
      }
    } catch (error) {
      if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
        setMessage('Failed to add bill due to an unexpected server response format');
      } else {
        setMessage('Failed to add bill due to a network error');
      }
    }
  };

  useEffect(() => {
    setHostId(localStorage.getItem('userId') || '');
    setRentId(localStorage.getItem('selectedRentId') || '');
    setRoomId(localStorage.getItem('selectedRoomIdRent') || '');
  }, [hostId, rentId, roomId]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.form_title}>Thêm Hoá Đơn</div>
        {message && (
          <div className={message.includes('success') ? styles.successMessage : styles.errorMessage}>
            {message}
          </div>
        )}

        <label className={styles.form_label}>Số phòng thuê</label>
        <label className={styles.form_label}>{roomId}</label>

        <label className={styles.form_label}>
          Số Điện Tiêu Thụ Trong Tháng
        </label>
        <input
          className={styles.form_ip}
          type="number"
          placeholder="160kWh"
          min={0}
          onChange={(e) => setElectricityConsumption(e.target.value)}
        />
        <label className={styles.form_label}>Số Tiền</label>
        <input
          className={styles.form_ip}
          type="number"
          placeholder="300.000"
          min={0}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label className={styles.form_label}>Tháng</label>
        <input
          className={styles.form_ip}
          type="text"
          value={format(selectedMonth, 'MM/yyyy')}
          onChange={handleMonthChange}
        />

        <label className={styles.form_label}>Chi phí khác</label>
        <input
          className={styles.form_ip}
          type="number"
          min={0}
          placeholder="1.000.000 đ"
          onChange={(e) => setOtherCost(e.target.value)}
        />

        <div className={styles.btn} onClick={handleAddBill}>
          Thêm
        </div>
      </div>
    </div>
  );
}
