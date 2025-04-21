import React from "react";
import { motion } from "framer-motion";
import styles from "./Section.module.css";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  bg?: "base" | "surface" | "primary" | "secondary" | "accent";
  fullWidth?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = "",
  bg = "base",
  fullWidth = false,
  padding = "md",
}) => {
  const bgClass = {
    base: styles.baseBg,
    surface: styles.surfaceBg,
    primary: styles.primaryBg,
    secondary: styles.secondaryBg,
    accent: styles.accentBg,
  }[bg];

  const paddingClass = {
    none: styles.paddingNone,
    sm: styles.paddingSm,
    md: styles.paddingMd,
    lg: styles.paddingLg,
  }[padding];

  return (
    <motion.section
      id={id}
      className={`${styles.section} ${bgClass} ${paddingClass} ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''}`}>
        {children}
      </div>
    </motion.section>
  );
};