import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, Clock } from "lucide-react";
import { motion } from "framer-motion";

const MonthlyPurchase: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-50/30 via-white to-sky-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <Calendar className="h-8 w-8 text-sky-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
          Monthly Purchase
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-xl text-sky-900">
              Monthly Subscription Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-sky-200/50 bg-white/60 backdrop-blur-md rounded-lg ring-1 ring-amber-400/10">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sky-900">
                      Next Monthly Purchase
                    </p>
                    <p className="text-sky-700">Due: December 15, 2024</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-amber-500/90 to-yellow-500/90 text-white ring-1 ring-amber-300/30 backdrop-blur-sm">
                    Pending
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <Package className="h-12 w-12 text-sky-600" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-sky-900 mb-2">
                      Basic Monthly
                    </h3>
                    <p className="text-2xl font-bold text-sky-700 mb-2">
                      ₹500
                    </p>
                    <p className="text-sm text-sky-700 mb-4">per month</p>
                    <Button className="w-full bg-gradient-to-r from-sky-600 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
                      <Clock className="h-4 w-4 mr-2" />
                      Subscribe
                    </Button>
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
                      <Package className="h-12 w-12 text-sky-600" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-sky-900 mb-2">
                      Standard Monthly
                    </h3>
                    <p className="text-2xl font-bold text-sky-700 mb-2">
                      ₹1,000
                    </p>
                    <p className="text-sm text-sky-700 mb-4">per month</p>
                    <Button className="w-full bg-gradient-to-r from-sky-600 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
                      <Clock className="h-4 w-4 mr-2" />
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="p-3 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Package className="h-12 w-12 text-sky-600" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-sky-900 mb-2">
                      Premium Monthly
                    </h3>
                    <p className="text-2xl font-bold text-sky-700 mb-2">
                      ₹2,000
                    </p>
                    <p className="text-sm text-sky-700 mb-4">per month</p>
                    <Button className="w-full bg-gradient-to-r from-sky-600 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
                      <Clock className="h-4 w-4 mr-2" />
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
                <CardContent className="p-4">
                  <h4 className="font-bold text-sky-900 mb-2">
                    Monthly Purchase Benefits:
                  </h4>
                  <ul className="text-sky-800 text-sm space-y-1">
                    <li>• Automatic monthly qualification</li>
                    <li>• Consistent product supply</li>
                    <li>• Volume-based bonuses</li>
                    <li>• Convenient auto-delivery</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MonthlyPurchase;
