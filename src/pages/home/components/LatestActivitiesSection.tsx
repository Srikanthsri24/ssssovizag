import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  GraduationCap,
  Quote,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import { Reveal } from "@/components/shared/Reveal";

import { LATEST_ACTIVITIES } from "../home-data";
import { SectionHeading } from "./SectionHeading";

const ICONS = {
  spiritual: Quote,
  healthcare: Stethoscope,
  education: GraduationCap,
};

export function LatestActivitiesSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.035] to-transparent" />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Latest Activities"
              title="Seva in motion"
              description="Recent moments where devotion became action and service reached the community."
              Icon={Sparkles}
              align="left"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              to="/events"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/[0.06]"
            >
              View All Events
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {LATEST_ACTIVITIES.map((activity, index) => {
            const Icon = ICONS[activity.kind];

            return (
              <Reveal
                key={activity.title}
                delay={index * 0.08}
              >
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                  }}
                  className="group relative h-full overflow-hidden rounded-[1.85rem] border border-border bg-card shadow-[0_20px_60px_-42px_rgba(15,23,42,0.55)] transition hover:border-primary/30 hover:shadow-[0_28px_70px_-40px_rgba(249,115,22,0.38)]"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                      <Icon className="h-3.5 w-3.5" />
                      {activity.tag}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-2xl font-semibold text-white">
                        {activity.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-primary">
                      <Calendar className="h-3.5 w-3.5" />
                      {activity.date}
                    </div>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {activity.description}
                    </p>

                    <Link
                      to="/events"
                      className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      Explore activity
                      <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
