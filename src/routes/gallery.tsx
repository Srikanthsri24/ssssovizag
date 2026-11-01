import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/pages";
import { heroImage } from "@/lib/site-images";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      {
        title:
          "Gallery — Sri Sathya Sai Seva Samithi, Premsadan",
      },
      {
        name: "description",
        content:
          "Explore photographs of Premsadan Mandir, sacred celebrations, Bal Vikas, medical camps and community seva activities in MVP Colony, Visakhapatnam.",
      },
      {
        property: "og:title",
        content: "Gallery — Premsadan Samithi",
      },
      {
        property: "og:description",
        content:
          "Moments of devotion, love and selfless service at Premsadan.",
      },
      {
        property: "og:image",
        content: heroImage,
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
        content: "Gallery — Premsadan Samithi",
      },
      {
        name: "twitter:description",
        content:
          "Explore moments from Premsadan Mandir and its seva activities.",
      },
      {
        name: "twitter:image",
        content: heroImage,
      },
    ],
  }),
  component: GalleryPage,
});