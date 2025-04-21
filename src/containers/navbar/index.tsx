import React, { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useAppContext } from "../../common/context/appContext";
import styles from "./NavBar.module.css";

const NavBar: React.FC = () => {
  const { theme, toggleTheme } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop - 300 &&
          window.scrollY < sectionTop + sectionHeight - 300
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Início", href: "#home", id: "home" },
    { name: "Sobre", href: "#about", id: "about" },
    { name: "Projetos", href: "#projects", id: "projects" },
    { name: "Contato", href: "#contact", id: "contact" },
  ];

  return (
    <>
      <motion.div
        className={styles.scrollProgress}
        style={{ scaleX: scrollProgress }}
      />

      <motion.nav
        className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.scanlines} />

        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <span className={styles.logoAccent}>&lt;</span>
            <motion.span
              className={styles.logoText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              ALYSSON
            </motion.span>
            <span className={styles.logoAccent}>/&gt;</span>
            <motion.span
              className={styles.cursor}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          <div className={styles.navItems}>
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`${styles.navLink} ${
                  activeSection === item.id ? styles.active : ""
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              >
                <span className={styles.navLinkText}>{item.name}</span>
                <span className={styles.underline} />
              </motion.a>
            ))}
          </div>

          <div className={styles.controls}>
            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label="Alternar tema"
            >
              <motion.span
                key={theme}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.themeIcon}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </motion.span>
              <span className={styles.themeToggleBorder} />
            </button>

            <div className={styles.mobileMenu}>
              <button
                className={styles.mobileMenuButton}
                aria-label="Menu mobile"
              >
                <span className={styles.menuIcon}>
                  <span className={styles.menuLine} />
                  <span className={styles.menuLine} />
                  <span className={styles.menuLine} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default NavBar;
