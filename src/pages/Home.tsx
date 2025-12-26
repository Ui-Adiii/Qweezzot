import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-wellness.jpg";
import HighlightsBar from "@/components/sub-components/HighlightsBar";
import CTASection from "@/components/sub-components/CTASection";
import LatestProducts from "@/components/sub-components/LatestProducts";
import WhyByoteas from "@/components/sub-components/WhyWe";
import FeaturedProducts from "@/components/sub-components/FeaturedProducts";
import OsfigoHeroSlider from "@/components/sub-components/HeroSlider";
import GreenMarketingCard from "@/components/sub-components/GreenMarketingCard";
import MarketingCard from "@/components/sub-components/GreenMarketingCard";
import Hero from "./Hero";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      {/* <OsfigoHeroSlider /> */}

      {/* Highlights Bar */}
      {/* <HighlightsBar /> */}

      {/* Features Section */}
      <WhyByoteas />

      {/* CTA Section */}
      <CTASection />

      {/* Letest Products  */}
      <LatestProducts />

      {/* Featured Products */}
      <FeaturedProducts />

      <MarketingCard />
    </div>
  );
};

export default Home;
