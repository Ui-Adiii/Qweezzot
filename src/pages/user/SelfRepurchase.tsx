import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  RotateCcw,
  TrendingUp,
  Calendar,
  Target,
  DollarSign,
  Package,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import productsAPI from "@/api/products";

interface RepurchaseData {
  totalRepurchaseAmount: number;
  totalRepurchaseVolume: number;
  totalRepurchasePV: number;
  totalOrders: number;
  monthlyHistory: Array<{
    month: string;
    amount: number;
    volume: number;
    orders: number;
  }>;
  orders: Array<{
    _id: string;
    orderNumber: string;
    totalAmount: number;
    totalBV: number;
    totalPV: number;
    createdAt: string;
    status: string;
  }>;
}

const SelfRepurchase: React.FC = () => {
  const [data, setData] = useState<RepurchaseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRepurchaseData();
  }, []);

  const fetchRepurchaseData = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getSelfRepurchase();

      if (response.success && response.data) {
        setData(response.data);
      } else {
        // Set default data
        setData({
          totalRepurchaseAmount: 0,
          totalRepurchaseVolume: 0,
          totalRepurchasePV: 0,
          totalOrders: 0,
          monthlyHistory: [],
          orders: [],
        });
      }
    } catch (error: any) {
      console.error("Failed to load repurchase data:", error);
      toast.error("Failed to load repurchase data");
      // Set default data on error
      setData({
        totalRepurchaseAmount: 0,
        totalRepurchaseVolume: 0,
        totalRepurchasePV: 0,
        totalOrders: 0,
        monthlyHistory: [],
        orders: [],
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatMonth = (monthString: string) => {
    const [year, month] = monthString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-IN", { year: "numeric", month: "long" });
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
            <RotateCcw className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Self Total Repurchase
          </h1>
        </div>
        <button
          onClick={fetchRepurchaseData}
          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <RefreshCw
            className={`h-5 w-5 text-blue-600 ${loading ? "animate-spin" : ""}`}
          />
        </button>
      </motion.div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Repurchase
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(data.totalRepurchaseAmount)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {data.totalOrders} orders
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Volume (BV)
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {data.totalRepurchaseVolume.toLocaleString("en-IN")}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Business Volume
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total PV
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {data.totalRepurchasePV.toLocaleString("en-IN")}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Product Value
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {data.totalOrders}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Repurchase orders
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Monthly History */}
          {data.monthlyHistory && data.monthlyHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Monthly Repurchase History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.monthlyHistory.map((month, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {formatMonth(month.month)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {month.orders} order{month.orders !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">
                          {formatCurrency(month.amount)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          BV: {month.volume.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Orders */}
          {data.orders && data.orders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Repurchase Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.orders.slice(0, 10).map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          Order #{order.orderNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">
                          {formatCurrency(order.totalAmount)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-blue-100 text-blue-800">
                            BV: {order.totalBV?.toLocaleString("en-IN") || 0}
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-800">
                            PV: {order.totalPV?.toLocaleString("en-IN") || 0}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {(!data.monthlyHistory || data.monthlyHistory.length === 0) &&
            (!data.orders || data.orders.length === 0) && (
              <Card>
                <CardContent className="text-center py-8 text-muted-foreground">
                  No repurchase data available
                </CardContent>
              </Card>
            )}
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-8 text-muted-foreground">
            Failed to load repurchase data
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SelfRepurchase;
