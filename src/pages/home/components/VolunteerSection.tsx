import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  HandHeart,
  Sparkles,
  Users,
} from "lucide-react";

import volunteerImage from "@/assets/seva-volunteers.jpg";
import { Reveal } from "@/components/shared/Reveal";

export function VolunteerSection() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <div className="group relative isolate overflow-hidden rounded-[2.25rem] border border-primary/20 bg-card shadow-[0_30px_90px_-48px_rgba(249,115,22,0.55)] sm:rounded-[2.75rem]">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.14),transparent_38%)]" />

          <div className="grid lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Volunteer with love
              </div>

              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                Walk with us in{" "}
                <span className="text-gradient">seva</span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                Volunteers are the heart of every activity at
                Premsadan. Offer an hour, a skill, or a lifetime
                of dedication and become part of a loving seva
                family.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    Icon: Clock3,
                    title: "Flexible participation",
                    text: "Serve according to the time you can offer.",
                  },
                  {
                    Icon: HandHeart,
                    title: "Meaningful service",
                    text: "Contribute through education, health, and welfare.",
                  },
                ].map(({ Icon, title, text }) => (
                  <motion.div
                    key={title}
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border border-border bg-background/60 p-4 shadow-sm transition hover:border-primary/25 hover:bg-primary/[0.045]"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 text-sm font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/volunteer"
                  className="group/button inline-flex min-h-12 items-center justify-center gap-2 rounded-full gradient-saffron px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Users className="h-4 w-4" />
                  Become a Volunteer
                  <ArrowRight className="h-4 w-4 transition group-hover/button:translate-x-1" />
                </Link>

                <Link
                  to="/contact"
                  className="group/link inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/65 px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/[0.055]"
                >
                  Speak With Us
                  <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden lg:min-h-full">
              <img
                src={volunteerImage}
                alt="Premsadan volunteers serving together"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-background/40 lg:via-transparent lg:to-transparent" />

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-black/40 p-4 text-white shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-semibold">
                      500+ sevadals
                    </p>
                    <p className="text-xs text-white/75">
                      One family, serving together
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
