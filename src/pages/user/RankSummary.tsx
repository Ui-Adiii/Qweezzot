import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Trophy, RefreshCw, Calendar } from "lucide-react";
import { authAPI } from "@/api/auth";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface RankHistory {
  _id: string;
  amount: number;
  description: string;
  incomeDate: string;
}

interface RankSummaryData {
  currentRank: string;
  rankHistory: RankHistory[];
  totalRankBonuses: number;
  rankUpgradeDate: string;
}

const RankSummary: React.FC = () => {
  const [data, setData] = useState<RankSummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getRankSummary();
      if (response.success) {
        setData(response.data);
      } else {
        // Set default data if no data available
        setData({
          currentRank: "Bronze",
          rankHistory: [],
          totalRankBonuses: 0,
          rankUpgradeDate: new Date().toISOString(),
        });
      }
    } catch (error: any) {
      // Only log if it's not a connection error
      if (
        error.message &&
        !error.message.includes("Failed to fetch") &&
        !error.message.includes("ERR_CONNECTION_REFUSED")
      ) {
        console.error("Failed to load rank summary:", error);
        toast.error("Failed to load rank summary");
      }
      // Set default data on error
      setData({
        currentRank: "Bronze",
        rankHistory: [],
        totalRankBonuses: 0,
        rankUpgradeDate: new Date().toISOString(),
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

  const getRankColor = (rank: string) => {
    const rankLower = rank.toLowerCase();
    if (rankLower.includes("bronze")) return "bg-amber-100 text-amber-800";
    if (rankLower.includes("silver")) return "bg-gray-100 text-gray-800";
    if (rankLower.includes("gold")) return "bg-yellow-100 text-yellow-800";
    if (rankLower.includes("platinum")) return "bg-sky-100 text-sky-800";
    if (rankLower.includes("diamond")) return "bg-purple-100 text-purple-800";
    return "bg-sky-100 text-sky-800";
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-50/30 via-white to-sky-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-lg">
            <BarChart3 className="h-8 w-8 text-sky-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
            Rank Summary
          </h1>
        </div>
        <button
          onClick={fetchData}
          className="p-2 hover:bg-sky-100 rounded-lg transition-colors"
        >
          <RefreshCw
            className={`h-5 w-5 text-sky-600 ${loading ? "animate-spin" : ""}`}
          />
        </button>
      </motion.div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : data ? (
        <>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Rank
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Badge
                  className={`text-lg px-3 py-1 ${getRankColor(
                    data.currentRank
                  )}`}
                >
                  {data.currentRank}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Rank Bonuses
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sky-600">
                  {formatCurrency(data.totalRankBonuses)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {data.rankHistory.length} rank bonuses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Rank Upgrade Date
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">
                  {data.rankUpgradeDate
                    ? new Date(data.rankUpgradeDate).toLocaleDateString("en-IN")
                    : "N/A"}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rank History</CardTitle>
            </CardHeader>
            <CardContent>
              {data.rankHistory.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No rank history found
                </div>
              ) : (
                <div className="space-y-4">
                  {data.rankHistory.map((record) => (
                    <div
                      key={record._id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {record.description || "Rank Bonus"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(record.incomeDate).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                      <Badge className="bg-sky-100 text-sky-800">
                        {formatCurrency(record.amount)}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No rank data available
        </div>
      )}
    </div>
  );
};

export default RankSummary;
