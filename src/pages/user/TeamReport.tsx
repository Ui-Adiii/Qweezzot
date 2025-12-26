import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { authAPI } from "@/api/auth";

const TeamReport: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    fetchTeamReport();
  }, []);

  const fetchTeamReport = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getTeamReport();
      if (response.success && response.data) {
        setReportData(response.data);
        console.log("Team Report Data:", response.data);
      }
    } catch (error: any) {
      console.error("Failed to load team report:", error);
      toast.error("Failed to load team report");
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-50/30 via-white to-sky-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <FileText className="h-8 w-8 text-sky-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
          Team Report
        </h1>
      </motion.div>

      {reportData && (
        <>
          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-sky-700/70 mb-1">Direct Team</p>
                    <p className="text-3xl font-bold text-sky-700">
                      {reportData.teamStats?.directTeam || 0}
                    </p>
                  </div>
                  <Users className="h-10 w-10 text-sky-600/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-sky-700/70 mb-1">Total Team</p>
                    <p className="text-3xl font-bold text-sky-700">
                      {reportData.teamStats?.totalTeam || 0}
                    </p>
                  </div>
                  <Users className="h-10 w-10 text-sky-600/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-sky-700/70 mb-1">
                      Active Members
                    </p>
                    <p className="text-3xl font-bold text-sky-600">
                      {reportData.teamStats?.activeMembers || 0}
                    </p>
                  </div>
                  <Users className="h-10 w-10 text-sky-600/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-sky-700/70 mb-1">
                      Inactive Members
                    </p>
                    <p className="text-3xl font-bold text-red-600">
                      {reportData.teamStats?.inactiveMembers || 0}
                    </p>
                  </div>
                  <Users className="h-10 w-10 text-red-600/50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sales Stats */}
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="text-xl text-sky-800 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Sales Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-sky-700/70 mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-sky-700">
                    {reportData.salesStats?.totalOrders || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-sky-700/70 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-sky-700">
                    {formatCurrency(reportData.salesStats?.totalAmount || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-sky-700/70 mb-1">Total BV</p>
                  <p className="text-2xl font-bold text-sky-700">
                    {reportData.salesStats?.totalBV || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-sky-700/70 mb-1">Total PV</p>
                  <p className="text-2xl font-bold text-sky-700">
                    {reportData.salesStats?.totalPV || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Income Stats */}
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="text-xl text-sky-800 flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Income Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-sky-700/70 mb-1">Total Income</p>
                  <p className="text-2xl font-bold text-sky-700">
                    {formatCurrency(reportData.incomeStats?.totalIncome || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-sky-700/70 mb-1">
                    Total Transactions
                  </p>
                  <p className="text-2xl font-bold text-sky-700">
                    {reportData.incomeStats?.totalTransactions || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default TeamReport;
