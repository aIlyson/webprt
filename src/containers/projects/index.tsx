import React, { useState, useRef, useEffect, useCallback } from "react";
import { Section, Title } from "../../common/components/index";
import { motion } from "framer-motion";
import styles from "./Projects.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Lock, Search, ZoomIn, ZoomOut, Download } from "lucide-react";
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
      demo: "https://casi-oftf.onrender.com/",
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
      demo: "https://www.juasolucoes.com.br/",
      code: "#private",
    },
  },
  {
    title: "CTBJ-Study",
    description:
      "Desenvolvimento de um catálogo digital para disciplinas e conteúdos do Colégio Técnico.",
    tags: ["React", "Node.js", "MongoDB"],
    year: "2024",
    image: "/assets/ctbj-study.onrender.png",
    links: {
      demo: "https://ctbj-study.onrender.com/",
      code: "https://github.com/aIlyson/CTBJ-STUDY",
    },
  },
  {
    title: "AedesInfo",
    description:
      "Desenvolvimento de um app para a Prefeitura de Ouricuri monitorar focos do Aedes aegypti.",
    tags: ["React Native", "Firebase", "Redux"],
    year: "2023",
    image: "/assets/aedesinfo.png",
    links: {
      demo: "#private",
      code: "https://github.com/aIlyson/AedesInfo",
    },
  },
  {
    title: "Sinfo 2025",
    description:
      "Desenvolvimento do site do Sinfo com autenticação e avaliação integrada de submissões.",
    tags: ["Node.js", "Typescript", "PostgreSQL", "Nginx"],
    year: "2025",
    image: "/assets/sinfo-ufpi.com.br_.png",
    links: {
      demo: "https://sinfo-ufpi.com.br/",
      code: "#private",
    },
  },
  {
    title: "ENAMO 2024",
    description:
      "Desenvolvimento do site do ENAMO com inscrições e programação detalhada de eventos.",
    tags: ["Node.js", "Handlebars", "Tailwind"],
    year: "2024",
    image: "/assets/enamo2024.ouricuri.png",
    links: {
      demo: "https://enamo2024.ouricuri.ifsertao-pe.edu.br/",
      code: "#private",
    },
  },
  {
    title: "Método Irresistível",
    description:
      "Desenvolvimento de landing page para divulgação e promoção de curso sobre nutrição.",
    tags: ["Vue.js", "Node.js"],
    year: "2025",
    image: "/assets/metodoirresistivel.online_.png",
    links: {
      demo: "https://www.metodoirresistivel.online/",
      code: "#private",
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
    title: "Controle de vendas de café",
    description:
      "Desenvolvimento de um aplicativo para o gerenciamento das vendas de café no Centro Acadêmico.",
    tags: ["Kotlin", "Excel"],
    year: "2025",
    image: "/assets/noimage.png",
    links: {
      demo: "#private",
      code: "#private",
    },
  },
  {
    title: "Rádio Lofi",
    description:
      "Desenvolvimento de uma aplicação web de rádio lofi, integrada com APIs do Spotify e YouTube.",
    tags: ["Angular", "TypeScript", "Spotify/YouTube API"],
    year: "2025",
    image: "/assets/radioLofi.png",
    links: {
      demo: "#private",
      code: "#private",
    },
  },
  {
    title: "Este site",
    description:
      "Meu site portfólio para apresentação sobre mim, de projetos e habilidades.",
    tags: ["React", "Next.js", "Framer Motion"],
    year: "2023",
    image: "/assets/allysonms.tech.png",
    links: {
      demo: "https://allysonms.tech/",
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

const MotionDiv = motion.div;

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  handleImageClick: (project: Project, e: React.MouseEvent) => void;
}> = ({ project, index, handleImageClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current && window.innerWidth > 768) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const maxTilt = 6;
      const tiltX = ((centerY - y) / (centerY * 0.8)) * maxTilt;
      const tiltY = ((x - centerX) / (centerX * 0.8)) * maxTilt;

      cardRef.current.style.transform = `
        perspective(1200px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale(1.02)
      `;
    }
  }, []);

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (cardRef.current) {
        const relatedTarget = e.relatedTarget as Node;
        if (
          relatedTarget instanceof Node &&
          cardRef.current.contains(relatedTarget)
        ) {
          return;
        }
        cardRef.current.style.transform = `
        perspective(1200px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
      }
    },
    []
  );

  return (
    <MotionDiv
      ref={cardRef}
      className={styles.projectCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -30px 0px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
          <Search className={styles.zoomIcon} size={30} strokeWidth={2} />
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <motion.h3
            className={styles.projectTitle}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.1, duration: 0.4 }}
          >
            {project.title}
          </motion.h3>
          <motion.span
            className={styles.projectYear}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.15, duration: 0.4 }}
          >
            {project.year}
          </motion.span>
        </div>

        <motion.p
          className={styles.projectDescription}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
        >
          {project.description}
        </motion.p>

        <MotionDiv
          className={styles.tagsContainer}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {project.tags.map((tag, i) => (
            <motion.span
              key={i}
              className={styles.projectTag}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </MotionDiv>

        <motion.div
          className={styles.projectLinks}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        >
          {project.links.demo === "#private" ? (
            <button
              className={`${styles.projectButton} ${styles.privateButton} ${styles.tooltip}`}
              disabled
              data-tooltip="Demo privada :c"
            >
              <Lock size={16} className={styles.lockIcon} /> Demo
            </button>
          ) : (
            <motion.a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.projectButton} ${styles.demoButton}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Demo
            </motion.a>
          )}

          {project.links.code === "#private" ? (
            <button
              className={`${styles.projectButton} ${styles.privateButton} ${styles.tooltip}`}
              disabled
              data-tooltip="Repositório privado :c"
            >
              <Lock size={16} className={styles.lockIcon} /> Código
            </button>
          ) : (
            <motion.a
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.projectButton} ${styles.codeButton}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Código
            </motion.a>
          )}
        </motion.div>
      </div>
    </MotionDiv>
  );
};

const Projects: React.FC = () => {
  const projectChunks = chunkProjects(projects, 4);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startTouch, setStartTouch] = useState({ x: 0, y: 0 });
  const [pinchDistance, setPinchDistance] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef(0);

  const handleImageClick = useCallback(
    (project: Project, e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedProject(project);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    },
    []
  );

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
  }, []);

  const handleZoom = useCallback(
    (newScale: number, clientX?: number, clientY?: number) => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const offsetX = clientX ? clientX - rect.left : rect.width / 2;
      const offsetY = clientY ? clientY - rect.top : rect.height / 2;

      const clampedScale = Math.max(1, Math.min(newScale, 3));
      const newX =
        clampedScale === 1
          ? 0
          : -(offsetX - rect.width / 2) * (clampedScale - 1);
      const newY =
        clampedScale === 1
          ? 0
          : -(offsetY - rect.height / 2) * (clampedScale - 1);

      setScale(clampedScale);
      setPosition({ x: newX, y: newY });
    },
    []
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale <= 1) return;
      setIsDragging(true);
      setStartTouch({ x: e.clientX, y: e.clientY });
    },
    [scale]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || scale <= 1) return;

      setPosition((prev) => ({
        x: clampPosition(prev.x + e.movementX, scale),
        y: clampPosition(prev.y + e.movementY, scale),
      }));
    },
    [isDragging, scale]
  );

  const clampPosition = useCallback((value: number, currentScale: number) => {
    if (!imageRef.current) return value;
    const maxMovement = ((currentScale - 1) * imageRef.current.clientWidth) / 2;
    return Math.max(-maxMovement, Math.min(maxMovement, value));
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );
        setPinchDistance(distance);
      } else if (e.touches.length === 1) {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
          handleZoom(
            scale === 1 ? 2 : 1,
            e.touches[0].clientX,
            e.touches[0].clientY
          );
          lastTapRef.current = 0;
        } else {
          lastTapRef.current = now;
          if (scale > 1) {
            setStartTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
          }
        }
      }
    },
    [scale, handleZoom]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const newDistance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );
        if (pinchDistance > 0) {
          const zoomFactor = newDistance / pinchDistance;
          handleZoom(
            scale * zoomFactor,
            (touch1.clientX + touch2.clientX) / 2,
            (touch1.clientY + touch2.clientY) / 2
          );
        }
        setPinchDistance(newDistance);
      } else if (e.touches.length === 1 && scale > 1) {
        e.preventDefault();
        const touch = e.touches[0];
        setPosition((prev) => ({
          x: clampPosition(prev.x + (touch.clientX - startTouch.x), scale),
          y: clampPosition(prev.y + (touch.clientY - startTouch.y), scale),
        }));
        setStartTouch({ x: touch.clientX, y: touch.clientY });
      }
    },
    [scale, pinchDistance, startTouch, handleZoom, clampPosition]
  );

  const handleTouchEnd = useCallback(() => {
    setPinchDistance(0);
    setIsDragging(false);
  }, []);

  const handleZoomIn = useCallback(() => {
    handleZoom(Math.min(scale + 0.5, 3));
  }, [scale, handleZoom]);

  const handleZoomOut = useCallback(() => {
    handleZoom(Math.max(scale - 0.5, 1));
  }, [scale, handleZoom]);

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
  }, [selectedProject, closeModal]);

  return (
    <Section
      id="projects"
      bg="surface"
      withPixels={true}
      pixelCount={15}
      padding="lg"
    >
      <div className={styles.particles}>
        {[...Array(15)].map((_, i) => (
          <MotionDiv
            key={i}
            className={styles.particle}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 3}px`,
              height: `${Math.random() * 5 + 3}px`,
              backgroundColor:
                i % 3 === 0 ? "var(--accent)" : "var(--primary-light)",
              borderRadius: i % 4 === 0 ? "50%" : "2px",
            }}
          />
        ))}
      </div>

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
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            el: `.${styles.swiperPagination}`,
            bulletClass: styles.bullet,
            bulletActiveClass: styles.bulletActive,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={20}
          className={styles.swiperContainer}
        >
          {projectChunks.map((chunk, chunkIndex) => (
            <SwiperSlide key={chunkIndex}>
              <div className={styles.projectsGrid}>
                {chunk.map((project, index) => (
                  <ProjectCard
                    key={`${chunkIndex}-${index}`}
                    project={project}
                    index={index}
                    handleImageClick={handleImageClick}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.swiperPagination} />
      </div>

      {selectedProject && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
          ref={modalRef}
        >
          <motion.div
            className={styles.imageModalContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
                  scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
                touchAction: "none",
                transition: scale > 1 ? "none" : "transform 0.2s ease-out",
              }}
            >
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={1280}
                height={450}
                className={styles.modalImage}
                priority
              />
            </div>
            <div className={styles.imageModalFooter}>
              <h3>{selectedProject.title}</h3>
              <div className={styles.footerControls}>
                <div className={styles.zoomControls}>
                  <button
                    className={styles.zoomButton}
                    onClick={handleZoomOut}
                    disabled={scale <= 1}
                    aria-label="Reduzir zoom"
                  >
                    <ZoomOut size={20} />
                  </button>
                  <span className={styles.zoomIndicator}>
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    className={styles.zoomButton}
                    onClick={handleZoomIn}
                    disabled={scale >= 3}
                    aria-label="Aumentar zoom"
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>
                {selectedProject.image !== "/assets/noimage.png" && (
                  <a
                    href={selectedProject.image}
                    download={`${selectedProject.title.replace(
                      /\s+/g,
                      "_"
                    )}.png`}
                    className={styles.downloadButton}
                    aria-label="Baixar imagem"
                  >
                    <Download size={20} />
                  </a>
                )}
              </div>
              {scale > 1 && (
                <p className={styles.zoomHint}>
                  Arraste para mover | Pinch para zoom
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </Section>
  );
};

export default Projects;
