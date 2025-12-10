import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Rocket, Target, Star } from "lucide-react";
import { motion } from "framer-motion";

const FastTrack: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <Zap className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          Fast Track
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-xl text-blue-900">
              Accelerate Your Success
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              Fast track your way to higher rankings and increased earnings with
              our accelerated programs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
                  <CardContent className="p-6">
                    <motion.div
                      className="p-3 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Rocket className="h-12 w-12 text-blue-600" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2">
                      Quick Start Program
                    </h3>
                    <p className="text-2xl font-bold text-blue-700 mb-4">
                      ₹15,000
                    </p>
                    <ul className="text-sm text-blue-800 space-y-2 mb-4">
                      <li>• Instant Bronze ranking</li>
                      <li>• 30-day mentorship</li>
                      <li>• Marketing materials</li>
                      <li>• Training sessions</li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
                      <Rocket className="h-4 w-4 mr-2" />
                      Join Quick Start
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
                  <CardContent className="p-6">
                    <motion.div
                      className="p-3 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Target className="h-12 w-12 text-blue-600" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2">
                      Elite Fast Track
                    </h3>
                    <p className="text-2xl font-bold text-blue-700 mb-4">
                      ₹50,000
                    </p>
                    <ul className="text-sm text-blue-800 space-y-2 mb-4">
                      <li>• Instant Silver ranking</li>
                      <li>• 90-day personal coach</li>
                      <li>• Premium product kit</li>
                      <li>• VIP support access</li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
                      <Star className="h-4 w-4 mr-2" />
                      Join Elite Track
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-bold text-blue-900 mb-2">
                      Fast Ranking
                    </h4>
                    <p className="text-blue-800 text-sm">
                      Achieve higher ranks in weeks, not months
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-bold text-blue-900 mb-2">
                      Expert Mentorship
                    </h4>
                    <p className="text-blue-800 text-sm">
                      Learn from top performers in the industry
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-bold text-blue-900 mb-2">
                      Premium Resources
                    </h4>
                    <p className="text-blue-800 text-sm">
                      Access exclusive tools and materials
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FastTrack;
