import { motion } from "framer-motion";
import {
  Heart,
  Quote,
  Sparkles,
} from "lucide-react";

import { Reveal } from "@/components/shared/Reveal";
import { QUOTES } from "@/lib/site";

import { SectionHeading } from "./SectionHeading";

export function QuotesSection() {
  const [featured, ...remaining] = QUOTES.slice(0, 3);

  if (!featured) return null;

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Divine Words"
          title="Words that guide every act of seva"
          description="Simple truths that inspire love, unity, compassion, and service."
          Icon={Quote}
        />
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <motion.div
            whileHover={{ y: -5 }}
            className="group relative isolate min-h-[320px] overflow-hidden rounded-[2.2rem] border border-primary/20 bg-card p-7 shadow-[0_28px_80px_-46px_rgba(249,115,22,0.48)] sm:p-10"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.14),transparent_40%)]" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 text-primary/[0.07]">
              <Quote className="h-56 w-56 fill-current" />
            </div>

            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Featured Thought
                </div>

                <p className="mt-8 max-w-3xl font-display text-3xl font-semibold italic leading-tight text-foreground sm:text-4xl lg:text-5xl">
                  “{featured.text}”
                </p>
              </div>

              <div className="mt-10 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Heart className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                    Divine guidance
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    — {featured.by}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>

        <div className="grid gap-5">
          {remaining.map((quote, index) => (
            <Reveal
              key={quote.text}
              delay={(index + 1) * 0.08}
            >
              <motion.div
                whileHover={{ x: 5 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-card/75 p-6 shadow-sm transition hover:border-primary/25 hover:bg-primary/[0.04] hover:shadow-lg"
              >
                <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Quote className="h-4 w-4" />
                </div>

                <p className="pr-12 font-display text-2xl italic leading-snug text-foreground">
                  “{quote.text}”
                </p>

                <div className="mt-5 text-xs font-semibold text-primary">
                  — {quote.by}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
