import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Facebook,
  GraduationCap,
  HandHeart,
  Heart,
  HeartHandshake,
  Home,
  Images,
  Info,
  Instagram,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Send,
  Sparkles,
  Stethoscope,
  Users,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { NAV, NAV_TAIL, QUOTES, SEVA_NAV, SITE } from "@/lib/site";
import { LOGO } from "@/lib/site-images";

const footerItemAnimation = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function getNavigationIcon(label: string): LucideIcon {
  const value = label.toLowerCase();

  if (value.includes("home")) return Home;
  if (value.includes("about")) return Info;
  if (value.includes("gallery")) return Images;
  if (value.includes("volunteer")) return Users;
  if (value.includes("contact")) return Phone;
  if (value.includes("event")) return CalendarDays;

  return ChevronRight;
}

function getSevaIcon(label: string): LucideIcon {
  const value = label.toLowerCase();

  if (value.includes("education")) return GraduationCap;
  if (value.includes("health")) return Stethoscope;
  if (value.includes("welfare")) return HandHeart;
  if (value.includes("event")) return CalendarDays;
  if (value.includes("service")) return HeartHandshake;

  return Activity;
}

export function Footer() {
  const [email, setEmail] = useState("");

  const currentYear = new Date().getFullYear();

  const phoneLink = String(SITE.phone ?? "").replace(/[^\d+]/g, "");

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    SITE.address,
  )}`;

  const exploreLinks = [...NAV, ...NAV_TAIL].filter(
    (item, index, links) => links.findIndex((link) => link.to === item.to) === index,
  );

  const socialLinks = [
    {
      label: "Facebook",
      href: "#",
      Icon: Facebook,
    },
    {
      label: "Instagram",
      href: "#",
      Icon: Instagram,
    },
    {
      label: "YouTube",
      href: "#",
      Icon: Youtube,
    },
  ];

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanEmail = email.trim();

    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Subscribed successfully. Seva updates will be shared with you.");

    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-background">
      {/* Theme-friendly background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-primary/[0.06] blur-3xl" />

        <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-primary/[0.05] blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.05),transparent_35%)]" />
      </div>

      {/* Newsletter and action section */}
      <div className="relative border-b border-border bg-card/55 backdrop-blur-sm">
        <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.55,
            }}
            className="flex flex-col gap-6 rounded-[28px] border border-border bg-background/80 p-5 shadow-sm backdrop-blur-md sm:p-7 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex max-w-2xl items-start gap-4">
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15"
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Stay connected
                </p>

                <h2 className="mt-1 font-display text-xl font-semibold text-foreground sm:text-2xl">
                  Receive our latest seva updates
                </h2>

                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  Get information about bhajans, healthcare camps, educational service, welfare
                  activities, and upcoming events.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="group flex w-full max-w-lg items-center rounded-2xl border border-border bg-card p-1.5 shadow-sm transition-all duration-300 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10"
            >
              <Mail className="ml-3 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary" />

              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                maxLength={255}
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="hidden sm:inline">Subscribe</span>

                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          staggerChildren: 0.08,
        }}
        className="relative mx-auto grid max-w-[1400px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:px-10"
      >
        {/* Organisation details */}
        <motion.div variants={footerItemAnimation} className="lg:col-span-4 lg:pr-6">
          <Link to="/" className="group inline-flex items-center gap-4">
            <motion.div
              whileHover={{
                rotate: 4,
                scale: 1.06,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 18,
              }}
              className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-border bg-card shadow-sm"
            >
              <div className="absolute inset-1 rounded-xl bg-primary/[0.06]" />

              <img
                src={LOGO}
                alt={`${SITE.name} logo`}
                className="relative h-full w-full scale-[1.25] object-contain"
              />
            </motion.div>

            <div>
              <h3 className="font-display text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                {SITE.name}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">{SITE.location}</p>
            </div>
          </Link>

          <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
            A spiritual family walking the path of selfless service inspired by Bhagawan Sri Sathya
            Sai Baba, serving society through education, healthcare, welfare, and spiritual
            activities.
          </p>

          {/* Quote card */}
          {QUOTES[0] && (
            <motion.div
              whileHover={{
                y: -4,
              }}
              transition={{
                duration: 0.25,
              }}
              className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-card/75 p-5 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            >
              <div className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>

              <p className="pr-10 font-display text-base italic leading-7 text-foreground">
                “{QUOTES[0].text}”
              </p>

              <p className="mt-3 text-xs font-semibold text-primary">— {QUOTES[0].by}</p>
            </motion.div>
          )}

          {/* Social links */}
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{
                  y: -4,
                  scale: 1.07,
                }}
                whileTap={{
                  scale: 0.94,
                }}
                className="group grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-primary hover:shadow-md"
              >
                <Icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Explore links */}
        <motion.div variants={footerItemAnimation} className="lg:col-span-2">
          <FooterHeading Icon={Navigation} title="Explore" />

          <ul className="space-y-1.5">
            {exploreLinks.map((item) => {
              const Icon = getNavigationIcon(item.label);

              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:bg-primary/[0.07] hover:text-foreground"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-muted/60 text-muted-foreground transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                      <Icon className="h-4 w-4" />
                    </span>

                    <span className="flex-1">{item.label}</span>

                    <ChevronRight className="h-3.5 w-3.5 -translate-x-2 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              );
            })}

            <li>
              <Link
                to="/devotee-registration"
                className="group flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:translate-x-1 hover:bg-primary/[0.08]"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Heart className="h-4 w-4 fill-current" />
                </span>

                <span className="flex-1">Register</span>

                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Seva links */}
        <motion.div variants={footerItemAnimation} className="lg:col-span-2">
          <FooterHeading Icon={HeartHandshake} title="Our Seva" />

          <ul className="space-y-1.5">
            {SEVA_NAV.map((item) => {
              const Icon = getSevaIcon(item.label);

              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:bg-primary/[0.07] hover:text-foreground"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-muted/60 text-muted-foreground transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                      <Icon className="h-4 w-4" />
                    </span>

                    <span className="flex-1">{item.label}</span>

                    <ChevronRight className="h-3.5 w-3.5 -translate-x-2 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* Contact section */}
        <motion.div variants={footerItemAnimation} className="lg:col-span-4">
          <FooterHeading Icon={Phone} title="Contact Us" />

          <div className="space-y-3">
            <ContactCard
              href={mapLink}
              label="Our Location"
              value={SITE.address}
              Icon={MapPin}
              external
            />

            <ContactCard
              href={`tel:${phoneLink}`}
              label="Call Us"
              value={SITE.phone}
              Icon={Phone}
            />

            <ContactCard
              href={`mailto:${SITE.email}`}
              label="Email Us"
              value={SITE.email}
              Icon={Mail}
            />
          </div>

          {/* Registration action */}
          <motion.div
            whileHover={{
              y: -3,
            }}
            transition={{
              duration: 0.25,
            }}
            className="mt-5 overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.06] p-5"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <HandHeart className="h-5 w-5" />
              </div>

              <div>
                <h4 className="font-semibold text-foreground">Join our spiritual family</h4>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Register as a devotee, active sevadal, or Balvikas Guru and stay connected.
                </p>
              </div>
            </div>

            <Link
              to="/devotee-registration"
              className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Heart className="h-4 w-4 fill-current" />
              Register as Devotee
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom copyright bar */}
      <div className="relative border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-5 text-center sm:px-8 md:flex-row md:text-left lg:px-10">
          <div>
            <p className="text-xs text-muted-foreground">
              © {currentYear} {SITE.name}. All rights reserved.
            </p>

            <p className="mt-1 text-[11px] text-muted-foreground/70">
              Love All, Serve All • Help Ever, Hurt Never
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://visionariesai.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Powered by VisionariesAI Labs — visit website (opens in a new tab)"
              className="group relative inline-flex max-w-full items-center gap-3 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-primary/5 px-4 py-3 text-left shadow-sm transition duration-300 hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-safe:hover:-translate-y-0.5"
            >
              <span aria-hidden="true" className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-orange-400 text-primary-foreground shadow-sm">
                <span className="text-xl font-bold tracking-tighter">V</span>
                <Sparkles className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-card p-0.5 text-primary" />
              </span>
              <span className="min-w-0">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Powered by</span>
                <span className="mt-0.5 block text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  Visionaries<span className="text-primary">AI</span> <span className="font-normal text-muted-foreground">Labs</span>
                </span>
              </span>
              <span aria-hidden="true" className="ml-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-primary/15 bg-background/70 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>

            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/[0.07] hover:text-primary hover:shadow-md"
              aria-label="Scroll to top"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterHeadingProps = {
  Icon: LucideIcon;
  title: string;
};

function FooterHeading({ Icon, title }: FooterHeadingProps) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
        <Icon className="h-4 w-4" />
      </span>

      <div>
        <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
          {title}
        </h4>

        <div className="mt-2 h-0.5 w-8 rounded-full bg-primary" />
      </div>
    </div>
  );
}

type ContactCardProps = {
  href: string;
  label: string;
  value: string;
  Icon: LucideIcon;
  external?: boolean;
};

function ContactCard({ href, label, value, Icon, external = false }: ContactCardProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group flex items-start gap-3 rounded-2xl border border-border bg-card/70 p-4 shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-md"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-[18px] w-[18px]" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
          {label}
        </span>

        <span className="mt-1 block break-words text-sm leading-6 text-muted-foreground transition-colors group-hover:text-foreground">
          {value}
        </span>
      </span>

      <ArrowRight className="mt-3 h-4 w-4 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
    </motion.a>
  );
}
