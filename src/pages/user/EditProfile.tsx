import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Camera, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const EditProfile: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <User className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">Edit Profile</h1>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="text-center text-emerald-800">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-100/70 to-amber-100/50 rounded-full mx-auto flex items-center justify-center backdrop-blur-sm ring-2 ring-amber-400/20">
                <User className="h-16 w-16 text-emerald-600" />
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="w-full border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-emerald-50/50">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="text-xl text-emerald-800">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-emerald-800">First Name</Label>
                  <Input id="firstName" defaultValue="John" className="border-emerald-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-emerald-800">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" className="border-emerald-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-emerald-800">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" className="border-emerald-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-emerald-800">Mobile Number</Label>
                <Input id="mobile" defaultValue="+91 9876543210" className="border-emerald-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-emerald-800">Username</Label>
                <Input id="username" defaultValue="johndoe123" disabled className="border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10" />
                <p className="text-sm text-emerald-700/70">Username cannot be changed</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="text-emerald-800">Address</Label>
                <Textarea 
                  id="address"
                  className="w-full p-3 border border-emerald-200/50 bg-white/80 backdrop-blur-sm rounded-md h-20 ring-1 ring-amber-400/10"
                  defaultValue="123 Main Street, City, State - 123456"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-emerald-800">Date of Birth</Label>
                  <Input id="dob" type="date" defaultValue="1990-01-01" className="border-emerald-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-emerald-800">Gender</Label>
                  <select className="w-full p-2 border border-emerald-200/50 bg-white/80 backdrop-blur-sm rounded-md ring-1 ring-amber-400/10">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6"
              >
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardContent className="p-6">
            <h3 className="font-semibold text-emerald-800 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg ring-1 ring-amber-400/10">
                <p className="text-sm text-emerald-700/70">Member ID</p>
                <p className="font-medium text-emerald-800">BYO001</p>
              </div>
              <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg ring-1 ring-amber-400/10">
                <p className="text-sm text-emerald-700/70">Join Date</p>
                <p className="font-medium text-emerald-800">Nov 15, 2024</p>
              </div>
              <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg ring-1 ring-amber-400/10">
                <p className="text-sm text-emerald-700/70">Current Rank</p>
                <p className="font-medium text-emerald-800">Bronze</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EditProfile;
