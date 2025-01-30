"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, rotateY: -10, scale: 0.95 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        exit={{ opacity: 0, rotateY: 10, scale: 0.95 }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
          rotateY: { duration: 0.4 },
          scale: { duration: 0.35 },
        }}
        className="min-h-screen"
        style={{
          perspective: "1500px",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
