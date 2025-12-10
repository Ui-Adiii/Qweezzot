import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Handshake, DollarSign, RefreshCw } from "lucide-react";
import { authAPI } from "@/api/auth";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface BonusRecord {
  _id: string;
  amount: number;
  description: string;
  incomeDate: string;
}

const MentorshipBonus: React.FC = () => {
  const [data, setData] = useState<BonusRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getMentorshipBonus();
      if (response.success) {
        setData(response.data || []);
        setTotal(response.total || 0);
      }
    } catch (error: any) {
      console.error("Failed to load mentorship bonus:", error);
      toast.error("Failed to load mentorship bonus");
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

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-lg">
            <Handshake className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Mentorship Bonus
          </h1>
        </div>
        <button
          onClick={fetchData}
          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <RefreshCw
            className={`h-5 w-5 text-blue-600 ${loading ? "animate-spin" : ""}`}
          />
        </button>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Mentorship Bonus
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(total)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {data.length} transactions
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mentorship Bonus History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : data.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No mentorship bonus records found
            </div>
          ) : (
            <div className="space-y-4">
              {data.map((record) => (
                <div
                  key={record._id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {record.description || "Mentorship Bonus"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(record.incomeDate).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {formatCurrency(record.amount)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorshipBonus;
