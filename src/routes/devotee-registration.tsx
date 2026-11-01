import { createFileRoute } from "@tanstack/react-router";
import { DevoteeRegistrationPage } from "@/pages/DevoteeRegistration";
export const Route = createFileRoute("/devotee-registration")({
  head: () => ({
    meta: [
      { title: "Devotee Registrations — Premsadan Samithi" },
      {
        name: "description",
        content:
          "Join the Premsadan spiritual family as a devotee, active sevadal or Balvikas Guru.",
      },
    ],
  }),
  component: DevoteeRegistrationPage,
});
