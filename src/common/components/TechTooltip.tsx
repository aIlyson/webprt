import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RubyIcon,
  JavaScriptIcon,
  PythonIcon,
  NodeJSIcon,
  ExpressIcon,
  JavaIcon,
  InstitutoFederalIcon,
} from "../../common/svg/TechIcons";

interface TechTooltipProps {
  tech: "ruby" | "javascript" | "python" | "nodejs" | "express" | "java" | "IF";
  children: React.ReactNode;
}

const TechTooltip: React.FC<TechTooltipProps> = ({ tech, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch (tech) {
      case "ruby":
        return <RubyIcon />;
      case "javascript":
        return <JavaScriptIcon />;
      case "python":
        return <PythonIcon />;
      case "nodejs":
        return <NodeJSIcon />;
      case "java":
        return <JavaIcon />;
      case "express":
        return <ExpressIcon />;
      case "IF":
        return <InstitutoFederalIcon />;
      default:
        return null;
    }
  };

  return (
    <span
      className="tech-tooltip-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
      }}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: "var(--scrolled-bg)",
              backdropFilter: "blur(8px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
              bottom: "100%",
              left: "10%",
              pointerEvents: "none",
              borderRadius: "8px",
              padding: "4px",
              transform: "translateX(-50%)",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "var(--background)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid var(--primary-light)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "28px",
                  height: "28px",
                }}
              >
                {getIcon()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default TechTooltip;
