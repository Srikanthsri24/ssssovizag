import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  HandHeart,
  Quote,
} from "lucide-react";

import { Reveal } from "@/components/shared/Reveal";

const WINGS = [
  {
    title: "Spiritual Wing",
    description:
      "Bhajans, meditation, and study circles to nurture inner peace.",
    Icon: Quote,
  },
  {
    title: "Educational Wing",
    description:
      "Bal Vikas classes and value-based learning for children.",
    Icon: GraduationCap,
  },
  {
    title: "Service Wing",
    description:
      "Narayana Seva, healthcare camps, and local welfare support.",
    Icon: HandHeart,
  },
];

export function AboutSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <div className="grid gap-10 rounded-[2.5rem] border border-border bg-card/60 p-7 sm:p-10 lg:grid-cols-5 lg:items-center lg:p-12">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                About Premsadan
              </span>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                A community of{" "}
                <span className="text-gradient">
                  selfless seva
                </span>
              </h2>
            </div>

            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Sri Sathya Sai Seva Samithi, Premsadan is part
                of the worldwide Sri Sathya Sai Seva
                Organisations founded by Bhagawan Sri Sathya
                Sai Baba.
              </p>
              <p>
                From our mandir at MVP Colony, Visakhapatnam,
                devotees and volunteers come together to
                practise Love, Service, and Unity.
              </p>
            </div>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Explore Our Story
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1">
            {WINGS.map(({ Icon, title, description }) => (
              <motion.div
                key={title}
                whileHover={{ x: 6 }}
                className="group flex gap-4 rounded-2xl border border-border bg-background/65 p-5 shadow-sm transition hover:border-primary/25 hover:bg-primary/[0.045] hover:shadow-md"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
