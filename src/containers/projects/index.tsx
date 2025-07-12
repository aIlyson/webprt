import React, { useState, useRef, useEffect } from "react";
import { Section, Title } from "../../common/components/index";
import { motion } from "framer-motion";
import styles from "./Projects.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Lock, Search } from "lucide-react";
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
      "Desenvolvimento de um sistema para cadastro e gerenciamento de funcionários e contratos.",
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
      "Desenvolvimento de um sistema para o Centro Acadêmico com autenticação de usuários.",
    tags: ["Node.js", "Express", "PostgreSQL", "EJS"],
    year: "2025",
    image: "/assets/casiufpi.site_.png",
    links: {
      demo: "https://casiufpi.site/",
      code: "#private",
    },
  },
  {
    title: "JUÁ Soluções",
    description:
      "Desenvolvimento do site oficial da empresa júnior JUÁ Soluções em Tecnologia.",
    tags: ["Vue.js", "Node.js", "GSAP"],
    year: "2025",
    image: "/assets/juasolucoes.site.png",
    links: {
      demo: "#private",
      code: "#private",
    },
  },
  {
    title: "CTBJ-Study",
    description:
      "Desenvolvimento de um catálogo digital para disciplinas do Colégio Técnico.",
    tags: ["React", "Chart.js", "Node.js", "MongoDB"],
    year: "2024",
    image: "/assets/ctbj-study.onrender.png",
    links: {
      demo: "https://ctbj-study.onrender.com/",
      code: "https://github.com/aIlyson/CTBJ-STUDY",
    },
  },
  {
    title: "ENAMO 2024",
    description:
      "Desenvolvimento do site do ENAMO com sistema de inscrições e programação.",
    tags: ["Node.js", "Handlebars", "Tailwind"],
    year: "2024",
    image: "/assets/enamo2024.ouricuri.png",
    links: {
      demo: "https://enamo2024.ouricuri.ifsertao-pe.edu.br/",
      code: "#private",
    },
  },
  {
    title: "AedesInfo",
    description:
      "Desenvolvimento de um app para a Prefeitura de Ouricuri monitorar o Aedes aegypti.",
    tags: ["React Native", "Firebase", "Redux"],
    year: "2024",
    image: "/assets/aedesinfo.png",
    links: {
      demo: "#private",
      code: "https://github.com/aIlyson/AedesInfo",
    },
  },
  {
    title: "Class Key",
    description:
      "Desenvolvimento de um sistema para controle de chaves, professores e reservas de salas.",
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
      "Meu site portfólio para apresentação sobre mim, de projetos e habilidades.",
    tags: ["React", "Next.js", "Framer Motion"],
    year: "2023",
    image: "/assets/portf.png",
    links: {
      demo: "https://allysonms.site/",
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
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startTouch, setStartTouch] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef(0);

  const handleImageClick = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProject(project);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsZoomed(false);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsZoomed(false);
  };

  const handleZoom = (e: React.MouseEvent | React.TouchEvent) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault();
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    const newScale = scale === 1 ? 2 : 1;
    const newX =
      newScale === 1 ? 0 : -(offsetX - rect.width / 2) * (newScale - 1);
    const newY =
      newScale === 1 ? 0 : -(offsetY - rect.height / 2) * (newScale - 1);

    setScale(newScale);
    setPosition({ x: newX, y: newY });
    setIsZoomed(newScale > 1);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (scale <= 1) return;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;

    setPosition((prev) => ({
      x: clampPosition(prev.x + e.movementX, scale),
      y: clampPosition(prev.y + e.movementY, scale),
    }));
  };

  const clampPosition = (value: number, currentScale: number) => {
    if (!imageRef.current) return value;
    const maxMovement = ((currentScale - 1) * imageRef.current.clientWidth) / 2;
    return Math.max(-maxMovement, Math.min(maxMovement, value));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      handleZoom(e);
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;

      if (scale > 1) {
        const touch = e.touches[0];
        setStartTouch({ x: touch.clientX, y: touch.clientY });
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (scale <= 1) return;
    e.preventDefault();

    const touch = e.touches[0];
    setPosition((prev) => ({
      x: clampPosition(prev.x + (touch.clientX - startTouch.x), scale),
      y: clampPosition(prev.y + (touch.clientY - startTouch.y), scale),
    }));
    setStartTouch({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!isZoomed) {
      closeModal();
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    handleZoom(e);
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    };
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

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
                        <Search
                          className={styles.zoomIcon}
                          size={30}
                          strokeWidth={2}
                        />
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
                            <Lock size={16} className={styles.lockIcon} /> Demo
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
                            <Lock size={16} className={styles.lockIcon} />{" "}
                            Código
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
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
          ref={modalRef}
        >
          <div
            className={styles.imageModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Fechar modal"
            >
              &times;
            </button>
            <div
              ref={imageRef}
              className={styles.modalImageContainer}
              onClick={isZoomed ? undefined : handleZoom}
              onDoubleClick={handleDoubleClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                cursor:
                  scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
                touchAction: scale > 1 ? "none" : "auto",
              }}
            >
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={800}
                height={450}
                className={styles.modalImage}
                priority
              />
            </div>
            <div className={styles.imageModalFooter}>
              <h3>{selectedProject.title}</h3>
              <div className={styles.zoomIndicator}>
                {Math.round(scale * 100)}%
              </div>
              {isZoomed && (
                <p className={styles.zoomHint}>
                  Arraste para mover | Toque duas vezes para reduzir
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Projects;
