import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Music2, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { MANDALIS } from "@/lib/bhajan-mandalis";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function MandaliNavigation({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname.replace(import.meta.env.BASE_URL.replace(/\/$/, ""), "") || "/" });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  const active = pathname.startsWith("/bhajan-mandalis");
  const links = MANDALIS.map((m, i) => {
    const selected = pathname === `/bhajan-mandalis/${m.slug}`;
    const link = (
      <Link
        to="/bhajan-mandalis/$slug"
        params={{ slug: m.slug }}
        onClick={() => {
          setOpen(false);
          onNavigate?.();
        }}
        aria-current={selected ? "page" : undefined}
        className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary ${selected ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-primary/10 focus:bg-primary/10"}`}
      >
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs ${selected ? "bg-white/15" : "bg-primary/10 text-primary"}`}
        >
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 leading-5">{m.name}</span>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
      </Link>
    );
    return mobile ? (
      <div key={m.slug}>{link}</div>
    ) : (
      <DropdownMenuItem key={m.slug} asChild className="p-0 focus:bg-transparent">
        {link}
      </DropdownMenuItem>
    );
  });
  if (mobile)
    return (
      <div className="overflow-hidden rounded-2xl border border-border/70">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-mandali-navigation"
          className={`flex w-full items-center justify-between px-4 py-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary ${active ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
        >
          <span className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary">
              <Music2 className="h-4 w-4" />
            </span>
            Bhajan Mandalis
          </span>
          <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div
            id="mobile-mandali-navigation"
            className="space-y-1 border-t border-border bg-muted/30 p-2"
          >
            {links}
            <Link
              to="/bhajan-mandalis"
              onClick={onNavigate}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-primary"
            >
              Explore all communities →
            </Link>
          </div>
        )}
      </div>
    );
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary ${active || open ? "bg-primary text-primary-foreground" : "text-foreground/75 hover:bg-muted"}`}
        >
          Bhajan Mandalis
          <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={12}
        className="w-[min(420px,calc(100vw-24px))] rounded-3xl border-border/70 bg-card/95 p-2.5 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-2 rounded-2xl bg-primary/8 px-4 py-3">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Music2 className="h-4 w-4 text-primary" />
            Our spiritual family
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Devotion and service, across our community.
          </p>
        </div>
        <div className="space-y-0.5">{links}</div>
        <DropdownMenuItem asChild>
          <Link
            to="/bhajan-mandalis"
            className="mt-2 justify-center rounded-xl border-t border-border py-3 text-sm font-semibold text-primary"
          >
            Explore all communities <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
