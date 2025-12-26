import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { authAPI } from "@/api/auth";

const TeamRank: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [rankData, setRankData] = useState<any>(null);

  useEffect(() => {
    fetchTeamRank();
  }, []);

  const fetchTeamRank = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getTeamRank();
      if (response.success && response.data) {
        setRankData(response.data);
      }
    } catch (error: any) {
      console.error("Failed to load team rank:", error);
      toast.error("Failed to load team rank");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-50/30 via-white to-sky-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <Star className="h-8 w-8 text-sky-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
          Team Rank
        </h1>
      </motion.div>

      {rankData && (
        <>
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-sky-700/70 mb-1">Total Members</p>
                  <p className="text-3xl font-bold text-sky-700">
                    {rankData.totalMembers || 0}
                  </p>
                </div>
                <Users className="h-10 w-10 text-sky-600/50" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rankData.rankSummary?.map((rankGroup: any) => (
              <Card
                key={rankGroup.rank}
                className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-sky-800 flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    {rankGroup.rank}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-sky-700 mb-4">
                    {rankGroup.count} Members
                  </p>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {rankGroup.members.map((member: any) => (
                      <div
                        key={member._id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {member.username}
                          </p>
                        </div>
                        {member.isActive ? (
                          <Badge className="bg-sky-100 text-sky-800">
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">
                            Inactive
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TeamRank;
