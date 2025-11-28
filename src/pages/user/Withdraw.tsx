import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownRight, CreditCard, Banknote, RefreshCw } from 'lucide-react';
import { authAPI } from '@/api/auth';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Withdraw: React.FC = () => {
  const [walletData, setWalletData] = useState({
    purchaseWallet: 0,
    commissionWallet: 0,
    referralWallet: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedWallet, setSelectedWallet] = useState<'commissionWallet' | 'referralWallet'>('commissionWallet');
  const [amount, setAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('bank');
  const [accountDetails, setAccountDetails] = useState('');

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();
      
      if (response.success && response.data && response.data.wallets) {
        setWalletData(response.data.wallets);
      }
    } catch (error: any) {
      console.error('Failed to load wallet data:', error);
      toast.error('Failed to load wallet balance');
    } finally {
      setLoading(false);
    }
  };

  const getAvailableBalance = () => {
    return selectedWallet === 'commissionWallet' 
      ? walletData.commissionWallet 
      : walletData.referralWallet;
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    const available = getAvailableBalance();
    
    if (!amount || withdrawAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (withdrawAmount > available) {
      toast.error('Insufficient balance');
      return;
    }
    
    if (!accountDetails) {
      toast.error('Please enter account details');
      return;
    }
    
    toast.success('Withdrawal request submitted successfully!');
    setAmount('');
    setAccountDetails('');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
            <ArrowDownRight className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">Withdraw Funds</h1>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            onClick={fetchWalletData}
            disabled={loading}
            className="border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-emerald-50/50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
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
          <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="text-xl text-emerald-800">Withdrawal Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wallet" className="text-emerald-800">Select Wallet</Label>
                <Select value={selectedWallet} onValueChange={(value: 'commissionWallet' | 'referralWallet') => setSelectedWallet(value)}>
                  <SelectTrigger className="border-emerald-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-emerald-200/50">
                    <SelectItem value="commissionWallet">
                      Commission Wallet ({formatCurrency(walletData.commissionWallet)})
                    </SelectItem>
                    <SelectItem value="referralWallet">
                      Referral Wallet ({formatCurrency(walletData.referralWallet)})
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-emerald-700/70">
                  Available: {formatCurrency(getAvailableBalance())}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-emerald-800">Withdrawal Amount</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="Enter amount" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  max={getAvailableBalance()}
                  className="border-emerald-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
                />
                <p className="text-xs text-emerald-700/70">
                  Maximum: {formatCurrency(getAvailableBalance())}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="method" className="text-emerald-800">Withdrawal Method</Label>
                <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                  <SelectTrigger className="border-emerald-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-emerald-200/50">
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="wallet">Digital Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account" className="text-emerald-800">Account Details</Label>
                <Input 
                  id="account" 
                  placeholder="Account number or UPI ID" 
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  className="border-emerald-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
                />
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="w-full bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
                  onClick={handleWithdraw}
                  disabled={loading || !amount || !accountDetails}
                >
                  <ArrowDownRight className="h-4 w-4 mr-2" />
                  Request Withdrawal
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
            <Card className="border-emerald-200/50 bg-gradient-to-br from-emerald-600/90 to-emerald-700/90 backdrop-blur-xl shadow-xl ring-2 ring-amber-400/20 overflow-hidden relative">
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/90 text-sm font-medium mb-1">Available Balance</p>
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
            <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
              <CardHeader>
                <CardTitle className="text-emerald-800">Withdrawal History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-emerald-700/70">
                  <CreditCard className="h-12 w-12 text-emerald-300 mx-auto mb-4" />
                  <p className="text-sm">No withdrawal history yet</p>
                  <p className="text-xs mt-1">Your withdrawal requests will appear here</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
