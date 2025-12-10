import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Maximize2,
  Minimize2,
  Search,
} from "lucide-react";
import { authAPI } from "@/api/auth";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface TeamMember {
  id: string;
  _id?: string;
  name: string;
  username: string;
  email: string;
  mobileNo?: string;
  referralCode: string;
  isActive: boolean;
  rank: string;
  position: "left" | "right" | null;
  createdAt: string;
  level?: number;
  directReferrals?: number;
  totalTeam?: number;
  children?: TeamMember[];
}

interface TeamStructure {
  user: {
    id: string;
    name: string;
    username: string;
    referralCode: string;
    rank?: string;
    isActive?: boolean;
  };
  stats: {
    directReferrals: number;
    totalTeam: number;
    leftTeam?: number;
    rightTeam?: number;
  };
  tree: TeamMember[];
}

const TeamStructure: React.FC = () => {
  const [teamData, setTeamData] = useState<TeamStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTeamStructure();
  }, []);

  const fetchTeamStructure = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getTeamStructure();

      if (response.success && response.data) {
        setTeamData(response.data);
        if (response.data.tree && response.data.tree.length > 0) {
          const firstLevelIds = response.data.tree
            .map((member: TeamMember) => member.id || member._id)
            .filter(Boolean);
          setExpandedNodes(new Set(firstLevelIds));
        }
      } else {
        setTeamData(null);
      }
    } catch (error: any) {
      console.error("Failed to load team structure:", error);
      toast.error("Failed to load team structure");
      setTeamData(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  // Expand all nodes recursively
  const expandAll = (members: TeamMember[]): Set<string> => {
    const allIds = new Set<string>();
    const collectIds = (members: TeamMember[]) => {
      members.forEach((member) => {
        const id = member.id || member._id;
        if (id) {
          allIds.add(id);
          if (member.children && member.children.length > 0) {
            collectIds(member.children);
          }
        }
      });
    };
    collectIds(members);
    return allIds;
  };

  const handleExpandAll = () => {
    if (teamData?.tree) {
      setExpandedNodes(expandAll(teamData.tree));
    }
  };

  const handleCollapseAll = () => {
    if (teamData?.tree) {
      // Keep only first level expanded
      const firstLevelIds = teamData.tree
        .map((member: TeamMember) => member.id || member._id)
        .filter(Boolean);
      setExpandedNodes(new Set(firstLevelIds));
    }
  };

  // Flatten tree structure for table display
  const flattenTree = (
    members: TeamMember[],
    level: number = 0,
    parentName: string = ""
  ): Array<TeamMember & { displayLevel: number; parentName: string }> => {
    const flattened: Array<
      TeamMember & { displayLevel: number; parentName: string }
    > = [];

    members.forEach((member) => {
      flattened.push({
        ...member,
        displayLevel: level,
        parentName: parentName || "Root",
      });

      if (member.children && member.children.length > 0) {
        const children = flattenTree(member.children, level + 1, member.name);
        flattened.push(...children);
      }
    });

    return flattened;
  };

  // Filter flattened members based on search term
  const filterMembers = (
    members: Array<TeamMember & { displayLevel: number; parentName: string }>,
    search: string
  ): Array<TeamMember & { displayLevel: number; parentName: string }> => {
    if (!search.trim()) return members;

    const searchLower = search.toLowerCase();
    return members.filter(
      (member) =>
        member.name?.toLowerCase().includes(searchLower) ||
        member.username?.toLowerCase().includes(searchLower) ||
        member.referralCode?.toLowerCase().includes(searchLower) ||
        member.email?.toLowerCase().includes(searchLower) ||
        member.rank?.toLowerCase().includes(searchLower) ||
        member.mobileNo?.toLowerCase().includes(searchLower)
    );
  };

  const calculateTeamStats = (
    members: TeamMember[]
  ): { left: number; right: number } => {
    let left = 0;
    let right = 0;

    const countMembers = (members: TeamMember[]) => {
      members.forEach((member) => {
        // if (member.position === 'left') left++;
        // else if (member.position === 'right') right++;
        if (member.position?.toLowerCase() === "left") left++;
        else if (member.position?.toLowerCase() === "right") right++;

        if (member.children) {
          countMembers(member.children);
        }
      });
    };

    countMembers(members);
    return { left, right };
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-blue-700/70">Loading team structure...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 min-h-screen">
        <div className="text-center py-12 text-blue-700/70">
          <Users className="h-16 w-16 text-blue-300 mx-auto mb-4" />
          <p className="text-lg font-medium">No team structure available</p>
          <Button
            onClick={fetchTeamStructure}
            className="mt-4 border-blue-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-blue-50/50"
            variant="outline"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const teamStats = calculateTeamStats(teamData.tree);

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Team Structure
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleExpandAll}
            variant="outline"
            size="sm"
            className="border-blue-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-blue-50/50"
          >
            <Maximize2 className="h-4 w-4 mr-2" />
            Expand All
          </Button>
          <Button
            onClick={handleCollapseAll}
            variant="outline"
            size="sm"
            className="border-blue-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-blue-50/50"
          >
            <Minimize2 className="h-4 w-4 mr-2" />
            Collapse All
          </Button>
          <Button
            onClick={fetchTeamStructure}
            variant="outline"
            disabled={loading}
            className="border-blue-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-blue-50/50"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Direct Referrals",
            value: teamData.stats.directReferrals,
            color: "blue",
          },
          {
            label: "Total Team",
            value: teamData.stats.totalTeam,
            color: "blue",
          },
          {
            label: "Left Team",
            value: teamData.stats.leftTeam || teamStats.left,
            color: "blue",
          },
          {
            label: "Right Team",
            value: teamData.stats.rightTeam || teamStats.right,
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
              <CardContent className="p-4 text-center">
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`text-2xl font-bold text-${stat.color}-700`}
                >
                  {stat.value}
                </motion.p>
                <p className={`text-sm text-${stat.color}-700/70 mt-1`}>
                  {stat.label}
                </p>
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
        <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-blue-800">
                Complete Team Tree Structure
              </CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, username, code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Root User */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block p-6 bg-gradient-to-br from-blue-500/30 to-amber-500/30 backdrop-blur-sm rounded-xl border-2 border-blue-300/50 ring-4 ring-amber-400/20 shadow-xl"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="font-bold text-xl text-blue-900">
                      {teamData.user.name}
                    </h3>
                    {teamData.user.rank && (
                      <Badge
                        className={`text-xs font-semibold ${
                          teamData.user.rank === "Diamond"
                            ? "bg-blue-100 text-blue-800"
                            : teamData.user.rank === "Platinum"
                            ? "bg-purple-100 text-purple-800"
                            : teamData.user.rank === "Gold"
                            ? "bg-yellow-100 text-yellow-800"
                            : teamData.user.rank === "Silver"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {teamData.user.rank}
                      </Badge>
                    )}
                    {teamData.user.isActive !== false && (
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium text-blue-800 mb-1">
                    {teamData.user.username}
                  </p>
                  <p className="text-xs text-blue-700/80">
                    Referral Code: {teamData.user.referralCode}
                  </p>
                  <p className="text-xs text-blue-600/70 mt-2 font-medium">
                    Level 0 (You)
                  </p>
                </motion.div>
              </div>

              {/* Team Table */}
              {teamData.tree && teamData.tree.length > 0 ? (
                <div className="mt-6 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50/50">
                        <TableHead className="font-semibold text-blue-900">
                          Level
                        </TableHead>
                        <TableHead className="font-semibold text-blue-900">
                          Name
                        </TableHead>
                        <TableHead className="font-semibold text-blue-900">
                          Username
                        </TableHead>
                        <TableHead className="font-semibold text-blue-900">
                          Referral Code
                        </TableHead>
                        <TableHead className="font-semibold text-blue-900">
                          Email
                        </TableHead>
                        <TableHead className="font-semibold text-blue-900">
                          Mobile
                        </TableHead>
                        <TableHead className="font-semibold text-blue-900">
                          Rank
                        </TableHead>
                        <TableHead className="font-semibold text-blue-900">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-blue-900">
                          Position
                        </TableHead>
                        <TableHead className="font-semibold text-blue-900">
                          Direct Referrals
                        </TableHead>
                        <TableHead className="font-semibold text-blue-900">
                          Total Team
                        </TableHead>
                        <TableHead className="font-semibold text-blue-900">
                          Join Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(() => {
                        const flattened = flattenTree(teamData.tree);
                        const filtered = searchTerm
                          ? filterMembers(flattened, searchTerm)
                          : flattened;

                        return filtered.length > 0 ? (
                          filtered.map((member, index) => {
                            const isLeft =
                              member.position?.toLowerCase() === "left";
                            const levelText =
                              member.displayLevel === 0
                                ? "Direct"
                                : `Level ${member.displayLevel + 1}`;

                            return (
                              <TableRow
                                key={member.id || member._id || index}
                                className={`hover:bg-blue-50/30 ${
                                  member.displayLevel > 0 ? "bg-gray-50/50" : ""
                                }`}
                              >
                                <TableCell className="font-medium">
                                  <Badge variant="outline" className="text-xs">
                                    {levelText}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-semibold text-blue-900">
                                  {member.name}
                                  {member.displayLevel > 0 && (
                                    <span className="text-xs text-gray-500 ml-2">
                                      ({member.parentName})
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell className="text-gray-700">
                                  {member.username}
                                </TableCell>
                                <TableCell className="font-mono text-sm">
                                  {member.referralCode}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                  {member.email || "-"}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                  {member.mobileNo || "-"}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={`text-xs font-medium ${
                                      member.rank === "Diamond"
                                        ? "bg-blue-100 text-blue-800"
                                        : member.rank === "Platinum"
                                        ? "bg-purple-100 text-purple-800"
                                        : member.rank === "Gold"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : member.rank === "Silver"
                                        ? "bg-gray-100 text-gray-800"
                                        : "bg-orange-100 text-orange-800"
                                    }`}
                                  >
                                    {member.rank || "Bronze"}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {member.isActive ? (
                                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                                      Active
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-red-100 text-red-800 text-xs">
                                      Inactive
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={`text-xs font-semibold ${
                                      isLeft
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-amber-100 text-amber-800"
                                    }`}
                                  >
                                    {member.position
                                      ? member.position.toUpperCase()
                                      : "N/A"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                  {member.directReferrals ||
                                    member.children?.length ||
                                    0}
                                </TableCell>
                                <TableCell className="text-center">
                                  {member.totalTeam || 0}
                                </TableCell>
                                <TableCell className="text-gray-600 text-sm">
                                  {member.createdAt
                                    ? new Date(
                                        member.createdAt
                                      ).toLocaleDateString()
                                    : "-"}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={12}
                              className="text-center py-8 text-blue-700/70"
                            >
                              <Users className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                              <p>No members found matching your search</p>
                            </TableCell>
                          </TableRow>
                        );
                      })()}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-blue-700/70">
                  <Users className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                  <p>No team members yet</p>
                  <p className="text-sm">
                    Start referring members to build your team!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TeamStructure;
