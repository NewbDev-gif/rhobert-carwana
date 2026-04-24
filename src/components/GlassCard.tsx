import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
}

export const GlassCard = ({ title, description, tags, index }: CardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md transition-all hover:bg-white/[0.07] hover:border-white/20"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 80%)
          `,
        }}
      />

      <div className="relative z-10">
        <h3 className="mb-3 text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-slate-400">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-tighter text-blue-300/80">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};