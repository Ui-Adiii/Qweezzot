import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  DollarSign,
  Award,
  Download,
  RefreshCw,
} from "lucide-react";
import { authAPI } from "@/api/auth";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface IncomeRecord {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
  status: string;
}

const IncomeHistory: React.FC = () => {
  const [incomeData, setIncomeData] = useState({
    stats: {
      totalIncome: 0,
      thisMonth: 0,
      thisWeek: 0,
      today: 0,
    },
    history: [] as IncomeRecord[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncomeData();
  }, []);

  const fetchIncomeData = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getIncomeHistory();

      if (response.success && response.data) {
        setIncomeData(response.data);
      } else {
        setIncomeData({
          stats: {
            totalIncome: 0,
            thisMonth: 0,
            thisWeek: 0,
            today: 0,
          },
          history: [],
        });
      }
    } catch (error: any) {
      console.error("Failed to load income history:", error);
      toast.error("Failed to load income history");
      setIncomeData({
        stats: {
          totalIncome: 0,
          thisMonth: 0,
          thisWeek: 0,
          today: 0,
        },
        history: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getIncomeTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "referral":
        return "text-blue-600 bg-blue-100";
      case "level":
        return "text-blue-600 bg-blue-100";
      case "matching":
        return "text-purple-600 bg-purple-100";
      case "roi":
        return "text-orange-600 bg-orange-100";
      case "commission":
        return "text-indigo-600 bg-indigo-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Income History
          </h1>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={fetchIncomeData}
            disabled={loading}
            className="bg-white/70 backdrop-blur-sm border-blue-200/50 ring-1 ring-amber-400/10 hover:bg-blue-50/80 text-blue-800 hover:text-blue-900"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            variant="outline"
            className="bg-white/70 backdrop-blur-sm border-blue-200/50 ring-1 ring-amber-400/10 hover:bg-blue-50/80 text-blue-800 hover:text-blue-900"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
            <CardContent className="p-6 text-center">
              <motion.div
                className="p-3 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </motion.div>
              {loading ? (
                <div className="h-8 bg-blue-200/50 rounded animate-pulse mx-auto w-24 mb-2"></div>
              ) : (
                <p className="text-2xl font-bold text-blue-700 mb-2">
                  {formatCurrency(incomeData.stats.totalIncome)}
                </p>
              )}
              <p className="text-sm text-blue-800 font-medium">
                Total Earnings
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
          <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
            <CardContent className="p-6 text-center">
              <motion.div
                className="p-3 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <DollarSign className="h-8 w-8 text-blue-600" />
              </motion.div>
              {loading ? (
                <div className="h-8 bg-blue-200/50 rounded animate-pulse mx-auto w-24 mb-2"></div>
              ) : (
                <p className="text-2xl font-bold text-blue-700 mb-2">
                  {formatCurrency(incomeData.stats.thisMonth)}
                </p>
              )}
              <p className="text-sm text-blue-800 font-medium">This Month</p>
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
            <CardContent className="p-6 text-center">
              <motion.div
                className="p-3 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Award className="h-8 w-8 text-blue-600" />
              </motion.div>
              {loading ? (
                <div className="h-8 bg-blue-200/50 rounded animate-pulse mx-auto w-24 mb-2"></div>
              ) : (
                <p className="text-2xl font-bold text-blue-700 mb-2">
                  {formatCurrency(incomeData.stats.thisWeek)}
                </p>
              )}
              <p className="text-sm text-blue-800 font-medium">This Week</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
            <CardContent className="p-6 text-center">
              <motion.div
                className="p-3 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Award className="h-8 w-8 text-blue-600" />
              </motion.div>
              {loading ? (
                <div className="h-8 bg-blue-200/50 rounded animate-pulse mx-auto w-24 mb-2"></div>
              ) : (
                <p className="text-2xl font-bold text-blue-700 mb-2">
                  {formatCurrency(incomeData.stats.today)}
                </p>
              )}
              <p className="text-sm text-blue-800 font-medium">Today</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-xl text-blue-900">
              Income Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card
                    key={i}
                    className="border-blue-200/50 bg-white/60 backdrop-blur-md animate-pulse"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="h-4 bg-blue-200/50 rounded w-48"></div>
                          <div className="h-3 bg-blue-200/50 rounded w-32"></div>
                        </div>
                        <div className="h-6 bg-blue-200/50 rounded w-24"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : incomeData.history.length === 0 ? (
              <div className="text-center py-12 text-blue-700/70">
                <TrendingUp className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                <p className="text-lg font-medium">No income records found</p>
                <p className="text-sm">Your income history will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {incomeData.history.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="border-blue-200/50 bg-white/60 backdrop-blur-md shadow-md ring-1 ring-amber-400/10 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge className="bg-blue-100/70 text-blue-800 ring-1 ring-blue-300/30 backdrop-blur-sm">
                                {record.type.charAt(0).toUpperCase() +
                                  record.type.slice(1)}
                              </Badge>
                              <Badge
                                className={
                                  record.status === "completed"
                                    ? "bg-gradient-to-r from-blue-600 to-amber-500 text-white ring-1 ring-amber-300/30 backdrop-blur-sm"
                                    : "bg-gradient-to-r from-amber-500 to-yellow-500 text-white ring-1 ring-amber-300/30 backdrop-blur-sm"
                                }
                              >
                                {record.status}
                              </Badge>
                            </div>
                            <p className="font-bold text-blue-900">
                              {record.description}
                            </p>
                            <p className="text-sm text-blue-700 mt-1">
                              {new Date(record.date).toLocaleDateString(
                                "en-IN"
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-700">
                              +{formatCurrency(record.amount)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default IncomeHistory;
