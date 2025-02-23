import { motion } from "framer-motion";
import { useState } from "react";

interface AnimatedButtonProps {
  children?: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, href, className, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const commonProps = {
    className: `relative ${className}`,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onClick,
  };

  return href ? (
    <a href={href} {...commonProps}>
      {children}
      <motion.div
        className="absolute left-0 bottom-0 h-[2px] bg-red-600"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </a>
  ) : (
    <button {...commonProps}>
      {children}
      <motion.div
        className="absolute left-0 bottom-0 h-[2px] bg-red-600"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </button>
  );
};

export default AnimatedButton;