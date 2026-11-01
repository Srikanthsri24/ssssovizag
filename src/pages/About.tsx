import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  HandHeart,
  Heart,
  MapPin,
  Quote,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { PageHero } from "@/components/shared/PageHero";
import { QuoteBanner } from "@/components/shared/QuoteBanner";
import { Reveal } from "@/components/shared/Reveal";

import { QUOTES } from "@/lib/site";
import {
  mandir1 as mandir,
  shrine1 as shrine,
} from "@/lib/site-images";

import volunteers from "@/assets/seva-volunteers.jpg";

type Wing = {
  number: string;
  title: string;
  body: string;
  icon: LucideIcon;
  activities: string[];
};

const WINGS: Wing[] = [
  {
    number: "01",
    title: "Spiritual Wing",
    body: "Nurturing inner peace, devotion and spiritual understanding through collective prayer.",
    icon: Sparkles,
    activities: [
      "Bhajans and meditation",
      "Study circles",
      "Festival observances",
    ],
  },
  {
    number: "02",
    title: "Educational Wing",
    body: "Helping children understand and practise universal human values in everyday life.",
    icon: GraduationCap,
    activities: [
      "Bal Vikas classes",
      "Stories and songs",
      "Human values education",
    ],
  },
  {
    number: "03",
    title: "Service Wing",
    body: "Serving society with compassion through regular community and welfare activities.",
    icon: HandHeart,
    activities: [
      "Narayana Seva",
      "Medical camps",
      "Community support",
    ],
  },
];

const HIGHLIGHTS = [
  {
    icon: Heart,
    value: "Love",
    label: "Our foundation",
  },
  {
    icon: Users,
    value: "Everyone",
    label: "Is welcome",
  },
  {
    icon: HandHeart,
    value: "Seva",
    label: "Our way of life",
  },
];

const HUMAN_VALUES = [
  "Sathya",
  "Dharma",
  "Shanti",
  "Prema",
  "Ahimsa",
];

