import React, { useEffect } from "react";
import { Title, Section } from "../../common/components/index";
import styles from "./About.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <Section id="about" bg="surface" withPixels={true} pixelCount={10} padding="lg">
      <div className={styles.aboutContainer}>
        <Title level={2} withBrackets>
          Sobre Mim
        </Title>

        <motion.div
          className={styles.content}
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div className={styles.textColumn} variants={itemVariants}>
            <motion.p
              className={styles.highlight}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Desenvolvedor <strong>Fullstack</strong> com foco em soluções
              robustas
            </motion.p>

            <motion.p variants={itemVariants}>
              Atualmente cursando o bacharelado em{" "}
              <strong>Sistemas de Informação na UFPI</strong> e com formação
              técnica em Informática pelo <strong>IF Sertão-PE</strong>.
            </motion.p>

            <motion.p variants={itemVariants}>
              Comecei minha jornada na programação em 2021 com projetos em{" "}
              <strong>Java</strong> durante o curso técnico no{" "}
              <strong>IF Sertão-PE</strong>, onde também atuei como
              desenvolvedor web do campus entre 2023 e 2024. Como desenvolvedor
              voluntário, trabalhei no projeto da ENAMO 2024 utilizando{" "}
              <strong>Node.js</strong> e <strong>Express</strong>.
            </motion.p>
          </motion.div>

          <motion.div className={styles.skillsColumn} variants={itemVariants}>
            <motion.h3
              className={styles.skillsTitle}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              PRINCIPAIS TECNOLOGIAS
            </motion.h3>

            <div className={styles.skillsGrid}>
              {[
                { name: "JAVA, EXPRESS", level: 87 },
                { name: "JAVASCRIPT, NODEJS", level: 83 },
                { name: "JAVASCRIPT", level: 76 },
                { name: "SQL, FIREBASE, POSTGRESQL", level: 72 },
                { name: "C, PYTHON, VUE ", level: 67 },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className={styles.skillItem}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className={styles.skillHeader}>
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className={styles.skillBar}>
                    <motion.div
                      className={styles.skillLevel}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
