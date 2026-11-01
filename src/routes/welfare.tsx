import { createFileRoute } from "@tanstack/react-router";

import food from "@/assets/seva-food.jpg";
import { WelfarePage } from "@/pages";

export const Route = createFileRoute("/welfare")({
  head: () => ({
    meta: [
      {
        title:
          "Welfare Activities — Sri Sathya Sai Seva Samithi, Premsadan",
      },
      {
        name: "description",
        content:
          "Narayana Seva, Grama Seva, food distribution and disaster relief work at Premsadan Samithi, MVP Colony.",
      },
      {
        property: "og:title",
        content:
          "Welfare Activities — Premsadan Samithi",
      },
      {
        property: "og:description",
        content:
          "Serving man as God through food, shelter and care.",
      },
      {
        property: "og:image",
        content: food,
      },
      {
        name: "twitter:image",
        content: food,
      },
    ],
  }),
  component: WelfarePage,
});