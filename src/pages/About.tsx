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
              About Osfigo
            </h1>
            <p className="text-xl opacity-90">
              Jharkhand's First Direct Selling Company
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <p className="text-lg leading-relaxed">
                Welcome to{" "}
                <span className="font-semibold text-primary">
                  Osfigo (OPC) Pvt. Ltd.
                </span>
                , where dreams transform into reality through dedication,
                innovation, and the power of community.
              </p>

              <p className="text-lg leading-relaxed">
                As Jharkhand's pioneering direct selling company, we stand at
                the intersection of wellness and opportunity. Our mission is
                simple yet profound: to empower individuals with premium
                Ayurvedic products while creating sustainable income streams
                through an equitable business model.
              </p>

              <Card className="my-8 border-primary/20 shadow-soft">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary">
                    Why We Exist
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-foreground">
                        To provide world-class Ayurvedic wellness products that
                        enhance health naturally
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-foreground">
                        To offer an unmatched compensation plan that rewards
                        effort and dedication
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-foreground">
                        To build a community where success is shared and
                        celebrated together
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-foreground">
                        To champion the timeless wisdom of Ayurveda in modern
                        wellness
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <p className="text-lg leading-relaxed">
                We believe that everyone deserves access to products that truly
                nurture well-being, and everyone deserves the opportunity to
                build financial independence. These twin pillars—Health and
                Wealth—form the foundation of everything we do.
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
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-none shadow-soft hover:shadow-gold transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                    <Target className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Mission</h3>
                  <p className="text-muted-foreground">
                    Empower lives through wellness and opportunity
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft hover:shadow-gold transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                    <Eye className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Vision</h3>
                  <p className="text-muted-foreground">
                    Leading wellness revolution across India
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-soft hover:shadow-gold transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Quality</h3>
                  <p className="text-muted-foreground">
                    Premium Ayurvedic products with guaranteed results
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
                    Success is together for you and your teams
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Leadership Message
            </h2>

            <Card className="border-primary/20 shadow-soft">
              <CardContent className="pt-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-40 h-40 rounded-full bg-gradient-primary flex items-center justify-center text-6xl font-bold text-primary-foreground">
                      ZK
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Mr. Zaid Khan</h3>
                    <p className="text-primary font-semibold mb-6">
                      Managing Director
                    </p>

                    <div className="space-y-4 text-foreground">
                      <p className="leading-relaxed">
                        "Welcome to Osfigo! I am honored to lead a company that
                        stands for more than just business—it stands for
                        transformation, empowerment, and shared success."
                      </p>

                      <p className="leading-relaxed">
                        "Our journey began with a simple belief: that
                        traditional Ayurvedic wisdom combined with modern
                        business practices can create unprecedented
                        opportunities for individuals and families across
                        Jharkhand and beyond."
                      </p>

                      <p className="leading-relaxed">
                        "What sets us apart is our commitment to you—our
                        partners. We've designed our compensation plan to ensure
                        that your dedication is recognized and rewarded fairly.
                        Remember, success is not a solo journey; it's something
                        we achieve together, as a team."
                      </p>

                      <blockquote className="border-l-4 border-primary pl-4 italic text-lg my-6 text-primary">
                        "Success is together for you and your teams."
                      </blockquote>

                      <p className="leading-relaxed">
                        "I invite you to join this movement—not just to build a
                        business, but to build a better future for yourself and
                        your loved ones. Together, we will prove that dreams do
                        come true."
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Management Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Our Dedicated Support Team
              </h2>
              <p className="text-xl text-muted-foreground">
                A team of experts committed to your success and satisfaction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Doctor Support",
                  description:
                    "Professional medical guidance and consultation for product recommendations and wellness advice.",
                },
                {
                  icon: Shield,
                  title: "Grievance & Redressal",
                  description:
                    "Dedicated team to address your concerns and ensure timely resolution of any issues.",
                },
                {
                  icon: DollarSign,
                  title: "Account Department",
                  description:
                    "Efficient management of transactions, payouts, and financial queries with complete transparency.",
                },
                {
                  icon: TrendingUp,
                  title: "Marketing Department",
                  description:
                    "Strategic support and resources to help you grow your business effectively.",
                },
                {
                  icon: Award,
                  title: "Admin Department",
                  description:
                    "Comprehensive administrative support for all your operational needs and queries.",
                },
                {
                  icon: Package,
                  title: "Logistic Department",
                  description:
                    "Reliable product delivery and tracking to ensure your orders reach you safely and on time.",
                },
              ].map((dept, index) => (
                <Card
                  key={index}
                  className="border-none shadow-soft hover:shadow-gold transition-all duration-300 hover:-translate-y-2"
                >
                  <CardHeader>
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                      <dept.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{dept.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{dept.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Join Our Mission?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Be part of a movement that's transforming lives through wellness and
            opportunity.
          </p>
          <Button variant="gold" size="lg" asChild className="shadow-gold">
            <Link to="/join">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
