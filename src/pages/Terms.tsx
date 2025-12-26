import { CheckCircle, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  const terms = [
    {
      title: "KYC Requirement",
      description:
        "Completion of Know Your Customer (KYC) verification is mandatory for all members to become eligible for income payouts and withdrawals.",
    },
    {
      title: "One ID Policy",
      description:
        "Each individual is allowed to hold only one ID. Multiple accounts under the same person are strictly prohibited.",
    },
    {
      title: "Payout Schedule",
      description:
        "All eligible payouts are processed on a weekly basis, subject to company policies and verification procedures.",
    },
    {
      title: "Policy Compliance",
      description:
        "All members must follow the company’s rules, guidelines, and operational policies at all times.",
    },
    {
      title: "Zero Tolerance for Fraud",
      description:
        "Any fraudulent activity, manipulation, or misuse of the system will lead to immediate suspension or termination of the account.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="hover:text-secondary transition-colors">
              Home
            </a>
            <span>/</span>
            <span>Terms & Conditions</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl opacity-90">
              Clear guidelines designed to ensure transparency, fairness, and
              trust across the QWEEZZOT platform.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {terms.map((item, index) => (
                <Card
                  key={index}
                  className="border-none shadow-soft hover:shadow-gold transition-all duration-300"
                >
                  <CardContent className="pt-8">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary mx-auto mb-6">
              <Shield className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Commitment to Fair Practices
            </h2>
            <p className="text-lg text-muted-foreground">
              QWEEZZOT operates on ethical principles, transparent systems, and
              compliance with applicable laws. These terms exist to protect both
              the company and its members while maintaining a trustworthy
              business environment.
            </p>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto p-6 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> The company reserves the right to update or
              modify these terms and conditions at any time. Continued use of
              the platform implies acceptance of the latest version.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
