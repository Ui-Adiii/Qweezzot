import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Star, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { authAPI } from "@/api/auth";
import { packagesAPI } from "@/api/packages";
import { toast } from "sonner";

const Upgrade: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [packages, setPackages] = useState<any[]>([]);
  const [userPackage, setUserPackage] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [packagesResponse, profileResponse] = await Promise.all([
        packagesAPI.getPackages(),
        authAPI.getProfile(),
      ]);

      if (packagesResponse.success) {
        setPackages(packagesResponse.data);
      }

      if (profileResponse.success && profileResponse.data) {
        setUserPackage({
          packageAmount: profileResponse.data.packageAmount || 0,
          isPackagePurchased: profileResponse.data.isPackagePurchased || false,
        });
      }
    } catch (error: any) {
      toast.error("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (packageId: string) => {
    if (!confirm("Are you sure you want to purchase this package?")) {
      return;
    }

    setPurchasing(packageId);
    try {
      const response = await packagesAPI.purchasePackage(packageId);
      if (response.success) {
        toast.success("Package purchased successfully!");
        fetchData();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to purchase package");
    } finally {
      setPurchasing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
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
          Upgrade Package
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-xl text-sky-800">
              Upgrade Your Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-br from-sky-50/70 to-amber-50/50 backdrop-blur-sm rounded-lg border border-sky-200/50 ring-1 ring-amber-400/10">
              <div>
                <p className="font-semibold text-sky-800">Current Package</p>
                <p className="text-sky-700">
                  {userPackage?.isPackagePurchased
                    ? `Package - ₹${userPackage.packageAmount.toLocaleString()}`
                    : "No Package Purchased"}
                </p>
              </div>
              <Badge
                className={
                  userPackage?.isPackagePurchased
                    ? "bg-sky-100/70 text-sky-800 ring-1 ring-sky-300/30 backdrop-blur-sm"
                    : "bg-gray-100/70 text-gray-800 ring-1 ring-gray-300/30 backdrop-blur-sm"
                }
              >
                {userPackage?.isPackagePurchased ? "Active" : "Not Purchased"}
              </Badge>
            </div>

            {packages.length === 0 ? (
              <div className="text-center py-8 text-sky-700/70">
                <p>No packages available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={pkg._id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-amber-400/10 border-l-4 border-amber-500">
                      <CardContent className="p-6 text-center">
                        {index === 0 ? (
                          <Star className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                        ) : (
                          <Crown className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                        )}
                        <h3 className="text-lg font-semibold text-amber-800 mb-2">
                          {pkg.name}
                        </h3>
                        <p className="text-2xl font-bold text-amber-700 mb-4">
                          ₹{pkg.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-sky-700/70 mb-4">
                          {pkg.description}
                        </p>
                        {pkg.features && pkg.features.length > 0 && (
                          <ul className="text-xs text-sky-700/70 mb-4 space-y-1 text-left">
                            {pkg.features
                              .slice(0, 3)
                              .map((feature: string, idx: number) => (
                                <li key={idx}>• {feature}</li>
                              ))}
                          </ul>
                        )}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={() => handlePurchase(pkg._id)}
                            disabled={
                              purchasing === pkg._id ||
                              (userPackage?.isPackagePurchased &&
                                userPackage.packageAmount >= pkg.price)
                            }
                            className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white shadow-lg ring-1 ring-amber-300/30"
                          >
                            {purchasing === pkg._id
                              ? "Processing..."
                              : userPackage?.isPackagePurchased &&
                                userPackage.packageAmount >= pkg.price
                              ? "Already Purchased"
                              : "Purchase Now"}
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-4 bg-gradient-to-br from-sky-50/70 to-amber-50/50 backdrop-blur-sm rounded-lg border border-sky-200/50 ring-1 ring-amber-400/10"
            >
              <h4 className="font-semibold text-sky-800 mb-2">
                Upgrade Benefits:
              </h4>
              <ul className="text-sky-700 text-sm space-y-1">
                <li>• Higher commission rates</li>
                <li>• Access to premium products</li>
                <li>• Enhanced earning potential</li>
                <li>• Priority customer support</li>
              </ul>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Upgrade;
