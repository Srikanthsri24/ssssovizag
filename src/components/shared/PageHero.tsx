import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  quote,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  quote?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      {image && (
        <div className="absolute inset-0 -z-10">
          <img src={image} alt="" className="h-full w-full object-cover opacity-35 dark:opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        </div>
      )}
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[80%] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <div className="mx-auto max-w-5xl px-4 pb-10 pt-12 text-center sm:px-6 sm:pt-14">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-primary"
          >
            🕉 {eyebrow}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl font-semibold leading-tight sm:text-6xl"
        >
          <span className="text-gradient">{title}</span>
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
        {quote && (
          <motion.blockquote
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mx-auto mt-6 max-w-xl rounded-2xl border border-primary/30 bg-primary/5 px-5 py-3 font-display text-lg italic text-primary/90"
          >
            “{quote}”
          </motion.blockquote>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
