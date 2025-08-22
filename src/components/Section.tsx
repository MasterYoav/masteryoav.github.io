import type { ReactNode, HTMLAttributes } from "react";
import { motion } from "framer-motion";

type SectionProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>; // ✅ allows id, style, etc.

export default function Section({ children, className = "", ...rest }: SectionProps) {
  return (
    <section className={`py-16 ${className}`} {...rest}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto px-4"
      >
        {children}
      </motion.div>
    </section>
  );
}