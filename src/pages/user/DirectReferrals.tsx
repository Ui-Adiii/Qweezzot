import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, TrendingUp } from 'lucide-react';
import { authAPI } from '@/api/auth';
import { motion } from 'framer-motion';

interface Referral {
  id: string;
  name: string;
  username: string;
  email: string;
  mobileNo: string;
  referralCode: string;
  isActive: boolean;
  rank: string;
  createdAt: string;
  wallets: {
    purchaseWallet: number;
    commissionWallet: number;
    referralWallet: number;
  };
}

const DirectReferrals: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [stats, setStats] = useState({
    totalReferrals: 0,
    activeThisMonth: 0,
    totalCommissions: 0
  });

  useEffect(() => {
    fetchReferralsData();
  }, []);

  const fetchReferralsData = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getDirectReferrals();
      
      if (response.success) {
        const referralsData = response.data || [];
        setReferrals(referralsData);
        setStats({
          totalReferrals: response.stats?.total || referralsData.length || 0,
          activeThisMonth: response.stats?.active || referralsData.filter((r: Referral) => r.isActive).length || 0,
          totalCommissions: referralsData.reduce((sum: number, r: Referral) => sum + (r.wallets?.commissionWallet || 0), 0)
        });
      }
    } catch (error: any) {
      console.error('Failed to load referrals data:', error);
      setReferrals([]);
      setStats({
        totalReferrals: 0,
        activeThisMonth: 0,
        totalCommissions: 0
      });
    } finally {
      setLoading(false);
    }
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
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <UserPlus className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">Direct Referrals</h1>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Direct Referrals', value: stats.totalReferrals, icon: Users, color: 'emerald' },
          { label: 'Active This Month', value: stats.activeThisMonth, icon: TrendingUp, color: 'emerald' },
          { label: 'Total Commissions', value: formatCurrency(stats.totalCommissions), icon: UserPlus, color: 'amber' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-amber-400/10 border-l-4 border-emerald-500">
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-8 w-8 text-${stat.color}-600 mx-auto mb-2`} />
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`text-2xl font-bold text-${stat.color}-700`}
                >
                  {stat.value}
                </motion.p>
                <p className={`text-sm text-${stat.color}-700/70 mt-1`}>{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-emerald-800">Your Direct Team</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>
            ) : referrals.length === 0 ? (
              <div className="text-center py-8 text-emerald-700/70">
                <Users className="h-12 w-12 text-emerald-300 mx-auto mb-4" />
                <p>No direct referrals yet</p>
                <p className="text-sm">Start referring members to build your team!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {referrals.map((referral, index) => (
                  <motion.div
                    key={referral.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ scale: 1.01, x: 5 }}
                  >
                    <Card className="border-emerald-200/50 bg-white/60 backdrop-blur-sm hover:shadow-md transition-all duration-200 ring-1 ring-amber-400/5">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-100/70 to-amber-100/50 rounded-full flex items-center justify-center backdrop-blur-sm ring-1 ring-amber-300/20">
                              <Users className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-emerald-800">{referral.name}</h3>
                              <p className="text-sm text-emerald-700/70">
                                {referral.username} • {referral.email}
                              </p>
                              <p className="text-xs text-emerald-600/70">
                                Joined: {new Date(referral.createdAt).toLocaleDateString('en-IN')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge className={`backdrop-blur-sm ${
                              referral.isActive 
                                ? "bg-emerald-100/70 text-emerald-800 ring-1 ring-emerald-300/30" 
                                : "bg-amber-100/70 text-amber-800 ring-1 ring-amber-300/30"
                            }`}>
                              {referral.isActive ? "Active" : "Inactive"}
                            </Badge>
                            <div>
                              <Badge variant="outline" className="text-xs border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10">
                                {referral.rank}
                              </Badge>
                            </div>
                            <p className="text-xs text-emerald-600/70">Code: {referral.referralCode}</p>
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

export default DirectReferrals;
