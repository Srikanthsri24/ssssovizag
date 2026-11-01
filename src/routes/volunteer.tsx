import { createFileRoute } from "@tanstack/react-router";
import { VolunteerPage } from "@/pages";
import volunteers from "@/assets/seva-volunteers.jpg";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      {
        title:
          "Volunteer With Us — Sri Sathya Sai Seva Samithi, Premsadan",
      },
      {
        name: "description",
        content:
          "Join the seva family at Premsadan Mandir, MVP Colony. Register to volunteer in education, healthcare, welfare and spiritual activities.",
      },
      {
        property: "og:title",
        content: "Volunteer With Premsadan Samithi",
      },
      {
        property: "og:description",
        content:
          "Offer your time, skills and compassion through selfless service.",
      },
      {
        property: "og:image",
        content: volunteers,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Volunteer With Premsadan Samithi",
      },
      {
        name: "twitter:description",
        content:
          "Register your interest and become part of meaningful seva activities.",
      },
      {
        name: "twitter:image",
        content: volunteers,
      },
    ],
  }),
  component: VolunteerPage,
});