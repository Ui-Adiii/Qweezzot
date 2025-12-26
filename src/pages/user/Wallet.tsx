import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Wallet,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Download,
  Upload,
  CreditCard,
  Building,
  QrCode,
  Copy,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { authAPI } from "@/api/auth";
import { walletAPI, WalletTopupRequest } from "@/api/wallet";
import { paymentSettingsAPI, PaymentSettings } from "@/api/payment-settings";

interface WalletData {
  purchaseWallet: number;
  earnedWallet: number;
  referralWallet: number;
  repurchaseWallet?: number;
  cashbackWallet?: number;
}

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  wallet: "purchase" | "commission" | "referral";
}

const UserWallet = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [topupRequests, setTopupRequests] = useState<WalletTopupRequest[]>([]);
  const [paymentSettings, setPaymentSettings] =
    useState<PaymentSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [topupRequestsLoading, setTopupRequestsLoading] = useState(true);

  // Top-up dialog state
  const [isTopupDialogOpen, setIsTopupDialogOpen] = useState(false);
  const [topupForm, setTopupForm] = useState({
    amount: "",
    transactionId: "",
    screenshot: "",
    paymentMethod: "bank" as "bank" | "upi",
  });
  const [isSubmittingTopup, setIsSubmittingTopup] = useState(false);

  useEffect(() => {
    fetchWalletData();
    fetchTransactions();
    fetchTopupRequests();
    fetchPaymentSettings();
  }, []);

  const fetchWalletData = async () => {
    try {
      const response = await authAPI.getProfile();
      setWalletData(response.data.wallets);
    } catch (error: any) {
      toast.error("Failed to load wallet data");
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      setTransactionsLoading(true);
      const response = await authAPI.getTransactions();

      if (response.success && response.data) {
        setTransactions(response.data || []);
      } else {
        setTransactions([]);
      }
    } catch (error: any) {
      console.error("Failed to load transactions:", error);
      setTransactions([]);
    } finally {
      setTransactionsLoading(false);
    }
  };

  const fetchTopupRequests = async () => {
    try {
      const response = await walletAPI.getUserTopupRequests();
      if (response.success && Array.isArray(response.data)) {
        setTopupRequests(response.data);
      }
    } catch (error: any) {
      console.error("Failed to load top-up requests:", error);
    } finally {
      setTopupRequestsLoading(false);
    }
  };

  const fetchPaymentSettings = async () => {
    try {
      const response = await paymentSettingsAPI.getPaymentSettings();
      if (response.success) {
        setPaymentSettings(response.data);
      }
    } catch (error: any) {
      console.error("Failed to load payment settings:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setTopupForm((prev) => ({
          ...prev,
          screenshot: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTopup(true);

    try {
      const amount = parseFloat(topupForm.amount);
      if (amount <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

      if (!topupForm.transactionId) {
        toast.error("Please enter transaction ID");
        return;
      }

      if (!topupForm.screenshot) {
        toast.error("Please upload payment screenshot");
        return;
      }

      const response = await walletAPI.createTopupRequest({
        amount,
        transactionId: topupForm.transactionId,
        screenshot: topupForm.screenshot,
      });

      if (response.success) {
        toast.success("Top-up request submitted successfully!");
        setIsTopupDialogOpen(false);
        setTopupForm({
          amount: "",
          transactionId: "",
          screenshot: "",
          paymentMethod: "bank",
        });
        fetchTopupRequests(); // Refresh the requests list
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit top-up request");
    } finally {
      setIsSubmittingTopup(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  const totalBalance = walletData
    ? walletData.purchaseWallet +
      walletData.earnedWallet +
      walletData.referralWallet +
      (walletData.repurchaseWallet || 0) +
      (walletData.cashbackWallet || 0)
    : 0;

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

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-50/30 via-white to-sky-50/20 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
            E-Wallet
          </h1>
          <p className="text-sky-700/70">
            Manage your wallet balance and transactions
          </p>
        </div>

        <Dialog open={isTopupDialogOpen} onOpenChange={setIsTopupDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-sky-600 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
              <Plus className="mr-2 h-4 w-4" />
              Add Funds
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white/90 backdrop-blur-xl border-sky-200/50 ring-1 ring-amber-400/10">
            <DialogHeader>
              <DialogTitle>Add Funds to Wallet</DialogTitle>
              <DialogDescription>
                Follow the steps below to add funds to your shopping wallet
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleTopupSubmit} className="space-y-6">
              {/* Payment Method Selection */}
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={topupForm.paymentMethod}
                  onValueChange={(value: "bank" | "upi") =>
                    setTopupForm((prev) => ({ ...prev, paymentMethod: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="upi">UPI Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Details */}
              {paymentSettings && (
                <div className="p-4 bg-white/70 backdrop-blur-xl rounded-lg border border-sky-200/50 ring-1 ring-amber-400/10 shadow-lg">
                  <h3 className="font-semibold text-sky-800 mb-3">
                    {topupForm.paymentMethod === "bank"
                      ? "Bank Details"
                      : "UPI Details"}
                  </h3>

                  {topupForm.paymentMethod === "bank" ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Bank Name:
                        </span>
                        <span className="font-medium">
                          {paymentSettings.bankName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Account Number:
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {paymentSettings.accountNumber}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                paymentSettings.accountNumber || ""
                              )
                            }
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          IFSC Code:
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {paymentSettings.ifscCode}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(paymentSettings.ifscCode || "")
                            }
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Account Holder:
                        </span>
                        <span className="font-medium">
                          {paymentSettings.accountHolderName}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">UPI ID:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {paymentSettings.upiId}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(paymentSettings.upiId || "")
                            }
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      {paymentSettings.upiQrCode && (
                        <div className="text-center">
                          <img
                            src={paymentSettings.upiQrCode}
                            alt="UPI QR Code"
                            className="mx-auto max-w-[200px] h-auto border rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={topupForm.amount}
                  onChange={(e) =>
                    setTopupForm((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              {/* Transaction ID */}
              <div className="space-y-2">
                <Label htmlFor="transactionId">
                  Transaction ID / Reference Number
                </Label>
                <Input
                  id="transactionId"
                  type="text"
                  placeholder="Enter transaction ID from your payment"
                  value={topupForm.transactionId}
                  onChange={(e) =>
                    setTopupForm((prev) => ({
                      ...prev,
                      transactionId: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              {/* Screenshot Upload */}
              <div className="space-y-2">
                <Label htmlFor="screenshot">Payment Screenshot</Label>
                <Input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
                <p className="text-xs text-gray-500">
                  Upload a clear screenshot of your payment confirmation
                </p>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsTopupDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmittingTopup}
                  className="bg-gradient-to-r from-sky-600 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
                >
                  {isSubmittingTopup ? "Submitting..." : "Submit Request"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Wallet Balance Cards with Glass Effect */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-amber-400/10 border-l-4 border-sky-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-sky-800">
              Total Balance
            </CardTitle>
            <div className="p-2 bg-gradient-to-br from-sky-100/50 to-amber-100/40 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
              <Wallet className="h-4 w-4 text-sky-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-900">
              ₹{totalBalance.toLocaleString()}
            </div>
            <p className="text-xs text-sky-600/70">Combined wallet balance</p>
          </CardContent>
        </Card>

        <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-amber-400/10 border-l-4 border-sky-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-sky-800">
              Shopping Wallet
            </CardTitle>
            <div className="p-2 bg-gradient-to-br from-sky-100/50 to-amber-100/40 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
              <CreditCard className="h-4 w-4 text-sky-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-900">
              ₹{walletData?.purchaseWallet?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-sky-600/70">Available for purchases</p>
          </CardContent>
        </Card>

        <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-amber-400/10 border-l-4 border-sky-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-sky-800">
              Earned Wallet
            </CardTitle>
            <div className="p-2 bg-gradient-to-br from-sky-100/50 to-amber-100/40 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
              <DollarSign className="h-4 w-4 text-sky-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-900">
              ₹{walletData?.earnedWallet?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-sky-600/70">BV Commission (50-65%)</p>
          </CardContent>
        </Card>

        <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-amber-400/10 border-l-4 border-sky-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-sky-800">
              Referral Wallet
            </CardTitle>
            <div className="p-2 bg-gradient-to-br from-sky-100/50 to-amber-100/40 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
              <TrendingUp className="h-4 w-4 text-sky-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-900">
              ₹{walletData?.referralWallet?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-sky-600/70">Referral earnings</p>
          </CardContent>
        </Card>

        <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-amber-400/10 border-l-4 border-sky-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-sky-800">
              Repurchase Wallet
            </CardTitle>
            <div className="p-2 bg-gradient-to-br from-sky-100/50 to-amber-100/40 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
              <RefreshCw className="h-4 w-4 text-sky-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-900">
              ₹{walletData?.repurchaseWallet?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-sky-600/70">Repurchase bonuses</p>
          </CardContent>
        </Card>

        <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-amber-400/10 border-l-4 border-sky-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-sky-800">
              Cashback Wallet
            </CardTitle>
            <div className="p-2 bg-gradient-to-br from-sky-100/50 to-amber-100/40 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
              <DollarSign className="h-4 w-4 text-sky-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-900">
              ₹{walletData?.cashbackWallet?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-sky-600/70">
              Cashback & package rewards
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="topup-requests">Top-up Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-800">
                <RefreshCw className="h-5 w-5 text-sky-600" />
                Recent Transactions
              </CardTitle>
              <CardDescription className="text-sky-700/70">
                Your latest wallet transactions and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactionsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600"></div>
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <RefreshCw className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>No transactions found</p>
                  <p className="text-sm">
                    Your transaction history will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border border-sky-200/50 bg-white/60 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-200 ring-1 ring-amber-400/5"
                    >
                      <div className="flex items-center gap-3">
                        {transaction.type === "credit" ? (
                          <ArrowUpRight className="h-5 w-5 text-sky-600" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 text-red-600" />
                        )}
                        <div>
                          <p className="font-medium">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()} •{" "}
                            {transaction.wallet} wallet
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "credit"
                              ? "text-sky-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}₹
                          {transaction.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topup-requests" className="space-y-4">
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-800">
                <Upload className="h-5 w-5 text-sky-600" />
                Top-up Requests
              </CardTitle>
              <CardDescription className="text-sky-700/70">
                Track your wallet top-up requests and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {topupRequestsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600"></div>
                </div>
              ) : topupRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Upload className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>No top-up requests found</p>
                  <p className="text-sm">
                    Your top-up requests will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {topupRequests.map((request) => (
                    <div
                      key={request._id}
                      className="flex items-center justify-between p-4 border border-sky-200/50 bg-white/60 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-200 ring-1 ring-amber-400/5"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(request.status)}
                        <div>
                          <p className="font-medium">
                            ₹{request.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(
                              request.createdAt || ""
                            ).toLocaleDateString()}{" "}
                            • Transaction ID: {request.transactionId}
                          </p>
                          {request.rejectionReason && (
                            <p className="text-sm text-red-600 mt-1">
                              Reason: {request.rejectionReason}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(request.status)}>
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </Badge>
                        {request.reviewDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Reviewed:{" "}
                            {new Date(request.reviewDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserWallet;
