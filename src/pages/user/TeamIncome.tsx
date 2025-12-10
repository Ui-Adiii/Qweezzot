import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { authAPI } from "@/api/auth";

const TeamIncome: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [incomeData, setIncomeData] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    fetchTeamIncome();
  }, []);

  const fetchTeamIncome = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getTeamIncome();
      if (response.success) {
        setIncomeData(response.data || []);
        setSummary(response.summary);
      }
    } catch (error: any) {
      console.error("Failed to load team income:", error);
      toast.error("Failed to load team income");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <DollarSign className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          Team Income
        </h1>
      </motion.div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700/70 mb-1">Total Income</p>
                  <p className="text-3xl font-bold text-blue-700">
                    {formatCurrency(summary.totalIncome || 0)}
                  </p>
                </div>
                <DollarSign className="h-10 w-10 text-blue-600/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700/70 mb-1">
                    Total Transactions
                  </p>
                  <p className="text-3xl font-bold text-blue-700">
                    {summary.totalTransactions || 0}
                  </p>
                </div>
                <DollarSign className="h-10 w-10 text-blue-600/50" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">
            Income by Member
          </CardTitle>
        </CardHeader>
        <CardContent>
          {incomeData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No income data available
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Income Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Count
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {incomeData.map((income, index) => (
                    <tr
                      key={`${income.userId}-${income.incomeType}-${index}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {income.userName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {income.username}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {income.incomeType?.replace(/_/g, " ") || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-700">
                        {formatCurrency(income.totalAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {income.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamIncome;
