import edu from "@/assets/service-education.jpg";
import health from "@/assets/service-healthcare.jpg";
import welfare from "@/assets/service-welfare.jpg";
import {
  heroImage,
  mandir1,
  mandir2,
  mandir3,
  shrine1,
  shrine2,
} from "@/lib/site-images";

export const SERVICES = [
  {
    to: "/education",
    title: "Education Services",
    description:
      "Bal Vikas classes, tuition support, scholarships and value-based learning for children.",
    image: edu,
    kind: "education",
  },
  {
    to: "/healthcare",
    title: "Healthcare Services",
    description:
      "Free medical camps, blood donation drives and support for the underprivileged.",
    image: health,
    kind: "healthcare",
  },
  {
    to: "/welfare",
    title: "Welfare Activities",
    description:
      "Narayana Seva, Grama Seva, food distribution and disaster relief programmes.",
    image: welfare,
    kind: "welfare",
  },
] as const;

export const HOME_STATS = [
  { to: 25000, suffix: "+", label: "Meals Served" },
  { to: 120, suffix: "+", label: "Medical Camps" },
  { to: 500, suffix: "+", label: "Volunteers" },
  { to: 30, suffix: " yrs", label: "Of Selfless Seva" },
] as const;

export const LATEST_ACTIVITIES = [
  {
    title: "Guru Poornima Celebration",
    date: "Recent",
    description:
      "Bhajans, discourse and community lunch at Premsadan.",
    tag: "Spiritual",
    image: shrine1,
    kind: "spiritual",
  },
  {
    title: "Free Medical Camp",
    date: "Recent",
    description:
      "General health, ophthalmology and diabetes screening.",
    tag: "Healthcare",
    image: health,
    kind: "healthcare",
  },
  {
    title: "Bal Vikas Annual Day",
    date: "Recent",
    description:
      "Children presenting values through music and drama.",
    tag: "Education",
    image: edu,
    kind: "education",
  },
] as const;

export const GALLERY_IMAGES = [
  mandir1,
  shrine1,
  mandir2,
  shrine2,
  mandir3,
  edu,
  welfare,
  health,
] as const;

const discoveredAssetImages = import.meta.glob(
  "/src/assets/**/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const allHeroImages = Array.from(
  new Set([
    mandir1,
    mandir2,
    mandir3,
    shrine1,
    shrine2,
    heroImage,
    edu,
    health,
    welfare,
    ...Object.entries(discoveredAssetImages)
      .filter(([path]) => !/(logo|favicon|icon)/i.test(path))
      .map(([, source]) => source),
  ]),
).filter(Boolean);

function createHeroGroup(slot: number) {
  const groupedImages = allHeroImages.filter(
    (_, index) => index % 3 === slot,
  );

  return groupedImages.length >= 2
    ? groupedImages
    : allHeroImages;
}

export const HERO_IMAGE_GROUPS = [
  createHeroGroup(0),
  createHeroGroup(1),
  createHeroGroup(2),
] as const;
