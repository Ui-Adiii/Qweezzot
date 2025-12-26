import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We’re here to support your journey with QWEEZZOT. Reach out to us
            anytime.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Phone,
                title: "Phone Support",
                value: "xxx-xxx-xxxx",
                sub: "Mon – Sat | 10 AM – 6 PM",
              },
              {
                icon: Mail,
                title: "Email Address",
                value: "care@qweezzot.com",
                sub: "We reply within 24 hours",
              },
              {
                icon: MapPin,
                title: "Head Office",
                value: "Jaipur, Rajasthan, India",
                sub: "Sector 11, Pratap Nagar",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="border-none shadow-soft hover:shadow-gold transition-all duration-300"
              >
                <CardContent className="pt-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="font-semibold">{item.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.sub}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-xl text-muted-foreground">
                Have questions? Fill out the form and our team will contact you.
              </p>
            </div>

            <Card className="border-primary/20 shadow-soft">
              <CardContent className="p-8">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input placeholder="Full Name" required />
                  <Input placeholder="Email Address" type="email" required />
                  <Input placeholder="Phone Number" type="tel" required />
                  <Input placeholder="Subject" required />

                  <div className="md:col-span-2">
                    <Textarea
                      placeholder="Write your message here..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="md:col-span-2 text-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-sky-600 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white shadow-gold px-8"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <Clock className="h-6 w-6 text-primary" />
            <p className="text-lg font-medium">
              Business Hours: Monday – Saturday | 10:00 AM – 6:00 PM
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
