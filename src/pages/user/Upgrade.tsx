import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Star, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const Upgrade: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <TrendingUp className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">Upgrade Package</h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-xl text-emerald-800">Upgrade Your Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-br from-emerald-50/70 to-amber-50/50 backdrop-blur-sm rounded-lg border border-emerald-200/50 ring-1 ring-amber-400/10">
              <div>
                <p className="font-semibold text-emerald-800">Current Package</p>
                <p className="text-emerald-700">Starter Package - ₹2,500</p>
              </div>
              <Badge className="bg-emerald-100/70 text-emerald-800 ring-1 ring-emerald-300/30 backdrop-blur-sm">Active</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-amber-400/10 border-l-4 border-amber-500">
                  <CardContent className="p-6 text-center">
                    <Star className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">Premium Upgrade</h3>
                    <p className="text-2xl font-bold text-amber-700 mb-4">₹2,500</p>
                    <p className="text-sm text-emerald-700/70 mb-4">Upgrade from Starter to Premium</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white shadow-lg ring-1 ring-amber-300/30">
                        Upgrade Now
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-amber-400/10 border-l-4 border-amber-500">
                  <CardContent className="p-6 text-center">
                    <Crown className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">Elite Upgrade</h3>
                    <p className="text-2xl font-bold text-amber-700 mb-4">₹7,500</p>
                    <p className="text-sm text-emerald-700/70 mb-4">Upgrade from Starter to Elite</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white shadow-lg ring-1 ring-amber-300/30">
                        Upgrade Now
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-4 bg-gradient-to-br from-emerald-50/70 to-amber-50/50 backdrop-blur-sm rounded-lg border border-emerald-200/50 ring-1 ring-amber-400/10"
            >
              <h4 className="font-semibold text-emerald-800 mb-2">Upgrade Benefits:</h4>
              <ul className="text-emerald-700 text-sm space-y-1">
                <li>• Higher commission rates</li>
                <li>• Access to premium products</li>
                <li>• Enhanced earning potential</li>
                <li>• Priority customer support</li>
              </ul>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Upgrade;
