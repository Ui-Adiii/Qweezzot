import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { authAPI } from "@/api/auth";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  wallet: "purchase" | "commission" | "referral";
  status: "completed" | "processing" | "pending" | "failed";
  transactionId?: string;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getTransactions();

      if (response.success && response.data) {
        setTransactions(response.data || []);
      } else {
        setTransactions([]);
      }
    } catch (error: any) {
      console.error("Failed to load transactions:", error);
      toast.error("Failed to load transactions");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-blue-100/70 text-blue-800 ring-1 ring-blue-300/30";
      case "processing":
        return "bg-blue-100/70 text-blue-800 ring-1 ring-blue-300/30";
      case "pending":
        return "bg-amber-100/70 text-amber-800 ring-1 ring-amber-300/30";
      case "failed":
        return "bg-red-100/70 text-red-800 ring-1 ring-red-300/30";
      default:
        return "bg-gray-100/70 text-gray-600 ring-1 ring-gray-300/30";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
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
            <CreditCard className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Transactions
          </h1>
        </div>
        <div className="flex space-x-2">
          {(["all", "credit", "debit"] as const).map((f) => (
            <motion.div
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                onClick={() => setFilter(f)}
                className={`border-blue-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-blue-50/50 ${
                  filter === f
                    ? "bg-gradient-to-r from-blue-600 to-amber-500 text-white border-0"
                    : ""
                }`}
              >
                {f === "all" ? "All" : f === "credit" ? "Credits" : "Debits"}
              </Button>
            </motion.div>
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={fetchTransactions}
              disabled={loading}
              className="border-blue-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-blue-50/50"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-blue-800">
              All Transactions ({filteredTransactions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card
                    key={i}
                    className="border-blue-200/50 bg-white/60 backdrop-blur-sm animate-pulse"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-200/50 rounded-lg"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-blue-200/50 rounded w-32"></div>
                            <div className="h-3 bg-blue-200/50 rounded w-48"></div>
                          </div>
                        </div>
                        <div className="h-6 bg-blue-200/50 rounded w-24"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="text-center py-12 text-blue-700/70">
                <CreditCard className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                <p className="text-lg font-medium">No transactions found</p>
                <p className="text-sm">
                  Your transaction history will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ scale: 1.01, x: 5 }}
                  >
                    <Card className="border-blue-200/50 bg-white/60 backdrop-blur-sm hover:shadow-md transition-all duration-200 ring-1 ring-amber-400/5">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-2 rounded-lg backdrop-blur-sm ${
                                transaction.type === "credit"
                                  ? "bg-blue-100/70 ring-1 ring-blue-300/30"
                                  : "bg-red-100/70 ring-1 ring-red-300/30"
                              }`}
                            >
                              {transaction.type === "credit" ? (
                                <ArrowUpRight className="h-6 w-6 text-blue-600" />
                              ) : (
                                <ArrowDownRight className="h-6 w-6 text-red-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-blue-800">
                                {transaction.description}
                              </h3>
                              <p className="text-sm text-blue-700/70">
                                {transaction.transactionId
                                  ? `TXN#${transaction.transactionId} • `
                                  : ""}
                                {new Date(transaction.date).toLocaleDateString(
                                  "en-IN"
                                )}{" "}
                                • {transaction.wallet} wallet
                              </p>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <p
                              className={`font-bold text-lg ${
                                transaction.type === "credit"
                                  ? "text-blue-600"
                                  : "text-red-600"
                              }`}
                            >
                              {transaction.type === "credit" ? "+" : "-"}
                              {formatCurrency(transaction.amount)}
                            </p>
                            <Badge
                              className={`backdrop-blur-sm ${getStatusColor(
                                transaction.status
                              )}`}
                            >
                              {transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1)}
                            </Badge>
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

export default Transactions;
