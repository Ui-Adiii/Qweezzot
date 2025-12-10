import React from "react";
import { Users, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const WhyByoteas = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Multiple Earning Sources",
      description:
        "Earn through multiple channels with our attractive compensation plan",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Team Performance Bonuses",
      description: "Grow together and earn rewards based on team achievements",
      gradient: "from-blue-500 to-blue-500",
    },
    {
      icon: Sparkles,
      title: "Premium Products",
      description: "Access to world-class Ayurvedic wellness products",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Why Choose Us
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
            Why Choose <span className="text-amber-600">Osfigo?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join Jharkhand's premier direct selling company and unlock your
            potential with our innovative business model
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 hover:-translate-y-3 overflow-hidden"
            >
              {/* Animated Border Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              <CardContent className="pt-10 pb-8 px-6 relative z-10">
                <div className="flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div className={`mb-6 relative`}>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-30 group-hover:opacity-50`}
                    ></div>
                    <div
                      className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-transform duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-amber-600 transition-colors duration-300 cursor-pointer">
                    Learn more
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </CardContent>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="group relative bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
            <div className="absolute inset-0 bg-white/20 rounded-2xl translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative">Start Your Journey Today</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyByoteas;
