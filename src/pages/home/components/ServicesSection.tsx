import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  HandHeart,
  Stethoscope,
} from "lucide-react";

import { Reveal } from "@/components/shared/Reveal";

import { SERVICES } from "../home-data";
import { SectionHeading } from "./SectionHeading";

const ICONS = {
  education: GraduationCap,
  healthcare: Stethoscope,
  welfare: HandHeart,
};

export function ServicesSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Our Service Areas"
          title="Three wings, one heart"
          description="Education, healthcare, and welfare come together as one continuous expression of selfless service."
          Icon={HandHeart}
        />
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {SERVICES.map((service, index) => {
          const Icon = ICONS[service.kind];

          return (
            <Reveal
              key={service.title}
              delay={index * 0.08}
            >
              <Link
                to={service.to}
                className="group block h-full overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm transition hover:-translate-y-2 hover:border-primary/25 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
                    <div>
                      <div className="mb-2 grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-black/30 backdrop-blur-md">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-xl font-semibold">
                        {service.title}
                      </h3>
                    </div>

                    <div className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition group-hover:bg-white group-hover:text-primary">
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
