import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  GraduationCap,
  HandHeart,
  Heart,
  RotateCcw,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";

const BUTTON_SIZE = 72;
const EDGE_GAP = 16;
const HEADER_GAP = 84;
const STORAGE_KEY = "premsadan-floating-donate-position";

const CATEGORIES = [
  {
    icon: GraduationCap,
    label: "Education",
    description: "Support learning",
    purpose: "education",
    gradient: "from-sky-400 to-sky-600",
  },
  {
    icon: Stethoscope,
    label: "Healthcare",
    description: "Support medical seva",
    purpose: "healthcare",
    gradient: "from-emerald-400 to-emerald-600",
  },
  {
    icon: HandHeart,
    label: "Welfare",
    description: "Help families",
    purpose: "welfare",
    gradient: "from-orange-400 to-orange-600",
  },
  {
    icon: Sparkles,
    label: "General Seva",
    description: "Support every cause",
    purpose: "general",
    gradient: "from-fuchsia-400 to-pink-500",
  },
] as const;

type FloatingPosition = {
  x: number;
  y: number;
};

type MenuPlacement = {
  horizontal: "left" | "right";
  vertical: "top" | "bottom";
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getViewportBounds() {
  if (typeof window === "undefined") {
    return {
      minX: EDGE_GAP,
      maxX: EDGE_GAP,
      minY: HEADER_GAP,
      maxY: HEADER_GAP,
    };
  }

  return {
    minX: EDGE_GAP,
    maxX: Math.max(
      EDGE_GAP,
      window.innerWidth - BUTTON_SIZE - EDGE_GAP,
    ),
    minY: HEADER_GAP,
    maxY: Math.max(
      HEADER_GAP,
      window.innerHeight - BUTTON_SIZE - EDGE_GAP,
    ),
  };
}

function getSavedPosition(): FloatingPosition | null {
  if (typeof window === "undefined") return null;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return null;

    const parsed = JSON.parse(saved) as Partial<FloatingPosition>;

    if (
      typeof parsed.x !== "number" ||
      typeof parsed.y !== "number" ||
      !Number.isFinite(parsed.x) ||
      !Number.isFinite(parsed.y)
    ) {
      return null;
    }

    return {
      x: parsed.x,
      y: parsed.y,
    };
  } catch {
    return null;
  }
}

