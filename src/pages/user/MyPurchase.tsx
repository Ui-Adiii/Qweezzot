import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, Eye, Download, RefreshCw } from "lucide-react";
import productsAPI from "@/api/products";
import { toast } from "sonner";

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

const MyPurchase: React.FC = () => {
  const [purchases, setPurchases] = React.useState<Purchase[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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
      console.error("Failed to load purchases:", error);
      toast.error("Failed to load purchases");
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  const stats = React.useMemo(() => {
    const totalPurchases = purchases.reduce((sum, p) => sum + p.totalAmount, 0);
    const totalOrders = purchases.length;
    const completed = purchases.filter(
      (p) => p.status === "delivered" || p.status === "completed"
    ).length;
    const processing = purchases.filter((p) =>
      ["pending", "confirmed", "processing", "shipped"].includes(p.status)
    ).length;

    return { totalPurchases, totalOrders, completed, processing };
  }, [purchases]);

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Package className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">My Purchases</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={fetchPurchases} disabled={loading}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              ₹{stats.totalPurchases.toLocaleString()}
            </p>
            <p className="text-sm text-blue-700">Total Purchases</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {stats.totalOrders}
            </p>
            <p className="text-sm text-blue-700">Total Orders</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {stats.completed}
            </p>
            <p className="text-sm text-purple-700">Completed</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">
              {stats.processing}
            </p>
            <p className="text-sm text-orange-700">Processing</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl text-primary">
            Purchase History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="border-gray-200 animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                          <div className="h-3 bg-gray-200 rounded w-48"></div>
                        </div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : purchases.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium">No purchases found</p>
              <p className="text-sm">Your purchase history will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <Card key={purchase._id} className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Package className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            Order #{purchase.orderNumber}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {purchase.items
                              .map(
                                (item) =>
                                  `${item.productName} (${item.quantity})`
                              )
                              .join(", ")}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {new Date(purchase.createdAt).toLocaleDateString(
                                "en-IN"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            ₹{purchase.totalAmount.toLocaleString()}
                          </p>
                          <Badge
                            variant={
                              purchase.status === "delivered" ||
                              purchase.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              purchase.status === "delivered" ||
                              purchase.status === "completed"
                                ? "bg-blue-600"
                                : purchase.status === "cancelled"
                                ? "bg-red-600"
                                : "bg-orange-500"
                            }
                          >
                            {purchase.status.charAt(0).toUpperCase() +
                              purchase.status.slice(1)}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyPurchase;
