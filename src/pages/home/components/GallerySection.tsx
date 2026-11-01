import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Images,
} from "lucide-react";

import { Reveal } from "@/components/shared/Reveal";

import { GALLERY_IMAGES } from "../home-data";
import { SectionHeading } from "./SectionHeading";

export function GallerySection() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="Gallery"
          title="Moments from Premsadan"
          description="A glimpse of worship, service, learning, and fellowship from our Samithi."
          Icon={Images}
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {GALLERY_IMAGES.map((source, index) => (
          <motion.div
            key={`${source}-${index}`}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className="group relative overflow-hidden rounded-2xl"
          >
            <img
              src={source}
              alt="Premsadan gallery"
              className="h-40 w-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>

      <div className="mt-7 text-center">
        <Link
          to="/gallery"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/[0.06]"
        >
          View Full Gallery
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
