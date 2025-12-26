import { ArrowRight, Sparkles } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-sky-900 via-sky-800 to-teal-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-10"></div>

      {/* Animated Background Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-sky-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-teal-400/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-sky-400/10 rounded-full blur-xl animate-pulse delay-500"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-sky-300/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-100 text-sm font-medium mb-8 backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          Limited Time Opportunity
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Ready to{" "}
          <span className="bg-gradient-to-r from-slate-800 to-slate-800 bg-clip-text text-transparent">
            Transform
          </span>{" "}
          Your Life?
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed font-light">
          Every great success starts with a simple decision to try.{" "}
          <span className="text-sky-200 font-medium">Believe in yourself</span>{" "}
          and take the first step today.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
          {[
            { number: "5000+", label: "Active Members" },
            { number: "₹2Cr+", label: "Total Earnings" },
            { number: "50+", label: "Cities Covered" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-sky-200 mb-2">
                {stat.number}
              </div>
              <div className="text-sky-100/80 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          asChild
          className="group relative bg-gradient-to-r from-sky-500 to-teal-600 hover:from-sky-400 hover:to-teal-500 text-white px-12 py-6 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-sky-500/25 transition-all duration-300 hover:scale-105 active:scale-95 border-0"
          size="lg"
        >
          <Link to="/">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative flex items-center gap-3">
              Start Your sky Journey
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </Button>

        {/* Trust Indicator */}
        <p className="text-sky-200/70 text-sm mt-8 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></span>
          Trusted by thousands across Jharkhand
        </p>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-sky-900/50 to-transparent"></div>
    </section>
  );
};

export default CTASection;
