import React, { useState } from "react";
import { Section, Title } from "../../common/components/index";
import { motion } from "framer-motion";
import styles from "./Projects.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  image: string;
  links: {
    demo: string;
    code: string;
  };
};

const projects: Project[] = [
  {
    title: "Sistema de RH",
    description:
      "Sistema desenvolvido com funcionalidades de cadastro de funcionários e contratos.",
    tags: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
    year: "2023",
    image: "/assets/sistema.png",
    links: {
      demo: "#private",
      code: "https://github.com/aIlyson/spring-boot-prog-funcionario",
    },
  },
  {
    title: "CASI UFPI",
    description:
      "Apresentação do Centro Acadêmico de Sistemas de Informação com sistema de autenticação.",
    tags: ["Node.js", "Express", "PostgreSQL", "EJS"],
    year: "2025",
    image: "/assets/casi.png",
    links: {
      demo: "#private",
      code: "#private",
    },
  },
  {
    title: "ENAMO 2024",
    description:
      "Site oficial do evento acadêmico ENAMO sistema de inscrições e programação completa.",
    tags: ["Node.js", "Handlebars", "Tailwind"],
    year: "2024",
    image: "/assets/enamo2024.png",
    links: {
      demo: "https://enamo2024.ouricuri.ifsertao-pe.edu.br/",
      code: "#private",
    },
  },
  {
    title: "AedesInfo",
    description:
      "Aplicativo desenvolvido para a Prefeitura de Ouricuri para o monitoramento do Aedes aegypti",
    tags: ["React Native", "Firebase", "Redux"],
    year: "2024",
    image: "/assets/noimage.png",
    links: {
      demo: "#private",
      code: "https://github.com/aIlyson/AedesInfo",
    },
  },
  {
    title: "Stock Manager",
    description:
      "Sistema de gerenciamento de estoque de uma locadora de animes.",
    tags: ["C", "MakeFile"],
    year: "2024",
    image: "/assets/noimage.png",
    links: {
      demo: "#private",
      code: "https://github.com/aIlyson/algo-2024",
    },
  },
  {
    title: "CTBJ-Study",
    description:
      "Desenvolvimento de um catálogo digital para disciplinas do Colégio Técnico.",
    tags: ["React", "Chart.js", "Node.js", "MongoDB"],
    year: "2024",
    image: "/assets/ctbjstudy.png",
    links: {
      demo: "https://ctbj-study.onrender.com/",
      code: "https://github.com/aIlyson/CTBJ-STUDY",
    },
  },
  {
    title: "Class Key",
    description:
      "Sistema para registro e gerenciamento de chaves, professores e reservas de sala.",
    tags: ["Java"],
    year: "2022",
    image: "/assets/noimage.png",
    links: {
      demo: "#private",
      code: "https://github.com/aIlyson/ClassKey",
    },
  },
  {
    title: "Este Site",
    description:
      "Meu portfólio desenvolvido para apresentar um pouco sobre mim.",
    tags: ["React", "Next.js", "Framer Motion"],
    year: "2023",
    image: "/assets/noimage.png",
    links: {
      demo: "#private",
      code: "https://github.com/aIlyson/webprt",
    },
  },
];

const chunkProjects = (projects: Project[], size: number) => {
  const chunks = [];
  for (let i = 0; i < projects.length; i += size) {
    chunks.push(projects.slice(i, i + size));
  }
  return chunks;
};

const Projects: React.FC = () => {
  const projectChunks = chunkProjects(projects, 4);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleImageClick = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProject(project);
  };

  const closeModal = () => setSelectedProject(null);

  return (
    <Section
      id="projects"
      bg="surface"
      withPixels={true}
      pixelCount={10}
      padding="lg"
    >
      <div className={styles.header}>
        <Title level={2} withBrackets align="center">
          Projetos
        </Title>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Meus principais trabalhos desenvolvidos
        </motion.p>
      </div>

      <div className={styles.swiperWrapper}>
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: `.${styles.swiperPagination}`,
            bulletClass: styles.bullet,
            bulletActiveClass: styles.bulletActive,
          }}
          spaceBetween={30}
          className={styles.swiperContainer}
        >
          {projectChunks.map((chunk, chunkIndex) => (
            <SwiperSlide key={chunkIndex}>
              <div className={styles.projectsGrid}>
                {chunk.map((project, index) => (
                  <motion.div
                    key={`${chunkIndex}-${index}`}
                    className={styles.projectCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -30px 0px" }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div
                      className={styles.imageWrapper}
                      onClick={(e) => handleImageClick(project, e)}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={280}
                        height={160}
                        className={styles.projectImage}
                        quality={90}
                        priority={index < 4}
                      />
                      <div className={styles.imageOverlay}>
                        <span className={styles.zoomIcon}>🔍</span>
                      </div>
                    </div>

                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <span className={styles.projectYear}>
                          {project.year}
                        </span>
                      </div>

                      <p className={styles.projectDescription}>
                        {project.description}
                      </p>

                      <div className={styles.tagsContainer}>
                        {project.tags.map((tag, i) => (
                          <span key={i} className={styles.projectTag}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className={styles.projectLinks}>
                        {project.links.demo === "#private" ? (
                          <button
                            className={`${styles.projectButton} ${styles.privateButton} ${styles.tooltip}`}
                            disabled
                            data-tooltip="Demo privada :c"
                          >
                            Demo 🔒
                          </button>
                        ) : (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.projectButton} ${styles.demoButton}`}
                          >
                            Demo
                          </a>
                        )}

                        {project.links.code === "#private" ? (
                          <button
                            className={`${styles.projectButton} ${styles.privateButton} ${styles.tooltip}`}
                            disabled
                            data-tooltip="Repositório privado :c"
                          >
                            Código 🔒
                          </button>
                        ) : (
                          <a
                            href={project.links.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.projectButton} ${styles.codeButton}`}
                          >
                            Código
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.swiperPagination} />
      </div>

      {selectedProject && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.imageModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <div className={styles.modalImageContainer}>
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={800}
                height={450}
                className={styles.modalImage}
              />
            </div>
            <div className={styles.imageModalFooter}>
              <h3>{selectedProject.title}</h3>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Projects;
