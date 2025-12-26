import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  TrendingUp,
  Star,
  Sparkles,
  Users,
  Award,
  Leaf,
  Target,
  Zap,
  ArrowRight,
} from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  description: string;
  bgColor: string;
  accentColor: string;
  icon: ReactNode;
  features: string[];
  image: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const slides: Slide[] = [
    {
      id: 1,
      title: "QWEEZZOT",
      subtitle: "Mission Aarthik Aazadi",
      content: "Private Limited Company",
      description:
        "Join a transparent, growth-driven business platform designed to empower households with sustainable income opportunities.",
      bgColor: "from-blue-900 via-blue-900 to-blue-800",
      accentColor: "text-blue-300",
      icon: <TrendingUp className="w-16 h-16" />,
      features: ["Low Investment Model", "Weekly Payouts", "Scalable Income"],
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Everyday Products",
      subtitle: "Quality You Can Trust",
      content: "Value for Daily Life",
      description:
        "Explore a wide range of high-quality everyday-use products designed to deliver value and earning potential.",
      bgColor: "from-blue-800 via-blue-800 to-blue-700",
      accentColor: "text-blue-300",
      icon: <Leaf className="w-16 h-16" />,
      features: ["35+ Products", "Quality Tested", "Regular Demand"],
      image:
        "https://images.pexels.com/photos/4066292/pexels-photo-4066292.jpeg",
    },
    {
      id: 3,
      title: "Income & Growth",
      subtitle: "Unlimited Earning Opportunity",
      content: "Build Your Future",
      description:
        "Earn through direct income, matching income, leadership rewards, and a transparent BP-based system.",
      bgColor: "from-blue-900 via-blue-900 to-blue-800",
      accentColor: "text-cyan-300",
      icon: <Award className="w-16 h-16" />,
      features: ["Binary Matching", "Rank Income", "Leadership Rewards"],
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      title: "Strong Community",
      subtitle: "Grow Together",
      content: "Support & Training",
      description:
        "Be part of a supportive community backed by free training, digital tools, and strong leadership guidance.",
      bgColor: "from-blue-800 via-blue-700 to-blue-600",
      accentColor: "text-lime-300",
      icon: <Users className="w-16 h-16" />,
      features: ["Free Training", "Team Support", "Digital Dashboard"],
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80",
    },
  ];


  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, isAutoPlaying]);

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToPrev = (): void => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToNext = (): void => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-[75vh] min-h-[550px] overflow-hidden rounded-b-2xl shadow-2xl max-sm:h-[90vh]">
      <AnimatePresence mode="wait" custom={currentSlide}>
        <motion.div
          key={currentSlide}
          custom={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
          }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgColor}`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40"></div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(34,197,94,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
          </div>

          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Content */}
                <motion.div
                  className="lg:col-span-8 text-center lg:text-left space-y-6"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-500/30"
                  >
                    <Sparkles className="w-4 h-4 text-blue-300" />
                    <span className="text-sm font-medium text-blue-300">
                      {slides[currentSlide].subtitle}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>

                  {/* Content */}
                  <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className={`text-2xl md:text-3xl font-bold ${slides[currentSlide].accentColor} mb-3`}
                  >
                    {slides[currentSlide].content}
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-lg text-white/90 leading-relaxed max-w-2xl"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  {/* Features */}
                  <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex flex-wrap gap-3 justify-center lg:justify-start"
                  >
                    {slides[currentSlide].features.map((feature, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        {feature}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* CTA & Website */}
                  <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 items-center pt-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-full overflow-hidden flex items-center gap-2"
                    >
                      <span className="relative z-10">Get Started</span>
                      <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-black/30 backdrop-blur-sm px-5 py-3 rounded-xl border border-blue-500/20"
                    >
                      <p className="text-white font-semibold text-sm tracking-wide">
                        www.myosfigo.co.in
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Right Icon */}
                <motion.div
                  className="lg:col-span-4 flex justify-center lg:justify-end"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.4,
                  }}
                >
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 shadow-xl"
                    >
                      <div className={slides[currentSlide].accentColor}>
                        {slides[currentSlide].icon}
                      </div>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div
                      animate={{ y: [-8, 8, -8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-blue-400/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-300/30"
                    >
                      <Zap className="w-3 h-3 text-blue-300" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        onClick={goToPrev}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full transition-all z-10 backdrop-blur-sm border border-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      <motion.button
        onClick={goToNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full transition-all z-10 backdrop-blur-sm border border-white/30"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-blue-400 scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={currentSlide}
        />
      </div>

      {/* Slide Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 z-10"
      >
        <span className="text-white text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </span>
      </motion.div>
    </div>
  );
};

export default HeroSlider;
