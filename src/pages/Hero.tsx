import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  Leaf,
  Target,
  Zap,
  Play,
  Shield,
  Clock,
  DollarSign,
} from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    { value: "15,427+", label: "Active Members" },
    { value: "3,241+", label: "Business Owners" },
    { value: "₹2.5Cr+", label: "Total Earnings" },
    { value: "100%", label: "Natural Products" },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/api/placeholder/1920/1080"
        >
          <source
            src="https://www.pexels.com/download/video/5480231/"
            type="video/mp4"
          />
          <source
            src="https://www.pexels.com/download/video/4132710/"
            type="video/webm"
          />
        </video>
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/100  via-black/80 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-500/20 border border-blue-500/30"
            >
              <Award className="w-5 h-5 text-blue-300" />
              <span className="text-blue-300 font-semibold text-sm">
                Jharkhand's 1st Direct Selling Company
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
                  Osfigo
                </span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl text-white font-light">
                  Management Private Limited
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl text-blue-100 max-w-xl leading-relaxed"
              >
                Start your entrepreneurial journey with zero investment. Join
                thousands building successful businesses with 100% natural
                products.
              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className="text-2xl font-bold text-blue-300 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap gap-6 text-blue-200 text-sm pt-4"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Government Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Instant Support</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-400" />
                <span>Daily Payouts</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main Card */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-3xl p-8 backdrop-blur-sm border border-blue-500/30"
            >
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/30"
              >
                <TrendingUp className="w-8 h-8 text-blue-300" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/30"
              >
                <Users className="w-6 h-6 text-blue-300" />
              </motion.div>

              {/* Content */}
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Leaf className="w-12 h-12 text-white" />
                </motion.div>

                <h3 className="text-3xl font-bold text-white mb-2">
                  Your Business Journey
                </h3>

                <p className="text-blue-200 text-lg leading-relaxed">
                  Join India's fastest growing community of entrepreneurs. Start
                  with zero investment and build your empire.
                </p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // onClick={() => navigate("/register")}
                    className="duration-300 relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full overflow-hidden flex items-center justify-center gap-3 cursor-pointer hover:text-black"
                  >
                    <span>Start Your Business Today</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/business-plan")}
                    className="px-8 py-4 bg-transparent border-2 border-blue-400 text-blue-300 font-bold rounded-full hover:bg-blue-400/10 transition-colors"
                  >
                    View Business Plan
                  </motion.button>
                </motion.div>

                {/* Website URL */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="pt-6 border-t border-blue-500/20"
                >
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full border border-blue-500/30">
                    <span className="text-blue-300">🌐</span>
                    <span className="text-white font-medium text-lg">
                      www.myosfigo.co.in
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 opacity-20">
              <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-40"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default Hero;
