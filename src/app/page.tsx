"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./login.module.css";
export default function page() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: phone,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      const data = await response.json();
      console.log('Login successful:', data);

      if(response.ok){
        if(data.message == 'User'){
          alert("hãy đăng nhập vào ứng dụng mobile")
        } 
        if(data.message == 'Host'){
          localStorage.setItem('userId', data.userId);
          router.push('/user/dashboard');
        }
        if(data.message == 'Admin'){
          localStorage.setItem('userId', data.userId);
          router.push('/admin/dashboard');
        }
        if(data.message == 'Wait for confirmation'){
          alert("Chờ Admin xác nhận")
        }
        if(data.message == 'User is banned'){
          alert("Chờ Admin gỡ ban")
        }
        if(data.message == 'check username or password'){
          alert("sai tài khoản hoặc mật khẩu")
        } 
      }
      //lay id dang nhap hien tai
      // const userId = localStorage.getItem('userId');
      // if (userId) {
      //   alert("sai tài khoản hoặc mật khẩu"+userId)
      // } else {
      //   console.log('User ID not found in localStorage');
      // }
      setUserData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.title}>
            <div className={styles.form_title1}>#MANAGER</div>
            <div className={styles.form_title}>Login</div>
        </div>
        <label className={styles.form_label} htmlFor="numroom">
          Phone
        </label>
        <input
          className={styles.form_ip}
          type="text"
          id="numroom"
          placeholder="Number Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label className={styles.form_label} htmlFor="pay">
          Password
        </label>
        <input
          className={styles.form_ip}
          type="text"
          id="pay"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className={styles.Forgot} htmlFor="type">
            Forgot Password
        </label>
        <div className={styles.btn} onClick={handleLogin}>Đăng Nhập</div>
         <label className={styles.NextLogin} htmlFor="type">
                Don't have an Account? 
                <span className={styles.SignIn}>Register</span>
        </label>
      </div>
    </div>
  );
}
