import React from "react";
import { motion } from "framer-motion";
import styles from './Footer.module.css';
import { GithubIcon } from "../../common/svg/SocialIcons";
import { OutlookIcon } from "../../common/svg/OutlookIcon";


const MotionFooter = motion.footer;
const MotionLink = motion.a;

const Footer: React.FC = () => {
  return (
    <MotionFooter 
      className={styles.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={styles.container}>
        <div className={styles.copyright}>
          © 2025 - Alysson Michel
        </div>
        
        <div className={styles.tech}>
          Desenvolvido com Next.js + Framer Motion
        </div>
        
        <div className={styles.links}>
          <MotionLink
            href="https://github.com"
            className={styles.link}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="GitHub"
          >
            <GithubIcon />
          </MotionLink>
          
          <MotionLink
            href="mailto:allyson@example.com"
            className={styles.link}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Email"
          >
            <OutlookIcon />
          </MotionLink>
        </div>
      </div>
    </MotionFooter>
  );
};

export default Footer;