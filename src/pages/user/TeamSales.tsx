import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { authAPI } from "@/api/auth";

const TeamSales: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    fetchTeamSales();
  }, []);

  const fetchTeamSales = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getTeamSales();
      if (response.success) {
        setSalesData(response.data || []);
        setSummary(response.summary);
      }
    } catch (error: any) {
      console.error("Failed to load team sales:", error);
      toast.error("Failed to load team sales");
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN");
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
          <TrendingUp className="h-8 w-8 text-sky-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
          Team Sales
        </h1>
      </motion.div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sky-700/70 mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-sky-700">
                    {summary.totalOrders || 0}
                  </p>
                </div>
                <ShoppingCart className="h-10 w-10 text-sky-600/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sky-700/70 mb-1">Total Amount</p>
                  <p className="text-3xl font-bold text-sky-700">
                    {formatCurrency(summary.totalAmount || 0)}
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-sky-600/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sky-700/70 mb-1">Total BV</p>
                  <p className="text-3xl font-bold text-sky-700">
                    {summary.totalBV || 0}
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-sky-600/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sky-700/70 mb-1">Total PV</p>
                  <p className="text-3xl font-bold text-sky-700">
                    {summary.totalPV || 0}
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-sky-600/50" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
        <CardHeader>
          <CardTitle className="text-xl text-sky-800">
            Sales by Member
          </CardTitle>
        </CardHeader>
        <CardContent>
          {salesData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No sales data available
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
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      BV
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      PV
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      RP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Last Order
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData.map((sale) => (
                    <tr key={sale.userId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {sale.userName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {sale.username}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.totalOrders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-sky-700">
                        {formatCurrency(sale.totalAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.totalBV}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.totalPV}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.totalRP}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.lastOrderDate
                          ? formatDate(sale.lastOrderDate)
                          : "N/A"}
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

export default TeamSales;
