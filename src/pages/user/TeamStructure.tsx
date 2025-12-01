import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, ChevronDown, ChevronRight, RefreshCw } from 'lucide-react';
import { authAPI } from '@/api/auth';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface TeamMember {
  id: string;
  name: string;
  username: string;
  email: string;
  referralCode: string;
  isActive: boolean;
  rank: string;
  position: 'left' | 'right';
  createdAt: string;
  children?: TeamMember[];
}

interface TeamStructure {
  user: {
    id: string;
    name: string;
    username: string;
    referralCode: string;
  };
  stats: {
    directReferrals: number;
    totalTeam: number;
  };
  tree: TeamMember[];
}

const TeamStructure: React.FC = () => {
  const [teamData, setTeamData] = useState<TeamStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

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
          const firstLevelIds = response.data.tree.map((member: TeamMember) => member.id);
          setExpandedNodes(new Set(firstLevelIds));
        }
      } else {
        setTeamData(null);
      }
    } catch (error: any) {
      console.error('Failed to load team structure:', error);
      toast.error('Failed to load team structure');
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

  const renderTree = (members: TeamMember[], level: number = 0): React.ReactNode => {
    if (!members || members.length === 0) return null;

    return (
      <div className={`space-y-2 ${level > 0 ? 'ml-6 border-l-2 border-emerald-200/50 pl-4' : ''}`}>
        {members.map((member, index) => {
          const hasChildren = member.children && member.children.length > 0;
          const isExpanded = expandedNodes.has(member.id);
          // const isLeft = member.position === 'left';
          const isLeft = member.position?.toLowerCase() === 'left';

          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01, x: 5 }}
              className="space-y-2"
            >
              <Card className={`border-${isLeft ? 'emerald' : 'emerald'}-200/50 bg-white/70 backdrop-blur-xl shadow-md hover:shadow-lg transition-all duration-200 ring-1 ring-amber-400/10`}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {hasChildren && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleNode(member.id)}
                          className="h-6 w-6 p-0 hover:bg-emerald-50/50"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-emerald-600" />
                          )}
                        </Button>
                      )}
                      {!hasChildren && <div className="w-6" />}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-emerald-800">{member.name}</span>
                          <Badge variant="outline" className="text-xs border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10">
                            {member.rank}
                          </Badge>
                          {member.isActive ? (
                            <Badge className="bg-emerald-100/70 text-emerald-800 ring-1 ring-emerald-300/30 backdrop-blur-sm text-xs">Active</Badge>
                          ) : (
                            <Badge className="bg-amber-100/70 text-amber-800 ring-1 ring-amber-300/30 backdrop-blur-sm text-xs">Inactive</Badge>
                          )}
                        </div>
                        <p className="text-sm text-emerald-700/70">
                          {member.username} • {member.referralCode}
                        </p>
                        {hasChildren && (
                          <p className="text-xs text-emerald-600/70">
                            {member.children?.length || 0} sub-members
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge className={`backdrop-blur-sm ${
                      isLeft 
                        ? 'bg-emerald-100/70 text-emerald-800 ring-1 ring-emerald-300/30' 
                        : 'bg-amber-100/70 text-amber-800 ring-1 ring-amber-300/30'
                    }`}>
                      {/* {member.position.toUpperCase()} */}
                      {(member.position || "N/A").toUpperCase()}

                    </Badge>
                  </div>
                </CardContent>
              </Card>
              {hasChildren && isExpanded && (
                <div className="mt-2">
                  {renderTree(member.children || [], level + 1)}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };

  const calculateTeamStats = (members: TeamMember[]): { left: number; right: number } => {
    let left = 0;
    let right = 0;

    const countMembers = (members: TeamMember[]) => {
      members.forEach(member => {
        // if (member.position === 'left') left++;
        // else if (member.position === 'right') right++;
        if (member.position?.toLowerCase() === 'left') left++;
else if (member.position?.toLowerCase() === 'right') right++;

        
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
      <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20 min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-emerald-600 mx-auto mb-4" />
            <p className="text-emerald-700/70">Loading team structure...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20 min-h-screen">
        <div className="text-center py-12 text-emerald-700/70">
          <Users className="h-16 w-16 text-emerald-300 mx-auto mb-4" />
          <p className="text-lg font-medium">No team structure available</p>
          <Button onClick={fetchTeamStructure} className="mt-4 border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-emerald-50/50" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const teamStats = calculateTeamStats(teamData.tree);

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
            <Users className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">Team Structure</h1>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={fetchTeamStructure} 
            variant="outline" 
            disabled={loading}
            className="border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-emerald-50/50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </motion.div>
      </motion.div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Direct Referrals', value: teamData.stats.directReferrals, color: 'emerald' },
          { label: 'Left Team', value: teamStats.left, color: 'emerald' },
          { label: 'Right Team', value: teamStats.right, color: 'amber' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-amber-400/10 border-l-4 border-emerald-500">
              <CardContent className="p-4 text-center">
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
            <CardTitle className="text-emerald-800">Binary Tree Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Root User */}
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block p-4 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 backdrop-blur-sm rounded-lg border border-emerald-200/50 ring-2 ring-amber-400/20"
                >
                  <h3 className="font-semibold text-emerald-800">{teamData.user.name}</h3>
                  <p className="text-sm text-emerald-700/70">{teamData.user.username}</p>
                  <p className="text-xs text-emerald-600/70">Code: {teamData.user.referralCode}</p>
                </motion.div>
              </div>
              
              {/* Team Tree */}
              {teamData.tree && teamData.tree.length > 0 ? (
                <div className="mt-6">
                  {renderTree(teamData.tree)}
                </div>
              ) : (
                <div className="text-center py-8 text-emerald-700/70">
                  <Users className="h-12 w-12 text-emerald-300 mx-auto mb-4" />
                  <p>No team members yet</p>
                  <p className="text-sm">Start referring members to build your team!</p>
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
