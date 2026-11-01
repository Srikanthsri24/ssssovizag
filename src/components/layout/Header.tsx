import { MandaliNavigation } from "./MandaliNavigation";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Calendar,
  ChevronDown,
  GraduationCap,
  HandHeart,
  Heart,
  Menu,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type FocusEvent } from "react";

import { NAV, NAV_TAIL, SEVA_NAV, SITE } from "@/lib/site";
import { LOGO } from "@/lib/site-images";
import { ThemeToggle } from "./ThemeToggle";

type SevaIcon = typeof GraduationCap;

const SEVA_ICONS: Record<string, SevaIcon> = {
  "/education": GraduationCap,
  "/healthcare": Stethoscope,
  "/welfare": HandHeart,
  "/events": Calendar,
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Header() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname.replace(import.meta.env.BASE_URL.replace(/\/$/, ""), "") || "/",
  });

  const shouldReduceMotion = useReducedMotion();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sevaOpen, setSevaOpen] = useState(false);
  const [mobileSevaOpen, setMobileSevaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sevaContainerRef = useRef<HTMLDivElement>(null);
  const sevaCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isRouteActive = (route: string) => {
    if (route === "/") {
      return pathname === "/";
    }

    return pathname === route || pathname.startsWith(`${route}/`);
  };

  const sevaActive = SEVA_NAV.some((item) => isRouteActive(item.to));

  const clearSevaTimer = () => {
    if (sevaCloseTimerRef.current) {
      clearTimeout(sevaCloseTimerRef.current);
      sevaCloseTimerRef.current = null;
    }
  };

  const openSevaMenu = () => {
    clearSevaTimer();
    setSevaOpen(true);
  };

  const closeSevaMenuWithDelay = () => {
    clearSevaTimer();

    sevaCloseTimerRef.current = setTimeout(() => {
      setSevaOpen(false);
    }, 140);
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setMobileSevaOpen(false);
    setSevaOpen(false);
  };

  const handleSevaBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocusedElement = event.relatedTarget as Node | null;

    if (nextFocusedElement && event.currentTarget.contains(nextFocusedElement)) {
      return;
    }

    setSevaOpen(false);
  };

  // Close menus after route navigation.
  useEffect(() => {
    closeAllMenus();
  }, [pathname]);

  // Add a stronger header background when scrolling.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus using Escape or clicking outside the Seva dropdown.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAllMenus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (sevaContainerRef.current && !sevaContainerRef.current.contains(event.target as Node)) {
        setSevaOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  // Prevent page scrolling when mobile navigation is open.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    return () => {
      clearSevaTimer();
    };
  }, []);

  return (
    <motion.header
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: -20,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-border/70 bg-background/90 shadow-lg shadow-foreground/5 backdrop-blur-xl"
          : "border-transparent bg-background/75 backdrop-blur-lg"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1480px] items-center justify-between gap-3 px-3 transition-all duration-300 sm:px-5 lg:px-7 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        {/* Brand */}
        <Link
          to="/"
          aria-label={`${SITE.name} home`}
          className={`group flex min-w-0 items-center gap-3 rounded-2xl ${focusRing}`}
        >
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: 5,
                    scale: 1.04,
                  }
            }
            whileTap={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 0.96,
                  }
            }
            className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border border-primary/20 bg-white shadow-md shadow-primary/10 ring-4 ring-primary/5 sm:h-14 sm:w-14"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

            <img
              src={LOGO}
              alt="Sai Organisation logo"
              className="relative h-full w-full scale-[1.35] object-contain"
            />
          </motion.div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate font-display text-sm font-semibold tracking-tight text-foreground sm:text-base xl:text-lg">
                {SITE.name}
              </span>

              <Sparkles className="hidden h-3.5 w-3.5 shrink-0 text-primary sm:block" />
            </div>

            <div className="mt-0.5 truncate text-[10px] font-medium text-muted-foreground sm:text-xs">
              {SITE.location}
            </div>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center rounded-full border border-border/60 bg-card/60 p-1 shadow-sm backdrop-blur-md min-[1200px]:flex"
        >
          {NAV.map((item) => {
            const active = isRouteActive(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={`relative isolate overflow-hidden rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ${focusRing} ${
                  active ? "text-primary-foreground" : "text-foreground/75 hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="desktop-navigation-active"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                    className="absolute inset-0 -z-10 rounded-full bg-primary shadow-sm"
                  />
                )}

                {!active && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-muted/0 transition-colors duration-200 group-hover:bg-muted" />
                )}

                <span className="relative whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}

          {/* Desktop Seva dropdown */}
          <div
            ref={sevaContainerRef}
            className="relative"
            onMouseEnter={openSevaMenu}
            onMouseLeave={closeSevaMenuWithDelay}
            onFocusCapture={openSevaMenu}
            onBlurCapture={handleSevaBlur}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={sevaOpen}
              aria-controls="desktop-seva-menu"
              onClick={() => {
                clearSevaTimer();
                setSevaOpen((current) => !current);
              }}
              className={`relative isolate inline-flex items-center gap-1.5 overflow-hidden rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ${focusRing} ${
                sevaActive || sevaOpen
                  ? "text-primary-foreground"
                  : "text-foreground/75 hover:bg-muted hover:text-foreground"
              }`}
            >
              {(sevaActive || sevaOpen) && (
                <motion.span
                  layoutId={sevaActive ? "desktop-navigation-active" : undefined}
                  className="absolute inset-0 -z-10 rounded-full bg-primary shadow-sm"
                />
              )}

              <span>Our Seva</span>

              <motion.span
                animate={{
                  rotate: sevaOpen ? 180 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
            </button>

            <AnimatePresence>
              {sevaOpen && (
                <motion.div
                  id="desktop-seva-menu"
                  role="menu"
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 10,
                          scale: 0.97,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/95 p-2.5 shadow-2xl shadow-foreground/10 backdrop-blur-xl">
                    <div className="mb-2 rounded-2xl bg-primary/8 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <HandHeart className="h-4 w-4 text-primary" />
                        Service with love
                      </div>

                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        Explore our education, healthcare, welfare and community initiatives.
                      </p>
                    </div>

                    <div className="space-y-1">
                      {SEVA_NAV.map((item, index) => {
                        const Icon = SEVA_ICONS[item.to] ?? GraduationCap;
                        const active = isRouteActive(item.to);

                        return (
                          <motion.div
                            key={item.to}
                            initial={
                              shouldReduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    x: -8,
                                  }
                            }
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay: shouldReduceMotion ? 0 : index * 0.035,
                            }}
                          >
                            <Link
                              to={item.to}
                              role="menuitem"
                              aria-current={active ? "page" : undefined}
                              onClick={closeAllMenus}
                              className={`group flex items-center gap-3 rounded-2xl border px-3 py-3 transition-all duration-200 ${focusRing} ${
                                active
                                  ? "border-primary/25 bg-primary/10"
                                  : "border-transparent hover:border-border hover:bg-muted/70"
                              }`}
                            >
                              <motion.div
                                whileHover={
                                  shouldReduceMotion
                                    ? undefined
                                    : {
                                        rotate: -5,
                                        scale: 1.06,
                                      }
                                }
                                className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
                                  active
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                    : "bg-primary/10 text-primary"
                                }`}
                              >
                                <Icon className="h-5 w-5" />
                              </motion.div>

                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-foreground">
                                  {item.label}
                                </div>

                                <div className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                                  {item.desc}
                                </div>
                              </div>

                              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <MandaliNavigation />

          {NAV_TAIL.map((item) => {
            const active = isRouteActive(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={`relative isolate overflow-hidden rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ${focusRing} ${
                  active
                    ? "text-primary-foreground"
                    : "text-foreground/75 hover:bg-muted hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="desktop-navigation-active"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                    className="absolute inset-0 -z-10 rounded-full bg-primary shadow-sm"
                  />
                )}

                <span className="relative whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Header actions */}
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />

          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -2,
                    scale: 1.02,
                  }
            }
            whileTap={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 0.97,
                  }
            }
            className="hidden sm:block"
          >
            <Link
              to="/devotee-registration"
              className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full gradient-saffron px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 ${focusRing}`}
            >
              <span className="absolute inset-y-0 -left-10 w-8 rotate-12 bg-white/30 blur-md transition-all duration-700 group-hover:left-[115%]" />

              <motion.span
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.12, 1],
                      }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                }}
              >
                <Heart className="h-4 w-4 fill-current" />
              </motion.span>

              <span>Register</span>
            </Link>
          </motion.div>

          <motion.button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            whileTap={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 0.92,
                  }
            }
            onClick={() => {
              setMobileMenuOpen((current) => !current);
              setMobileSevaOpen(false);
              setSevaOpen(false);
            }}
            className={`relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border transition-colors min-[1200px]:hidden ${focusRing} ${
              mobileMenuOpen
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? "close" : "menu"}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        rotate: -60,
                        scale: 0.7,
                      }
                }
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 60,
                  scale: 0.7,
                }}
                transition={{ duration: 0.16 }}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile background overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAllMenus}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 cursor-default bg-foreground/20 backdrop-blur-[2px] min-[1200px]:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: -12,
                    height: 0,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              y: -10,
              height: 0,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-0 right-0 top-full z-50 overflow-hidden min-[1200px]:hidden"
          >
            <div className="border-t border-border/70 bg-background/95 px-3 pb-4 pt-3 shadow-2xl backdrop-blur-xl sm:px-5">
              <div className="mx-auto max-h-[calc(100dvh-6rem)] max-w-[1480px] overflow-y-auto rounded-3xl border border-border/70 bg-card p-2 shadow-xl">
                <div className="space-y-1">
                  {NAV.map((item, index) => {
                    const active = isRouteActive(item.to);

                    return (
                      <motion.div
                        key={item.to}
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: -10,
                              }
                        }
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: shouldReduceMotion ? 0 : index * 0.025,
                        }}
                      >
                        <Link
                          to={item.to}
                          aria-current={active ? "page" : undefined}
                          onClick={closeAllMenus}
                          className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${focusRing} ${
                            active
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <span>{item.label}</span>

                          {active && (
                            <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Mobile Seva accordion */}
                  <div className="overflow-hidden rounded-2xl border border-border/70">
                    <button
                      type="button"
                      aria-expanded={mobileSevaOpen}
                      aria-controls="mobile-seva-navigation"
                      onClick={() => setMobileSevaOpen((current) => !current)}
                      className={`flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${focusRing} ${
                        sevaActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary">
                          <HandHeart className="h-4 w-4" />
                        </span>
                        Our Seva
                      </span>

                      <motion.span
                        animate={{
                          rotate: mobileSevaOpen ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileSevaOpen && (
                        <motion.div
                          id="mobile-seva-navigation"
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.22,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 border-t border-border/70 bg-muted/30 p-2">
                            {SEVA_NAV.map((item) => {
                              const Icon = SEVA_ICONS[item.to] ?? GraduationCap;
                              const active = isRouteActive(item.to);

                              return (
                                <Link
                                  key={item.to}
                                  to={item.to}
                                  aria-current={active ? "page" : undefined}
                                  onClick={closeAllMenus}
                                  className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors ${focusRing} ${
                                    active ? "bg-primary text-primary-foreground" : "hover:bg-card"
                                  }`}
                                >
                                  <span
                                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                                      active
                                        ? "bg-primary-foreground/15"
                                        : "bg-primary/10 text-primary"
                                    }`}
                                  >
                                    <Icon className="h-4 w-4" />
                                  </span>

                                  <span className="min-w-0">
                                    <span className="block text-sm font-medium">{item.label}</span>

                                    <span
                                      className={`block truncate text-xs ${
                                        active
                                          ? "text-primary-foreground/75"
                                          : "text-muted-foreground"
                                      }`}
                                    >
                                      {item.desc}
                                    </span>
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <MandaliNavigation mobile onNavigate={closeAllMenus} />

                  {NAV_TAIL.map((item) => {
                    const active = isRouteActive(item.to);

                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        aria-current={active ? "page" : undefined}
                        onClick={closeAllMenus}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${focusRing} ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <span>{item.label}</span>

                        {active && <span className="h-2 w-2 rounded-full bg-primary-foreground" />}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-2 border-t border-border/70 p-2 pt-3">
                  <Link
                    to="/devotee-registration"
                    onClick={closeAllMenus}
                    className={`group flex items-center justify-between overflow-hidden rounded-2xl gradient-saffron px-4 py-3.5 text-white shadow-lg shadow-primary/20 ${focusRing}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
                        <Heart className="h-5 w-5 fill-current" />
                      </span>

                      <span>
                        <span className="block text-sm font-semibold">Devotee Registrations</span>

                        <span className="block text-xs text-white/75">
                          Join our spiritual family
                        </span>
                      </span>
                    </span>

                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