export function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  const imageHover = shouldReduceMotion
    ? undefined
    : {
        scale: 1.035,
      };

  return (
    <div className="overflow-hidden bg-background">
      <PageHero
        eyebrow="About Us"
        title="A spiritual family serving Visakhapatnam"
        subtitle="Founded on the message of Bhagawan Sri Sathya Sai Baba, our Samithi walks the path of love, wisdom and selfless service."
        image={mandir}
        quote="There is only one caste — the caste of humanity."
      />

      {/* About Premsadan */}
      <section className="relative px-4 py-16 sm:px-6 lg:py-24">
        <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-0 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto max-w-2xl lg:mx-0">
              <motion.div
                whileHover={imageHover}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card p-2 shadow-2xl shadow-foreground/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem]">
                  <img
                    src={mandir}
                    alt="Premsadan Mandir, MVP Colony"
                    className="h-full w-full object-cover transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/75">
                      <MapPin className="h-4 w-4" />
                      MVP Colony, Visakhapatnam
                    </div>

                    <p className="mt-2 font-display text-xl font-semibold sm:text-2xl">
                      Premsadan Mandir
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                transition={{
                  delay: 0.25,
                }}
                className="absolute -bottom-6 right-4 hidden max-w-[245px] rounded-2xl border border-border/70 bg-background/95 p-4 shadow-xl backdrop-blur-xl sm:block lg:-right-7"
              >
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <CalendarDays className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      A vibrant spiritual home
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Prayer, learning and service come together
                      under one roof.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto max-w-xl lg:mx-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Our spiritual home
              </div>

              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                Premsadan Mandir,
                <span className="block text-primary">
                  MVP Colony
                </span>
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                <p>
                  Premsadan is home to daily bhajans,
                  weekly study circles, Bal Vikas classes
                  for children and a vibrant calendar of
                  seva activities.
                </p>

                <p>
                  Every devotee, regardless of background,
                  is welcome to participate in prayer,
                  learning and selfless service.
                </p>

                <p>
                  Our Samithi is part of the worldwide Sri
                  Sathya Sai Seva Organisations, dedicated
                  to the ideals of Sathya, Dharma, Shanti,
                  Prema and Ahimsa.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
                {HIGHLIGHTS.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.value}
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 15,
                            }
                      }
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.15 + index * 0.08,
                      }}
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              y: -4,
                            }
                      }
                      className="rounded-2xl border border-border/70 bg-card/70 p-3 text-center shadow-sm transition-colors hover:border-primary/30 hover:bg-card sm:p-4"
                    >
                      <div className="mx-auto grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-foreground">
                        {item.value}
                      </p>

                      <p className="mt-1 text-[10px] leading-tight text-muted-foreground sm:text-xs">
                        {item.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Three Wings */}
      <section className="relative border-y border-border/60 bg-muted/25 px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm">
                <HandHeart className="h-3.5 w-3.5" />
                Our three wings
              </div>

              <h2 className="mt-5 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                Spirituality expressed through action
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                Our activities bring together spiritual
                growth, value-based education and
                compassionate service.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {WINGS.map((wing, index) => {
              const Icon = wing.icon;

              return (
                <Reveal
                  key={wing.title}
                  delay={index * 0.08}
                >
                  <motion.article
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -8,
                          }
                    }
                    transition={{
                      duration: 0.25,
                    }}
                    className="group relative h-full overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:p-7"
                  >
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <motion.div
                          whileHover={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  rotate: -7,
                                  scale: 1.08,
                                }
                          }
                          className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15"
                        >
                          <Icon className="h-6 w-6" />
                        </motion.div>

                        <span className="font-display text-4xl font-semibold text-foreground/5 transition-colors group-hover:text-primary/10">
                          {wing.number}
                        </span>
                      </div>

                      <h3 className="mt-6 font-display text-xl font-semibold text-foreground sm:text-2xl">
                        {wing.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {wing.body}
                      </p>

                      <div className="my-6 h-px bg-border/70" />

                      <ul className="space-y-3">
                        {wing.activities.map((activity) => (
                          <li
                            key={activity}
                            className="flex items-center gap-3 text-sm text-foreground/80"
                          >
                            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            </span>

                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <QuoteBanner text="Start the day with love. Fill the day with love. End the day with love." />

      {/* Volunteers */}
      <section className="relative px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <Users className="h-3.5 w-3.5" />
                Love in action
              </div>

              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Service offered with humility and love
              </h2>

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                Seva is not only an activity. It is an
                opportunity to recognise the same divinity
                in every person and serve without expecting
                anything in return.
              </p>

              <div className="mt-8 rounded-3xl border border-primary/15 bg-primary/5 p-5 sm:p-6">
                <Quote className="h-7 w-7 text-primary/60" />

                <p className="mt-4 font-display text-lg leading-8 text-foreground sm:text-xl">
                  “Hands that serve are holier than lips
                  that pray.”
                </p>

                <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Bhagawan Sri Sathya Sai Baba
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <motion.div
                whileHover={imageHover}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden rounded-[2rem] border border-border/70 bg-card p-2 shadow-2xl shadow-foreground/10"
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-[1.6rem]">
                  <img
                    src={volunteers}
                    alt="Sai volunteers serving the community"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/25 p-4 text-white backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15">
                      <Heart className="h-5 w-5 fill-current" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Selfless service
                      </p>

                      <p className="mt-0.5 text-xs text-white/70">
                        Compassion transformed into action
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Guiding Quotes */}
      <section className="border-y border-border/60 bg-card/40 px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm">
                  <BookOpen className="h-3.5 w-3.5" />
                  Guiding words
                </div>

                <h2 className="mt-5 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                  Wisdom that guides every step
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                Timeless teachings that inspire us to live
                with love, discipline, unity and service.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {QUOTES.map((quote, index) => (
              <Reveal
                key={`${quote.text}-${index}`}
                delay={index * 0.06}
              >
                <motion.blockquote
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -5,
                        }
                  }
                  className="group relative h-full overflow-hidden rounded-[1.75rem] border border-border/70 bg-background p-6 shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-lg sm:p-7"
                >
                  <Quote className="absolute right-5 top-5 h-12 w-12 text-primary/5 transition-all duration-300 group-hover:scale-110 group-hover:text-primary/10" />

                  <div className="relative">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Quote className="h-4 w-4" />
                    </div>

                    <p className="mt-5 font-display text-lg italic leading-8 text-foreground sm:text-xl">
                      “{quote.text}”
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                      <span className="h-px w-8 bg-primary" />

                      <cite className="text-xs font-medium not-italic uppercase tracking-[0.13em] text-muted-foreground">
                        {quote.by}
                      </cite>
                    </div>
                  </div>
                </motion.blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sanctum */}
      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-border/70 bg-card p-3 shadow-xl sm:p-5 lg:p-7">
            <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <Reveal>
                <div className="px-3 py-7 sm:px-6 lg:px-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    Sacred space
                  </div>

                  <h2 className="mt-5 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                    Inside the sanctum
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                    Padukas, portraits of Bhagawan and the
                    eternal Sarva Dharma symbol grace our
                    altar—a constant reminder that all paths
                    lead to the one truth.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {HUMAN_VALUES.map((value) => (
                      <motion.span
                        key={value}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                y: -2,
                                scale: 1.03,
                              }
                        }
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm"
                      >
                        {value}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <motion.div
                  whileHover={imageHover}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden rounded-[1.7rem]"
                >
                  <img
                    src={shrine}
                    alt="Sanctum at Premsadan Mandir"
                    loading="lazy"
                    className="aspect-[4/3] h-full w-full object-cover"
                  />
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}