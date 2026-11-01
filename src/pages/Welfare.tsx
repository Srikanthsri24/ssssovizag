import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Gift,
  HandHeart,
  Heart,
  Home,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { PageHero } from "@/components/shared/PageHero";
import { QuoteBanner } from "@/components/shared/QuoteBanner";
import { Reveal } from "@/components/shared/Reveal";
import welfareImage from "@/assets/seva-food.jpg";

type WelfareProgramme = {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  Icon: LucideIcon;
  benefits: string[];
  actionLabel: string;
  actionTo: string;
};

const programmes: WelfareProgramme[] = [
  {
    id: "narayana-seva",
    title: "Narayana Seva",
    shortTitle: "Narayana Seva",
    subtitle: "Serving food with love and dignity",
    description:
      "Food is prepared and shared with care, respect and devotion. Every meal is offered in the spirit of seeing divinity in every person.",
    Icon: Utensils,
    benefits: [
      "Food distribution with dignity and compassion",
      "Community meal and outreach activities",
      "Volunteer participation in preparation and service",
      "Service offered without discrimination",
    ],
    actionLabel: "Join Narayana Seva",
    actionTo: "/devotee-registration",
  },
  {
    id: "community-care",
    title: "Community Care",
    shortTitle: "Community Care",
    subtitle: "Standing beside families in difficult times",
    description:
      "Premsadan supports families facing hardship by offering essential assistance, encouragement and compassionate guidance.",
    Icon: Home,
    benefits: [
      "Essential support for families in need",
      "Care provided with sensitivity and respect",
      "Community-based assistance and guidance",
      "A dependable network of volunteers",
    ],
    actionLabel: "Ask About Support",
    actionTo: "/contact",
  },
  {
    id: "relief-support",
    title: "Relief & Emergency Support",
    shortTitle: "Relief Support",
    subtitle: "Responding when urgent help is needed",
    description:
      "During emergencies and difficult circumstances, volunteers come together to distribute essential supplies and support affected communities.",
    Icon: PackageCheck,
    benefits: [
      "Distribution of essential relief materials",
      "Volunteer coordination during urgent situations",
      "Community outreach and local assistance",
      "Timely support guided by compassion",
    ],
    actionLabel: "Join Relief Activities",
    actionTo: "/volunteer",
  },
];

const impactHighlights = [
  {
    title: "Food with dignity",
    description: "Serving every person with love and respect.",
    Icon: Utensils,
  },
  {
    title: "Care for families",
    description: "Standing beside communities during hardship.",
    Icon: Home,
  },
  {
    title: "Service in action",
    description: "Transforming compassion into meaningful support.",
    Icon: HandHeart,
  },
];

