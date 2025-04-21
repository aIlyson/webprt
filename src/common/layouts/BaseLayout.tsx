import React from "react";
import Head from "next/head";
import Navbar from "../../containers/navbar";
import Footer from "../../containers/footer";
import { useAppContext } from "../context/appContext";
import styles from "./BaseLayout.module.css";

interface BaseLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  title = "Alysson Michel",
}) => {
  const { theme } = useAppContext();

  return (
    <div className={`${styles.layout} ${theme === "dark" ? styles.dark : ""}`}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
