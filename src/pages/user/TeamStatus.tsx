import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, UserCheck, UserX } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { authAPI } from "@/api/auth";

const TeamStatus: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [statusData, setStatusData] = useState<any>(null);

  useEffect(() => {
    fetchTeamStatus();
  }, []);

  const fetchTeamStatus = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getTeamStatus();
      if (response.success && response.data) {
        setStatusData(response.data);
      }
    } catch (error: any) {
      console.error("Failed to load team status:", error);
      toast.error("Failed to load team status");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN");
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
          <Award className="h-8 w-8 text-sky-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
          Team Status
        </h1>
      </motion.div>

      {statusData && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-sky-700/70 mb-1">
                      Total Members
                    </p>
                    <p className="text-3xl font-bold text-sky-700">
                      {statusData.stats?.total || 0}
                    </p>
                  </div>
                  <Award className="h-10 w-10 text-sky-600/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-sky-700/70 mb-1">
                      Active Members
                    </p>
                    <p className="text-3xl font-bold text-sky-600">
                      {statusData.stats?.active || 0}
                    </p>
                  </div>
                  <UserCheck className="h-10 w-10 text-sky-600/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-sky-700/70 mb-1">
                      Inactive Members
                    </p>
                    <p className="text-3xl font-bold text-red-600">
                      {statusData.stats?.inactive || 0}
                    </p>
                  </div>
                  <UserX className="h-10 w-10 text-red-600/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-sky-700/70 mb-1">Active %</p>
                    <p className="text-3xl font-bold text-sky-700">
                      {statusData.stats?.activePercentage || "0.00"}%
                    </p>
                  </div>
                  <Award className="h-10 w-10 text-sky-600/50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Members */}
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="text-xl text-sky-800 flex items-center">
                <UserCheck className="h-5 w-5 mr-2" />
                Active Members ({statusData.active?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statusData.active?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No active members
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Username
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Joined
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {statusData.active?.map((member: any) => (
                        <tr key={member._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {member.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {member.username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {member.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className="bg-sky-100 text-sky-800">
                              {member.rank}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(member.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Inactive Members */}
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="text-xl text-sky-800 flex items-center">
                <UserX className="h-5 w-5 mr-2" />
                Inactive Members ({statusData.inactive?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statusData.inactive?.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No inactive members
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Username
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Joined
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {statusData.inactive?.map((member: any) => (
                        <tr key={member._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {member.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {member.username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {member.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className="bg-sky-100 text-sky-800">
                              {member.rank}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(member.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default TeamStatus;
