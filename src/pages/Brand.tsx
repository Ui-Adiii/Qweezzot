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
      title: "In-House Research & Development",
      description:
        "Our internal R&D team focuses on product innovation, quality improvement, and long-term value creation.",
    },
    {
      icon: Award,
      title: "Quality Tested Products",
      description:
        "Every product undergoes strict quality checks to ensure safety, durability, and reliability.",
    },
    {
      icon: Leaf,
      title: "Premium Everyday Products",
      description:
        "Carefully selected materials and formulations designed for daily use and long-lasting performance.",
    },
    {
      icon: Shield,
      title: "Customer Satisfaction Promise",
      description:
        "We stand behind our products with transparent policies and customer-first support.",
    },
    {
      icon: TrendingUp,
      title: "Result-Oriented Business Model",
      description:
        "Our system is designed to deliver measurable growth, income stability, and long-term success.",
    },
    {
      icon: CheckCircle,
      title: "Certified & Compliant",
      description:
        "All operations follow regulatory standards and compliance guidelines to ensure trust.",
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
                QWEEZZOT
              </h1>
              <div className="flex items-center justify-center gap-3 text-2xl opacity-90">
                <span>Opportunity</span>
                <span className="text-gold">|</span>
                <span>Growth</span>
              </div>
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              A growth-driven company committed to empowering households through
              quality products, transparent systems, and sustainable income
              opportunities.
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
              Trust, transparency, and long-term value are the foundation of
              everything we do at QWEEZZOT.
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
                  Commitment to Quality & Trust
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At QWEEZZOT, quality is not just a promise—it is a process.
                  Every product and system is designed with precision,
                  transparency, and accountability.
                </p>
                <div className="space-y-4">
                  {[
                    "Products sourced from trusted manufacturers",
                    "Standardized quality control processes",
                    "Transparent pricing and BP system",
                    "Clear refund and replacement policies",
                    "Continuous monitoring and improvement",
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
                      <Shield className="h-24 w-24 mx-auto mb-4 opacity-90" />
                      <p className="text-2xl font-bold">Trusted Brand</p>
                      <p className="text-lg opacity-90 mt-2">
                        Built on Transparency & Ethics
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
              Legal & Compliance Standards
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                "Company Registered",
                "GST Compliant",
                "Trademark Registered",
                "Policy Verified",
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
