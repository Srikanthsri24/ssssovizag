import { createFileRoute } from "@tanstack/react-router";

import { EventsPage } from "@/pages";
import { mandir2 as mandir } from "@/lib/site-images";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      {
        title:
          "Events & Festivals — Sri Sathya Sai Seva Samithi, Premsadan",
      },
      {
        name: "description",
        content:
          "Explore bhajans, festivals, Bal Vikas classes, medical camps and seva activities at Premsadan Mandir, MVP Colony, Visakhapatnam.",
      },
      {
        property: "og:title",
        content: "Events & Festivals — Premsadan Samithi",
      },
      {
        property: "og:description",
        content:
          "Join bhajans, sacred festivals and community seva activities throughout the year at Premsadan.",
      },
      {
        property: "og:image",
        content: mandir,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:image",
        content: mandir,
      },
    ],
  }),

  component: EventsPage,
});