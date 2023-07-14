"use client";
import { motion, useScroll, useTransform } from "framer-motion";

const year = new Date().getUTCFullYear().toString();

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const bottom = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div style={{ bottom }} className="fixed left-0 right-0">
      <footer className="bg-gray-800 py-4">
        <div className="text-center text-[10px] text-white">
          Copyright &copy; {year}
        </div>
      </footer>
    </motion.div>
  );
}
