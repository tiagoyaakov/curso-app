"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
};

/**
 * Wrapper para revelar conteúdo on-scroll com fade + slide suave.
 *
 * `amount: 0.05` + `margin: -10%` garante que mesmo screenshot fullPage e
 * leitores sem scroll detectem entrada no viewport rapidamente.
 *
 * Uso: <Reveal delay={0.1}><h1>...</h1></Reveal>
 */
export function Reveal({ children, delay = 0, y = 16 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
