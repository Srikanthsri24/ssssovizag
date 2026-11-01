import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  Icon?: LucideIcon;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  Icon,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={
        centered
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl"
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary ${
          centered ? "mx-auto" : ""
        }`}
      >
        {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
        {eyebrow}
      </motion.div>

      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description ? (
        <p
          className={`mt-3 text-sm leading-7 text-muted-foreground sm:text-base ${
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
