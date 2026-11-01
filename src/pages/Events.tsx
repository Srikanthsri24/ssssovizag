import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";

import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Clock,
  HeartHandshake,
  MapPin,
  Music2,
  Sparkles,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { QuoteBanner } from "@/components/shared/QuoteBanner";

import { mandir2 as mandir } from "@/lib/site-images";

type EventTag = "Festival" | "Weekly" | "Seva";
type EventFilter = "All" | EventTag;

type EventItem = {
  id: number;
  title: string;
  description: string;
  when: string;
  where: string;
  tag: EventTag;
  icon: LucideIcon;
  featured?: boolean;
};

const EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Sri Sathya Sai Baba Birthday",
    description:
      "A grand celebration with devotional bhajans, spiritual discourse and Narayana Seva.",
    when: "November",
    where: "Premsadan Mandir",
    tag: "Festival",
    icon: Sparkles,
    featured: true,
  },
  {
    id: 2,
    title: "Guru Poornima",
    description:
      "A sacred gathering with special prayers, devotional programmes and satsang.",
    when: "July",
    where: "Premsadan Mandir",
    tag: "Festival",
    icon: HeartHandshake,
  },
  {
    id: 3,
    title: "Weekly Bhajans",
    description:
      "Community bhajans open to devotees, families and visitors of all age groups.",
    when: "Every Thursday & Sunday",
    where: "Premsadan Mandir",
    tag: "Weekly",
    icon: Music2,
  },
  {
    id: 4,
    title: "Bal Vikas Classes",
    description:
      "Value-based education that helps children develop character, discipline and compassion.",
    when: "Every Sunday morning",
    where: "Premsadan Mandir",
    tag: "Weekly",
    icon: BookOpen,
  },
  {
    id: 5,
    title: "Free Medical Camp",
    description:
      "Community health screenings, basic medical support and healthcare awareness.",
    when: "Quarterly",
    where: "MVP Colony",
    tag: "Seva",
    icon: Stethoscope,
  },
  {
    id: 6,
    title: "Grama Seva",
    description:
      "Village outreach activities that provide essential support with love and dignity.",
    when: "Monthly",
    where: "Nearby villages",
    tag: "Seva",
    icon: Users,
  },
];

const FILTERS: EventFilter[] = ["All", "Festival", "Weekly", "Seva"];

const filterDescriptions: Record<EventFilter, string> = {
  All: "Explore all spiritual programmes, weekly gatherings and seva activities.",
  Festival:
    "Sacred celebrations that bring devotees together in prayer and devotion.",
  Weekly:
    "Regular programmes that nurture devotion, discipline and community bonding.",
  Seva: "Service activities created to support people and communities with compassion.",
};

const tagStyles: Record<
  EventTag,
  {
    badge: string;
    icon: string;
    border: string;
  }
> = {
  Festival: {
    badge:
      "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    icon:
      "bg-amber-500/10 text-amber-700 group-hover:bg-amber-500 group-hover:text-white dark:text-amber-300",
    border: "hover:border-amber-500/30",
  },
  Weekly: {
    badge:
      "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    icon:
      "bg-blue-500/10 text-blue-700 group-hover:bg-blue-500 group-hover:text-white dark:text-blue-300",
    border: "hover:border-blue-500/30",
  },
  Seva: {
    badge:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    icon:
      "bg-emerald-500/10 text-emerald-700 group-hover:bg-emerald-500 group-hover:text-white dark:text-emerald-300",
    border: "hover:border-emerald-500/30",
  },
};

const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.2,
    },
  },
};

