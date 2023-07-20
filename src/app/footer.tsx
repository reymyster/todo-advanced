"use client";
import { motion, useScroll, useTransform } from "framer-motion";

const year = new Date().getUTCFullYear().toString();

export default function Footer() {
  const { scrollY } = useScroll();
  const bottom = useTransform(scrollY, [0, 50], [0, -50]);

  return (
    <motion.div style={{ bottom }} className="fixed left-0 right-0">
      <footer className="bg-black py-4">
        <div className="text-center text-[10px] text-primary">
          Copyright &copy; {year}
        </div>
      </footer>
    </motion.div>
  );
}
