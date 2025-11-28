import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, TrendingUp, Calendar, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const SelfRepurchase: React.FC = () => {
  const repurchaseHistory = [
    {
      date: '2024-11-01',
      amount: 2500,
      volume: 2500,
      status: 'Completed'
    },
    {
      date: '2024-10-01',
      amount: 2000,
      volume: 2000,
      status: 'Completed'
    },
    {
      date: '2024-09-01',
      amount: 1500,
      volume: 1500,
      status: 'Completed'
    }
  ];

  const totalRepurchase = repurchaseHistory.reduce((sum, item) => sum + item.amount, 0);
  const totalVolume = repurchaseHistory.reduce((sum, item) => sum + item.volume, 0);

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
          Self Total Repurchase
        </h1>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
            <CardContent className="p-6 text-center">
              <motion.div
                className="p-3 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </motion.div>
              <p className="text-2xl font-bold text-emerald-700">₹{totalRepurchase.toLocaleString()}</p>
              <p className="text-sm text-emerald-800 font-medium">Total Repurchase</p>
            </CardContent>
          </Card>
        </motion.div>
        
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
                <Target className="h-8 w-8 text-emerald-600" />
              </motion.div>
              <p className="text-2xl font-bold text-emerald-700">{totalVolume.toLocaleString()}</p>
              <p className="text-sm text-emerald-800 font-medium">Total Volume</p>
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
                <Calendar className="h-8 w-8 text-emerald-600" />
              </motion.div>
              <p className="text-2xl font-bold text-emerald-700">{repurchaseHistory.length}</p>
              <p className="text-sm text-emerald-800 font-medium">Total Months</p>
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
                <RotateCcw className="h-8 w-8 text-emerald-600" />
              </motion.div>
              <p className="text-2xl font-bold text-emerald-700">₹2,500</p>
              <p className="text-sm text-emerald-800 font-medium">Last Repurchase</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-xl text-emerald-900">Repurchase History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {repurchaseHistory.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="border-emerald-200/50 bg-white/60 backdrop-blur-md shadow-md ring-1 ring-amber-400/10 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/30">
                            <RotateCcw className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-emerald-900">Monthly Repurchase</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Calendar className="h-4 w-4 text-emerald-600" />
                              <span className="text-sm text-emerald-700">{item.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="font-bold text-emerald-700">₹{item.amount.toLocaleString()}</p>
                            <p className="text-sm text-emerald-700/70">Amount</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-emerald-700">{item.volume.toLocaleString()}</p>
                            <p className="text-sm text-emerald-700/70">Volume</p>
                          </div>
                          <Badge className="bg-gradient-to-r from-emerald-600 to-amber-500 text-white ring-1 ring-amber-300/30 backdrop-blur-sm">
                            {item.status}
                          </Badge>
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
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardContent className="p-6">
            <h3 className="font-bold text-emerald-900 mb-4">Repurchase Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-emerald-800 mb-2">Volume Benefits:</h4>
                <ul className="text-emerald-800 text-sm space-y-1">
                  <li>• Maintain active status</li>
                  <li>• Qualify for bonuses</li>
                  <li>• Team volume contribution</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-emerald-800 mb-2">Earning Benefits:</h4>
                <ul className="text-emerald-800 text-sm space-y-1">
                  <li>• Continue commission earnings</li>
                  <li>• Rank maintenance</li>
                  <li>• Leadership bonuses</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SelfRepurchase;
