import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";
import { authAPI } from "@/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WalletBalance: React.FC = () => {
  const [walletData, setWalletData] = useState({
    purchaseWallet: 0,
    earnedWallet: 0,
    referralWallet: 0,
    repurchaseWallet: 0,
    cashbackWallet: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();

      if (response.success && response.data && response.data.wallets) {
        setWalletData(response.data.wallets);
      } else {
        // Set default empty wallets if no data
        setWalletData({
          purchaseWallet: 0,
          earnedWallet: 0,
          referralWallet: 0,
          repurchaseWallet: 0,
          cashbackWallet: 0,
        });
      }
    } catch (error: any) {
      // Only log if it's not a connection error
      if (
        error.message &&
        !error.message.includes("Failed to fetch") &&
        !error.message.includes("ERR_CONNECTION_REFUSED")
      ) {
        console.error("Failed to load wallet data:", error);
        toast.error("Failed to load wallet balance");
      }
      // Set default empty wallets on error
      setWalletData({
        purchaseWallet: 0,
        earnedWallet: 0,
        referralWallet: 0,
        repurchaseWallet: 0,
        cashbackWallet: 0,
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

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-50/30 via-white to-sky-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
            <Wallet className="h-8 w-8 text-sky-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
            Wallet Balance
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={fetchWalletData}
          disabled={loading}
          className="bg-white/70 backdrop-blur-sm border-sky-200/50 ring-1 ring-amber-400/10 hover:bg-sky-50/80 text-sky-800 hover:text-sky-900"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          {
            title: "Shopping Wallet",
            value: walletData.purchaseWallet,
            icon: Wallet,
            action: "Add Money",
            onClick: () => navigate("/user/wallet-request"),
            delay: 0.1,
          },
          {
            title: "Earned Wallet",
            value: walletData.earnedWallet,
            icon: TrendingUp,
            action: "Withdraw",
            onClick: () => navigate("/user/withdraw"),
            delay: 0.2,
          },
          {
            title: "Referral Wallet",
            value: walletData.referralWallet,
            icon: TrendingUp,
            action: "Transfer",
            onClick: () => navigate("/user/wallet"),
            delay: 0.3,
          },
          {
            title: "Repurchase Wallet",
            value: walletData.repurchaseWallet || 0,
            icon: Wallet,
            action: "View",
            onClick: () => navigate("/user/wallet"),
            delay: 0.4,
          },
          {
            title: "Cashback Wallet",
            value: walletData.cashbackWallet || 0,
            icon: TrendingUp,
            action: "View",
            onClick: () => navigate("/user/wallet"),
            delay: 0.5,
          },
        ].map((wallet, index) => (
          <motion.div
            key={wallet.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: wallet.delay }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-2 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/30"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <wallet.icon className="h-5 w-5 text-sky-600" />
                  </motion.div>
                  <CardTitle className="text-lg text-sky-900">
                    {wallet.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-sky-200/50 rounded w-32 mb-4"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-sky-700 mb-4">
                      {formatCurrency(wallet.value)}
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-sky-600 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
                      onClick={wallet.onClick}
                    >
                      {wallet.action === "Add Money" && (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      )}
                      {wallet.action === "Withdraw" && (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      {wallet.action === "Transfer" && (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      )}
                      {wallet.action === "View" && (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      )}
                      {wallet.action}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-xl text-sky-900">
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-12 bg-sky-200/50 rounded w-48"></div>
              </div>
            ) : (
              <p className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
                {formatCurrency(
                  walletData.purchaseWallet +
                    walletData.earnedWallet +
                    walletData.referralWallet +
                    (walletData.repurchaseWallet || 0) +
                    (walletData.cashbackWallet || 0)
                )}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default WalletBalance;
