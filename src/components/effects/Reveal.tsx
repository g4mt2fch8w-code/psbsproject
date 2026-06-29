import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Reveal({
  children,
  delay = 0,
  className,
  y = 40,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const fadeUp = variants;
