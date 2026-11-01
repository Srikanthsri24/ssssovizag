import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { heroImage } from "@/lib/site-images";

type AutoImageSliderProps = {
  images: readonly string[];
  alt: string;
  interval: number;
  startIndex?: number;
  className?: string;
  imagePosition?: string;
  children?: ReactNode;
};

export function AutoImageSlider({
  images,
  alt,
  interval,
  startIndex = 0,
  className = "",
  imagePosition = "center",
  children,
}: AutoImageSliderProps) {
  const safeImages = useMemo(
    () => (images.length > 0 ? [...images] : [heroImage]),
    [images],
  );

  const normalizedStartIndex =
    safeImages.length > 0
      ? startIndex % safeImages.length
      : 0;

  const [activeIndex, setActiveIndex] = useState(
    normalizedStartIndex,
  );

  useEffect(() => {
    setActiveIndex(normalizedStartIndex);
  }, [normalizedStartIndex, safeImages.length]);

  useEffect(() => {
    if (safeImages.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex(
        (currentIndex) =>
          (currentIndex + 1) % safeImages.length,
      );
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, safeImages.length]);

  useEffect(() => {
    if (safeImages.length <= 1) return;

    const nextImage = new Image();
    nextImage.src =
      safeImages[(activeIndex + 1) % safeImages.length];
  }, [activeIndex, safeImages]);

  const activeImage =
    safeImages[activeIndex % safeImages.length];

  return (
    <motion.div
      className={`group relative isolate overflow-hidden rounded-2xl bg-muted sm:rounded-3xl ${className}`}
      whileHover={{ y: -3 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 24,
      }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={`slider-backdrop-${activeImage}`}
          src={activeImage}
          alt=""
          aria-hidden="true"
          draggable={false}
          initial={{ opacity: 0, scale: 1.14 }}
          animate={{ opacity: 0.48, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.55,
            ease: "easeInOut",
          }}
          className="absolute inset-0 h-full w-full object-cover blur-2xl saturate-125 dark:opacity-35"
          style={{ objectPosition: imagePosition }}
        />
      </AnimatePresence>

      <AnimatePresence initial={false}>
        <motion.img
          key={`slider-main-${activeImage}`}
          src={activeImage}
          alt={alt}
          draggable={false}
          decoding="async"
          initial={{ opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 z-10 h-full w-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

      {safeImages.length > 1 ? (
        <div className="absolute bottom-3 right-3 z-40 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-2.5 py-1.5 shadow-lg backdrop-blur-md">
          {safeImages.slice(0, 6).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show image ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-4 bg-white"
                  : "w-1.5 bg-white/45 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      ) : null}

      {children}
    </motion.div>
  );
}
