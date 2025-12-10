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
import { Badge } from "@/components/ui/badge";
import { authAPI } from "@/api/auth";
import { toast } from "sonner";
import {
  Users,
  Copy,
  Share2,
  Link,
  UserPlus,
  TrendingUp,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

interface UserProfile {
  referralCode: string;
  name: string;
  username: string;
}

interface Referral {
  id: string;
  name: string;
  username: string;
  email: string;
  joinDate: string;
  status: "active" | "inactive";
  level: number;
}

const MyReferrals = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralsLoading, setReferralsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchReferrals();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setProfile(response.data);
    } catch (error: any) {
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const fetchReferrals = async () => {
    try {
      setReferralsLoading(true);
      const response = await authAPI.getDirectReferrals();

      if (response.success && response.data) {
        const referralsData = response.data.map((ref: any) => ({
          id: ref.id,
          name: ref.name,
          username: ref.username,
          email: ref.email,
          joinDate: ref.createdAt,
          status: ref.isActive ? ("active" as const) : ("inactive" as const),
          level: 1, // Direct referrals are level 1
        }));
        setReferrals(referralsData);
      } else {
        setReferrals([]);
      }
    } catch (error: any) {
      console.error("Failed to load referrals:", error);
      setReferrals([]);
    } finally {
      setReferralsLoading(false);
    }
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/user/register?ref=${profile?.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
  };

  const shareReferralLink = () => {
    const referralLink = `${window.location.origin}/user/register?ref=${profile?.referralCode}`;
    const text = `Join Osfigo using my referral link: ${referralLink}`;

    if (navigator.share) {
      navigator.share({
        title: "Join Osfigo",
        text: text,
        url: referralLink,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Referral message copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const activeReferrals = referrals.filter((r) => r.status === "active").length;
  const totalEarnings = activeReferrals * 250;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            My Referrals
          </h1>
          <p className="text-blue-700/70 mt-1">
            Manage your referral network and earnings
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={shareReferralLink}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
          >
            <Share2 className="h-4 w-4" />
            Share Referral Link
          </Button>
        </motion.div>
      </motion.div>

      {/* Statistics with Glass Effect */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Referrals",
            value: referrals.length,
            icon: Users,
            color: "blue",
          },
          {
            label: "Active Referrals",
            value: activeReferrals,
            icon: UserPlus,
            color: "blue",
          },
          {
            label: "Total Earnings",
            value: `₹${totalEarnings.toLocaleString()}`,
            icon: TrendingUp,
            color: "amber",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-amber-400/10 border-l-4 border-blue-500">
              <CardHeader>
                <CardTitle
                  className={`flex items-center gap-2 text-${stat.color}-600`}
                >
                  <stat.icon className="h-5 w-5" />
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold text-${stat.color}-700`}>
                  {stat.value}
                </div>
                <p className="text-blue-700/70 text-sm mt-1">
                  {stat.label === "Total Earnings"
                    ? "From referral commissions"
                    : "People you've referred"}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Referral Link with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Link className="h-5 w-5 text-blue-600" />
              Your Referral Link
            </CardTitle>
            <CardDescription className="text-blue-700/70">
              Share this link with others to earn referral commissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={`${window.location.origin}/user/register?ref=${
                  profile?.referralCode || ""
                }`}
                readOnly
                className="font-mono text-sm bg-white/80 backdrop-blur-sm border-blue-200/50 ring-1 ring-amber-400/10"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={copyReferralLink}
                  variant="outline"
                  className="flex items-center gap-2 border-blue-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-blue-50/50"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </motion.div>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50/70 to-amber-50/50 backdrop-blur-sm border border-blue-200/50 rounded-lg ring-1 ring-amber-400/10">
              <h4 className="font-medium text-blue-800 mb-2">
                Your Referral Code:
              </h4>
              <div className="text-2xl font-bold text-blue-700 font-mono bg-white/60 backdrop-blur-sm px-4 py-2 rounded ring-1 ring-amber-400/20 inline-block">
                {profile?.referralCode}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Referrals List with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Award className="h-5 w-5 text-blue-600" />
              Referral Network
            </CardTitle>
            <CardDescription className="text-blue-700/70">
              People who joined using your referral link
            </CardDescription>
          </CardHeader>
          <CardContent>
            {referralsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : referrals.length > 0 ? (
              <div className="space-y-4">
                {referrals.map((referral, index) => (
                  <motion.div
                    key={referral.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.01, x: 5 }}
                    className="flex justify-between items-center p-4 border border-blue-200/50 bg-white/60 backdrop-blur-sm rounded-lg hover:shadow-md transition-all duration-200 ring-1 ring-amber-400/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100/70 to-amber-100/50 rounded-full flex items-center justify-center backdrop-blur-sm ring-1 ring-amber-300/20">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800">
                          {referral.name}
                        </h4>
                        <p className="text-sm text-blue-700/70">
                          @{referral.username}
                        </p>
                        <p className="text-sm text-blue-700/70">
                          {referral.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
                          referral.status === "active"
                            ? "bg-blue-100/70 text-blue-800 ring-1 ring-blue-300/30"
                            : "bg-gray-100/70 text-gray-600 ring-1 ring-gray-300/30"
                        }`}
                      >
                        {referral.status}
                      </Badge>
                      <p className="text-sm text-blue-700/70 mt-1">
                        Joined: {referral.joinDate}
                      </p>
                      <p className="text-sm text-blue-600 font-medium">
                        Level {referral.level}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-blue-700/70">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50 text-blue-600" />
                <p>No referrals yet</p>
                <p className="text-sm">
                  Share your referral link to start earning commissions
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MyReferrals;
