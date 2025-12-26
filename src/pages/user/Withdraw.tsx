import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDownRight,
  CreditCard,
  Banknote,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { authAPI } from "@/api/auth";
import { financeAPI } from "@/api/finance";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Withdraw: React.FC = () => {
  const [walletData, setWalletData] = useState({
    purchaseWallet: 0,
    earnedWallet: 0,
    referralWallet: 0,
  });
  const [loading, setLoading] = useState(true);
  const [withdrawalsLoading, setWithdrawalsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<
    "earnedWallet" | "referralWallet"
  >("earnedWallet");
  const [amount, setAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("bank");
  const [accountDetails, setAccountDetails] = useState("");
  const [withdrawals, setWithdrawals] = useState<any[]>([]);

  useEffect(() => {
    fetchWalletData();
    fetchWithdrawals();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();

      if (response.success && response.data && response.data.wallets) {
        setWalletData(response.data.wallets);
      }
    } catch (error: any) {
      console.error("Failed to load wallet data:", error);
      toast.error("Failed to load wallet balance");
    } finally {
      setLoading(false);
    }
  };

  const getAvailableBalance = () => {
    return selectedWallet === "earnedWallet"
      ? walletData.earnedWallet
      : walletData.referralWallet;
  };

  const fetchWithdrawals = async () => {
    try {
      setWithdrawalsLoading(true);
      const response = await financeAPI.getUserWithdrawals();
      if (response.success && response.data) {
        setWithdrawals(response.data);
      }
    } catch (error: any) {
      console.error("Failed to load withdrawals:", error);
    } finally {
      setWithdrawalsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    const withdrawAmount = parseFloat(amount);
    const available = getAvailableBalance();

    if (!amount || withdrawAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (withdrawAmount > available) {
      toast.error("Insufficient balance");
      return;
    }

    if (!accountDetails) {
      toast.error("Please enter account details");
      return;
    }

    setSubmitting(true);
    try {
      const response = await financeAPI.createWithdrawal({
        amount: withdrawAmount,
        walletType: selectedWallet,
        withdrawalMethod: withdrawMethod as "bank" | "upi" | "wallet",
        accountDetails: accountDetails,
      });

      if (response.success) {
        toast.success("Withdrawal request submitted successfully!");
        setAmount("");
        setAccountDetails("");
        fetchWalletData();
        fetchWithdrawals();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit withdrawal request");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-sky-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-sky-100 text-sky-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
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
            <ArrowDownRight className="h-8 w-8 text-sky-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
            Withdraw Funds
          </h1>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            onClick={fetchWalletData}
            disabled={loading}
            className="border-sky-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-sky-50/50"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="text-xl text-sky-800">
                Withdrawal Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wallet" className="text-sky-800">
                  Select Wallet
                </Label>
                <Select
                  value={selectedWallet}
                  onValueChange={(value: "earnedWallet" | "referralWallet") =>
                    setSelectedWallet(value)
                  }
                >
                  <SelectTrigger className="border-sky-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-sky-200/50">
                    <SelectItem value="earnedWallet">
                      Earned Wallet ({formatCurrency(walletData.earnedWallet)})
                    </SelectItem>
                    <SelectItem value="referralWallet">
                      Referral Wallet (
                      {formatCurrency(walletData.referralWallet)})
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-sky-700/70">
                  Available: {formatCurrency(getAvailableBalance())}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sky-800">
                  Withdrawal Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  max={getAvailableBalance()}
                  className="border-sky-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
                />
                <p className="text-xs text-sky-700/70">
                  Maximum: {formatCurrency(getAvailableBalance())}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="method" className="text-sky-800">
                  Withdrawal Method
                </Label>
                <Select
                  value={withdrawMethod}
                  onValueChange={setWithdrawMethod}
                >
                  <SelectTrigger className="border-sky-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-sky-200/50">
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="wallet">Digital Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="account" className="text-sky-800">
                  Account Details
                </Label>
                <Input
                  id="account"
                  placeholder="Account number or UPI ID"
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  className="border-sky-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="w-full bg-gradient-to-r from-sky-600 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
                  onClick={handleWithdraw}
                  disabled={loading || submitting || !amount || !accountDetails}
                >
                  <ArrowDownRight className="h-4 w-4 mr-2" />
                  {submitting ? "Submitting..." : "Request Withdrawal"}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="border-sky-200/50 bg-gradient-to-br from-sky-600/90 to-sky-700/90 backdrop-blur-xl shadow-xl ring-2 ring-amber-400/20 overflow-hidden relative">
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/90 text-sm font-medium mb-1">
                      Available Balance
                    </p>
                    {loading ? (
                      <div className="h-8 w-32 bg-white/20 rounded animate-pulse mt-2"></div>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-2xl font-bold text-white"
                      >
                        {formatCurrency(getAvailableBalance())}
                      </motion.p>
                    )}
                  </div>
                  <Banknote className="h-8 w-8 text-white/90" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
              <CardHeader>
                <CardTitle className="text-sky-800">
                  Withdrawal History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {withdrawalsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600"></div>
                  </div>
                ) : withdrawals.length === 0 ? (
                  <div className="text-center py-8 text-sky-700/70">
                    <CreditCard className="h-12 w-12 text-sky-300 mx-auto mb-4" />
                    <p className="text-sm">No withdrawal history yet</p>
                    <p className="text-xs mt-1">
                      Your withdrawal requests will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {withdrawals.map((withdrawal) => (
                      <div
                        key={withdrawal._id}
                        className="flex items-center justify-between p-4 border border-sky-200/50 bg-white/60 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-200 ring-1 ring-amber-400/5"
                      >
                        <div className="flex items-center gap-3">
                          {getStatusIcon(withdrawal.status)}
                          <div>
                            <p className="font-medium">
                              ₹{withdrawal.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(
                                withdrawal.createdAt
                              ).toLocaleDateString()}{" "}
                              • {withdrawal.withdrawalMethod}
                            </p>
                            {withdrawal.rejectionReason && (
                              <p className="text-sm text-red-600 mt-1">
                                Reason: {withdrawal.rejectionReason}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(withdrawal.status)}>
                            {withdrawal.status.charAt(0).toUpperCase() +
                              withdrawal.status.slice(1)}
                          </Badge>
                          {withdrawal.reviewedAt && (
                            <p className="text-xs text-gray-500 mt-1">
                              Reviewed:{" "}
                              {new Date(
                                withdrawal.reviewedAt
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
