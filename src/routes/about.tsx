import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/pages";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title:
          "About Us — Sri Sathya Sai Seva Samithi, Premsadan",
      },
      {
        name: "description",
        content:
          "Learn about Sri Sathya Sai Seva Samithi at Premsadan Mandir, MVP Colony, Visakhapatnam and its spiritual, educational and service activities.",
      },
      {
        property: "og:title",
        content:
          "About Sri Sathya Sai Seva Samithi, Premsadan",
      },
      {
        property: "og:description",
        content:
          "A spiritual family in Visakhapatnam serving society through love, wisdom and selfless action.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: AboutPage,
});