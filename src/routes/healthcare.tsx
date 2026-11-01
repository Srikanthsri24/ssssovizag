import { createFileRoute } from "@tanstack/react-router";
import { HealthcarePage } from "@/pages";
import healthcareImage from "@/assets/service-healthcare.jpg";

export const Route = createFileRoute("/healthcare")({
  head: () => ({
    meta: [
      {
        title:
          "Healthcare Services — Sri Sathya Sai Seva Samithi, Premsadan",
      },
      {
        name: "description",
        content:
          "Free medical camps, preventive healthcare, blood donation drives and health awareness programmes serving Visakhapatnam.",
      },
      {
        property: "og:title",
        content: "Healthcare Services — Premsadan Samithi",
      },
      {
        property: "og:description",
        content:
          "Compassionate healthcare outreach through medical camps, preventive care and community support.",
      },
      {
        property: "og:image",
        content: healthcareImage,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:image",
        content: healthcareImage,
      },
    ],
  }),

  component: HealthcarePage,
});