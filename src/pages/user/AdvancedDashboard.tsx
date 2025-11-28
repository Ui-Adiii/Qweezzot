import React, { useState, useEffect } from 'react';
import { Share2, Copy, Users, TrendingUp, Award, Gift, RefreshCw, Wallet, ArrowRight, Sparkles, Target, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { authAPI } from '@/api/auth';
import { motion } from 'framer-motion';

interface DashboardStats {
  user: {
    name: string;
    email: string;
    username: string;
    mobileNo: string;
    referralCode: string;
    registrationDate?: string;
    rank?: string;
    status?: string;
  };
  wallets: {
    purchaseWallet: number;
    commissionWallet: number;
    referralWallet: number;
  };
  team: {
    directs: number;
    totalTeam: number;
    leftBV: number;
    rightBV: number;
  };
  monthly: {
    income: number;
    target: number;
    achieved: number;
  };
}

// Animation variants removed - using direct motion props instead

const AdvancedDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.getDashboardStats();
      if (response && response.user) {
        setStats(response);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const shareLink = (url: string, position: string) => {
    if (navigator.share) {
      navigator.share({
        title: `Byoliva ${position} Referral Link`,
        url: url
      });
    } else {
      copyToClipboard(url, `${position} referral link`);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[600px]"
      >
        <div className="text-center space-y-4">
          <motion.div 
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full mx-auto"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-emerald-600" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg font-semibold text-emerald-700">Loading your dashboard...</p>
            <p className="text-sm text-emerald-600/70">Please wait while we fetch your data</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (error && !stats) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-[600px]"
      >
        <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl max-w-md shadow-2xl ring-1 ring-amber-400/20">
          <CardContent className="p-6 text-center space-y-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 bg-emerald-100/50 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm"
            >
              <span className="text-2xl">⚠️</span>
            </motion.div>
            <div>
              <p className="text-emerald-700 font-semibold text-lg">Failed to load dashboard</p>
              <p className="text-sm text-emerald-600/70 mt-1">{error}</p>
            </div>
            <Button 
              onClick={fetchDashboardData} 
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white" 
              variant="default"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Retrying...' : 'Retry'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl max-w-md shadow-2xl ring-1 ring-amber-400/20">
          <CardContent className="p-6 text-center">
            <p className="text-emerald-700 font-medium">No dashboard data available.</p>
            <Button onClick={fetchDashboardData} className="mt-4" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Load Data
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Welcome Header - Glass Effect Card with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-0 bg-gradient-to-br from-emerald-600/70 via-emerald-700/70 to-emerald-800/70 backdrop-blur-xl shadow-2xl overflow-hidden relative ring-2 ring-amber-400/20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'
            }}></div>
          </div>
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
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar className="h-20 w-20 ring-4 ring-amber-600/50 shadow-xl bg-white/20 backdrop-blur-sm border-2 border-amber-500/40">
                    <AvatarImage src="/api/placeholder/80/80" />
                    <AvatarFallback className="bg-gradient-to-br from-amber-600/60 to-yellow-600/60 text-white text-2xl font-bold backdrop-blur-sm">
                      {stats?.user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div>
                  <p className="text-white/90 text-sm font-medium mb-1">Welcome back,</p>
                  <motion.h1 
                    className="text-3xl font-bold text-white mb-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {stats?.user?.name || 'User'}
                  </motion.h1>
                  <div className="flex items-center space-x-3 mt-2">
                    <Badge className="bg-white/20 text-white border-amber-400/30 backdrop-blur-sm ring-1 ring-amber-400/20">
                      @{stats?.user?.username || 'username'}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-amber-500/40 via-amber-400/40 to-yellow-500/40 text-white border-amber-300/40 backdrop-blur-sm ring-1 ring-amber-300/30">
                      {stats?.user?.rank || 'Bronze'} Rank
                    </Badge>
                  </div>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  onClick={fetchDashboardData} 
                  variant="secondary" 
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-amber-400/30 backdrop-blur-sm ring-1 ring-amber-400/20"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Referral Links - Glass Cards with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-emerald-800 flex items-center">
            <Share2 className="h-5 w-5 mr-2 text-emerald-600" />
            Referral Links
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left Position */}
          <motion.div
            initial={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-emerald-200/50 bg-white/70 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 group ring-1 ring-amber-400/10 hover:ring-amber-400/30">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-gradient-to-r from-emerald-600/90 via-emerald-600/90 to-amber-500/90 text-white px-3 py-1 backdrop-blur-sm ring-1 ring-amber-300/30 shadow-lg">
                    LEFT POSITION
                  </Badge>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={() => shareLink(`${window.location.origin}/user/register?ref=${stats?.user?.referralCode || 'DEMO'}&pos=LEFT`, "LEFT")}
                      size="sm" 
                      className="bg-gradient-to-r from-emerald-600/90 to-amber-500/90 hover:from-emerald-700 hover:to-amber-600 text-white backdrop-blur-sm ring-1 ring-amber-300/30 shadow-md"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </motion.div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-emerald-200/50 ring-1 ring-amber-400/10">
                  <code className="text-xs text-emerald-800 break-all font-mono">
                    {window.location.origin}/user/register?ref={stats?.user?.referralCode || 'DEMO'}&pos=LEFT
                  </code>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`${window.location.origin}/user/register?ref=${stats?.user?.referralCode || 'DEMO'}&pos=LEFT`, "Left referral link")}
                  className="mt-3 w-full text-emerald-700 hover:text-emerald-800 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-amber-50/50 border border-amber-200/30"
                >
                  <Copy className="h-3 w-3 mr-2" />
                  Copy Link
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Position */}
          <motion.div
            initial={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-emerald-200/50 bg-white/70 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 group ring-1 ring-amber-400/10 hover:ring-amber-400/30">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-gradient-to-r from-emerald-600/90 via-emerald-600/90 to-amber-500/90 text-white px-3 py-1 backdrop-blur-sm ring-1 ring-amber-300/30 shadow-lg">
                    RIGHT POSITION
                  </Badge>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={() => shareLink(`${window.location.origin}/user/register?ref=${stats?.user?.referralCode || 'DEMO'}&pos=RIGHT`, "RIGHT")}
                      size="sm" 
                      className="bg-gradient-to-r from-emerald-600/90 to-amber-500/90 hover:from-emerald-700 hover:to-amber-600 text-white backdrop-blur-sm ring-1 ring-amber-300/30 shadow-md"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </motion.div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-emerald-200/50 ring-1 ring-amber-400/10">
                  <code className="text-xs text-emerald-800 break-all font-mono">
                    {window.location.origin}/user/register?ref={stats?.user?.referralCode || 'DEMO'}&pos=RIGHT
                  </code>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`${window.location.origin}/user/register?ref=${stats?.user?.referralCode || 'DEMO'}&pos=RIGHT`, "Right referral link")}
                  className="mt-3 w-full text-emerald-700 hover:text-emerald-800 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-amber-50/50 border border-amber-200/30"
                >
                  <Copy className="h-3 w-3 mr-2" />
                  Copy Link
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Wallet Overview - Glass Cards with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
          <Wallet className="h-5 w-5 mr-2 text-emerald-600" />
          Wallet Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-0 bg-gradient-to-br from-emerald-500/90 via-emerald-600/90 to-amber-500/80 backdrop-blur-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 ring-2 ring-amber-400/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-white/20 to-amber-400/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Wallet className="h-6 w-6" />
                  </motion.div>
                  <ArrowRight className="h-5 w-5 opacity-50 text-amber-200" />
                </div>
                <p className="text-white/90 text-sm font-medium mb-1">Purchase Wallet</p>
                <motion.p 
                  className="text-3xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {formatCurrency(stats?.wallets?.purchaseWallet || 0)}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-0 bg-gradient-to-br from-emerald-600/90 via-emerald-700/90 to-amber-600/80 backdrop-blur-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 ring-2 ring-amber-400/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-white/20 to-amber-400/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Award className="h-6 w-6" />
                  </motion.div>
                  <ArrowRight className="h-5 w-5 opacity-50 text-amber-200" />
                </div>
                <p className="text-white/90 text-sm font-medium mb-1">Commission Wallet</p>
                <motion.p 
                  className="text-3xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {formatCurrency(stats?.wallets?.commissionWallet || 0)}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-0 bg-gradient-to-br from-emerald-700/90 via-emerald-800/90 to-amber-700/80 backdrop-blur-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 ring-2 ring-amber-400/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-white/20 to-amber-400/20 rounded-xl backdrop-blur-sm ring-1 ring-amber-300/30"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Gift className="h-6 w-6" />
                  </motion.div>
                  <ArrowRight className="h-5 w-5 opacity-50 text-amber-200" />
                </div>
                <p className="text-white/90 text-sm font-medium mb-1">Referral Wallet</p>
                <motion.p 
                  className="text-3xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {formatCurrency(stats?.wallets?.referralWallet || 0)}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Team Statistics - Glass Cards with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-emerald-600" />
          Team Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'My Directs', value: stats?.team?.directs || 0, icon: Users },
            { label: 'Total Team', value: formatNumber(stats?.team?.totalTeam || 0), icon: Users },
            { label: 'Left BV', value: formatNumber(stats?.team?.leftBV || 0), icon: TrendingUp },
            { label: 'Right BV', value: formatNumber(stats?.team?.rightBV || 0), icon: TrendingUp },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 1, y: 0, opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            >
              <Card className="border border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-amber-500 ring-1 ring-amber-400/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <motion.div 
                      className="p-2 bg-gradient-to-br from-emerald-100/50 to-amber-100/40 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <stat.icon className="h-5 w-5 text-emerald-600" />
                    </motion.div>
                    <TrendingUp className="h-4 w-4 text-amber-500" />
                  </div>
                  <p className="text-emerald-700/70 text-sm font-medium mb-1">{stat.label}</p>
                  <motion.p 
                    className="text-3xl font-bold text-emerald-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Monthly Performance - Glass Card with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="border border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-xl flex items-center text-emerald-800">
              <Target className="h-6 w-6 mr-2 text-amber-600" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Monthly Income', value: formatCurrency(stats?.monthly?.income || 0), color: 'text-emerald-700' },
                { label: 'Target', value: formatCurrency(stats?.monthly?.target || 0), color: 'text-emerald-800' },
                { label: 'Achievement', value: `${stats?.monthly?.achieved || 0}%`, color: 'text-emerald-600', isAchievement: true },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-emerald-200/50 ring-1 ring-amber-400/10"
                >
                  <p className="text-emerald-700/70 text-sm font-medium mb-2">{item.label}</p>
                  <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
                  {item.isAchievement && (
                    <div className="mt-3 w-full bg-emerald-100/50 rounded-full h-2.5 backdrop-blur-sm ring-1 ring-amber-300/20 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(stats?.monthly?.achieved || 0, 100)}%` }}
                        transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  )}
                  {item.isAchievement && stats?.monthly?.achieved && stats.monthly.achieved >= 100 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.5, type: "spring" }}
                      className="mt-2"
                    >
                      <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white ring-1 ring-amber-300/50">🎉</Badge>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* User Info Cards - Glass Cards with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <motion.div
          initial={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-md hover:shadow-lg transition-all duration-200 ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-emerald-800">
                <Award className="h-5 w-5 mr-2 text-emerald-600" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-emerald-200/50">
                <span className="text-emerald-700/70 text-sm">Registration:</span>
                <span className="font-semibold text-emerald-800">{stats?.user?.registrationDate || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-emerald-200/50">
                <span className="text-emerald-700/70 text-sm">Rank:</span>
                <Badge className="bg-gradient-to-r from-amber-500/90 via-amber-500/90 to-yellow-500/90 text-white backdrop-blur-sm ring-1 ring-amber-300/30 shadow-md">
                  {stats?.user?.rank || 'Bronze'}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-emerald-700/70 text-sm">Status:</span>
                <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white ring-1 ring-amber-400/20">
                  {stats?.user?.status || 'Active'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-md hover:shadow-lg transition-all duration-200 ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-emerald-800">
                <Users className="h-5 w-5 mr-2 text-emerald-600" />
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-emerald-200/50">
                <span className="text-emerald-700/70 text-sm">Email:</span>
                <span className="font-semibold text-emerald-800 text-sm">{stats?.user?.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-emerald-200/50">
                <span className="text-emerald-700/70 text-sm">Mobile:</span>
                <span className="font-semibold text-emerald-800">{stats?.user?.mobileNo || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-emerald-700/70 text-sm">Referral Code:</span>
                <Badge variant="outline" className="font-mono font-bold border-amber-300 text-emerald-700 ring-1 ring-amber-400/20">
                  {stats?.user?.referralCode || 'DEMO'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdvancedDashboard;
