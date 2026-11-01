import { createFileRoute } from "@tanstack/react-router";
import { EducationPage } from "@/pages";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      {
        title:
          "Education Services — Sri Sathya Sai Seva Samithi, Premsadan",
      },
      {
        name: "description",
        content:
          "Bal Vikas classes, tuition support, scholarships and value-based education programmes at Premsadan.",
      },
      {
        property: "og:title",
        content:
          "Education Services — Premsadan Samithi",
      },
      {
        property: "og:description",
        content:
          "Value-based education for children and youth in Visakhapatnam.",
      },
    ],
  }),
  component: EducationPage,
});