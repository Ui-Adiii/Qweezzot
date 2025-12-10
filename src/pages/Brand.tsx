import {
  Microscope,
  Award,
  Leaf,
  Shield,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Brand = () => {
  const brandPillars = [
    {
      icon: Microscope,
      title: "Self Research & Development",
      description:
        "Our dedicated R&D team works tirelessly to innovate and improve our product formulations.",
    },
    {
      icon: Award,
      title: "Lab Tested Products",
      description:
        "Every product undergoes rigorous testing in certified laboratories to ensure quality and safety.",
    },
    {
      icon: Leaf,
      title: "100% Pure Ayurveda",
      description:
        "Authentic Ayurvedic formulations using natural ingredients sourced from trusted suppliers.",
    },
    {
      icon: Shield,
      title: "100% Satisfaction Guarantee",
      description:
        "We stand behind our products with a complete satisfaction guarantee for your peace of mind.",
    },
    {
      icon: TrendingUp,
      title: "100% Result Oriented",
      description:
        "Our products are designed to deliver measurable results and improve your overall wellness.",
    },
    {
      icon: CheckCircle,
      title: "Quality Certified",
      description:
        "Certified by leading quality assurance organizations for your safety and trust.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight">
                Osfigo
              </h1>
              <div className="flex items-center justify-center gap-3 text-2xl opacity-90">
                <span>Wellness</span>
                <span className="text-gold">|</span>
                <span>Wellbeing</span>
              </div>
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Your trusted partner in natural wellness. Committed to delivering
              100% pure Ayurvedic solutions for a healthier life.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Promise Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Brand Promise
            </h2>
            <p className="text-xl text-muted-foreground">
              Quality, purity, and effectiveness are at the heart of everything
              we do. Discover what makes Osfigo your trusted wellness partner.
            </p>
          </div>

          {/* Brand Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {brandPillars.map((pillar, index) => (
              <Card
                key={index}
                className="border-none shadow-soft hover:shadow-gold transition-all duration-300 hover:-translate-y-2 group"
              >
                <CardContent className="pt-8 text-center">
                  <div className="mb-6 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary group-hover:scale-110 transition-transform">
                      <pillar.icon className="h-10 w-10 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Our Commitment to Quality
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At Osfigo, quality is not just a promise—it's our foundation.
                  Every product is crafted with precision, tested rigorously,
                  and delivered with care.
                </p>
                <div className="space-y-4">
                  {[
                    "Sourced from certified Ayurvedic suppliers",
                    "Manufactured in GMP-certified facilities",
                    "Third-party lab tested for purity",
                    "30-day satisfaction guarantee",
                    "Continuous quality monitoring",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-hero shadow-gold overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-primary-foreground p-8">
                      <Leaf className="h-24 w-24 mx-auto mb-4 opacity-90" />
                      <p className="text-2xl font-bold">Pure Ayurveda</p>
                      <p className="text-lg opacity-90 mt-2">
                        Nature's Gift to Wellness
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Certified & Trusted
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                "GMP Certified",
                "ISO Certified",
                "Ayush Approved",
                "Lab Tested",
              ].map((badge, index) => (
                <Card key={index} className="border-primary/20 shadow-soft">
                  <CardContent className="pt-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto mb-3">
                      <Award className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <p className="font-semibold text-foreground">{badge}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Brand;
