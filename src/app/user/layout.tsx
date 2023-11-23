"use client";
import MenuComponent from "@/component/menu/MenuComponent";
import HeaderComponent from "@/component/header/HeaderComponent";
import styles from "./layout.module.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <MenuComponent />
        <HeaderComponent />
        <div className={styles.children}>{children}</div>
      </body>
    </html>
  );
}
