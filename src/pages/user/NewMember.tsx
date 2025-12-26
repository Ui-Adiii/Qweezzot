import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Users, Gift, Share2 } from "lucide-react";

const NewMember: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      <div className="flex items-center space-x-3">
        <UserPlus className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Add New Member</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Form */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-xl text-primary">
              Register New Member
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter full name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" placeholder="Enter mobile number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Choose username" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Placement Position</Label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">Select Position</option>
                <option value="left">Left Position</option>
                <option value="right">Right Position</option>
              </select>
            </div>

            <Button className="w-full bg-primary hover:bg-primary-dark">
              <UserPlus className="h-4 w-4 mr-2" />
              Register Member
            </Button>
          </CardContent>
        </Card>

        {/* Referral Information */}
        <div className="space-y-6">
          <Card className="border-sky-200 bg-sky-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-sky-800 flex items-center">
                <Share2 className="h-5 w-5 mr-2" />
                Your Referral Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sky-700">Left Position Link</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    value={`${window.location.origin}/user/register?ref=YOUR_CODE&pos=LEFT`}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/user/register?ref=YOUR_CODE&pos=LEFT`
                      );
                      // You can add toast here if needed
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sky-700">Right Position Link</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    value={`${window.location.origin}/user/register?ref=YOUR_CODE&pos=RIGHT`}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/user/register?ref=YOUR_CODE&pos=RIGHT`
                      );
                      // You can add toast here if needed
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-sky-200 bg-sky-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-sky-800 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Your Team Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-sky-600">12</p>
                  <p className="text-sm text-sky-700">Direct Referrals</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-sky-600">48</p>
                  <p className="text-sm text-sky-700">Total Team</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-purple-800 flex items-center">
                <Gift className="h-5 w-5 mr-2" />
                Referral Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-purple-700 text-sm">
                <li>• ₹500 for each direct referral</li>
                <li>• 10% commission on their purchases</li>
                <li>• Binary matching bonus</li>
                <li>• Leadership bonuses at higher levels</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewMember;
