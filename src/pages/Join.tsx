import { Link } from "react-router-dom";
import { Check, ArrowRight, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Join = () => {
  const starterPacks = [
    {
      name: "Free Registration",
      investment: "₹0",
      productValue: "Explore Platform",
      cashBack: "-",
      repurchaseWallet: "30% Wallet",
      monthlyCapping: "-",
      features: [
        "Free ID Registration",
        "Access to Digital Dashboard",
        "Basic Business Training",
        "Community Support",
      ],
      popular: false,
    },
    {
      name: "Starter Pack",
      investment: "Up to ₹2,000",
      productValue: "Up to ₹6,000",
      cashBack: "-",
      repurchaseWallet: "30% Wallet",
      monthlyCapping: "-",
      features: [
        "Product Starter Kit",
        "Business Training Access",
        "Direct Referral Income",
        "Team Structure Eligibility",
      ],
      popular: false,
    },
    {
      name: "Growth Pack",
      investment: "Up to ₹4,000",
      productValue: "Up to ₹12,000",
      cashBack: "₹4,200",
      repurchaseWallet: "30% Wallet",
      monthlyCapping: "No Limit",
      features: [
        "Expanded Product Portfolio",
        "Higher Income Eligibility",
        "Binary Matching Income",
        "Leadership Qualification",
        "Business Tools & Support",
      ],
      popular: true,
    },
    {
      name: "Leadership Pack",
      investment: "Up to ₹10,000",
      productValue: "Up to ₹30,000",
      cashBack: "₹8,400",
      repurchaseWallet: "30% Wallet",
      monthlyCapping: "₹12 Lakh",
      features: [
        "Premium Product Portfolio",
        "Maximum Income Eligibility",
        "Leadership & Royalty Income",
        "Priority Training & Support",
        "Rewards & Recognition",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Start Your Business Journey
            </h1>
            <p className="text-2xl mb-4 opacity-90">Mission Aarthik Aazadi</p>
            <p className="text-xl opacity-80">
              A transparent system designed to help you build sustainable
              income.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Choose Your Business Entry Pack
            </h2>
            <p className="text-xl text-muted-foreground">
              Select a pack that matches your goals. Every pack gives you access
              to our digital system, training support, and transparent income
              model.
            </p>
          </div>

          {/* Starter Packs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {starterPacks.map((pack, index) => (
              <Card
                key={index}
                className={cn(
                  "relative border-2 transition-all duration-300 hover:-translate-y-2",
                  pack.popular
                    ? "border-secondary shadow-gold scale-105"
                    : "border-border shadow-soft hover:shadow-gold"
                )}
              >
                {pack.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-gold text-accent-foreground font-semibold text-sm shadow-gold">
                      <Star className="h-4 w-4" />
                      Recommended
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl mb-2">{pack.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {pack.investment}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Business Entry Cost
                  </p>
                </CardHeader>

                <CardContent>
                  {/* Value Props */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Product Value:
                      </span>
                      <span className="font-semibold">{pack.productValue}</span>
                    </div>
                    {pack.cashBack !== "-" && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Cashback:
                        </span>
                        <span className="font-semibold text-secondary">
                          {pack.cashBack}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Repurchase Wallet:
                      </span>
                      <span className="font-semibold">
                        {pack.repurchaseWallet}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Income Capping:
                      </span>
                      <span className="font-semibold">
                        {pack.monthlyCapping}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {pack.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    asChild
                    variant={pack.popular ? "gold" : "default"}
                    className="w-full"
                    size="lg"
                  >
                    <Link to="/user/login">
                      Activate Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Why Join QWEEZZOT?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-soft hover:shadow-gold">
                <CardContent className="pt-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                    <TrendingUp className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Multiple Income Sources
                  </h3>
                  <p className="text-muted-foreground">
                    Earn through direct income, matching income, leadership
                    bonuses, and rewards.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft hover:shadow-gold">
                <CardContent className="pt-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                    <Star className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Transparent BP System
                  </h3>
                  <p className="text-muted-foreground">
                    Clear tracking, fair income distribution, and no hidden
                    deductions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft hover:shadow-gold">
                <CardContent className="pt-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                    <Check className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    Free Training & Support
                  </h3>
                  <p className="text-muted-foreground">
                    Step-by-step guidance, business training, and leadership
                    support at every level.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Time Starts Now
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Register today and take the first step toward building long-term
            financial stability.
          </p>
          <div className="flex justify-center">
            <Button variant="gold" size="lg" className="shadow-gold">
              Activate Your ID
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Join;