export function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<EventFilter>("All");

  const featuredEvent = EVENTS.find((event) => event.featured);

  const filteredEvents = useMemo(() => {
    if (activeFilter === "All") {
      return EVENTS.filter((event) => !event.featured);
    }

    return EVENTS.filter((event) => event.tag === activeFilter);
  }, [activeFilter]);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <PageHero
        eyebrow="Events & Celebrations"
        title="Come, be part of every seva"
        subtitle="Weekly bhajans, sacred festivals, medical camps and community outreach — the doors of Premsadan are always open."
        image={mandir}
        quote="Every day is a festival when the heart is filled with love."
      />

      {/* Event introduction */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent" />

        <div className="relative mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  <Calendar className="h-4 w-4" />
                  Programmes throughout the year
                </div>

                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Gather, celebrate and serve together
                </h2>
              </div>

              <div>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Premsadan brings devotees and volunteers together through
                  spiritual gatherings, value-based education, festivals and
                  service activities that strengthen the community.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    "Open to everyone",
                    "Family friendly",
                    "Community focused",
                  ].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm"
                    >
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>

                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured event */}
      {featuredEvent && (
        <section className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 lg:pb-24">
          <Reveal>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 25,
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm"
            >
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

              <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      <Sparkles className="h-3.5 w-3.5" />
                      Featured celebration
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                        tagStyles[featuredEvent.tag].badge
                      }`}
                    >
                      {featuredEvent.tag}
                    </span>
                  </div>

                  <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    {featuredEvent.title}
                  </h2>

                  <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                    {featuredEvent.description}
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <EventDetail
                      icon={Clock}
                      label="Schedule"
                      value={featuredEvent.when}
                    />

                    <EventDetail
                      icon={MapPin}
                      label="Venue"
                      value={featuredEvent.where}
                    />
                  </div>

                  <div className="mt-8">
                    <Link
                      to="/contact"
                      className="group/button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
                    >
                      Contact us for details
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <div className="relative min-h-[320px] border-t border-border lg:min-h-[500px] lg:border-l lg:border-t-0">
                  <img
                    src={mandir}
                    alt="Premsadan Mandir event celebration"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md">
                      <featuredEvent.icon className="h-6 w-6" />
                    </div>

                    <p className="mt-4 max-w-md font-display text-2xl font-semibold leading-tight">
                      A sacred gathering of devotion, unity and selfless
                      service.
                    </p>

                    <p className="mt-2 text-sm text-white/70">
                      Devotees, families and visitors are welcome.
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          </Reveal>
        </section>
      )}

      {/* Events list */}
      <section className="border-y border-border/70 bg-muted/30">
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Explore our programmes
                </p>

                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Something meaningful for everyone
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                  {filterDescriptions[activeFilter]}
                </p>
              </div>

              <div className="max-w-full overflow-x-auto pb-1">
                <div
                  role="tablist"
                  aria-label="Filter events"
                  className="inline-flex min-w-max gap-2 rounded-2xl border border-border bg-card p-1.5 shadow-sm"
                >
                  {FILTERS.map((filter) => {
                    const isActive = activeFilter === filter;

                    return (
                      <button
                        key={filter}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveFilter(filter)}
                        className={`relative min-h-10 rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-300 sm:px-5 ${
                          isActive
                            ? "text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-event-filter"
                            className="absolute inset-0 rounded-xl bg-primary shadow-md shadow-primary/20"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}

                        <span className="relative z-10">{filter}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredEvents.length}
                </span>{" "}
                {filteredEvents.length === 1 ? "event" : "events"}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                variants={cardContainerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid gap-5 md:grid-cols-2 lg:gap-6"
              >
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredEvents.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />

                <h3 className="mt-4 font-display text-xl font-semibold">
                  No programmes found
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Choose another category to explore our programmes.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Participation CTA */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-primary-foreground shadow-xl shadow-primary/20 sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-primary-foreground/10" />
            <div className="absolute -right-8 -top-12 h-56 w-56 rounded-full border border-primary-foreground/10" />
            <div className="absolute -bottom-36 -left-20 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm font-medium">
                  <HeartHandshake className="h-4 w-4" />
                  Everyone is welcome
                </div>

                <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Join us in devotion, celebration and service
                </h2>

                <p className="mt-5 max-w-2xl leading-7 text-primary-foreground/80">
                  Visit Premsadan, participate in our programmes or volunteer
                  for a seva activity. Every helping hand creates a meaningful
                  difference.
                </p>
              </div>

              <Link
                to="/contact"
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-background px-7 py-4 font-semibold text-foreground shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Get event details
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <QuoteBanner text="The heart with love is the true temple of God." />
    </main>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const Icon = event.icon;
  const styles = tagStyles[event.tag];

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 24,
      }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors duration-300 sm:p-6 ${styles.border}`}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/[0.06] blur-3xl transition duration-500 group-hover:bg-primary/10" />

      <div className="relative flex items-start justify-between gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-all duration-300 ${styles.icon}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <span
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${styles.badge}`}
        >
          {event.tag}
        </span>
      </div>

      <div className="relative mt-5 flex flex-1 flex-col">
        <h3 className="font-display text-xl font-semibold leading-tight sm:text-2xl">
          {event.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground sm:text-base">
          {event.description}
        </p>

        <div className="mt-6 space-y-3 border-t border-border pt-5">
          <div className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Clock className="h-4 w-4" />
            </span>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Schedule
              </p>
              <p className="mt-0.5 font-medium">{event.when}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <MapPin className="h-4 w-4" />
            </span>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Venue
              </p>
              <p className="mt-0.5 font-medium">{event.where}</p>
            </div>
          </div>
        </div>

        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          Know more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

function EventDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background/70 p-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}