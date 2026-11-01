import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Heart, MapPin, Users } from "lucide-react";

import { SITE } from "@/lib/site";
import { heroImage } from "@/lib/site-images";

import { HERO_IMAGE_GROUPS } from "../home-data";
import { AutoImageSlider } from "./AutoImageSlider";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover opacity-25 dark:opacity-15"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent,theme(colors.background)_72%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/72 to-background" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.13]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "22px 22px",
          color: "hsl(var(--primary))",
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-32 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
        animate={{
          x: [0, 36, 0],
          y: [0, 18, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-sky/20 blur-3xl"
        animate={{
          x: [0, -34, 0],
          y: [0, -18, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-3 top-4 font-display text-[8rem] leading-none text-primary/5 sm:text-[13rem] lg:right-8 lg:top-8 lg:text-[16rem]"
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        ॐ
      </motion.div>

      <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-10 px-4 pb-12 pt-6 sm:px-6 sm:pb-14 sm:pt-8 lg:min-h-[680px] lg:grid-cols-[minmax(0,53fr)_minmax(0,47fr)] lg:items-center lg:gap-10 lg:px-8 lg:py-12 xl:gap-14 xl:px-10">
        <div className="min-w-0 lg:pr-2 xl:pr-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-primary/25 bg-card/85 px-3.5 py-2 text-[11px] font-medium text-primary shadow-sm backdrop-blur sm:text-xs"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="shrink-0">🕉</span>
            <span className="truncate">Om Sri Sai Ram · Welcome to Premsadan</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[900px] font-display text-[2.45rem] font-semibold leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-[4rem] xl:text-[4.7rem] 2xl:text-[5.1rem]"
          >
            <span className="text-gradient">Love All,</span> Serve All.
            <br />
            <span className="text-gradient">Help Ever,</span> Hurt Never.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 max-w-3xl text-[15px] leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:mt-6 lg:text-[1.08rem]"
          >
            A spiritual family walking the path of selfless service inspired by Bhagawan Sri Sathya
            Sai Baba — from our mandir in {SITE.location}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:mt-8"
          >
            <Link
              to="/devotee-registration"
              className="group relative col-span-2 inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full gradient-saffron px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 sm:col-span-1"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Heart className="h-4 w-4 fill-white" />
              Register as Devotee
            </Link>

            <Link
              to="/volunteer"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card/85 px-4 py-3 text-sm font-semibold shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted sm:px-6"
            >
              Join as Volunteer
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>

            <Link
              to="/about"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5 sm:px-5"
            >
              Our Story
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 grid max-w-2xl grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:mt-8"
          >
            {[
              { value: "25K+", label: "Meals served" },
              { value: "120+", label: "Medical camps" },
              { value: "500+", label: "Volunteers" },
              { value: "30 yrs", label: "Of seva" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -2, scale: 1.025 }}
                className="flex min-w-0 items-center justify-center rounded-full border border-border bg-card/75 px-3 py-2 text-[11px] shadow-sm backdrop-blur transition hover:border-primary/35 sm:justify-start sm:px-4 sm:text-xs"
              >
                <span className="font-display font-semibold text-primary">{stat.value}</span>
                <span className="ml-1.5 truncate text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.08 }}
          className="relative mx-auto w-full max-w-[760px] lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2.75rem] bg-gradient-to-tr from-primary/18 via-transparent to-sky/18 blur-2xl"
          />

          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/60 p-3 shadow-[0_26px_80px_-34px_rgba(15,23,42,0.45)] backdrop-blur-md sm:rounded-[2.4rem] sm:p-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:h-[520px] lg:grid-cols-[1.12fr_0.88fr] lg:grid-rows-2 xl:h-[560px]">
              <AutoImageSlider
                images={HERO_IMAGE_GROUPS[0]}
                alt="Premsadan Mandir and seva activities"
                interval={3400}
                className="col-span-2 h-[300px] shadow-none ring-0 sm:h-[360px] lg:col-span-1 lg:row-span-2 lg:h-full"
              >
                <div className="absolute left-3 top-3 z-40 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-3 py-2 text-white shadow-lg backdrop-blur-md sm:left-4 sm:top-4">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-medium">Seva in motion today</span>
                </div>

                <motion.div
                  className="absolute bottom-3 left-3 right-3 z-40 flex items-center gap-3 rounded-2xl border border-white/25 bg-black/50 px-3 py-3 text-white shadow-xl backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-4"
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.2,
                  }}
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-saffron">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/75">
                      Premsadan Mandir
                    </div>
                    <div className="truncate font-display text-sm font-semibold sm:text-base">
                      MVP Colony, Vizag
                    </div>
                  </div>
                </motion.div>
              </AutoImageSlider>

              <AutoImageSlider
                images={HERO_IMAGE_GROUPS[1]}
                alt="Premsadan spiritual moments"
                interval={4100}
                startIndex={1}
                className="h-[155px] shadow-none ring-0 sm:h-[185px] lg:h-full"
              >
                <div className="absolute bottom-3 left-3 z-40 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md sm:text-xs">
                  Spiritual moments
                </div>
              </AutoImageSlider>

              <AutoImageSlider
                images={HERO_IMAGE_GROUPS[2]}
                alt="Sri Sathya Sai seva activities"
                interval={4800}
                startIndex={2}
                className="h-[155px] shadow-none ring-0 sm:h-[185px] lg:h-full"
              >
                <div className="absolute bottom-3 left-3 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-white backdrop-blur-md">
                  <Users className="h-3.5 w-3.5 text-sky-300" />
                  <span className="text-[10px] font-medium sm:text-xs">500+ sevadals</span>
                </div>
              </AutoImageSlider>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
