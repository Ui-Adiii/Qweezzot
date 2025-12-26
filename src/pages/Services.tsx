import { Link } from "react-router-dom";
import {
  DollarSign,
  Users,
  Gift,
  Wallet,
  TrendingUp,
  Award,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  const features = [
    {
      icon: DollarSign,
      title: "Direct Sponsor Income",
      description:
        "Earn instantly when you introduce new members and help them begin their business journey with QWEEZZOT.",
    },
    {
      icon: Users,
      title: "Matching Income (Binary)",
      description:
        "Pure binary payout system where income is generated only on pair matching with complete transparency.",
    },
    {
      icon: Gift,
      title: "Rank Achievement Income",
      description:
        "Achieve higher ranks and unlock increased income as your total business volume grows.",
    },
    {
      icon: Wallet,
      title: "Weekly Payout System",
      description:
        "Enjoy timely and consistent weekly payouts with no unnecessary deductions or bonus complications.",
    },
    {
      icon: TrendingUp,
      title: "Leadership & Royalty Income",
      description:
        "Earn additional income through leadership bonuses and royalty rewards for long-term growth.",
    },
    {
      icon: Award,
      title: "Rewards & Tour Fund",
      description:
        "Qualify for bike, car, international trips, and special performance-based rewards.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Business Plan
            </h1>
            <p className="text-xl opacity-90">Mission Aarthik Aazadi</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Transparent & Simple Income System
            </h2>
            <p className="text-xl text-muted-foreground">
              QWEEZZOT follows a fair BP-based business model designed to reward
              hard work, leadership, and consistency without confusion.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-none shadow-soft hover:shadow-gold transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Income Breakdown */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              BP Income System
            </h2>

            <div className="space-y-6">
              <Card className="border-primary/20 shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary flex-shrink-0">
                      <span className="text-xl font-bold text-primary-foreground">
                        1
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">BP Value</h3>
                      <p className="text-muted-foreground">
                        1 BP = ₹5, ensuring clear and transparent income
                        calculation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary flex-shrink-0">
                      <span className="text-xl font-bold text-primary-foreground">
                        2
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Pair Matching</h3>
                      <p className="text-muted-foreground">
                        Income is generated only when left and right teams are
                        equally matched in BP.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary flex-shrink-0">
                      <span className="text-xl font-bold text-primary-foreground">
                        3
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Matching Example
                      </h3>
                      <p className="text-muted-foreground">
                        Left Team 100 BP + Right Team 100 BP = 200 BP = ₹1000
                        income.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary flex-shrink-0">
                      <span className="text-xl font-bold text-primary-foreground">
                        4
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Level Income</h3>
                      <p className="text-muted-foreground">
                        Higher levels unlock increased matching income based on
                        weak-leg BP qualification.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary flex-shrink-0">
                      <span className="text-xl font-bold text-primary-foreground">
                        5
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Weekly Payout</h3>
                      <p className="text-muted-foreground">
                        Payouts are processed weekly with mandatory KYC and full
                        compliance to company policies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Begin Your Success Journey
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Register, complete KYC, choose a pack, and start building your
            income with QWEEZZOT today.
          </p>
          <Button variant="gold" size="lg" asChild className="shadow-gold">
            <Link to="/join">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
