import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/pages";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title:
          "Contact — Sri Sathya Sai Seva Samithi, Premsadan",
      },
      {
        name: "description",
        content:
          "Contact Sri Sathya Sai Seva Samithi at Premsadan Mandir, MVP Colony, Visakhapatnam for seva, Bal Vikas, donations and spiritual programmes.",
      },
      {
        property: "og:title",
        content:
          "Contact Sri Sathya Sai Seva Samithi, Premsadan",
      },
      {
        property: "og:description",
        content:
          "Visit Premsadan Mandir or contact the Samithi for seva activities, spiritual programmes and guidance.",
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
  component: ContactPage,
});