import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

import {
  Activity,
  ArrowRight,
  Check,
  ChevronRight,
  HeartHandshake,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { QuoteBanner } from "@/components/shared/QuoteBanner";

import healthcareImage from "@/assets/service-healthcare.jpg";

const healthcareServices = [
  {
    icon: Stethoscope,
    title: "Medical Camps",
    shortDescription:
      "Accessible medical assistance for individuals and families in underserved communities.",
    description:
      "Our medical outreach activities are designed to bring compassionate healthcare support closer to people who may otherwise have limited access to medical services.",
    features: [
      "Community medical outreach",
      "Basic health screenings",
      "Medical guidance and awareness",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Preventive Care",
    shortDescription:
      "Creating awareness that encourages healthier choices and early intervention.",
    description:
      "Preventive healthcare programmes focus on helping communities understand common health concerns, healthy practices and the importance of seeking timely medical support.",
    features: [
      "Health awareness programmes",
      "Early intervention guidance",
      "Healthy lifestyle education",
    ],
  },
  {
    icon: HeartPulse,
    title: "Compassionate Support",
    shortDescription:
      "Serving every person with dignity, empathy and personal attention.",
    description:
      "Every healthcare activity is guided by love, patience and respect. Our volunteers work to ensure that every individual feels supported and cared for.",
    features: [
      "Dignified patient assistance",
      "Volunteer-led support",
      "Care for vulnerable families",
    ],
  },
];

const serviceJourney = [
  {
    number: "01",
    icon: Users,
    title: "Understand",
    description:
      "We listen to community needs and identify areas where healthcare support can create meaningful impact.",
  },
  {
    number: "02",
    icon: Activity,
    title: "Serve",
    description:
      "Volunteers, healthcare professionals and supporters come together to conduct organised service activities.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Support",
    description:
      "We continue to encourage awareness, compassion and responsible healthcare practices within the community.",
  },
];

export function HealthcarePage() {
  const [activeService, setActiveService] = useState(0);

  const selectedService = healthcareServices[activeService];
  const SelectedServiceIcon = selectedService.icon;

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <PageHero
        eyebrow="Healthcare Seva"
        title="Care that reaches every heart"
        subtitle="Compassionate medical outreach, preventive care and community support that bring relief, dignity and hope."
        image={healthcareImage}
        quote="Service to the sick is service to God."
      />

      {/* Introduction */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent" />

        <div className="relative mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-sm">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

              <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-7 sm:p-10 lg:p-12">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                    <Sparkles className="h-4 w-4" />
                    Our healthcare wing
                  </div>

                  <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    Healing through empathy, service and action
                  </h2>

                  <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                    The healthcare initiatives at Premsadan are focused on
                    helping communities through medical outreach, health
                    awareness and compassionate volunteer support.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {[
                      "Free service",
                      "Community focused",
                      "Volunteer supported",
                    ].map((item) => (
                      <div
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-medium"
                      >
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3.5 w-3.5" />
                        </span>

                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link
                      to="/contact"
                      className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
                    >
                      Join our service
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <a
                      href="#healthcare-services"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background/70 px-6 py-3 font-semibold transition duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    >
                      Explore our initiatives
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="relative min-h-[320px] border-t border-border lg:min-h-full lg:border-l lg:border-t-0">
                  <img
                    src={healthcareImage}
                    alt="Healthcare service activities at Premsadan"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                    <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md">
                      <HeartHandshake className="h-6 w-6" />
                    </div>

                    <p className="max-w-md font-display text-2xl font-semibold">
                      Every act of care can bring comfort, strength and hope.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive services */}
      <section
        id="healthcare-services"
        className="border-y border-border/70 bg-muted/30"
      >
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                How we serve
              </p>

              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Healthcare guided by compassion
              </h2>

              <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
                Select an initiative to learn more about the different ways our
                healthcare service reaches the community.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <Reveal>
              <div className="grid gap-4">
                {healthcareServices.map((service, index) => {
                  const Icon = service.icon;
                  const isActive = activeService === index;

                  return (
                    <motion.button
                      key={service.title}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveService(index)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.99 }}
                      className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 sm:p-6 ${
                        isActive
                          ? "border-primary/40 bg-card shadow-lg shadow-primary/10"
                          : "border-border bg-card/60 hover:border-primary/25 hover:bg-card hover:shadow-md"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-healthcare-service"
                          className="absolute inset-y-0 left-0 w-1 bg-primary"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      )}

                      <div className="flex items-start gap-4">
                        <div
                          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-all duration-300 ${
                            isActive
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                              : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="font-display text-xl font-semibold">
                              {service.title}
                            </h3>

                            <ChevronRight
                              className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                                isActive
                                  ? "translate-x-1 text-primary"
                                  : "text-muted-foreground group-hover:translate-x-1 group-hover:text-primary"
                              }`}
                            />
                          </div>

                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative h-full min-h-[440px] overflow-hidden rounded-[2rem] border border-border bg-card p-7 shadow-sm sm:p-9 lg:p-10">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedService.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex h-full flex-col"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                        <SelectedServiceIcon className="h-7 w-7" />
                      </div>

                      <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        Healthcare seva
                      </span>
                    </div>

                    <h3 className="mt-8 font-display text-3xl font-semibold sm:text-4xl">
                      {selectedService.title}
                    </h3>

                    <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                      {selectedService.description}
                    </p>

                    <div className="mt-8 grid gap-3">
                      {selectedService.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.08,
                          }}
                          className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-4"
                        >
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                            <Check className="h-4 w-4" />
                          </span>

                          <span className="font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-auto pt-9">
                      <Link
                        to="/contact"
                        className="group inline-flex items-center gap-2 font-semibold text-primary"
                      >
                        Participate in this service
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Service process */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Our approach
              </p>

              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                From understanding needs to offering support
              </h2>

              <p className="mt-5 leading-7 text-muted-foreground">
                Our healthcare service follows a people-first approach. Every
                activity begins with understanding the community and is carried
                out with care, discipline and responsibility.
              </p>
            </div>

            <div className="relative grid gap-5">
              <div className="absolute bottom-10 left-7 top-10 hidden w-px bg-border sm:block" />

              {serviceJourney.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.article
                    key={step.title}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.1,
                    }}
                    className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:pl-20"
                  >
                    <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:absolute sm:left-0 sm:top-1/2 sm:mb-0 sm:-translate-x-1/2 sm:-translate-y-1/2">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        Step {step.number}
                      </span>

                      <span className="h-px flex-1 bg-border" />
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-semibold">
                      {step.title}
                    </h3>

                    <p className="mt-3 leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 lg:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-primary-foreground shadow-xl shadow-primary/20 sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border border-primary-foreground/10" />
            <div className="absolute -right-8 -top-12 h-56 w-56 rounded-full border border-primary-foreground/10" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm font-medium">
                  <HeartPulse className="h-4 w-4" />
                  Serve with compassion
                </div>

                <h2 className="mt-5 max-w-3xl font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
                  Be part of a service that brings care and hope
                </h2>

                <p className="mt-5 max-w-2xl leading-7 text-primary-foreground/80">
                  Volunteers, medical professionals and well-wishers can support
                  our healthcare service activities and help us reach more
                  families.
                </p>
              </div>

              <Link
                to="/contact"
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-background px-7 py-4 font-semibold text-foreground shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Contact Premsadan
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <QuoteBanner text="The best healing is offered with a loving hand." />
    </main>
  );
}