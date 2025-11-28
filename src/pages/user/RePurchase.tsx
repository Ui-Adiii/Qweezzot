import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, RefreshCw, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const RePurchase: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <RotateCcw className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
          Re Purchase
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-xl text-emerald-900">Maintain Your Active Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700">
              Keep your account active and continue earning by making regular repurchases.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="p-3 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Package className="h-12 w-12 text-emerald-600" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-emerald-900 mb-2">Basic Repurchase</h3>
                    <p className="text-2xl font-bold text-emerald-700 mb-4">₹1,000</p>
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Repurchase
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
                <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="p-3 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Package className="h-12 w-12 text-emerald-600" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-emerald-900 mb-2">Standard Repurchase</h3>
                    <p className="text-2xl font-bold text-emerald-700 mb-4">₹2,500</p>
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Repurchase
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
                <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="p-3 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Package className="h-12 w-12 text-emerald-600" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-emerald-900 mb-2">Premium Repurchase</h3>
                    <p className="text-2xl font-bold text-emerald-700 mb-4">₹5,000</p>
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Repurchase
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-amber-200/50 bg-gradient-to-br from-amber-50/70 to-yellow-50/50 backdrop-blur-sm rounded-lg ring-1 ring-amber-400/10">
                <CardContent className="p-4">
                  <h4 className="font-bold text-emerald-900 mb-2">Repurchase Benefits:</h4>
                  <ul className="text-emerald-800 text-sm space-y-1">
                    <li>• Maintain active status</li>
                    <li>• Continue earning commissions</li>
                    <li>• Qualify for bonuses</li>
                    <li>• Access to new products</li>
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

export default RePurchase;
