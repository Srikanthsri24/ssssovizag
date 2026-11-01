import { createFileRoute } from "@tanstack/react-router";

import { DonatePage } from "@/pages";

type DonationPurpose =
  | "education"
  | "healthcare"
  | "welfare"
  | "general";

type DonateSearch = {
  purpose?: DonationPurpose;
};

const VALID_PURPOSES: DonationPurpose[] = [
  "education",
  "healthcare",
  "welfare",
  "general",
];

function DonateRouteComponent() {
  const { purpose } = Route.useSearch();

  return <DonatePage initialPurpose={purpose} />;
}

export const Route = createFileRoute("/donate")({
  validateSearch: (
    search: Record<string, unknown>,
  ): DonateSearch => {
    const purpose =
      typeof search.purpose === "string" &&
      VALID_PURPOSES.includes(
        search.purpose as DonationPurpose,
      )
        ? (search.purpose as DonationPurpose)
        : undefined;

    return { purpose };
  },

  head: () => ({
    meta: [
      {
        title:
          "Donate — Sri Sathya Sai Seva Samithi, Premsadan",
      },
      {
        name: "description",
        content:
          "Support education, healthcare and welfare seva at Premsadan Mandir, MVP Colony, Visakhapatnam.",
      },
      {
        property: "og:title",
        content: "Donate — Premsadan Samithi",
      },
      {
        property: "og:description",
        content: "Every offering becomes meaningful seva.",
      },
    ],
  }),

  component: DonateRouteComponent,
});