import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, Download, Filter, RefreshCw } from "lucide-react";
import productsAPI from "@/api/products";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Purchase {
  _id: string;
  orderNumber: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const PurchaseHistory: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "completed" | "processing" | "cancelled"
  >("all");

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getUserOrders();

      if (response.success && response.data) {
        setPurchases(response.data || []);
      } else {
        setPurchases([]);
      }
    } catch (error: any) {
      console.error("Failed to load purchase history:", error);
      toast.error("Failed to load purchase history");
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPurchases = React.useMemo(() => {
    if (filter === "all") return purchases;
    if (filter === "completed") {
      return purchases.filter(
        (p) => p.status === "delivered" || p.status === "completed"
      );
    }
    if (filter === "processing") {
      return purchases.filter((p) =>
        ["pending", "confirmed", "processing", "shipped"].includes(p.status)
      );
    }
    if (filter === "cancelled") {
      return purchases.filter((p) => p.status === "cancelled");
    }
    return purchases;
  }, [purchases, filter]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
      case "completed":
        return "bg-sky-100/70 text-sky-800 ring-1 ring-sky-300/30";
      case "shipped":
        return "bg-sky-100/70 text-sky-800 ring-1 ring-sky-300/30";
      case "processing":
      case "confirmed":
        return "bg-amber-100/70 text-amber-800 ring-1 ring-amber-300/30";
      case "pending":
        return "bg-amber-100/70 text-amber-800 ring-1 ring-amber-300/30";
      case "cancelled":
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
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-50/30 via-white to-sky-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
            <Package className="h-8 w-8 text-sky-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
            Purchase History
          </h1>
        </div>
        <div className="flex space-x-2">
          {(["all", "completed", "processing", "cancelled"] as const).map(
            (f) => (
              <motion.div
                key={f}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  onClick={() => setFilter(f)}
                  className={`border-sky-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-sky-50/50 ${
                    filter === f
                      ? "bg-gradient-to-r from-sky-600 to-amber-500 text-white border-0"
                      : ""
                  }`}
                >
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              </motion.div>
            )
          )}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={fetchPurchases}
              disabled={loading}
              className="border-sky-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-sky-50/50"
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
        <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-sky-800">
              All Purchase Records ({filteredPurchases.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card
                    key={i}
                    className="border-sky-200/50 bg-white/60 backdrop-blur-sm animate-pulse"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="h-4 bg-sky-200/50 rounded w-48"></div>
                          <div className="h-3 bg-sky-200/50 rounded w-32"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-6 bg-sky-200/50 rounded w-24"></div>
                          <div className="h-5 bg-sky-200/50 rounded w-20"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPurchases.length === 0 ? (
              <div className="text-center py-12 text-sky-700/70">
                <Package className="h-16 w-16 text-sky-300 mx-auto mb-4" />
                <p className="text-lg font-medium">No purchase records found</p>
                <p className="text-sm">
                  Your purchase history will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPurchases.map((purchase, index) => (
                  <motion.div
                    key={purchase._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ scale: 1.01, x: 5 }}
                  >
                    <Card className="border-sky-200/50 bg-white/60 backdrop-blur-sm hover:shadow-md transition-all duration-200 ring-1 ring-amber-400/5">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <h3 className="font-semibold text-sky-800">
                              Order #{purchase.orderNumber}
                            </h3>
                            <p className="text-sm text-sky-700/70 mt-1">
                              {purchase.items
                                .map(
                                  (item) =>
                                    `${item.productName} (Qty: ${item.quantity})`
                                )
                                .join(", ")}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1 text-sm text-sky-600/70">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(
                                    purchase.createdAt
                                  ).toLocaleDateString("en-IN")}
                                </span>
                              </div>
                              <Badge
                                className={`backdrop-blur-sm ${
                                  purchase.paymentStatus === "paid"
                                    ? "bg-sky-100/70 text-sky-800 ring-1 ring-sky-300/30"
                                    : "bg-amber-100/70 text-amber-800 ring-1 ring-amber-300/30"
                                }`}
                              >
                                Payment: {purchase.paymentStatus}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <p className="font-bold text-lg text-sky-700">
                              {formatCurrency(purchase.totalAmount)}
                            </p>
                            <Badge
                              className={`backdrop-blur-sm ${getStatusColor(
                                purchase.status
                              )}`}
                            >
                              {purchase.status.charAt(0).toUpperCase() +
                                purchase.status.slice(1)}
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

export default PurchaseHistory;
