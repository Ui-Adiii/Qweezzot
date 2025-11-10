import React, { useState, useEffect } from 'react';
import { Share2, Copy, Users, TrendingUp, Award, Gift, RefreshCw, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { getDashboardStats } from '@/api/auth';

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

const AdvancedDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboardStats();
      setStats(data);
    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      setError(err.message || 'Failed to fetch dashboard data');
      // No fallback data - show actual error to user
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
      <div className="p-6 space-y-6 bg-white min-h-screen">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              <p className="text-lg font-medium text-primary">Loading your dashboard...</p>
              <p className="text-sm text-muted-foreground">Please wait while we fetch your data</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="p-6 space-y-6 bg-white min-h-screen">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <p className="text-red-600 font-medium">Failed to load dashboard data</p>
              <p className="text-sm text-red-500">{error}</p>
              <Button 
                onClick={fetchDashboardData} 
                className="mt-4" 
                variant="outline"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Retrying...' : 'Retry'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Fallback to empty stats if still null/undefined
  if (!stats) {
    return (
      <div className="p-6 space-y-6 bg-white min-h-screen">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6 text-center">
            <p className="text-yellow-600">No dashboard data available.</p>
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
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* Welcome Header - Light Theme */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary-light/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                <AvatarImage src="/api/placeholder/64/64" />
                <AvatarFallback className="bg-primary text-white text-lg font-bold">
                  {stats?.user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-muted-foreground text-sm">Welcome</p>
                <h1 className="text-2xl font-bold text-primary">{stats?.user?.name || 'User'}</h1>
                <p className="text-foreground font-medium">{stats?.user?.username || ''}</p>
              </div>
            </div>
            <Button onClick={fetchDashboardData} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Company Branding */}
      <Card className="bg-gradient-to-r from-accent/10 to-secondary/10 border-accent/20">
        <CardContent className="p-4">
          <h2 className="text-2xl font-bold text-center text-primary">Byoliva Dashboard</h2>
        </CardContent>
      </Card>

      {/* Referral Links - Light Theme */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Referral Links</h3>
        
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                  LEFT POSITION
                </Badge>
                <code className="bg-white px-3 py-2 rounded border text-sm flex-1 truncate">
                  https://byoliva.com/join?ref={stats?.user?.referralCode || 'DEMO'}&pos=LEFT
                </code>
              </div>
              <Button 
                onClick={() => shareLink(`https://byoliva.com/join?ref=${stats?.user?.referralCode || 'DEMO'}&pos=LEFT`, "LEFT")}
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">
                  RIGHT POSITION
                </Badge>
                <code className="bg-white px-3 py-2 rounded border text-sm flex-1 truncate">
                  https://byoliva.com/join?ref={stats?.user?.referralCode || 'DEMO'}&pos=RIGHT
                </code>
              </div>
              <Button 
                onClick={() => shareLink(`https://byoliva.com/join?ref=${stats?.user?.referralCode || 'DEMO'}&pos=RIGHT`, "RIGHT")}
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Info Cards - Light Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-primary">Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Registration:</span> {stats?.user?.registrationDate || 'N/A'}</p>
              <p className="text-sm"><span className="font-medium">Rank:</span> {stats?.user?.rank || 'Bronze'}</p>
              <p className="text-sm"><span className="font-medium">Status:</span> 
                <Badge variant="default" className="ml-2 bg-green-600 hover:bg-green-700">
                  {stats?.user?.status || 'Active'}
                </Badge>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-accent/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-primary">Contact Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Email:</span> {stats?.user?.email || 'N/A'}</p>
              <p className="text-sm"><span className="font-medium">Mobile:</span> {stats?.user?.mobileNo || 'N/A'}</p>
              <p className="text-sm"><span className="font-medium">Referral Code:</span> 
                <Badge variant="outline" className="ml-2">{stats?.user?.referralCode || 'DEMO'}</Badge>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wallet Overview - Light Theme */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Wallet className="h-5 w-5 mr-2 text-green-600" />
              Purchase Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(stats?.wallets?.purchaseWallet || 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Award className="h-5 w-5 mr-2 text-blue-600" />
              Commission Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(stats?.wallets?.commissionWallet || 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Gift className="h-5 w-5 mr-2 text-purple-600" />
              Referral Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">
              {formatCurrency(stats?.wallets?.referralWallet || 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Statistics - Light Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-teal-200 bg-teal-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-teal-600" />
              My Directs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-teal-600">{stats?.team?.directs || 0}</p>
          </CardContent>
        </Card>

        <Card className="border-teal-200 bg-teal-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-teal-600" />
              Total Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-teal-600">{formatNumber(stats?.team?.totalTeam || 0)}</p>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-indigo-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
              Left BV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-indigo-600">{formatNumber(stats?.team?.leftBV || 0)}</p>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-indigo-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
              Right BV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-indigo-600">{formatNumber(stats?.team?.rightBV || 0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
            Monthly Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Income</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(stats?.monthly?.income || 0)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Target</p>
              <p className="text-2xl font-bold text-slate-600">{formatCurrency(stats?.monthly?.target || 0)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Achievement</p>
              <p className="text-2xl font-bold text-green-600">{stats?.monthly?.achieved || 0}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedDashboard;
