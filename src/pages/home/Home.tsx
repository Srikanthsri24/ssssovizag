import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { DonationSection } from "./components/DonationSection";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { LatestActivitiesSection } from "./components/LatestActivitiesSection";
import { QuotesSection } from "./components/QuotesSection";
import { ServicesSection } from "./components/ServicesSection";
import { StatsSection } from "./components/StatsSection";
import { VolunteerSection } from "./components/VolunteerSection";

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <LatestActivitiesSection />
      <StatsSection />
      <QuotesSection />
      <GallerySection />
      <VolunteerSection />
      <DonationSection />
      <ContactSection />
    </div>
  );
}