const serviceSteps = [
  {
    number: "01",
    title: "Understand",
    description: "Listen carefully and identify the genuine needs of individuals and communities.",
    Icon: Heart,
  },
  {
    number: "02",
    title: "Prepare",
    description: "Volunteers organise food, materials and support with care and responsibility.",
    Icon: PackageCheck,
  },
  {
    number: "03",
    title: "Serve",
    description: "Assistance is offered with dignity, compassion and a spirit of selfless seva.",
    Icon: HandHeart,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function WelfarePage() {
  const [activeProgrammeId, setActiveProgrammeId] = useState(programmes[0].id);

  const activeProgramme =
    programmes.find((programme) => programme.id === activeProgrammeId) ?? programmes[0];

  const ActiveProgrammeIcon = activeProgramme.Icon;

  const scrollToProgrammes = () => {
    document.getElementById("welfare-programmes")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Welfare"
        title="Serving humanity with compassion"
        subtitle="A quiet commitment to feeding, caring and standing beside those who need support."
        image={welfareImage}
        quote="The purpose of life is to serve and to help others."
      />

      {/* Floating impact cards */}
      <section className="relative z-10 mx-auto -mt-6 max-w-[1200px] px-4 sm:-mt-10 sm:px-6">
        <Reveal>
          <div className="overflow-hidden mt-2 rounded-[1.75rem] border border-border bg-card/90 p-3 shadow-xl backdrop-blur-xl sm:rounded-[2rem] sm:p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {impactHighlights.map(({ Icon, title, description }, index) => (
                <motion.div
                  key={title}
                  initial={{
                    opacity: 0,
                    y: 14,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.15 + index * 0.08,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="group flex items-center gap-4 rounded-2xl border border-transparent bg-background/60 p-4 transition hover:border-primary/20 hover:bg-primary/[0.05]"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>

                    <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card/65 shadow-sm sm:rounded-[2.75rem]">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            <div className="grid lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
              <div className="relative z-10 flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Our welfare efforts
                </div>

                <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                  Service rooted in <span className="text-gradient">love and care</span>
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  From food distribution to community assistance, every welfare activity at
                  Premsadan is carried out with compassion, responsibility and respect for human
                  dignity.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      Icon: ShieldCheck,
                      title: "Dignified support",
                      description: "Every person is served with sensitivity, respect and care.",
                    },
                    {
                      Icon: Users,
                      title: "Community participation",
                      description: "Volunteers work together to create meaningful local impact.",
                    },
                  ].map(({ Icon, title, description }) => (
                    <motion.div
                      key={title}
                      whileHover={{
                        y: -3,
                      }}
                      className="rounded-2xl border border-border bg-background/65 p-4 shadow-sm transition hover:border-primary/25 hover:bg-primary/[0.045]"
                    >
                      <Icon className="h-5 w-5 text-primary" />

                      <h3 className="mt-3 text-sm font-semibold text-foreground">{title}</h3>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <motion.button
                    type="button"
                    onClick={scrollToProgrammes}
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:shadow-xl"
                  >
                    Explore Welfare Work
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </motion.button>

                  <Link
                    to="/volunteer"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/[0.06]"
                  >
                    Join as Volunteer
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[340px] overflow-hidden lg:min-h-full">
                <img
                  src={welfareImage}
                  alt="Food seva and community welfare activity"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent lg:bg-gradient-to-r lg:from-background/35 lg:via-transparent lg:to-transparent" />

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-black/40 p-4 text-white shadow-xl backdrop-blur-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15">
                      <HandHeart className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-display text-lg font-semibold">Compassion in action</p>

                      <p className="mt-0.5 text-xs text-white/75">
                        Serving every person with dignity and love
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Interactive programmes */}
      <section
        id="welfare-programmes"
        className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/[0.03] via-primary/[0.07] to-transparent" />

        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <HandHeart className="h-3.5 w-3.5" />
                Welfare programmes
              </div>

              <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
                Compassion expressed through{" "}
                <span className="text-gradient">meaningful action</span>
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Select a programme to learn how Premsadan supports individuals, families and
                communities.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
            {/* Programme selection */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              role="tablist"
              aria-label="Welfare programmes"
              className="grid gap-3"
            >
              {programmes.map((programme) => {
                const Icon = programme.Icon;
                const isActive = activeProgrammeId === programme.id;

                return (
                  <motion.button
                    key={programme.id}
                    variants={itemVariants}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`welfare-panel-${programme.id}`}
                    onClick={() => setActiveProgrammeId(programme.id)}
                    whileHover={{
                      x: 4,
                    }}
                    whileTap={{
                      scale: 0.99,
                    }}
                    className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left shadow-sm transition-all duration-300 ${
                      isActive
                        ? "border-primary/35 bg-primary/[0.09] shadow-md"
                        : "border-border bg-card/70 hover:border-primary/20 hover:bg-card"
                    }`}
                  >
                    <div
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg font-semibold text-foreground">
                        {programme.shortTitle}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {programme.subtitle}
                      </p>
                    </div>

                    <ChevronRight
                      className={`h-4 w-4 shrink-0 transition ${
                        isActive
                          ? "translate-x-1 text-primary"
                          : "text-muted-foreground group-hover:translate-x-1 group-hover:text-primary"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Active programme */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProgramme.id}
                id={`welfare-panel-${activeProgramme.id}`}
                role="tabpanel"
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -15,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative isolate overflow-hidden rounded-[2rem] border border-primary/20 bg-card p-6 shadow-xl sm:p-8"
              >
                <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{
                        rotate: [0, 4, -4, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                      }}
                      className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    >
                      <ActiveProgrammeIcon className="h-6 w-6" />
                    </motion.div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        Selected programme
                      </p>

                      <h3 className="mt-1 font-display text-2xl font-semibold text-foreground sm:text-3xl">
                        {activeProgramme.title}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-primary/80">
                        {activeProgramme.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/65 px-3 py-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    Service with dignity
                  </div>
                </div>

                <p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                  {activeProgramme.description}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {activeProgramme.benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.06,
                      }}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-background/60 p-4"
                    >
                      <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>

                      <p className="text-sm leading-6 text-foreground/85">{benefit}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Contact the Samithi for activity details and participation guidance.
                  </p>

                  <Link
                    to={activeProgramme.actionTo}
                    className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {activeProgramme.actionLabel}

                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Service approach */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <Truck className="h-3.5 w-3.5" />
              Our service approach
            </div>

            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Understand, prepare and serve
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Every activity is thoughtfully organised so that support reaches people with care,
              responsibility and dignity.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-10 grid gap-5 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block" />

          {serviceSteps.map(({ number, title, description, Icon }, index) => (
            <Reveal key={title} delay={index * 0.1}>
              <motion.div
                whileHover={{
                  y: -7,
                }}
                className="group relative h-full rounded-[1.75rem] border border-border bg-card/70 p-6 text-center shadow-sm transition hover:border-primary/30 hover:shadow-xl"
              >
                <div className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-primary/20 bg-background text-primary shadow-md transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>

                <span className="mt-5 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-primary">
                  STEP {number}
                </span>

                <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 sm:pb-20">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-primary/20 bg-card p-7 shadow-[0_28px_80px_-48px_rgba(249,115,22,0.5)] sm:rounded-[2.75rem] sm:p-10">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.14),transparent_42%)]" />

            <motion.div
              aria-hidden
              animate={{
                y: [0, -8, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="pointer-events-none absolute -right-8 -top-8 text-primary/[0.07]"
            >
              <Heart className="h-40 w-40 fill-current" />
            </motion.div>

            <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                  <Gift className="h-3.5 w-3.5" />
                  Be part of the seva
                </div>

                <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                  Help us extend compassion further
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Volunteer your time, support a welfare activity or connect with Premsadan to
                  understand how you can participate.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/volunteer"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Users className="h-4 w-4" />
                  Volunteer With Us
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/devotee-registration"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/[0.06]"
                >
                  <Heart className="h-4 w-4 text-primary" />
                  Devotee Registration
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <QuoteBanner text="In serving others, we discover our highest purpose." />
    </div>
  );
}
