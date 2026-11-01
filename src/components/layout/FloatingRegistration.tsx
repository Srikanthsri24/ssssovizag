import { Link, useRouterState } from "@tanstack/react-router";
import { UserRoundPlus, ArrowUpRight } from "lucide-react";
export function FloatingRegistration() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname === "/devotee-registration") return null;
  return (
    <Link
      to="/devotee-registration"
      aria-label="Devotee Registrations"
      className="fixed bottom-5 right-4 z-40 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border-4 border-background gradient-saffron px-5 py-3 text-white shadow-xl shadow-primary/25 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:bottom-6 sm:right-6"
    >
      <UserRoundPlus className="h-6 w-6 shrink-0" />
      <span>
        <span className="block text-sm font-semibold">Devotee Registrations</span>
        <span className="block text-[10px] text-white/85">Join our spiritual family</span>
      </span>
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}
