import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Copy,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Reveal } from "@/components/shared/Reveal";
import { SITE } from "@/lib/site";

import { SectionHeading } from "./SectionHeading";

export function ContactSection() {
  const phoneValue = String(SITE.phone ?? "");
  const phoneHref = phoneValue.replace(/[^\d+]/g, "");
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    SITE.address,
  )}`;

  const copyValue = async (
    value: string,
    label: string,
  ) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied successfully.`);
    } catch {
      toast.error(`Unable to copy ${label.toLowerCase()}.`);
    }
  };

  const cards = [
    {
      title: "Visit Premsadan",
      eyebrow: "Mandir location",
      value: SITE.address,
      href: mapHref,
      Icon: MapPin,
      action: "Open in Maps",
      copyLabel: "Address",
      external: true,
      accent:
        "from-orange-500/15 via-primary/[0.05] to-transparent",
    },
    {
      title: "Call Our Samithi",
      eyebrow: "Speak with us",
      value:
        phoneValue ||
        `${SITE.convenor} · ${SITE.role}`,
      href: phoneHref
        ? `tel:${phoneHref}`
        : "/contact",
      Icon: Phone,
      action: phoneHref ? "Call Now" : "Contact Us",
      copyLabel: "Phone number",
      external: false,
      accent:
        "from-sky-500/15 via-primary/[0.05] to-transparent",
    },
    {
      title: "Write to Us",
      eyebrow: "Email assistance",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      Icon: Mail,
      action: "Send Email",
      copyLabel: "Email address",
      external: false,
      accent:
        "from-emerald-500/15 via-primary/[0.05] to-transparent",
    },
  ];

  return (
    <section className="relative overflow-hidden pb-8 pt-12 sm:pb-10 sm:pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Connect With Premsadan"
            title="We are always close to our seva family"
            description="Visit the mandir, speak with our Samithi, or write to us. We would be happy to guide you."
            Icon={Navigation}
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal
              key={card.title}
              delay={index * 0.08}
            >
              <motion.article
                whileHover={{ y: -8 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                }}
                className="group relative h-full overflow-hidden rounded-[1.75rem] border border-border bg-card/75 p-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.5)] backdrop-blur-md transition hover:border-primary/30 hover:shadow-[0_28px_70px_-38px_rgba(249,115,22,0.42)] sm:p-6"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-80 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <motion.div
                      whileHover={{
                        rotate: -6,
                        scale: 1.08,
                      }}
                      className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/15 transition group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <card.Icon className="h-5 w-5" />
                    </motion.div>

                    <button
                      type="button"
                      onClick={() =>
                        copyValue(
                          String(card.value),
                          card.copyLabel,
                        )
                      }
                      className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-background/60 text-muted-foreground shadow-sm transition hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                      aria-label={`Copy ${card.copyLabel.toLowerCase()}`}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {card.eyebrow}
                  </p>

                  <h3 className="mt-1.5 font-display text-xl font-semibold text-foreground">
                    {card.title}
                  </h3>

                  <p className="mt-3 flex-1 break-words text-sm leading-6 text-muted-foreground">
                    {card.value}
                  </p>

                  <motion.a
                    href={card.href}
                    target={
                      card.external
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      card.external
                        ? "noreferrer"
                        : undefined
                    }
                    whileTap={{ scale: 0.98 }}
                    className="group/action mt-6 inline-flex min-h-11 w-full items-center justify-between rounded-2xl border border-border bg-background/65 px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/30 hover:bg-primary hover:text-primary-foreground"
                  >
                    <span>{card.action}</span>
                    <ArrowUpRight className="h-4 w-4 transition group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5" />
                  </motion.a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-5 flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-border bg-card/70 px-5 py-4 text-center shadow-sm backdrop-blur sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Planning to volunteer or support a seva?
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Share your interest and our team will guide
                  you with the next steps.
                </p>
              </div>
            </div>

            <Link
              to="/contact"
              className="group inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Send an Enquiry
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
