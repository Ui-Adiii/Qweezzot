import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  Shield,
  Clock,
  DollarSign,
} from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const stats = [
    { value: "15,000+", label: "Active Members" },
    { value: "3,000+", label: "Business Partners" },
    { value: "₹2.5 Cr+", label: "Weekly Payouts" },
    { value: "35+", label: "High-Demand Products" },
  ];

return (
  <section className="relative min-h-screen bg-black overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source
          src="https://www.pexels.com/download/video/5743177/"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/60" />
    </div>

    {/* Content */}
    <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-500/10 border border-sky-400/30 mb-6 mx-auto"
        >
          <Award className="w-4 h-4 text-sky-400" />
          <span className="text-sky-300 text-sm font-semibold">
            Mission Aarthik Aazadi
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-white leading-tight"
        >
          Build Your
          <span className="block bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
            Financial Freedom
          </span>
          With QWEEZZOT
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg md:text-xl text-sky-100 leading-relaxed max-w-3xl mx-auto"
        >
          A transparent, low-investment business platform empowering households
          with sustainable income, digital systems, and long-term growth.
        </motion.p>

        {/* Trust Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-sky-200"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-400" />
            Government Registered
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-400" />
            Weekly Payouts
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-sky-400" />
            Transparent BP System
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
        >
          <button
            onClick={() => navigate("/join")}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold flex items-center justify-center gap-3 hover:scale-105 transition"
          >
            Start Your Business
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate("/business-plan")}
            className="px-8 py-4 rounded-full border border-sky-400 text-sky-300 hover:bg-sky-400/10 transition"
          >
            View Business Plan
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-sky-400">
                {stat.value}
              </div>
              <div className="text-xs text-sky-200 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Website */}
        <div className="mt-10 text-sky-300 font-medium">
          🌐 www.qweezzot.co.in
        </div>
      </div>
    </div>
  </section>
);

};

export default Hero;
