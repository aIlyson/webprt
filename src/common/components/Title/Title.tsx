import React from "react";
import { motion } from "framer-motion";
import styles from "./Title.module.css";

const Motion = motion;

interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  withUnderline?: boolean;
  withBrackets?: boolean;
  color?: "base" | "muted" | "primary" | "secondary" | "accent";
  align?: "left" | "center" | "right";
}

export const Title: React.FC<TitleProps> = ({
  level = 2,
  children,
  className = "",
  withUnderline = false,
  withBrackets = false,
  color = "base",
  align = "left",
}) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  const sizeClass = {
    1: styles.h1,
    2: styles.h2,
    3: styles.h3,
    4: styles.h4,
    5: styles.h5,
    6: styles.h6,
  }[level];

  const colorClass = {
    base: styles.baseColor,
    muted: styles.mutedColor,
    primary: styles.primaryColor,
    secondary: styles.secondaryColor,
    accent: styles.accentColor,
  }[color];

  const alignClass = {
    left: styles.leftAlign,
    center: styles.centerAlign,
    right: styles.rightAlign,
  }[align];

  return (
    <Motion.div
      className={`${styles.titleWrapper} ${alignClass}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: level * 0.1 }}
    >
      <Tag
        className={`${styles.title} ${sizeClass} ${colorClass} ${className}`}
      >
        {withBrackets ? (
          <>
            <span className={styles.bracket}>&lt;</span>
            {children}
            <span className={styles.bracket}>/&gt;</span>
          </>
        ) : (
          children
        )}
        {withUnderline && (
          <Motion.div
            className={`${styles.underline} ${
              styles[
                `underline${color.charAt(0).toUpperCase() + color.slice(1)}`
              ]
            }`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        )}
      </Tag>
    </Motion.div>
  );
};
