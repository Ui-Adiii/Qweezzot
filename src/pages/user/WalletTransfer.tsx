import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  ArrowRight,
  Wallet,
  RefreshCw,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { authAPI } from "@/api/auth";
import { walletAPI } from "@/api/wallet";

interface WalletData {
  purchaseWallet: number;
  earnedWallet: number;
  referralWallet: number;
  repurchaseWallet?: number;
  cashbackWallet?: number;
}

const WalletTransfer = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [transferring, setTransferring] = useState(false);

  const [fromWalletType, setFromWalletType] = useState<
    | "purchaseWallet"
    | "earnedWallet"
    | "referralWallet"
    | "repurchaseWallet"
    | "cashbackWallet"
  >("earnedWallet");
  const [toWalletType, setToWalletType] = useState<
    | "purchaseWallet"
    | "earnedWallet"
    | "referralWallet"
    | "repurchaseWallet"
    | "cashbackWallet"
  >("purchaseWallet");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const walletTypes = [
    { value: "purchaseWallet", label: "Shopping Wallet", icon: "🛒" },
    { value: "earnedWallet", label: "Earned Wallet", icon: "💰" },
    { value: "referralWallet", label: "Referral Wallet", icon: "👥" },
    { value: "repurchaseWallet", label: "Repurchase Wallet", icon: "🔄" },
    { value: "cashbackWallet", label: "Cashback Wallet", icon: "💵" },
  ];

  useEffect(() => {
    fetchWalletData();
  }, []);

  // Auto-update toWalletType if it matches fromWalletType
  useEffect(() => {
    if (fromWalletType === toWalletType) {
      const available = getAvailableWallets(fromWalletType);
      if (available.length > 0) {
        setToWalletType(available[0].value as any);
      }
    }
  }, [fromWalletType, toWalletType]);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();
      if (response.success && response.data && response.data.wallets) {
        setWalletData(response.data.wallets);
      }
    } catch (error: any) {
      toast.error("Failed to load wallet data");
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletData) {
      toast.error("Wallet data not loaded");
      return;
    }

    if (fromWalletType === toWalletType) {
      toast.error("Source and destination wallets cannot be the same");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const fromBalance = walletData[fromWalletType] || 0;
    const transferAmount = parseFloat(amount);

    if (fromBalance < transferAmount) {
      const fromWalletLabel = walletTypes.find(
        (w) => w.value === fromWalletType
      )?.label;
      toast.error(
        `Insufficient balance in ${fromWalletLabel}. Available: ₹${fromBalance}`
      );
      return;
    }

    try {
      setTransferring(true);
      const response = await walletAPI.transferWallet({
        fromWalletType,
        toWalletType,
        amount: transferAmount,
        reason: reason || undefined,
      });

      if (response.success) {
        toast.success(response.message || "Transfer completed successfully");

        // Refresh wallet data
        await fetchWalletData();

        // Reset form
        setAmount("");
        setReason("");
      } else {
        throw new Error(response.message || "Transfer failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to transfer wallet amount");
    } finally {
      setTransferring(false);
    }
  };

  const getAvailableWallets = (excludeType?: string) => {
    return walletTypes.filter((w) => w.value !== excludeType);
  };

  const getWalletBalance = (walletType: string) => {
    return walletData ? walletData[walletType as keyof WalletData] || 0 : 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="shadow-lg border-sky-200">
        <CardHeader className="bg-gradient-to-r from-sky-600 to-sky-700 text-white">
          <div className="flex items-center gap-3">
            <Wallet className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">Wallet Transfer</CardTitle>
              <CardDescription className="text-sky-100 mt-1">
                Transfer amount between your wallets
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Current Wallet Balances */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Current Wallet Balances
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {walletTypes.map((wallet) => {
                const balance = getWalletBalance(wallet.value);
                return (
                  <div
                    key={wallet.value}
                    className="bg-gradient-to-br from-sky-50 to-sky-100 p-4 rounded-lg border border-sky-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{wallet.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {wallet.label}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-sky-700">
                      ₹
                      {balance.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transfer Form */}
          <form onSubmit={handleTransfer} className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Transfer Details
              </h3>

              {/* From and To Wallets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                {/* From Wallet */}
                <div className="space-y-2">
                  <Label
                    htmlFor="fromWallet"
                    className="text-sm font-medium text-gray-700"
                  >
                    From Wallet <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={fromWalletType}
                    onValueChange={(value: any) => {
                      setFromWalletType(value);
                      // Auto-select different wallet for "to" if current selection matches
                      if (value === toWalletType) {
                        const available = getAvailableWallets(value);
                        if (available.length > 0) {
                          setToWalletType(available[0].value as any);
                        } else {
                          // If no other wallet available, reset to first wallet type
                          setToWalletType("earnedWallet" as any);
                        }
                      }
                    }}
                  >
                    <SelectTrigger id="fromWallet" className="w-full">
                      <SelectValue placeholder="Select source wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      {walletTypes
                        .filter((w) => w.value !== "purchaseWallet") // Exclude Shopping Wallet from From Wallet
                        .map((wallet) => (
                          <SelectItem key={wallet.value} value={wallet.value}>
                            <div className="flex items-center gap-2">
                              <span>{wallet.icon}</span>
                              <span>{wallet.label}</span>
                              <span className="text-xs text-gray-500 ml-auto">
                                ₹
                                {getWalletBalance(wallet.value).toLocaleString(
                                  "en-IN"
                                )}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-gray-600 mt-1">
                    Available: ₹
                    {getWalletBalance(fromWalletType).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex justify-center items-center">
                  <div className="bg-sky-100 p-3 rounded-full">
                    <ArrowRight className="h-6 w-6 text-sky-600" />
                  </div>
                </div>

                {/* To Wallet */}
                <div className="space-y-2">
                  <Label
                    htmlFor="toWallet"
                    className="text-sm font-medium text-gray-700"
                  >
                    To Wallet <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={toWalletType}
                    onValueChange={(value: any) => setToWalletType(value)}
                  >
                    <SelectTrigger id="toWallet" className="w-full">
                      <SelectValue placeholder="Select destination wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      {walletTypes
                        .filter((w) => w.value !== fromWalletType) // Exclude selected From Wallet
                        .map((wallet) => (
                          <SelectItem key={wallet.value} value={wallet.value}>
                            <div className="flex items-center gap-2">
                              <span>{wallet.icon}</span>
                              <span>{wallet.label}</span>
                              <span className="text-xs text-gray-500 ml-auto">
                                ₹
                                {getWalletBalance(wallet.value).toLocaleString(
                                  "en-IN"
                                )}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-gray-600 mt-1">
                    Current: ₹
                    {getWalletBalance(toWalletType).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  {/* Auto-update toWalletType if it matches fromWalletType */}
                  {fromWalletType === toWalletType && (
                    <div className="text-xs text-red-600 mt-1">
                      Please select a different destination wallet
                    </div>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="mt-6 space-y-2">
                <Label
                  htmlFor="amount"
                  className="text-sm font-medium text-gray-700"
                >
                  Transfer Amount (₹) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount to transfer"
                  min="0.01"
                  step="0.01"
                  required
                  disabled={transferring}
                  className="w-full"
                />
                <div className="text-sm text-gray-600">
                  Maximum transferable: ₹
                  {getWalletBalance(fromWalletType).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>

              {/* Reason */}
              <div className="mt-6 space-y-2">
                <Label
                  htmlFor="reason"
                  className="text-sm font-medium text-gray-700"
                >
                  Reason (Optional)
                </Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter reason for this transfer..."
                  rows={3}
                  disabled={transferring}
                  className="w-full"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setAmount("");
                  setReason("");
                }}
                disabled={transferring}
              >
                Reset
              </Button>
              <Button
                type="submit"
                disabled={
                  transferring || !amount || fromWalletType === toWalletType
                }
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                {transferring ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Transferring...
                  </>
                ) : (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Transfer Amount
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Info Alert */}
          <div className="mt-6 bg-sky-50 border border-sky-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-sky-600 mt-0.5" />
              <div className="text-sm text-sky-800">
                <p className="font-medium mb-1">Important Notes:</p>
                <ul className="list-disc list-inside space-y-1 text-sky-700">
                  <li>
                    You can only transfer from wallets that have sufficient
                    balance
                  </li>
                  <li>
                    Transfer transactions are recorded and cannot be reversed
                  </li>
                  <li>
                    Both debit and credit transactions will be created for your
                    records
                  </li>
                  <li>
                    Please verify the details before confirming the transfer
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletTransfer;
