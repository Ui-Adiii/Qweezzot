import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authAPI } from "@/api/auth";
import { toast } from "sonner";
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Award,
  Download,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";

interface IncomeRecord {
  id: string;
  type: "referral" | "level" | "matching" | "roi";
  amount: number;
  description: string;
  date: string;
  from?: string;
  status: "paid" | "pending";
}

interface IncomeStats {
  totalIncome: number;
  thisMonth: number;
  thisWeek: number;
  today: number;
}

const IncomeHistory = () => {
  const [loading, setLoading] = useState(true);
  const [incomeStats, setIncomeStats] = useState<IncomeStats>({
    totalIncome: 0,
    thisMonth: 0,
    thisWeek: 0,
    today: 0,
  });

  const [incomeHistory, setIncomeHistory] = useState<IncomeRecord[]>([]);

  useEffect(() => {
    fetchIncomeData();
  }, []);

  const fetchIncomeData = async () => {
    try {
      setLoading(true);
      const { authAPI } = await import("@/api/auth");
      const response = await authAPI.getIncomeHistory();

      if (response.success && response.data) {
        setIncomeStats(
          response.data.stats || {
            totalIncome: 0,
            thisMonth: 0,
            thisWeek: 0,
            today: 0,
          }
        );
        setIncomeHistory(response.data.history || []);
      } else {
        setIncomeStats({
          totalIncome: 0,
          thisMonth: 0,
          thisWeek: 0,
          today: 0,
        });
        setIncomeHistory([]);
      }
    } catch (error: any) {
      console.error("Failed to load income data:", error);
      toast.error("Failed to load income data");
      setIncomeStats({
        totalIncome: 0,
        thisMonth: 0,
        thisWeek: 0,
        today: 0,
      });
      setIncomeHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const getIncomeTypeColor = (type: string) => {
    switch (type) {
      case "referral":
        return "bg-blue-100/70 text-blue-800 ring-1 ring-blue-300/30";
      case "level":
        return "bg-blue-100/70 text-blue-800 ring-1 ring-blue-300/30";
      case "matching":
        return "bg-amber-100/70 text-amber-800 ring-1 ring-amber-300/30";
      case "roi":
        return "bg-amber-100/70 text-amber-800 ring-1 ring-amber-300/30";
      default:
        return "bg-gray-100/70 text-gray-600 ring-1 ring-gray-300/30";
    }
  };

  const getIncomeTypeLabel = (type: string) => {
    switch (type) {
      case "referral":
        return "Referral";
      case "level":
        return "Level Income";
      case "matching":
        return "Matching Bonus";
      case "roi":
        return "ROI";
      default:
        return type;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Income History
          </h1>
          <p className="text-blue-700/70 mt-1">
            Track your earnings and commissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-blue-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-blue-50/50"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Income Statistics with Glass Effect */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Income",
            value: incomeStats.totalIncome,
            icon: TrendingUp,
            color: "blue",
          },
          {
            label: "This Month",
            value: incomeStats.thisMonth,
            icon: Calendar,
            color: "blue",
          },
          {
            label: "This Week",
            value: incomeStats.thisWeek,
            icon: Award,
            color: "amber",
          },
          {
            label: "Today",
            value: incomeStats.today,
            icon: DollarSign,
            color: "amber",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-amber-400/10 border-l-4 border-blue-500">
              <CardHeader className="pb-2">
                <CardTitle
                  className={`flex items-center gap-2 text-${stat.color}-600`}
                >
                  <stat.icon className="h-5 w-5" />
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`text-2xl font-bold text-${stat.color}-700`}
                >
                  {formatCurrency(stat.value)}
                </motion.div>
                <p className="text-sm text-blue-700/70 mt-1">
                  {stat.label === "This Month"
                    ? "January 2024"
                    : stat.label === "This Week"
                    ? "Week 3"
                    : stat.label === "Today"
                    ? "Jan 15, 2024"
                    : "All time earnings"}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Income History Table with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Recent Income
            </CardTitle>
            <CardDescription className="text-blue-700/70">
              Your latest earnings and commissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {incomeHistory.length > 0 ? (
              <div className="space-y-4">
                {incomeHistory.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.01, x: 5 }}
                    className="flex justify-between items-center p-4 border border-blue-200/50 bg-white/60 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-200 ring-1 ring-amber-400/5"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full backdrop-blur-sm ${getIncomeTypeColor(
                          record.type
                        )}`}
                      >
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800">
                          {record.description}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-blue-700/70 mt-1">
                          <Badge
                            className={`px-2 py-1 rounded text-xs font-medium backdrop-blur-sm ${getIncomeTypeColor(
                              record.type
                            )}`}
                          >
                            {getIncomeTypeLabel(record.type)}
                          </Badge>
                          {record.from && (
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              From: {record.from}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">
                        +{formatCurrency(record.amount)}
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <span className="text-blue-700/70">{record.date}</span>
                        <Badge
                          className={`px-2 py-1 rounded text-xs font-medium backdrop-blur-sm ${
                            record.status === "paid"
                              ? "bg-blue-100/70 text-blue-800 ring-1 ring-blue-300/30"
                              : "bg-amber-100/70 text-amber-800 ring-1 ring-amber-300/30"
                          }`}
                        >
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-blue-700/70">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50 text-blue-600" />
                <p>No income records yet</p>
                <p className="text-sm">Your earnings will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Income Breakdown Chart with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-blue-800">Income Breakdown</CardTitle>
            <CardDescription className="text-blue-700/70">
              Distribution of your income sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Referral Income", value: "45%", color: "blue" },
                { label: "Level Income", value: "30%", color: "blue" },
                { label: "Matching Bonus", value: "20%", color: "amber" },
                { label: "ROI", value: "5%", color: "amber" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-200/50 ring-1 ring-amber-400/10"
                >
                  <div className={`text-2xl font-bold text-${item.color}-600`}>
                    {item.value}
                  </div>
                  <p className="text-sm text-blue-700/70 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default IncomeHistory;
