import React, { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Banner.module.css";
import {
  GithubIcon,
  LinkedInIcon,
  InstagramIcon,
} from "../../common/svg/SocialIcons";
import TechTooltip from "./TechTooltip";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionA = motion.a;

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
      },
    },
  };

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [bgImageLoaded, setBgImageLoaded] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const img = document.createElement("img");
      img.src =
        "../../../public/staticImagesha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==.webp";
      img.onload = () => setBgImageLoaded(true);
      img.onerror = () => setBgImageLoaded(false);
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (imageContainerRef.current) {
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const maxTilt = 6;
      const tiltX = ((centerY - y) / (centerY * 0.7)) * maxTilt;
      const tiltY = ((x - centerX) / (centerX * 0.7)) * maxTilt;

      imageContainerRef.current.style.transform = `
        perspective(1000px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale(1.02)
      `;
    }
  }, []);

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (imageContainerRef.current) {
        const relatedTarget = e.relatedTarget as Node;
        const wrapper = imageContainerRef.current.parentElement;
        if (
          wrapper &&
          relatedTarget instanceof Node &&
          wrapper.contains(relatedTarget)
        ) {
          return;
        }

        imageContainerRef.current.style.transform = `
        perspective(1000px)
        rotateX(2deg)
        rotateY(2deg)
        scale(1)
      `;
      }
    },
    []
  );

  return (
    <div id="home">
      <MotionDiv
        className={`${styles.banner} ${!bgImageLoaded ? styles.noBgImage : ""}`}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.particles}>
          {[...Array(15)].map((_, i) => (
            <MotionDiv
              key={i}
              className={styles.particle}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                backgroundColor:
                  i % 3 === 0 ? "var(--accent)" : "var(--primary-light)",
                borderRadius: i % 4 === 0 ? "50%" : "2px",
              }}
            />
          ))}
        </div>

        <div className={styles.container}>
          <MotionDiv className={styles.textColumn} variants={containerVariants}>
            <MotionDiv variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <MotionH1 className={styles.title} whileHover={{ y: -5 }}>
                <span className={styles.greeting}>Olá, eu sou</span>
                <span className={styles.name}>
                  <span className={styles.codeSymbol}>&lt;</span>
                  Alysson Michel
                  <span className={styles.codeSymbol}>/&gt;</span>
                </span>
              </MotionH1>
            </MotionDiv>

            <MotionDiv variants={itemVariants}>
              <MotionP className={styles.subtitle}>
                Desenvolvedor de software
              </MotionP>
            </MotionDiv>

            <MotionDiv variants={itemVariants}>
              <MotionP className={styles.description}>
                <span className={styles.tooltip} data-tooltip="por cacheadas!">
                  Apaixonado
                </span>{" "}
                em desenvolver projetos que possam ser úteis e páginas web.
                Atualmente em uma pesquisa e já participei de um projeto de
                extensão pelo IFSertãoPE, e procuro me especializar mais em{" "}
                <TechTooltip tech="javascript">
                  <span className={styles.techHighlight}>JavaScript</span>
                </TechTooltip>
                ,{" "}
                <TechTooltip tech="ruby">
                 <span className={styles.techHighlight}>Ruby</span>
                </TechTooltip>{" "}
                e{" "}
                <TechTooltip tech="python">
                  <span className={styles.techHighlight}>Python</span>
                </TechTooltip>
                .
              </MotionP>
            </MotionDiv>

            <MotionDiv variants={itemVariants} className={styles.socialLinks}>
              <MotionA
                href="https://github.com/aIlyson"
                className={styles.socialLink}
                aria-label="GitHub"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <GithubIcon />
              </MotionA>
              <MotionA
                href="https://www.linkedin.com/in/alysson-michel-50a227273/"
                className={styles.socialLink}
                aria-label="LinkedIn"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <LinkedInIcon />
              </MotionA>
              <MotionA
                href="https://www.instagram.com/alyssonms_/"
                className={styles.socialLink}
                aria-label="Instagram"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <InstagramIcon />
              </MotionA>
            </MotionDiv>
          </MotionDiv>

          <MotionDiv className={styles.imageColumn} variants={imageVariants}>
            <div className={styles.imageWrapper}>
              <div
                className={styles.imageContainer}
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src="/person.jpeg"
                  alt="Alysson Michel"
                  className={styles.profileImage}
                  width={200}
                  height={200}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      "https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80";
                  }}
                />
                <div className={styles.imageGlow} />
                <div className={styles.imageBorder} />
              </div>
            </div>
          </MotionDiv>
        </div>
      </MotionDiv>
    </div>
  );
};

export default Banner;