export function FloatingDonate() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const [constraints, setConstraints] = useState({
    left: EDGE_GAP,
    right: EDGE_GAP,
    top: HEADER_GAP,
    bottom: HEADER_GAP,
  });

  const [menuPlacement, setMenuPlacement] = useState<MenuPlacement>({
    horizontal: "right",
    vertical: "bottom",
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const updateMenuPlacement = () => {
    if (typeof window === "undefined") return;

    const buttonCenterX = x.get() + BUTTON_SIZE / 2;
    const buttonCenterY = y.get() + BUTTON_SIZE / 2;

    setMenuPlacement({
      horizontal:
        buttonCenterX > window.innerWidth / 2 ? "right" : "left",
      vertical:
        buttonCenterY > window.innerHeight / 2 ? "bottom" : "top",
    });
  };

  const updateViewport = (useDefaultPosition = false) => {
    const bounds = getViewportBounds();

    setConstraints({
      left: bounds.minX,
      right: bounds.maxX,
      top: bounds.minY,
      bottom: bounds.maxY,
    });

    const savedPosition = getSavedPosition();

    const nextPosition =
      useDefaultPosition || !savedPosition
        ? {
            x: bounds.maxX,
            y: bounds.maxY,
          }
        : {
            x: clamp(savedPosition.x, bounds.minX, bounds.maxX),
            y: clamp(savedPosition.y, bounds.minY, bounds.maxY),
          };

    x.set(nextPosition.x);
    y.set(nextPosition.y);

    updateMenuPlacement();
  };

  const savePosition = () => {
    const bounds = getViewportBounds();

    const position = {
      x: clamp(x.get(), bounds.minX, bounds.maxX),
      y: clamp(y.get(), bounds.minY, bounds.maxY),
    };

    x.set(position.x);
    y.set(position.y);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
    } catch {
      // The component will continue working if storage is unavailable.
    }
  };

  const resetPosition = () => {
    const bounds = getViewportBounds();

    x.set(bounds.maxX);
    y.set(bounds.maxY);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }

    setOpen(false);
    window.requestAnimationFrame(updateMenuPlacement);
  };

  const toggleMenu = () => {
    updateMenuPlacement();
    setOpen((current) => !current);

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(8);
    }
  };

  useEffect(() => {
    setMounted(true);
    updateViewport();

    const handleResize = () => {
      updateViewport();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!mounted) return null;

  const menuPositionClasses = [
    menuPlacement.vertical === "bottom"
      ? "bottom-[86px]"
      : "top-[86px]",
    menuPlacement.horizontal === "right" ? "right-0" : "left-0",
  ].join(" ");

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <motion.div
        ref={wrapperRef}
        drag
        dragMomentum={false}
        dragElastic={0.06}
        dragConstraints={constraints}
        onDragStart={() => {
          setOpen(false);
        }}
        onDragEnd={() => {
          savePosition();
          updateMenuPlacement();
        }}
        style={{
          x,
          y,
          position: "absolute",
          left: 0,
          top: 0,
          touchAction: "none",
        }}
        whileDrag={{
          scale: 1.06,
          rotate: 2,
          cursor: "grabbing",
        }}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 28,
        }}
        className="pointer-events-auto select-none"
      >
        <div className="relative h-[72px] w-[72px]">
          {/* PREMIUM DONATION MENU */}
          <AnimatePresence>
            {open && (
              <motion.div
                id="floating-donate-menu"
                role="dialog"
                aria-label="Choose a donation cause"
                initial={
                  shouldReduceMotion
                    ? {
                      opacity: 0,
                    }
                    : {
                      opacity: 0,
                      scale: 0.84,
                      y:
                        menuPlacement.vertical === "bottom"
                          ? 18
                          : -18,
                    }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={
                  shouldReduceMotion
                    ? {
                      opacity: 0,
                    }
                    : {
                      opacity: 0,
                      scale: 0.9,
                      y:
                        menuPlacement.vertical === "bottom"
                          ? 12
                          : -12,
                    }
                }
                transition={{
                  type: "spring",
                  stiffness: 430,
                  damping: 30,
                }}
                className={`absolute w-[min(326px,calc(100vw-32px))] ${menuPositionClasses}`}
              >
                <div className="relative overflow-hidden rounded-[1.8rem] border border-border/70 bg-background/95 shadow-[0_28px_90px_-28px_rgba(15,23,42,0.42)] backdrop-blur-2xl dark:shadow-black/55">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_38%)]" />

                  {/* Menu header */}
                  <div className="relative overflow-hidden border-b border-border/60 px-4 pb-4 pt-4">
                    <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <motion.div
                          animate={
                            shouldReduceMotion
                              ? undefined
                              : {
                                rotate: [0, -6, 6, 0],
                                scale: [1, 1.05, 1],
                              }
                          }
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </motion.div>

                        <div className="min-w-0">
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-primary">
                            <Sparkles className="h-2.5 w-2.5" />
                            Offer with love
                          </div>

                          <h2 className="mt-1.5 font-display text-base font-semibold leading-tight text-foreground">
                            Choose your seva
                          </h2>

                          <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                            Select the cause your offering should support.
                          </p>
                        </div>
                      </div>

                      <motion.button
                        type="button"
                        onClick={() => setOpen(false)}
                        whileHover={{
                          rotate: 90,
                          scale: 1.08,
                        }}
                        whileTap={{
                          scale: 0.9,
                        }}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background/70 text-muted-foreground shadow-sm transition-colors hover:border-primary/25 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label="Close donation menu"
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Cause cards */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: shouldReduceMotion ? 0 : 0.065,
                          delayChildren: shouldReduceMotion ? 0 : 0.07,
                        },
                      },
                    }}
                    className="relative grid grid-cols-2 gap-2.5 p-3"
                  >
                    {CATEGORIES.map((category) => {
                      const Icon = category.icon;

                      return (
                        <motion.div
                          key={category.purpose}
                          variants={{
                            hidden: {
                              opacity: 0,
                              y: 12,
                              scale: 0.93,
                            },
                            visible: {
                              opacity: 1,
                              y: 0,
                              scale: 1,
                            },
                          }}
                        >
                          <Link
                            to="/donate"
                            search={{
                              purpose: category.purpose,
                            } as never}
                            onClick={() => setOpen(false)}
                            className="group/card relative flex min-h-[118px] flex-col justify-between overflow-hidden rounded-[1.25rem] border border-white/20 p-3 text-white shadow-[0_12px_28px_-14px_rgba(15,23,42,0.65)] outline-none transition duration-300 hover:-translate-y-1.5 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          >
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}
                            />

                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),transparent_42%,rgba(0,0,0,0.1))]" />

                            <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full bg-white/15 transition-transform duration-700 group-hover/card:scale-150" />

                            <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-black/10 transition-transform duration-700 group-hover/card:scale-125" />

                            <div className="relative flex items-start justify-between gap-2">
                              <motion.div
                                whileHover={{
                                  rotate: -8,
                                  scale: 1.1,
                                }}
                                className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/20 shadow-inner backdrop-blur-sm"
                              >
                                <Icon className="h-5 w-5" />
                              </motion.div>

                              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/10 opacity-75 backdrop-blur-sm transition duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:bg-white group-hover/card:text-slate-900 group-hover/card:opacity-100">
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </span>
                            </div>

                            <div className="relative mt-4">
                              <p className="text-xs font-bold">
                                {category.label}
                              </p>

                              <p className="mt-1 text-[10px] leading-4 text-white/80">
                                {category.description}
                              </p>
                            </div>

                            <motion.span
                              aria-hidden
                              className="absolute bottom-0 left-0 h-0.5 bg-white/80"
                              initial={{
                                width: "0%",
                              }}
                              whileHover={{
                                width: "100%",
                              }}
                              transition={{
                                duration: 0.35,
                              }}
                            />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {/* Footer */}
                  <div className="relative flex items-center justify-between gap-3 border-t border-border/60 bg-muted/30 px-3.5 py-3">
                    <div className="flex min-w-0 items-center gap-2 text-[10px] text-muted-foreground">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                        <Sparkles className="h-3 w-3" />
                      </span>

                      <span className="truncate">
                        Drag the button anywhere
                      </span>
                    </div>

                    <motion.button
                      type="button"
                      onClick={resetPosition}
                      whileHover={{
                        rotate: -4,
                        y: -1,
                      }}
                      whileTap={{
                        scale: 0.94,
                      }}
                      className="flex shrink-0 items-center gap-1.5 rounded-xl border border-border bg-background/70 px-2.5 py-1.5 text-[10px] font-semibold text-muted-foreground shadow-sm transition-colors hover:border-primary/25 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Reset
                    </motion.button>
                  </div>
                </div>

                {/* Menu pointer */}
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0,
                    rotate: 45,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 45,
                  }}
                  transition={{
                    delay: 0.12,
                    type: "spring",
                    stiffness: 420,
                    damping: 24,
                  }}
                  className={`absolute h-3.5 w-3.5 border-border/50 bg-background/95 ${menuPlacement.vertical === "bottom"
                      ? "-bottom-[7px] border-b border-r"
                      : "-top-[7px] border-l border-t"
                    } ${menuPlacement.horizontal === "right"
                      ? "right-7"
                      : "left-7"
                    }`}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Premium helper pill */}
          <AnimatePresence>
            {!open && (
              <motion.div
                initial={{
                  opacity: 0,
                  x:
                    menuPlacement.horizontal === "right"
                      ? 10
                      : -10,
                  scale: 0.92,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x:
                    menuPlacement.horizontal === "right"
                      ? 8
                      : -8,
                  scale: 0.92,
                }}
                transition={{
                  type: "spring",
                  stiffness: 360,
                  damping: 27,
                  delay: 0.15,
                }}
                className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 sm:block ${menuPlacement.horizontal === "right"
                    ? "right-[84px]"
                    : "left-[84px]"
                  }`}
              >
                <div className="relative flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-border/70 bg-background/95 px-3.5 py-2.5 shadow-[0_14px_38px_-18px_rgba(15,23,42,0.55)] backdrop-blur-xl">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Heart className="h-4 w-4 fill-current" />
                  </span>

                  <div>
                    <p className="text-xs font-bold text-foreground">
                      Donate for Seva
                    </p>

                    <p className="text-[9px] text-muted-foreground">
                      Click to choose · Drag to move
                    </p>
                  </div>

                  <span
                    className={`absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-border/70 bg-background/95 ${menuPlacement.horizontal === "right"
                        ? "-right-[6px] border-r border-t"
                        : "-left-[6px] border-b border-l"
                      }`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* PREMIUM MAIN BUTTON */}
          <motion.button
            type="button"
            onTap={toggleMenu}
            onPointerDown={(
              event: ReactPointerEvent<HTMLButtonElement>,
            ) => {
              event.currentTarget.focus();
            }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                  y: -4,
                  scale: 1.055,
                  rotate: open ? 0 : -2,
                }
            }
            whileTap={{
              scale: 0.92,
            }}
            aria-label={
              open
                ? "Close donation menu"
                : "Open donation menu"
            }
            aria-expanded={open}
            aria-controls="floating-donate-menu"
            className="group relative flex h-[72px] w-[72px] cursor-grab items-center justify-center rounded-full text-white outline-none active:cursor-grabbing focus-visible:ring-4 focus-visible:ring-primary/30"
          >
            {/* Soft ambient glow */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-full bg-primary/25 blur-xl"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                    opacity: open
                      ? 0.75
                      : [0.35, 0.72, 0.35],
                    scale: open
                      ? 1.08
                      : [0.92, 1.12, 0.92],
                  }
              }
              transition={{
                duration: 2.4,
                repeat: open ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Rotating premium ring */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -inset-[3px] rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(251,146,60,0.2), rgba(249,115,22,1), rgba(244,63,94,0.9), rgba(251,191,36,0.9), rgba(251,146,60,0.2))",
              }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                    rotate: 360,
                  }
              }
              transition={{
                duration: open ? 4 : 7,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Theme separator ring */}
            <span className="pointer-events-none absolute inset-0 rounded-full bg-background shadow-[0_18px_46px_rgba(249,115,22,0.42)] transition-shadow duration-300 group-hover:shadow-[0_24px_60px_rgba(249,115,22,0.58)]" />

            {/* Main gradient face */}
            <span className="pointer-events-none absolute inset-[4px] overflow-hidden rounded-full gradient-saffron">
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_32%_18%,rgba(255,255,255,0.5),transparent_34%)]" />

              <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/15" />

              <motion.span
                aria-hidden
                className="absolute -left-10 top-0 h-full w-8 skew-x-[-20deg] bg-white/35 blur-sm"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                      x: [-25, 135],
                    }
                }
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatDelay: 1.8,
                  ease: "easeInOut",
                }}
              />
            </span>

            {/* Orbiting sparkle */}
            {!shouldReduceMotion && !open && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -inset-2"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]" />

                <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-amber-200 shadow-[0_0_10px_rgba(253,230,138,0.9)]" />
              </motion.span>
            )}

            {/* Icon transition */}
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    rotate: -90,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    rotate: 90,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 24,
                  }}
                  className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
                >
                  <X className="h-6 w-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="heart"
                  initial={{
                    opacity: 0,
                    scale: 0.6,
                    y: 4,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.6,
                    y: -4,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 23,
                  }}
                  className="relative z-10 flex flex-col items-center justify-center"
                >
                  <motion.span
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                          scale: [1, 1.14, 1],
                        }
                    }
                    transition={{
                      duration: 1.45,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Heart className="h-7 w-7 fill-current drop-shadow-md" />
                  </motion.span>

                  <span className="mt-0.5 text-[7px] font-extrabold uppercase tracking-[0.16em] text-white/90">
                    Seva
                  </span>
                </motion.span>
              )}
            </AnimatePresence>

            {/* Active status */}
            <motion.span
              aria-hidden
              className="absolute right-0 top-0 z-20 grid h-[18px] w-[18px] place-items-center rounded-full border-[3px] border-background bg-emerald-500 shadow-md"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                    scale: [1, 1.12, 1],
                  }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}