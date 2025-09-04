import React from "react";
import { motion as Motion } from "framer-motion";
import styles from "./Section.module.css";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  bg?: "base" | "surface" | "primary" | "secondary" | "accent";
  fullWidth?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  withPixels?: boolean;
  pixelCount?: number;
}

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = "",
  bg = "base",
  fullWidth = false,
  padding = "md",
  withPixels = true,
  pixelCount = 20,
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

  const generatePixels = () => {
    if (!withPixels) return null;

    return Array.from({ length: pixelCount }).map((_, i) => {
      const size = ["sm", "md", "lg"][Math.floor(Math.random() * 3)];
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const delay = Math.random() * 0.5;
      const driftX = (Math.random() - 0.5) * 20; // Random drift between -10px and 10px
      const driftY = (Math.random() - 0.5) * 20; // Random drift between -10px and 10px
      const duration = 3 + Math.random() * 3; // Random duration between 3s and 6s

      return (
        <Motion.div
          key={i}
          className={`${styles.pixel} ${styles[`pixel-${size}`]}`}
          style={{ left, top }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          whileInView={{
            opacity: 0.1,
            x: driftX,
            y: driftY,
            transition: {
              opacity: { duration: 0.5, delay },
              x: {
                repeat: Infinity,
                repeatType: "reverse",
                duration,
                ease: "easeInOut",
              },
              y: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: duration * 1.2, // Slightly different duration for varied motion
                ease: "easeInOut",
              },
            },
          }}
          viewport={{ once: false }} // Allow animation to replay when re-entering viewport
        />
      );
    });
  };

  return (
    <Motion.section
      id={id}
      className={`${styles.section} ${bgClass} ${paddingClass} ${className} ${
        withPixels ? styles.pixelBg : ""
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {withPixels && generatePixels()}
      <div
        className={`${styles.container} ${fullWidth ? styles.fullWidth : ""}`}
      >
        {children}
      </div>
    </Motion.section>
  );
};
