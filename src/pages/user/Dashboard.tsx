import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Wallet,
  TrendingUp,
  Package,
  DollarSign,
  Trophy,
  RefreshCw,
  Percent,
  Gift,
} from "lucide-react";
import { authAPI } from "@/api/auth";
import { bonanzaAPI } from "@/api/bonanza";
import { welcomeBonusAPI } from "@/api/welcome-bonus";
import { matchingBonusAPI } from "@/api/matching-bonus";
import { mentorshipBonusAPI } from "@/api/mentorship-bonus";
import { monthlyRepurchaseBonusAPI } from "@/api/monthly-repurchase-bonus";
import { rankRoyaltyAPI } from "@/api/rank-royalty";
import { weeklyTargetAPI } from "@/api/weekly-target";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  downlineCount: number;
  wallets: {
    purchaseWallet: number;
    earnedWallet: number;
    referralWallet: number;
    repurchaseWallet?: number;
    cashbackWallet?: number;
  };
  totalPayment: number;
  todayPayment: number;
  bvCommissionPercentage?: string;
  user: {
    name: string;
    username: string;
    email: string;
    referralCode: string;
    isActive: boolean;
    packageAmount: number;
    isPackagePurchased: boolean;
    packageId?: any;
  };
}

const UserDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentBonanza, setCurrentBonanza] = useState<any>(null);
  const [bonanzaLoading, setBonanzaLoading] = useState(false);
  const [welcomeBonusStats, setWelcomeBonusStats] = useState<any>(null);
  const [matchingBonusStats, setMatchingBonusStats] = useState<any>(null);
  const [mentorshipBonusStats, setMentorshipBonusStats] = useState<any>(null);
  const [monthlyRepurchaseBonusStats, setMonthlyRepurchaseBonusStats] =
    useState<any>(null);
  const [rankRoyaltyStats, setRankRoyaltyStats] = useState<any>(null);
  const [userRank, setUserRank] = useState<string>("Supervisor");
  const [weeklyTargetStatus, setWeeklyTargetStatus] = useState<any>(null);

  useEffect(() => {
    fetchDashboardData();
    fetchCurrentBonanza();
    fetchWelcomeBonusStats();
    fetchMatchingBonusStats();
    fetchMentorshipBonusStats();
    fetchMonthlyRepurchaseBonusStats();
    fetchRankRoyaltyStats();
    fetchWeeklyTargetStatus();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await authAPI.getDashboard();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error: any) {
      toast.error("Failed to load dashboard data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentBonanza = async () => {
    try {
      setBonanzaLoading(true);
      const response = await bonanzaAPI.getCurrentBonanza();
      if (response.success && response.data) {
        setCurrentBonanza(response.data);
      }
    } catch (error: any) {
      // Silently fail - bonanza is optional
      console.log("No active bonanza or error:", error);
    } finally {
      setBonanzaLoading(false);
    }
  };

  const fetchWelcomeBonusStats = async () => {
    try {
      const response = await welcomeBonusAPI.getMyStats();
      if (response.success) {
        setWelcomeBonusStats(response.stats);
      }
    } catch (error: any) {
      // Silently fail - welcome bonus stats are optional
      console.log("No welcome bonus stats or error:", error);
    }
  };

  const fetchMatchingBonusStats = async () => {
    try {
      const response = await matchingBonusAPI.getMyStats();
      if (response) {
        setMatchingBonusStats(response);
      }
    } catch (error: any) {
      // Silently fail - matching bonus stats are optional
      console.log("No matching bonus stats or error:", error);
    }
  };

  const fetchMentorshipBonusStats = async () => {
    try {
      const response = await mentorshipBonusAPI.getMyStats();
      if (response) {
        setMentorshipBonusStats(response);
      }
    } catch (error: any) {
      // Silently fail - mentorship bonus stats are optional
      console.log("No mentorship bonus stats or error:", error);
    }
  };

  const fetchMonthlyRepurchaseBonusStats = async () => {
    try {
      const response = await monthlyRepurchaseBonusAPI.getMyStats();
      if (response) {
        setMonthlyRepurchaseBonusStats(response);
      }
    } catch (error: any) {
      // Silently fail - monthly repurchase bonus stats are optional
      console.log("No monthly repurchase bonus stats or error:", error);
    }
  };

  const fetchRankRoyaltyStats = async () => {
    try {
      const response = await rankRoyaltyAPI.getMyStats();
      if (response) {
        setRankRoyaltyStats(response);
      }
      // Get user rank from stats
      if (stats?.user?.rank) {
        setUserRank(stats.user.rank);
      }
    } catch (error: any) {
      // Silently fail - rank & royalty stats are optional
      console.log("No rank & royalty stats or error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  // Get BV Commission percentage from stats
  const getBVCommissionPercentage = () => {
    return stats?.bvCommissionPercentage || "50%";
  };

  const cards = [
    {
      title: "My Referrals",
      value: stats?.downlineCount ?? 0,
      icon: Users,
      color: "bg-gradient-to-r from-purple-400 via-pink-400 to-red-400",
    },
    {
      title: "Shopping Wallet",
      value: `₹${(stats?.wallets?.purchaseWallet ?? 0).toLocaleString()}`,
      icon: Wallet,
      color: "bg-gradient-to-r from-sky-400 to-sky-600",
      subtitle: "Available for purchases",
    },
    {
      title: "Earned Wallet",
      value: `₹${(stats?.wallets?.earnedWallet ?? 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-gradient-to-r from-sky-400 to-sky-600",
      subtitle: `BV Commission (${getBVCommissionPercentage()})`,
    },
    {
      title: "Referral Wallet",
      value: `₹${(stats?.wallets?.referralWallet ?? 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
      subtitle:
        welcomeBonusStats?.totalEarned > 0
          ? `Welcome Bonus: ₹${welcomeBonusStats.totalEarned.toLocaleString()}`
          : "Referral earnings",
    },
    {
      title: "Repurchase Wallet",
      value: `₹${(stats?.wallets?.repurchaseWallet ?? 0).toLocaleString()}`,
      icon: RefreshCw,
      color: "bg-gradient-to-r from-cyan-400 to-teal-500",
      subtitle: "Repurchase bonuses (1%)",
    },
    {
      title: "Cashback Wallet",
      value: `₹${(stats?.wallets?.cashbackWallet ?? 0).toLocaleString()}`,
      icon: Gift,
      color: "bg-gradient-to-r from-pink-400 to-rose-500",
      subtitle: "Cashback & package rewards",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-sky-500">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {stats?.user?.name || "User"}!
        </h1>
        <p className="text-gray-600">
          Username:{" "}
          <span className="font-semibold">{stats?.user?.username}</span> |
          Referral Code:{" "}
          <span className="font-semibold text-sky-600">
            {stats?.user?.referralCode}
          </span>
        </p>
        <div className="mt-2">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              stats?.user?.isActive
                ? "bg-sky-100 text-sky-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {stats?.user?.isActive ? "Active" : "Inactive"}
          </span>
          {stats?.user?.isPackagePurchased && (
            <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-sky-100 text-sky-800">
              Package Purchased: ₹{stats.user.packageAmount}
            </span>
          )}
        </div>
      </div>

      {/* Welcome Bonus Card */}
      {welcomeBonusStats && welcomeBonusStats.totalBonuses > 0 && (
        <Card className="border-2 border-sky-400 bg-gradient-to-r from-sky-50 to-sky-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-sky-400 to-sky-500 rounded-lg">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-sky-900">
                  Welcome Bonus Earnings
                </CardTitle>
                <p className="text-sm text-sky-700 mt-1">
                  Earned from direct referrals' first purchases
                </p>
              </div>
            </div>
            <Badge className="bg-sky-500 text-white px-3 py-1">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-sky-600 font-medium">
                  Total Bonuses
                </p>
                <p className="text-lg font-bold text-sky-900">
                  {welcomeBonusStats.totalBonuses || 0}
                </p>
              </div>
              <div>
                <p className="text-xs text-sky-600 font-medium">Credited</p>
                <p className="text-lg font-bold text-sky-900">
                  {welcomeBonusStats.creditedBonuses || 0}
                </p>
              </div>
              <div>
                <p className="text-xs text-sky-600 font-medium">
                  Total Earned
                </p>
                <p className="text-lg font-bold text-sky-900">
                  ₹{welcomeBonusStats.totalEarned?.toLocaleString() || "0.00"}
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white/60 rounded-lg">
              <p className="text-sm text-sky-800">
                <Gift className="h-4 w-4 inline mr-2" />
                You earn 25% of BV as Welcome Bonus when your direct referrals
                make their first purchase (min 1000 BV)
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Matching Bonus Card */}
      {matchingBonusStats && (
        <Card className="border-2 border-sky-400 bg-gradient-to-r from-sky-50 to-indigo-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-lg">
                <Percent className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-sky-900">
                  Matching Bonus (10% of BV)
                </CardTitle>
                <p className="text-sm text-sky-700 mt-1">
                  Weekly matching bonus from left and right leg BV
                </p>
              </div>
            </div>
            <Badge className="bg-sky-500 text-white px-3 py-1">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-sky-600 font-medium">Left Leg BV</p>
                <p className="text-lg font-bold text-sky-900">
                  {matchingBonusStats.leftLegBV?.toLocaleString() || 0}
                </p>
              </div>
              <div>
                <p className="text-xs text-sky-600 font-medium">
                  Right Leg BV
                </p>
                <p className="text-lg font-bold text-sky-900">
                  {matchingBonusStats.rightLegBV?.toLocaleString() || 0}
                </p>
              </div>
              <div>
                <p className="text-xs text-sky-600 font-medium">Matched BV</p>
                <p className="text-lg font-bold text-sky-900">
                  {matchingBonusStats.matchedBV?.toLocaleString() || 0}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 p-3 bg-sky-100/50 rounded-lg">
              <div>
                <p className="text-xs text-sky-600 font-medium">
                  Matching Bonus
                </p>
                <p className="text-lg font-bold text-sky-900">
                  ₹
                  {matchingBonusStats.totalMatchingBonus?.toLocaleString() ||
                    "0.00"}
                </p>
                <p className="text-xs text-sky-500">10% of Matched BV</p>
              </div>
              <div>
                <p className="text-xs text-purple-600 font-medium">
                  Additional Bonus
                </p>
                <p className="text-lg font-bold text-purple-900">
                  ₹
                  {matchingBonusStats.totalAdditionalBonus?.toLocaleString() ||
                    "0.00"}
                </p>
                <p className="text-xs text-purple-500">
                  100% of Matching Bonus
                </p>
              </div>
              <div>
                <p className="text-xs text-indigo-600 font-medium">
                  Total Earned
                </p>
                <p className="text-xl font-bold text-indigo-900">
                  ₹{matchingBonusStats.totalEarned?.toLocaleString() || "0.00"}
                </p>
                <p className="text-xs text-indigo-500">Matching + Additional</p>
              </div>
            </div>
            {matchingBonusStats.currentWeek && (
              <div className="mt-4 p-3 bg-white/60 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-sky-800">
                    Current Week Bonus
                  </p>
                  <div className="flex gap-2">
                    <Badge className="bg-sky-100 text-sky-800">
                      Matching: ₹
                      {matchingBonusStats.currentWeek.bonusAmount?.toFixed(2) ||
                        "0.00"}
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800">
                      Additional: ₹
                      {matchingBonusStats.currentWeek.additionalBonus?.toFixed(
                        2
                      ) || "0.00"}
                    </Badge>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-xs text-sky-600">
                    Week:{" "}
                    {matchingBonusStats.currentWeek.weekStartDate
                      ? new Date(
                          matchingBonusStats.currentWeek.weekStartDate
                        ).toLocaleDateString()
                      : "N/A"}{" "}
                    -
                    {matchingBonusStats.currentWeek.weekEndDate
                      ? new Date(
                          matchingBonusStats.currentWeek.weekEndDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="text-xs text-sky-600">
                    Status:{" "}
                    <span className="font-medium capitalize">
                      {matchingBonusStats.currentWeek.status || "pending"}
                    </span>
                  </p>
                </div>
                <div className="mt-2 p-2 bg-indigo-50 rounded">
                  <p className="text-sm font-semibold text-indigo-900 text-center">
                    Total: ₹
                    {(
                      (matchingBonusStats.currentWeek.bonusAmount || 0) +
                      (matchingBonusStats.currentWeek.additionalBonus || 0)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            )}
            <div className="mt-4 p-3 bg-white/60 rounded-lg">
              <p className="text-sm text-sky-800 mb-2">
                <Percent className="h-4 w-4 inline mr-2" />
                <strong>Matching Bonus:</strong> You earn 10% of matched BV.
                First pair: 2:1 or 1:2, Next pairs: 1:1 unlimited depth
              </p>
              <p className="text-sm text-purple-800">
                <Gift className="h-4 w-4 inline mr-2" />
                <strong>Additional Bonus:</strong> Company gives you 100%
                additional bonus on your matching bonus amount!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mentorship Bonus Card */}
      {mentorshipBonusStats && mentorshipBonusStats.totalEarned > 0 && (
        <Card className="border-2 border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-purple-900">
                  Mentorship Bonus (50% Total)
                </CardTitle>
                <p className="text-sm text-purple-700 mt-1">
                  Earn from team members' matching bonus income (3 levels)
                </p>
              </div>
            </div>
            <Badge className="bg-purple-500 text-white px-3 py-1">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-sky-600 font-medium">
                  1st Level (25%)
                </p>
                <p className="text-lg font-bold text-sky-900">
                  ₹
                  {mentorshipBonusStats.levelStats?.level1?.total?.toLocaleString() ||
                    "0.00"}
                </p>
                <p className="text-xs text-sky-500">
                  {mentorshipBonusStats.levelStats?.level1?.count || 0} bonuses
                </p>
              </div>
              <div>
                <p className="text-xs text-yellow-600 font-medium">
                  2nd Level (15%)
                </p>
                <p className="text-lg font-bold text-yellow-900">
                  ₹
                  {mentorshipBonusStats.levelStats?.level2?.total?.toLocaleString() ||
                    "0.00"}
                </p>
                <p className="text-xs text-yellow-500">
                  {mentorshipBonusStats.levelStats?.level2?.count || 0} bonuses
                </p>
              </div>
              <div>
                <p className="text-xs text-sky-600 font-medium">
                  3rd Level (10%)
                </p>
                <p className="text-lg font-bold text-sky-900">
                  ₹
                  {mentorshipBonusStats.levelStats?.level3?.total?.toLocaleString() ||
                    "0.00"}
                </p>
                <p className="text-xs text-sky-500">
                  {mentorshipBonusStats.levelStats?.level3?.count || 0} bonuses
                </p>
              </div>
              <div>
                <p className="text-xs text-purple-600 font-medium">
                  Total Earned
                </p>
                <p className="text-xl font-bold text-purple-900">
                  ₹
                  {mentorshipBonusStats.totalEarned?.toLocaleString() || "0.00"}
                </p>
                <p className="text-xs text-purple-500">All Levels</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white/60 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-purple-800">
                  Today's Earnings
                </p>
                <Badge className="bg-purple-100 text-purple-800">
                  ₹
                  {mentorshipBonusStats.todayEarned?.toLocaleString() || "0.00"}
                </Badge>
              </div>
              <p className="text-xs text-purple-600">
                {mentorshipBonusStats.todayCount || 0} bonuses credited today
              </p>
            </div>
            <div className="mt-4 p-3 bg-white/60 rounded-lg">
              <p className="text-sm text-purple-800 mb-2">
                <Users className="h-4 w-4 inline mr-2" />
                <strong>Mentorship Bonus:</strong> Earn 50% from your team's
                matching bonus income
              </p>
              <ul className="text-xs text-purple-700 space-y-1 ml-6">
                <li>• 1st Level (Direct Team): 25% of their matching bonus</li>
                <li>• 2nd Level: 15% of their matching bonus</li>
                <li>• 3rd Level: 10% of their matching bonus</li>
                <li>
                  • <strong>No Capping</strong> - Unlimited earnings!
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Repurchase Bonus Card */}
      {monthlyRepurchaseBonusStats &&
        monthlyRepurchaseBonusStats.totalEarned > 0 && (
          <Card className="border-2 border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg">
                  <RefreshCw className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-indigo-900">
                    Monthly Repurchase Bonus (100% BV Distribution)
                  </CardTitle>
                  <p className="text-sm text-indigo-700 mt-1">
                    Earn 10% on BV from team's monthly repurchase (₹1000
                    minimum) - 10 levels
                  </p>
                </div>
              </div>
              <Badge className="bg-indigo-500 text-white px-3 py-1">
                Active
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-indigo-600 font-medium">
                    Current Month
                  </p>
                  <p className="text-lg font-bold text-indigo-900">
                    ₹
                    {monthlyRepurchaseBonusStats.currentMonthEarned?.toLocaleString() ||
                      "0.00"}
                  </p>
                  <p className="text-xs text-indigo-500">
                    {monthlyRepurchaseBonusStats.currentMonthCount || 0} bonuses
                  </p>
                </div>
                <div>
                  <p className="text-xs text-indigo-600 font-medium">
                    Total Earned
                  </p>
                  <p className="text-xl font-bold text-indigo-900">
                    ₹
                    {monthlyRepurchaseBonusStats.totalEarned?.toLocaleString() ||
                      "0.00"}
                  </p>
                  <p className="text-xs text-indigo-500">All Time</p>
                </div>
                <div>
                  <p className="text-xs text-indigo-600 font-medium">
                    Levels Active
                  </p>
                  <p className="text-lg font-bold text-indigo-900">
                    {
                      Object.values(
                        monthlyRepurchaseBonusStats.levelStats || {}
                      ).filter((l: any) => l.count > 0).length
                    }{" "}
                    / 10
                  </p>
                  <p className="text-xs text-indigo-500">
                    Levels with earnings
                  </p>
                </div>
                <div>
                  <p className="text-xs text-indigo-600 font-medium">
                    Total Bonuses
                  </p>
                  <p className="text-lg font-bold text-indigo-900">
                    {Object.values(
                      monthlyRepurchaseBonusStats.levelStats || {}
                    ).reduce((sum: number, l: any) => sum + (l.count || 0), 0)}
                  </p>
                  <p className="text-xs text-indigo-500">All levels</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white/60 rounded-lg">
                <p className="text-sm font-medium text-indigo-800 mb-2">
                  Level-wise Earnings (10% per level)
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => {
                    const levelStat = monthlyRepurchaseBonusStats.levelStats?.[
                      `level${level}`
                    ] || { total: 0, count: 0 };
                    return (
                      <div
                        key={level}
                        className="bg-indigo-50 rounded p-2 text-center"
                      >
                        <div className="text-xs text-indigo-600">L{level}</div>
                        <div className="text-sm font-bold text-indigo-900">
                          ₹{levelStat.total?.toLocaleString() || "0"}
                        </div>
                        <div className="text-xs text-indigo-500">
                          {levelStat.count || 0}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 p-3 bg-white/60 rounded-lg">
                <p className="text-sm text-indigo-800 mb-2">
                  <RefreshCw className="h-4 w-4 inline mr-2" />
                  <strong>Monthly Repurchase Bonus:</strong> When team members
                  do monthly repurchase of ₹1000+, you earn 10% of their BV (500
                  BV) at each level (up to 10 levels)
                </p>
                <ul className="text-xs text-indigo-700 space-y-1 ml-6">
                  <li>• Minimum repurchase: ₹1000</li>
                  <li>• BV calculation: ₹1000 = 500 BV</li>
                  <li>• Commission: 10% per level (50 BV per level)</li>
                  <li>• Total distribution: 100% of BV (10 levels × 10%)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

      {/* Rank & Royalty Bonus Card */}
      {rankRoyaltyStats && (
        <Card className="border-2 border-sky-400 bg-gradient-to-r from-sky-50 to-indigo-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-sky-900">
                  Rank & Royalty Bonus
                </CardTitle>
                <p className="text-sm text-sky-700 mt-1">
                  Current Rank: <strong>{userRank}</strong> | Royalty based on
                  Company Monthly Sales
                </p>
              </div>
            </div>
            <Badge className="bg-sky-500 text-white px-3 py-1">
              {userRank}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-sky-600 font-medium">
                  Total Royalty Earned
                </p>
                <p className="text-xl font-bold text-sky-900">
                  ₹{rankRoyaltyStats.totalEarned?.toLocaleString() || "0.00"}
                </p>
                <p className="text-xs text-sky-500">All Time</p>
              </div>
              {rankRoyaltyStats.currentMonthBonus && (
                <>
                  <div>
                    <p className="text-xs text-indigo-600 font-medium">
                      Current Month
                    </p>
                    <p className="text-lg font-bold text-indigo-900">
                      ₹
                      {rankRoyaltyStats.currentMonthBonus.royaltyBonusAmount?.toLocaleString() ||
                        "0.00"}
                    </p>
                    <p className="text-xs text-indigo-500">
                      {rankRoyaltyStats.currentMonthBonus.status ===
                      "zero_sales"
                        ? "Zero Sales"
                        : rankRoyaltyStats.currentMonthBonus.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-purple-600 font-medium">
                      Company Sales
                    </p>
                    <p className="text-lg font-bold text-purple-900">
                      ₹
                      {rankRoyaltyStats.currentMonthBonus.companyMonthlySales?.toLocaleString() ||
                        "0.00"}
                    </p>
                    <p className="text-xs text-purple-500">
                      CTO:{" "}
                      {rankRoyaltyStats.currentMonthBonus.ctoPercentage || 0}%
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="mt-4 p-3 bg-white/60 rounded-lg">
              <p className="text-sm text-sky-800 mb-2">
                <Trophy className="h-4 w-4 inline mr-2" />
                <strong>Royalty Bonus:</strong> Earn percentage of company
                monthly sales based on your rank
              </p>
              <ul className="text-xs text-sky-700 space-y-1 ml-6">
                <li>
                  • Royalty Bonus = Company Monthly Sales × CTO % (per your
                  rank)
                </li>
                <li>• If company sales = ₹0, then royalty bonus = ₹0</li>
                <li>
                  • Royalty bonus is capped per rank (see rank configuration)
                </li>
                <li>
                  • Matching bonus is also capped per rank (monthly limit)
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Target Offer Card */}
      {weeklyTargetStatus && weeklyTargetStatus.hasActiveTarget && (
        <Card className="border-2 border-orange-400 bg-gradient-to-r from-orange-50 to-yellow-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-orange-900">
                  {weeklyTargetStatus.weeklyTarget?.title ||
                    "Weekly Target Offer"}
                </CardTitle>
                <p className="text-sm text-orange-700 mt-1">
                  {weeklyTargetStatus.weeklyTarget?.description ||
                    "Complete weekly target to earn rewards"}
                </p>
              </div>
            </div>
            <Badge className="bg-orange-500 text-white px-3 py-1">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-orange-600 font-medium">
                  Required Referrals
                </p>
                <p className="text-lg font-bold text-orange-900">
                  {weeklyTargetStatus.weeklyTarget?.requiredReferrals || 0}
                </p>
                <p className="text-xs text-orange-500">Direct referrals</p>
              </div>
              <div>
                <p className="text-xs text-orange-600 font-medium">
                  Min BV per Referral
                </p>
                <p className="text-lg font-bold text-orange-900">
                  {weeklyTargetStatus.weeklyTarget?.minimumBVPerReferral || 0}{" "}
                  BV
                </p>
                <p className="text-xs text-orange-500">Per referral</p>
              </div>
              <div>
                <p className="text-xs text-orange-600 font-medium">
                  Your Progress
                </p>
                <p className="text-lg font-bold text-orange-900">
                  {weeklyTargetStatus.qualification?.qualifiedReferralsCount ||
                    0}{" "}
                  / {weeklyTargetStatus.weeklyTarget?.requiredReferrals || 0}
                </p>
                <p className="text-xs text-orange-500">Qualified referrals</p>
              </div>
              <div>
                <p className="text-xs text-orange-600 font-medium">Reward</p>
                <p className="text-lg font-bold text-orange-900">
                  {weeklyTargetStatus.weeklyTarget?.rewardDescription || "N/A"}
                </p>
                <p className="text-xs text-orange-500">
                  {weeklyTargetStatus.weeklyTarget?.rewardType || "product"}
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white/60 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-orange-800">Progress</p>
                <Badge
                  className={
                    weeklyTargetStatus.qualification?.isQualified
                      ? "bg-sky-500"
                      : "bg-orange-500"
                  }
                >
                  {weeklyTargetStatus.qualification?.isQualified
                    ? "Qualified!"
                    : "In Progress"}
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full ${
                    weeklyTargetStatus.qualification?.isQualified
                      ? "bg-sky-500"
                      : "bg-orange-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      ((weeklyTargetStatus.qualification
                        ?.qualifiedReferralsCount || 0) /
                        (weeklyTargetStatus.weeklyTarget?.requiredReferrals ||
                          1)) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
              {weeklyTargetStatus.qualification?.referrals &&
                weeklyTargetStatus.qualification.referrals.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <p className="text-xs font-medium text-orange-800 mb-2">
                      Your Referrals:
                    </p>
                    {weeklyTargetStatus.qualification.referrals.map(
                      (ref: any, idx: number) => (
                        <div
                          key={idx}
                          className={`text-xs p-2 rounded ${
                            ref.qualified
                              ? "bg-sky-100 text-sky-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {ref.referralName} ({ref.referralUsername}) -{" "}
                          {ref.bvAmount} BV {ref.qualified ? "✓" : "✗"}
                        </div>
                      )
                    )}
                  </div>
                )}
            </div>
            <div className="mt-4 p-3 bg-white/60 rounded-lg">
              <p className="text-sm text-orange-800 mb-2">
                <Trophy className="h-4 w-4 inline mr-2" />
                <strong>Weekly Target:</strong> Refer{" "}
                {weeklyTargetStatus.weeklyTarget?.requiredReferrals || 0} direct
                users with minimum{" "}
                {weeklyTargetStatus.weeklyTarget?.minimumBVPerReferral || 0} BV
                each in this week
              </p>
              <p className="text-xs text-orange-700">
                Week:{" "}
                {weeklyTargetStatus.weeklyTarget?.weekStartDate
                  ? new Date(
                      weeklyTargetStatus.weeklyTarget.weekStartDate
                    ).toLocaleDateString()
                  : ""}{" "}
                -{" "}
                {weeklyTargetStatus.weeklyTarget?.weekEndDate
                  ? new Date(
                      weeklyTargetStatus.weeklyTarget.weekEndDate
                    ).toLocaleDateString()
                  : ""}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Bonanza Card */}
      {currentBonanza && (
        <Card className="border-2 border-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-amber-900">
                  {currentBonanza.title}
                </CardTitle>
                <p className="text-sm text-amber-700 mt-1">
                  {currentBonanza.description || "Monthly Bonanza Offer"}
                </p>
              </div>
            </div>
            <Badge className="bg-sky-500 text-white px-3 py-1">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-amber-600 font-medium">
                  Min Purchase
                </p>
                <p className="text-lg font-bold text-amber-900">
                  ₹
                  {currentBonanza.minimumRepurchaseAmount?.toLocaleString() ||
                    0}
                </p>
              </div>
              <div>
                <p className="text-xs text-amber-600 font-medium">
                  Required BV
                </p>
                <p className="text-lg font-bold text-amber-900">
                  {currentBonanza.requiredBV || 0} BV
                </p>
              </div>
              <div>
                <p className="text-xs text-amber-600 font-medium">Gift Type</p>
                <p className="text-lg font-bold text-amber-900 capitalize">
                  {currentBonanza.gift?.type || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-amber-600 font-medium">Gift Value</p>
                <p className="text-lg font-bold text-amber-900">
                  {currentBonanza.gift?.type === "cash" &&
                    `₹${
                      currentBonanza.gift?.cashAmount?.toLocaleString() || 0
                    }`}
                  {currentBonanza.gift?.type === "discount" &&
                    `${currentBonanza.gift?.discountPercentage || 0}%`}
                  {(currentBonanza.gift?.type === "product" &&
                    currentBonanza.gift?.productName) ||
                    "N/A"}
                </p>
              </div>
            </div>
            {currentBonanza.gift?.description && (
              <div className="mt-4 p-3 bg-white/60 rounded-lg">
                <p className="text-sm text-amber-800">
                  <Gift className="h-4 w-4 inline mr-2" />
                  {currentBonanza.gift.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-lg"
            >
              <div
                className={`absolute inset-0 ${card.color} opacity-10`}
              ></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-2xl font-bold text-gray-900">
                  {card.value}
                </div>
                {card.subtitle && (
                  <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5 text-sky-600" />
              System Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Users:</span>
              <span className="font-semibold">{stats?.totalUsers ?? 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Users:</span>
              <span className="font-semibold text-sky-600">
                {stats?.activeUsers ?? 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Payment:</span>
              <span className="font-semibold">₹{stats?.totalPayment ?? 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-sky-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
                View Profile
              </button>
              <button className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
                Wallet History
              </button>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Referral Link
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
