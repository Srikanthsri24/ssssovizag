import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sri Sathya Sai Seva Samithi, Premsadan — MVP Colony, Visakhapatnam" },
      { name: "description", content: "A spiritual service community inspired by Bhagawan Sri Sathya Sai Baba, serving Visakhapatnam through education, healthcare and welfare seva." },
      { property: "og:title", content: "Sri Sathya Sai Seva Samithi, Premsadan — MVP Colony, Visakhapatnam" },
      { property: "og:description", content: "A spiritual service community inspired by Bhagawan Sri Sathya Sai Baba, serving Visakhapatnam through education, healthcare and welfare seva." },
    ],
  }),
  component: HomePage,
});
