import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Button.module.css";

const MotionLink = motion(Link);

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "terminal" | "outline" | "ghost";
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  icon,
}) => {
  const sizeClass = {
    sm: styles.buttonSm,
    md: styles.buttonMd,
    lg: styles.buttonLg,
  }[size];

  const variantClass = {
    primary: styles.primary,
    secondary: styles.secondary,
    terminal: styles.terminal,
    outline: styles.outline,
    ghost: styles.ghost,
  }[variant];

  const buttonClasses = `${styles.button} ${sizeClass} ${variantClass} ${className}`;

  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <MotionLink
        href={href}
        className={buttonClasses}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      className={buttonClasses}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {content}
    </motion.button>
  );
};

export default Button;