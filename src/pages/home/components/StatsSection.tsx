import { motion } from "framer-motion";

import { Counter } from "@/components/shared/Counter";
import { Reveal } from "@/components/shared/Reveal";

import { HOME_STATS } from "../home-data";

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/[0.07] via-transparent to-accent/[0.07]" />

      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-4 md:gap-6">
        {HOME_STATS.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 0.08}
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-[1.6rem] border border-border bg-card/75 p-5 text-center shadow-sm backdrop-blur transition hover:border-primary/25 hover:shadow-lg sm:p-6"
            >
              <Counter to={stat.to} suffix={stat.suffix} />
              <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground sm:text-xs">
                {stat.label}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
