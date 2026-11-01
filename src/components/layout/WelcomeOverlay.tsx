import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@tanstack/react-router";

import welcome from "@/assets/welcome-namaste.png";

export function WelcomeOverlay() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setShow(false);
      return;
    }

    setShow(true);

    const timeoutId = window.setTimeout(() => {
      setShow(false);
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[oklch(0.98_0.03_75)] via-white to-[oklch(0.95_0.05_220)] dark:from-background dark:via-background dark:to-background"
          onClick={() => setShow(false)}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-primary/30 blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-sky/30 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.85, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute font-display text-[22rem] leading-none text-primary/5 sm:text-[30rem]"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ॐ
          </motion.div>

          <motion.div
            initial={{
              scale: 0.85,
              opacity: 0,
              y: 20,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="relative flex flex-col items-center px-6 text-center"
          >
            <div className="relative">
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,theme(colors.amber.300/70),transparent_65%)] blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                }}
              />

              <motion.img
                src={welcome}
                alt="Namaste welcome"
                className="h-56 w-56 object-contain drop-shadow-[0_10px_30px_rgba(234,179,8,0.35)] sm:h-72 sm:w-72"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.4,
                  ease: "easeInOut",
                }}
              />
            </div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
              }}
              className="mt-4 font-display text-3xl font-semibold text-gradient sm:text-4xl"
            >
              🙏 Sri Sathya Sai Baba 🙏
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.7,
              }}
              className="mt-2 text-sm text-muted-foreground sm:text-base"
            >
              Welcome to Sri Sathya Sai Seva Samithi, Premsadan
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}