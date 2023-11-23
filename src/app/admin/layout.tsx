"use client";
import HeaderComponent from "@/component/header/HeaderComponent";
import MenuAdminComponent from "@/component/adminComponent/menuAdmin/MenuAdminComponent";
import styles from "./layout.module.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <MenuAdminComponent />
        <HeaderComponent />
        <div className={styles.children}>{children}</div>
      </body>
    </html>
  );
}
