import { createFileRoute, notFound } from "@tanstack/react-router";
import { MANDALIS } from "@/lib/bhajan-mandalis";
import { BhajanMandaliPage } from "@/pages/BhajanMandalis";
export const Route = createFileRoute("/bhajan-mandalis/$slug")({
  loader: ({ params }) => {
    const mandali = MANDALIS.find((item) => item.slug === params.slug);
    if (!mandali) throw notFound();
    return mandali;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Bhajan Mandalis"} — Premsadan Samithi` },
      { name: "description", content: loaderData?.intro },
    ],
  }),
  component: Screen,
});
function Screen() {
  return <BhajanMandaliPage mandali={Route.useLoaderData()} />;
}
