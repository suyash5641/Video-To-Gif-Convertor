import { FeatureSection } from "@/components/FeatureSection/FeatureSection";
import Footer from "@/components/Footer/Footer";
import { HowItWorksSection } from "@/components/HowItWorksSection/HowItWorksSection";
import MainSection from "@/components/MainSection/MainSection";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-pink-100 to-violet-100">
      <MainSection />
      <HowItWorksSection />
      <FeatureSection />
      <Footer />
    </div>
  );
}
