// import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import DeepSections from "@/components/DeepSections";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="grain-overlay"></div>
      <div className="frame-lines">
        <div className="v-left"></div>
        <div className="v-right"></div>
        <div className="h-top"></div>
        <div className="h-bottom"></div>
      </div>

      {/* <Navbar /> */}
      <Hero />
      <FeatureStrip />
      <DeepSections />
      <CTA />
      <Footer />
    </div>
  );
}
