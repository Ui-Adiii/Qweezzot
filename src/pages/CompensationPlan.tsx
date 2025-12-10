import { Link } from "react-router-dom";
import {
  DollarSign,
  TrendingUp,
  Award,
  Users,
  ArrowRight,
  CheckCircle,
  Gift,
  Car,
  Home,
  Plane,
  Smartphone,
  TreePine,
  Trash2,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const CompensationPlan = () => {
  // Plan data from images
  const plans = [
    {
      name: "FUSION WEALTH PLAN",
      price: "₹3999",
      bv: "1500 BV",
      products: [
        "E-Book",
        "MS Office 2024", 
        "Web Designing (HTML, CSS, JavaScript, Bootstrap) Live Classes",
        "PHP, MySQL (Video Tutorial)",
        "One-One doubt session with AI"
      ],
      breakdown: [
        { head: "GST", percentage: "18%", bv: 610 },
        { head: "Referral", percentage: "63%", bv: 945 },
        { head: "Reward (BTO)", percentage: "14%", bv: 210 },
        { head: "Swachh Bharat Mission (BTO)", percentage: "4.5%", bv: 68 },
        { head: "Tree Plantation (BTO)", percentage: "4.5%", bv: 68 },
        { head: "Rank Achiever (BTO)", percentage: "14%", bv: 599 },
        { head: "Company Profit", percentage: "", bv: 320 }
      ],
      note: "From second level, if you plant 5 trees in each level, you will be eligible for 0.5% Business Turn Over in each level and 0.5% for Clean India). 2% TDS will be deducted for KYC Approved users and 20% Non Approved users as per Government of India Guidelines"
    },
    {
      name: "PRIME CIRCLE PROGRAM",
      price: "₹800", 
      bv: "600 BV",
      products: [
        "E-Book",
        "MS Office 2024 with AI",
        "Live Classes by Industry Expert"
      ],
      breakdown: [
        { head: "Referral", percentage: "63%", bv: 378 },
        { head: "Reward (BTO)", percentage: "14%", bv: 84 },
        { head: "Swachh Bharat Mission (BTO)", percentage: "4.5%", bv: 27 },
        { head: "Tree Plantation (BTO)", percentage: "4.5%", bv: 27 },
        { head: "Rank Achiever (BTO)", percentage: "14%", bv: 84 },
        { head: "GST", percentage: "18%", bv: 122.5 },
        { head: "Company Profit", percentage: "", bv: 68.5 }
      ],
      note: "From second level, if you plant 5 trees in each level, you will be eligible for 0.5% Business Turn Over in each level and 0.5% for Clean India). 2% TDS will be deducted for KYC Approved users and 20% non-approved users as per Government of India Guidelines"
    }
  ];

  const rankStructure = [
    { rank: "Distributor", teamSize: 2, bv: "1200", level: "29%", referral: "₹174 p.p", reward: "₹50/-" },
    { rank: "Consultant", teamSize: 4, bv: "2400", level: "6%", referral: "₹36 p.p", reward: "₹30,000/- For Mobile + ₹20,000/- For Manali Trip" },
    { rank: "Sr. Consultant", teamSize: 8, bv: "4800", level: "5%", referral: "₹30 p.p", reward: "₹1,50,000/- For Bike + ₹50,000/- For Jaipur/Goa Trip + ₹50,000 For Flight Ticket + Family Health Insurance" },
    { rank: "Supervisor", teamSize: 16, bv: "9600", level: "4%", referral: "₹24 p.p", reward: "₹7,00,000/- For Car + Andaman & Nicobar Trip" },
    { rank: "Executive", teamSize: 32, bv: "19200", level: "3%", referral: "₹18 p.p", reward: "₹1.95 Cr for House in Your City + Family Trip – Dubai (6d/7n)" },
    { rank: "Sr. Executive", teamSize: 128, bv: "76800", level: "2%", referral: "₹12 p.p", reward: "₹2.5 CR For House in Your City + Family Trip – Europe" },
    { rank: "Assistant Manager", teamSize: 512, bv: "307200", level: "1%", referral: "₹6 p.p", reward: "₹5 Cr for House + Africa Trip with Family" },
    { rank: "Manager", teamSize: 2048, bv: "1228800", level: "1%", referral: "₹6 p.p", reward: "₹8 cr. for House + Europe Trip with Family" },
    { rank: "Sr. Manager", teamSize: 8192, bv: "4915200", level: "1%", referral: "₹6 p.p", reward: "₹12 cr. for House + Singapore with Cruise" },
    { rank: "Director", teamSize: 32768, bv: "19660800", level: "1%", referral: "₹6 p.p", reward: "₹15 cr. for House + Mauritius Vacay" }
  ];

  const benefits = [
    { icon: Gift, title: "Welcome Bonus", description: "25% on BV for direct referrals", color: "primary" },
    { icon: TrendingUp, title: "Repurchase Bonus", description: "10 levels deep monthly", color: "secondary" },
    { icon: TreePine, title: "Tree Plantation", description: "0.5% BTO for environmental contribution", color: "primary" },
    { icon: Trash2, title: "Swachh Bharat", description: "0.5% BTO for clean India initiative", color: "secondary" },
    { icon: Target, title: "Rank Achiever", description: "Progressive rewards for each rank", color: "primary" },
    { icon: Award, title: "Royalty Bonus", description: "Monthly payout based on company sales", color: "secondary" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-secondary text-secondary-foreground border-0 px-4 py-1 text-sm">
              Multiple Earning Streams
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Compensation Plan
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Earn through multiple channels - Direct Referral, Team Building, Rank Achievements, and Social Initiatives
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      benefit.color === 'primary' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-secondary/10 text-secondary'
                    }`}>
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Cards Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground">Select the plan that best fits your goals</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className="border-border hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardHeader className="bg-gradient-primary text-primary-foreground">
                  <CardTitle className="text-2xl font-bold flex justify-between items-center">
                    {plan.name}
                    <Badge className="bg-secondary text-secondary-foreground border-0">
                      {plan.price}
                    </Badge>
                  </CardTitle>
                  <p className="text-primary-foreground/90 font-medium">{plan.bv}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-foreground">Products Included:</h4>
                    <ul className="space-y-2">
                      {plan.products.map((product, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-foreground">Breakdown:</h4>
                    <div className="space-y-2">
                      {plan.breakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                          <span className="text-sm text-muted-foreground">{item.head}</span>
                          <div className="text-right">
                            <div className="font-medium text-foreground">{item.percentage}</div>
                            <div className="text-xs text-muted-foreground">{item.bv} BV</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
                    <p className="font-medium mb-1">Note:</p>
                    <p>{plan.note}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rank Structure Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Rank Structure & Rewards</h2>
            <p className="text-muted-foreground">Progress through ranks and unlock amazing rewards</p>
          </div>

          <Card className="border-border shadow-soft overflow-hidden">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="text-xl font-bold">Rank Progression Plan</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted hover:bg-muted">
                      <TableHead className="font-bold text-foreground">Rank</TableHead>
                      <TableHead className="font-bold text-foreground">Team Size</TableHead>
                      <TableHead className="font-bold text-foreground">BV Required</TableHead>
                      <TableHead className="font-bold text-foreground">Level %</TableHead>
                      <TableHead className="font-bold text-foreground">Referral Amount</TableHead>
                      <TableHead className="font-bold text-foreground">Rewards</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rankStructure.map((rank, index) => (
                      <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-semibold">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded ${
                              index < 3 ? 'bg-primary/10' : 
                              index < 5 ? 'bg-secondary/10' : 
                              'bg-muted'
                            }`}>
                              <Award className={`h-4 w-4 ${
                                index < 3 ? 'text-primary' : 
                                index < 5 ? 'text-secondary' : 
                                'text-muted-foreground'
                              }`} />
                            </div>
                            {rank.rank}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{rank.teamSize}</TableCell>
                        <TableCell className="font-medium text-primary">{rank.bv}</TableCell>
                        <TableCell className="font-bold text-secondary">{rank.level}</TableCell>
                        <TableCell className="font-medium">{rank.referral}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {rank.rank === "Distributor" && <Gift className="h-4 w-4 text-secondary" />}
                            {rank.rank === "Consultant" && <Smartphone className="h-4 w-4 text-primary" />}
                            {rank.rank === "Sr. Consultant" && <Car className="h-4 w-4 text-primary" />}
                            {rank.rank === "Supervisor" && <Car className="h-4 w-4 text-secondary" />}
                            {rank.rank === "Executive" && <Home className="h-4 w-4 text-primary" />}
                            {rank.rank.includes("Manager") && <Home className="h-4 w-4 text-secondary" />}
                            <span className="text-sm line-clamp-2">{rank.reward}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">Company Legality</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 100% Legal Company Registration</li>
                      <li>• Zero Joining Fees</li>
                      <li>• No Admin Charges</li>
                      <li>• Transparent TDS Deduction</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-secondary/5 border-secondary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                      <DollarSign className="h-6 w-6 text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">Tax Information</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 2% TDS for KYC Approved Users</li>
                      <li>• 20% TDS for Non-KYC Users</li>
                      <li>• As per Government of India Guidelines</li>
                      <li>• GST applicable as per plan</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Start Your Journey to Financial Freedom
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of successful members who have transformed their lives with our proven compensation plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary-dark text-secondary-foreground shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link to="/join">
                  Join Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/calculator">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Calculate Earnings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompensationPlan;