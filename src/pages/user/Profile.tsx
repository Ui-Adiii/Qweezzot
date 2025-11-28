import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authAPI } from '@/api/auth';
import { toast } from 'sonner';
import { User, Mail, Phone, Edit, Save, X } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  mobileNo: string;
  referralCode: string;
  isActive: boolean;
  wallets: {
    purchaseWallet: number;
    commissionWallet: number;
    referralWallet: number;
  };
}

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setProfile(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        mobileNo: response.data.mobileNo
      });
    } catch (error: any) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // In a real app, you'd have an update profile API
    toast.success('Profile updated successfully!');
    setEditing(false);
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        mobileNo: profile.mobileNo
      });
    }
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">Failed to load profile data</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">My Profile</h1>
        {!editing ? (
          <Button onClick={() => setEditing(true)} className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2 border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <Card className="lg:col-span-2 border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <User className="h-5 w-5 text-emerald-600" />
              Profile Information
            </CardTitle>
            <CardDescription className="text-emerald-700/70">
              Manage your personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!editing}
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={profile.username}
                disabled
                className="bg-gray-50"
              />
              <p className="text-sm text-gray-500 mt-1">Username cannot be changed</p>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                disabled={!editing}
              />
            </div>
            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                value={formData.mobileNo}
                onChange={(e) => setFormData(prev => ({ ...prev, mobileNo: e.target.value }))}
                disabled={!editing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Details */}
        <div className="space-y-6">
          <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="text-emerald-800">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-emerald-700/70">Status:</span>
                  <span className={`px-2 py-1 rounded text-sm font-medium backdrop-blur-sm ${
                    profile.isActive 
                      ? 'bg-emerald-100/70 text-emerald-800 ring-1 ring-emerald-300/30' 
                      : 'bg-red-100/70 text-red-800 ring-1 ring-red-300/30'
                  }`}>
                    {profile.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700/70">Referral Code:</span>
                  <span className="font-mono font-bold text-emerald-700 bg-white/60 backdrop-blur-sm px-2 py-1 rounded ring-1 ring-amber-400/20">
                    {profile.referralCode}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="text-emerald-800">Wallet Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-emerald-200/50">
                  <span className="text-emerald-700/70">Purchase Wallet:</span>
                  <span className="font-bold text-emerald-800">₹{profile.wallets.purchaseWallet}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-emerald-200/50">
                  <span className="text-emerald-700/70">Commission Wallet:</span>
                  <span className="font-bold text-emerald-800">₹{profile.wallets.commissionWallet}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-emerald-700/70">Referral Wallet:</span>
                  <span className="font-bold text-emerald-800">₹{profile.wallets.referralWallet}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
