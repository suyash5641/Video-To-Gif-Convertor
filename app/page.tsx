import { FeatureSection } from "@/components/FeatureSection/FeatureSection";
import Footer from "@/components/Footer/Footer";
import { HowItWorksSection } from "@/components/HowItWorksSection/HowItWorksSection";
import MainSection from "@/components/MainSection/MainSection";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <MainSection />
      <HowItWorksSection />
      <FeatureSection />
      <Footer />
    </div>
  );
}
