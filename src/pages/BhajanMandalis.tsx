import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  HandHeart,
  MapPin,
  Music2,
  Sparkles,
  Users,
  CalendarDays,
  Heart,
} from "lucide-react";
import { MANDALIS } from "@/lib/bhajan-mandalis";
import { mandir1, mandir2, mandir3, shrine1 } from "@/lib/site-images";
import volunteers from "@/assets/seva-volunteers.jpg";
import education from "@/assets/seva-balvikas.jpg";
import food from "@/assets/seva-food.jpg";
import { Reveal } from "@/components/shared/Reveal";

type Mandali = (typeof MANDALIS)[number];
const images = [shrine1, mandir1, mandir2, mandir3];
const button =
  "inline-flex items-center justify-center gap-2 rounded-full gradient-saffron px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

export function BhajanMandalisIndexPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary/5 px-5 py-16 text-center sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Our spiritual family
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold sm:text-7xl">
          Bhajan <span className="text-gradient">Mandalis</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl leading-8 text-muted-foreground">
          Many neighbourhoods. One loving community. Explore our Bhajan Mandalis and the City
          Samithi family in Visakhapatnam.
        </p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {MANDALIS.map((m, i) => (
          <Link
            key={m.slug}
            to="/bhajan-mandalis/$slug"
            params={{ slug: m.slug }}
            className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={
                  m.kind === "members"
                    ? volunteers
                    : m.kind === "office"
                      ? mandir3
                      : images[m.image]
                }
                alt="Premsadan community and mandir"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-primary">
                {String(i + 1).padStart(2, "0")} ·{" "}
                {m.kind === "mandali" ? "Bhajan Mandali" : "City Samithi"}
              </span>
            </div>
            <div className="p-6">
              <h2 className="font-display text-2xl font-semibold">{m.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{m.theme}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Explore our community <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
        <p className="text-xs text-muted-foreground sm:col-span-2 lg:col-span-3">
          Images show Premsadan and shared seva moments from the site collection.
        </p>
      </section>
    </div>
  );
}

export function BhajanMandaliPage({ mandali: m }: { mandali: Mandali }) {
  const index = MANDALIS.findIndex((item) => item.slug === m.slug);
  const next = MANDALIS[(index + 1) % MANDALIS.length];
  const member = m.kind === "members",
    office = m.kind === "office";
  const hero = member ? volunteers : office ? mandir3 : images[m.image];
  const cards = member
    ? [
        {
          title: "Devotees",
          text: "Connect through prayer, spiritual reflection and a shared commitment to living with love.",
          icon: Heart,
          image: shrine1,
        },
        {
          title: "Active Sevadal",
          text: "Offer your time and skills in the spirit of selfless service. Explore ways to volunteer with the Samithi.",
          icon: HandHeart,
          image: volunteers,
        },
        {
          title: "Balvikas Gurus",
          text: "Help nurture truth, right conduct, peace, love and non-violence in the next generation.",
          icon: BookOpen,
          image: education,
        },
      ]
    : office
      ? [
          {
            title: "Spiritual coordination",
            text: "Supporting a shared space for devotion, bhajans and spiritual learning.",
            icon: Music2,
            image: shrine1,
          },
          {
            title: "Education & values",
            text: "Encouraging value-based learning and supporting the Balvikas community.",
            icon: BookOpen,
            image: education,
          },
          {
            title: "Service coordination",
            text: "Bringing people together around compassionate, purposeful community service.",
            icon: HandHeart,
            image: food,
          },
        ]
      : [
          {
            title: "Bhajans & devotion",
            text: "Discover the joy of singing together and making time for prayer and reflection.",
            icon: Music2,
            image: shrine1,
          },
          {
            title: "Learning human values",
            text: "Explore Bal Vikas and the values that guide a life of love, peace and compassion.",
            icon: BookOpen,
            image: education,
          },
          {
            title: "Seva with love",
            text: "Find ways to carry devotion into action through the Samithi’s community service programmes.",
            icon: HandHeart,
            image: food,
          },
        ];
  return (
    <div key={m.slug}>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-6 sm:px-8 sm:pb-20">
          <Link
            to="/bhajan-mandalis"
            className="inline-flex items-center gap-2 rounded-lg py-2 text-xs font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Bhajan Mandalis
          </Link>
          <div className="mt-7 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-3 py-1.5 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {office
                  ? "City Samithi · Leadership"
                  : member
                    ? "City Samithi · Our people"
                    : "Bhajan Mandali · Visakhapatnam"}
              </span>
              <h1
                className={`mt-5 font-display font-semibold leading-[1.05] ${member ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl"}`}
              >
                {member ? "City Samithi" : m.name}
              </h1>
              {member && (
                <p className="mt-3 text-lg font-medium text-primary">
                  Devotee / Active Sevadal / Balvikas Guru
                </p>
              )}
              <p className="mt-5 font-display text-2xl text-primary sm:text-3xl">{m.theme}</p>
              <p className="mt-5 max-w-xl leading-8 text-muted-foreground">{m.intro}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to={office ? "/contact" : "/volunteer"} className={button}>
                  {office
                    ? "Connect with the Samithi"
                    : member
                      ? "Become a volunteer"
                      : "Be part of our seva"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#community"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted"
                >
                  Explore <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="relative pb-6 pl-4">
              <div className="absolute -inset-3 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative rounded-[2.5rem] border border-border bg-card p-3 shadow-xl shadow-primary/10">
                <img
                  src={hero}
                  alt={
                    member
                      ? "Volunteers serving together"
                      : "Premsadan Mandir, our shared spiritual community"
                  }
                  className="h-[320px] w-full rounded-[2rem] object-cover sm:h-[420px]"
                />
                <div className="absolute bottom-8 left-7 right-7 rounded-2xl border border-white/20 bg-black/60 p-4 text-white backdrop-blur-md">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
                    <MapPin className="h-4 w-4 text-orange-300" />
                    {member || office ? "City Samithi" : m.name}
                  </p>
                  <p className="mt-1 font-display text-xl">Love All, Serve All</p>
                </div>
              </div>
              <span className="absolute -bottom-1 left-0 inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-3 text-sm font-medium shadow-lg">
                <Users className="h-5 w-5 text-primary" />
                One family, united in devotion
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="community" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-16 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {office
              ? "Serving with responsibility"
              : member
                ? "Find your place in our family"
                : "Devotion · Values · Service"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            {office
              ? "Together, we support the mission"
              : member
                ? "Different paths, a shared purpose"
                : `The spirit of ${m.name}`}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map(({ title, text, icon: Icon, image }) => (
            <Reveal key={title}>
              <article className="h-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <img src={image} alt={title} className="h-48 w-full object-cover" loading="lazy" />
                <div className="p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Photographs from the shared Premsadan and seva collection.
        </p>
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 sm:p-10">
            <CalendarDays className="h-7 w-7 text-primary" />
            <h2 className="mt-4 font-display text-3xl font-semibold">
              {office
                ? "Office bearers & responsibilities"
                : member
                  ? "Connect with your community"
                  : "Plan your visit"}
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              {office
                ? "Please contact the Samithi for the current office bearer directory, designated responsibilities and official coordination details."
                : member
                  ? "Whether you wish to participate in spiritual activities, offer service or learn about Balvikas teaching, the Samithi can help you take the next step."
                  : `For ${m.name} bhajan timings, the exact gathering venue and local coordinator details, please connect with the Samithi before visiting.`}
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              {office ? "Request the current directory" : "Ask for details"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <blockquote className="flex flex-col justify-center rounded-3xl border border-border bg-card p-8 text-center sm:p-10">
            <Music2 className="mx-auto h-8 w-8 text-primary/60" />
            <p className="mt-5 font-display text-3xl leading-snug">
              “{index % 2 === 0 ? "Love All, Serve All" : "Help Ever, Hurt Never"}”
            </p>
            <footer className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
              Bhagawan Sri Sathya Sai Baba
            </footer>
          </blockquote>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-border pt-8 sm:flex-row sm:items-center">
          <Link
            to="/bhajan-mandalis"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All Bhajan Mandalis
          </Link>
          <Link
            to="/bhajan-mandalis/$slug"
            params={{ slug: next.slug }}
            className="group flex max-w-lg items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-primary/40"
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                Explore next
              </p>
              <p className="mt-1 text-sm font-semibold">{next.name}</p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
          </Link>
        </div>
      </section>
    </div>
  );
}
