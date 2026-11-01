import { createFileRoute } from "@tanstack/react-router";
import { BhajanMandalisIndexPage } from "@/pages/BhajanMandalis";
export const Route = createFileRoute("/bhajan-mandalis/")({
  head: () => ({ meta: [{ title: "Bhajan Mandalis — Premsadan Samithi" }] }),
  component: BhajanMandalisIndexPage,
});
