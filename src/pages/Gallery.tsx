import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Expand,
  Flower2,
  HandHeart,
  Image as ImageIcon,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import {
  mandir1,
  mandir2,
  mandir3,
  shrine1,
  shrine2,
  heroImage,
} from "@/lib/site-images";

import educationImage from "@/assets/service-education.jpg";
import healthcareImage from "@/assets/service-healthcare.jpg";
import welfareImage from "@/assets/service-welfare.jpg";

type GalleryCategory = "all" | "mandir" | "shrine" | "seva";

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  category: Exclude<GalleryCategory, "all">;
  categoryLabel: string;
  layout: string;
};

type FilterOption = {
  value: GalleryCategory;
  label: string;
  icon: LucideIcon;
};

const FILTERS: FilterOption[] = [
  {
    value: "all",
    label: "All Moments",
    icon: ImageIcon,
  },
  {
    value: "mandir",
    label: "Mandir",
    icon: Building2,
  },
  {
    value: "shrine",
    label: "Shrine",
    icon: Flower2,
  },
  {
    value: "seva",
    label: "Seva Activities",
    icon: HandHeart,
  },
];

const GALLERY_IMAGES: GalleryItem[] = [
  {
    src: mandir1,
    alt: "Premsadan Mandir illuminated at night",
    title: "Premsadan Mandir",
    category: "mandir",
    categoryLabel: "Mandir",
    layout: "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    src: shrine1,
    alt: "Sacred sanctum inside Premsadan Mandir",
    title: "Sacred Sanctum",
    category: "shrine",
    categoryLabel: "Shrine",
    layout: "sm:row-span-2 lg:row-span-2",
  },
  {
    src: mandir2,
    alt: "Illuminated view of Premsadan Mandir",
    title: "Evening Illumination",
    category: "mandir",
    categoryLabel: "Mandir",
    layout: "",
  },
  {
    src: shrine2,
    alt: "Beautiful shrine detail",
    title: "Divine Presence",
    category: "shrine",
    categoryLabel: "Shrine",
    layout: "",
  },
  {
    src: mandir3,
    alt: "Front façade of Premsadan Mandir",
    title: "Mandir Façade",
    category: "mandir",
    categoryLabel: "Mandir",
    layout: "sm:col-span-2 lg:col-span-2",
  },
  {
    src: heroImage,
    alt: "Premsadan Mandir during evening hours",
    title: "A Peaceful Evening",
    category: "mandir",
    categoryLabel: "Mandir",
    layout: "sm:row-span-2 lg:row-span-2",
  },
  {
    src: educationImage,
    alt: "Bal Vikas education activity",
    title: "Bal Vikas",
    category: "seva",
    categoryLabel: "Education Seva",
    layout: "sm:col-span-2 lg:col-span-2",
  },
  {
    src: healthcareImage,
    alt: "Community medical camp",
    title: "Medical Camp",
    category: "seva",
    categoryLabel: "Healthcare Seva",
    layout: "",
  },
  {
    src: welfareImage,
    alt: "Narayana Seva welfare activity",
    title: "Narayana Seva",
    category: "seva",
    categoryLabel: "Welfare Seva",
    layout: "",
  },
  {
    src: heroImage,
    alt: "Offering at Premsadan Mandir",
    title: "An Offering of Love",
    category: "shrine",
    categoryLabel: "Shrine",
    layout: "sm:col-span-2 lg:col-span-2",
  },
];

