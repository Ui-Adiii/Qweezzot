import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Award,
  Users,
  Shield,
  DollarSign,
  TrendingUp,
  Package,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About QWEEZZOT
            </h1>
            <p className="text-xl opacity-90">Mission Aarthik Aazadi</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">About Us</h2>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <p className="text-lg leading-relaxed">
                Welcome to{" "}
                <span className="font-semibold text-primary">
                  QWEEZZOT Private Limited
                </span>
                , a growth-driven company empowering every household with
                financial freedom through opportunity, innovation, and
                transparency.
              </p>

              <p className="text-lg leading-relaxed">
                We create employment and income opportunities by offering a
                low-investment startup model suitable for individuals, families,
                and aspiring entrepreneurs.
              </p>

              <Card className="my-8 border-primary/20 shadow-soft">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary">
                    Why QWEEZZOT
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span>
                        35+ high-quality everyday-use products with earning
                        potential
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span>
                        Transparent BP-based income distribution system
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span>
                        Fully digital dashboard for real-time business tracking
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span>
                        Free business training and guidance for growth
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <p className="text-lg leading-relaxed">
                Our transparent systems, ethical practices, and consistent value
                delivery help individuals build scalable and sustainable
                businesses with confidence and trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Mission & Vision
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-soft hover:shadow-gold transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                    <Target className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Empower</h3>
                  <p className="text-muted-foreground">
                    Sustainable income through transparent business models
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft hover:shadow-gold transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                    <Eye className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Growth</h3>
                  <p className="text-muted-foreground">
                    Scalable employment with digital tools and training
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft hover:shadow-gold transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Trust</h3>
                  <p className="text-muted-foreground">
                    Ethical practices and transparent BP system
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft hover:shadow-gold transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Community</h3>
                  <p className="text-muted-foreground">
                    Growth and success for everyone together
                  </p>
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
            Begin Your Path to Success
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Register, complete your KYC, choose a pack, and share more to earn
            more with QWEEZZOT.
          </p>
          <Button variant="gold" size="lg" asChild className="shadow-gold">
            <Link to="/join">
              Join Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
