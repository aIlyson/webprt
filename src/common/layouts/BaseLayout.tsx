import React from "react";
import Navbar from "../../containers/navbar";
import Footer from "../../containers/footer";
import { useAppContext } from "../context/appContext";
import styles from "./BaseLayout.module.css";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { theme } = useAppContext();

  return (
    <div className={`${styles.layout} ${theme === "dark" ? styles.dark : ""}`}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
