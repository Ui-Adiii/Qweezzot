import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Gift, Star, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const BonusDetails: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-50/30 via-white to-sky-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <Award className="h-8 w-8 text-sky-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
          Bonus Details
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
            <CardContent className="p-6 text-center">
              <motion.div
                className="p-3 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Award className="h-8 w-8 text-sky-600" />
              </motion.div>
              <p className="text-2xl font-bold text-sky-700 mb-2">₹12,500</p>
              <p className="text-sm text-sky-800 font-medium">
                Matching Bonus
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
            <CardContent className="p-6 text-center">
              <motion.div
                className="p-3 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Gift className="h-8 w-8 text-sky-600" />
              </motion.div>
              <p className="text-2xl font-bold text-sky-700 mb-2">₹8,750</p>
              <p className="text-sm text-sky-800 font-medium">Welcome Bonus</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
            <CardContent className="p-6 text-center">
              <motion.div
                className="p-3 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Star className="h-8 w-8 text-sky-600" />
              </motion.div>
              <p className="text-2xl font-bold text-sky-700 mb-2">₹5,000</p>
              <p className="text-sm text-sky-800 font-medium">
                Leadership Bonus
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
            <CardContent className="p-6 text-center">
              <motion.div
                className="p-3 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Trophy className="h-8 w-8 text-sky-600" />
              </motion.div>
              <p className="text-2xl font-bold text-sky-700 mb-2">₹15,000</p>
              <p className="text-sm text-sky-800 font-medium">
                Achievement Bonus
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-xl text-sky-900">
              Bonus Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "Binary Matching Bonus",
                  amount: 2500,
                  date: "Nov 20, 2024",
                  description: "Weekly binary matching for left-right balance",
                },
                {
                  type: "Direct Referral Bonus",
                  amount: 1500,
                  date: "Nov 18, 2024",
                  description: "Bonus for direct team member activation",
                },
                {
                  type: "Leadership Bonus",
                  amount: 3000,
                  date: "Nov 15, 2024",
                  description: "Monthly leadership performance bonus",
                },
                {
                  type: "Rank Achievement Bonus",
                  amount: 5000,
                  date: "Nov 10, 2024",
                  description: "Silver rank achievement milestone",
                },
                {
                  type: "Team Volume Bonus",
                  amount: 1800,
                  date: "Nov 8, 2024",
                  description: "Team volume milestone achievement",
                },
              ].map((bonus, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <Card className="border-sky-200/50 bg-white/60 backdrop-blur-md shadow-md ring-1 ring-amber-400/10 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/30">
                            <Award className="h-6 w-6 text-sky-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-sky-900">
                              {bonus.type}
                            </h3>
                            <p className="text-sm text-sky-800">
                              {bonus.description}
                            </p>
                            <p className="text-xs text-sky-700 mt-1">
                              {bonus.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-sky-700">
                            +₹{bonus.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-sky-700/70">Bonus</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BonusDetails;