export function GalleryPage() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("all");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    null,
  );

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") {
      return GALLERY_IMAGES;
    }

    return GALLERY_IMAGES.filter(
      (image) => image.category === activeCategory,
    );
  }, [activeCategory]);

  const selectedImage =
    selectedIndex !== null ? filteredImages[selectedIndex] : null;

  function openLightbox(index: number) {
    setSelectedIndex(index);
  }

  function closeLightbox() {
    setSelectedIndex(null);
  }

  function showPreviousImage() {
    setSelectedIndex((current) => {
      if (current === null) return null;

      return current === 0
        ? filteredImages.length - 1
        : current - 1;
    });
  }

  function showNextImage() {
    setSelectedIndex((current) => {
      if (current === null) return null;

      return current === filteredImages.length - 1
        ? 0
        : current + 1;
    });
  }

  function changeCategory(category: GalleryCategory) {
    setActiveCategory(category);
    setSelectedIndex(null);
  }

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyboard(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [selectedIndex, filteredImages.length]);

  return (
    <main className="overflow-hidden">
      <PageHero
        eyebrow="Gallery"
        title="Moments of grace"
        subtitle="A visual journey through the mandir, sacred celebrations and selfless seva activities."
      />

      <section className="relative pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Premsadan memories
              </div>

              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Explore our moments of devotion and service
              </h2>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Browse photographs from Premsadan Mandir, sacred
                occasions and community seva programmes.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-sm">
              <ImageIcon className="h-4 w-4 text-primary" />

              <span className="font-semibold text-foreground">
                {filteredImages.length}
              </span>

              <span className="text-muted-foreground">
                {filteredImages.length === 1 ? "moment" : "moments"}
              </span>
            </div>
          </div>

          <div className="mb-8 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm sm:w-fit">
              {FILTERS.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeCategory === filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => changeCategory(filter.value)}
                    className={[
                      "relative inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    ].join(" ")}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="gallery-active-filter"
                        className="absolute inset-0 rounded-xl bg-primary shadow-md shadow-primary/20"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 28,
                        }}
                      />
                    )}

                    <Icon className="relative z-10 h-4 w-4" />

                    <span className="relative z-10">
                      {filter.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-flow-dense grid-cols-1 gap-4 sm:auto-rows-[180px] sm:grid-cols-2 lg:grid-cols-4"
            >
              {filteredImages.map((image, index) => (
                <GalleryCard
                  key={`${image.title}-${image.src}-${index}`}
                  image={image}
                  index={index}
                  onOpen={() => openLightbox(index)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && selectedIndex !== null && (
          <GalleryLightbox
            image={selectedImage}
            currentIndex={selectedIndex}
            totalImages={filteredImages.length}
            onClose={closeLightbox}
            onPrevious={showPreviousImage}
            onNext={showNextImage}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function GalleryCard({
  image,
  index,
  onOpen,
}: {
  image: GalleryItem;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.3),
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      onClick={onOpen}
      className={[
        "group relative h-64 min-w-0 overflow-hidden rounded-[24px] border border-border bg-card text-left shadow-sm transition-shadow hover:shadow-xl sm:h-auto",
        image.layout,
      ].join(" ")}
      aria-label={`Open ${image.title}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading={index < 2 ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-85 transition duration-300 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        <div className="min-w-0 text-white">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85 backdrop-blur-md">
            {image.categoryLabel}
          </span>

          <h3 className="mt-2 truncate font-display text-xl font-semibold">
            {image.title}
          </h3>
        </div>

        <div className="grid h-10 w-10 shrink-0 translate-y-2 place-items-center rounded-full border border-white/25 bg-white/10 text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Expand className="h-4 w-4" />
        </div>
      </div>

      <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
    </motion.button>
  );
}

function GalleryLightbox({
  image,
  currentIndex,
  totalImages,
  onClose,
  onPrevious,
  onNext,
}: {
  image: GalleryItem;
  currentIndex: number;
  totalImages: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${image.title} image preview`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition hover:bg-white hover:text-black sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      {totalImages > 1 && (
        <>
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition hover:bg-white hover:text-black sm:left-6 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition hover:bg-white hover:text-black sm:right-6 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <motion.div
        key={`${image.src}-${currentIndex}`}
        initial={{
          opacity: 0,
          scale: 0.94,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
        }}
        transition={{
          duration: 0.25,
        }}
        className="relative flex max-h-[calc(100vh-24px)] w-full max-w-6xl flex-col overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-2xl sm:max-h-[calc(100vh-48px)] sm:rounded-[30px]"
      >
        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black">
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[calc(100vh-150px)] w-full object-contain sm:max-h-[calc(100vh-175px)]"
          />
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-black/95 px-5 py-4 text-white sm:px-7">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/55">
              {image.categoryLabel}
            </p>

            <h3 className="mt-1 truncate font-display text-lg font-semibold sm:text-xl">
              {image.title}
            </h3>
          </div>

          <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75">
            {currentIndex + 1} / {totalImages}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}