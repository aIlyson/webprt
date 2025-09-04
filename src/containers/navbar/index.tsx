import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useAppContext } from "../../common/context/appContext";
import styles from "./NavBar.module.css";
import MoonIcon from "../../common/svg/MoonIcon";
import SunIcon from "../../common/svg/SunIcon";
import MenuIcon from "../../common/svg/MenuIcon";

const ResumeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const NavBar: React.FC = () => {
  const { theme, toggleTheme } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResumePopup, setShowResumePopup] = useState(false);
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      if (isMenuOpen) {
        setIsMenuOpen(false);
      }

      const sections = document.querySelectorAll("section");
      let foundActive = false;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          window.scrollY >= sectionTop - 100 &&
          window.scrollY < sectionTop + sectionHeight - 100
        ) {
          setActiveSection(section.id);
          foundActive = true;
        }
      });

      if (!foundActive) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navItems = [
    { name: "Início", id: "home" },
    { name: "Sobre", id: "about" },
    { name: "Projetos", id: "projects" },
    { name: "Contato", id: "contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <motion.div
        className={styles.scrollProgress}
        style={{ scaleX: scrollProgress }}
      />

      <motion.nav
        className={`${styles.nav} ${isScrolled ? styles.scrolled : ""} ${
          isMenuOpen ? styles.menuOpen : ""
        }`}
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
              onClick={scrollToTop}
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
              <motion.button
                key={item.name}
                className={`${styles.navLink} ${
                  activeSection === item.id ? styles.active : ""
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
              >
                <span className={styles.navLinkText}>{item.name}</span>
                <span className={styles.underline} />
              </motion.button>
            ))}
          </div>

          <div className={styles.controls}>
                 <div className={styles.resumeButtonWrapper}>
              <motion.a
                href="https://acrobat.adobe.com/id/urn:aaid:sc:US:95982c10-fede-4441-b9ec-e0b82041d78e"
                className={styles.resumeButton}
                aria-label="Baixar currículo"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setShowResumePopup(true)}
                onMouseLeave={() => setShowResumePopup(false)}
              >
                <motion.div
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className={styles.resumeIcon}
                >
                  <ResumeIcon />
                </motion.div>
                <span className={styles.resumeButtonBorder} />
              </motion.a>

              <AnimatePresence>
                {showResumePopup && (
                  <motion.div
                    className={styles.resumePopup}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    Baixar meu currículo &gt;X
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label={`Alternar para tema ${
                theme === "light" ? "escuro" : "claro"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: theme === "light" ? 90 : -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: theme === "light" ? -90 : 90 }}
                  transition={{ duration: 0.3 }}
                  className={styles.themeIcon}
                >
                  {theme === "light" ? <MoonIcon /> : <SunIcon />}
                </motion.div>
              </AnimatePresence>
              <span className={styles.themeToggleBorder} />
            </motion.button>

            <div className={styles.mobileMenu}>
              <motion.button
                className={`${styles.mobileMenuButton} ${
                  isMenuOpen ? styles.open : ""
                }`}
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                onClick={toggleMenu}
                whileTap={{ scale: 0.9 }}
              >
                <span className={styles.menuIcon}>
                  <MenuIcon />
                  {isMenuOpen && (
                    <>
                      <motion.span
                        className={styles.menuLine}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          y: 6,
                          rotate: 45,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.span
                        className={styles.menuLine}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.span
                        className={styles.menuLine}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          y: -6,
                          rotate: -45,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={styles.mobileNavContainer}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className={styles.mobileNavItems}>
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    className={`${styles.mobileNavLink} ${
                      activeSection === item.id ? styles.active : ""
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setTimeout(() => {
                        scrollToSection(item.id);
                      }, 200);
                    }}
                  >
                    {item.name}
                    <motion.span
                      className={styles.mobileUnderline}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ))}
                <motion.button
                  className={styles.mobileNavLink}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2, delay: navItems.length * 0.1 }}
                  onClick={() =>
                    window.open(
                      "https://acrobat.adobe.com/id/urn:aaid:sc:US:95982c10-fede-4441-b9ec-e0b82041d78e",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  Meu currículo
                  <motion.span
                    className={styles.mobileUnderline}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default NavBar;
