import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero";
import ServicesSection from "@/components/sections/services";
import AboutSection from "@/components/sections/about";
import ContactSection from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
