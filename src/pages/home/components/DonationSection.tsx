import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  GraduationCap,
  HandHeart,
  Heart,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import { Reveal } from "@/components/shared/Reveal";

export function DonationSection() {
  return (
    <section className="relative mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 24,
          }}
          className="group relative isolate overflow-hidden rounded-[2rem] border border-primary/20 bg-card/80 shadow-[0_30px_90px_-45px_rgba(249,115,22,0.55)] backdrop-blur-md sm:rounded-[2.75rem]"
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-sky/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_38%)]" />
          </div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[8%] top-10 text-primary/10"
            animate={{
              y: [0, -10, 0],
              rotate: [-8, 5, -8],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className="h-24 w-24 fill-current sm:h-32 sm:w-32" />
          </motion.div>

          <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch lg:gap-10 lg:p-12">
            <div className="relative z-10 flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                An offering of love
              </div>

              <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                Every offering becomes{" "}
                <span className="text-gradient">
                  meaningful seva
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                Your contribution supports free education,
                medical camps, food distribution, and community
                welfare. Every rupee is offered in service of
                God through humanity.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {[
                  {
                    Icon: ShieldCheck,
                    label: "Transparent support",
                  },
                  {
                    Icon: BadgeCheck,
                    label: "Purpose-driven seva",
                  },
                  {
                    Icon: HandHeart,
                    label: "Community impact",
                  },
                ].map(({ Icon, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/65 px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur transition hover:border-primary/30 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </motion.div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/donate"
                  className="group/button relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full gradient-saffron px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Heart className="h-4 w-4 fill-current" />
                  Make an Offering
                  <ArrowRight className="h-4 w-4 transition group-hover/button:translate-x-1" />
                </Link>

                <Link
                  to="/about"
                  className="group/link inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/[0.06]"
                >
                  See Our Impact
                  <ArrowUpRight className="h-4 w-4 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <div className="relative z-10 rounded-[1.75rem] border border-border/80 bg-background/70 p-4 shadow-xl backdrop-blur-xl sm:p-5">
              <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    Your offering supports
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                    Seva that reaches lives
                  </h3>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                  }}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"
                >
                  <IndianRupee className="h-5 w-5" />
                </motion.div>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  {
                    Icon: GraduationCap,
                    title: "Value-based education",
                    text: "Learning support and Bal Vikas activities for children.",
                  },
                  {
                    Icon: Stethoscope,
                    title: "Healthcare assistance",
                    text: "Medical camps, screenings, and care for underserved families.",
                  },
                  {
                    Icon: HandHeart,
                    title: "Food and welfare seva",
                    text: "Narayana Seva, essential support, and community outreach.",
                  },
                ].map(({ Icon, title, text }) => (
                  <motion.div
                    key={title}
                    whileHover={{ x: 4 }}
                    className="group/item flex gap-3 rounded-2xl border border-transparent bg-muted/45 p-3.5 transition hover:border-primary/20 hover:bg-primary/[0.055]"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-card text-primary shadow-sm ring-1 ring-border transition group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                      <Icon className="h-[18px] w-[18px]" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        <h4 className="text-sm font-semibold text-foreground">
                          {title}
                        </h4>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
