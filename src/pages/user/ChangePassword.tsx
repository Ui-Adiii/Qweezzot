import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { authAPI } from "@/api/auth";
import { toast } from "sonner";

const ChangePassword: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response.success) {
        toast.success("Password changed successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-50/30 via-white to-sky-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <Lock className="h-8 w-8 text-sky-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
          Change Password
        </h1>
      </motion.div>

      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="text-xl text-sky-800 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-sky-600" />
                Update Your Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sky-800">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={formData.currentPassword}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="border-sky-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-sky-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-sky-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sky-800">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className="border-sky-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-sky-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-sky-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sky-800">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="border-sky-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-sky-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-sky-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-gradient-to-br from-amber-50/70 to-yellow-50/50 backdrop-blur-sm border border-amber-200/50 rounded-lg ring-1 ring-amber-400/10">
                <h4 className="font-semibold text-amber-800 text-sm mb-2">
                  Password Requirements:
                </h4>
                <ul className="text-amber-700 text-xs space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Include at least one number</li>
                  <li>• Include at least one special character</li>
                </ul>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleChangePassword}
                  disabled={
                    loading ||
                    !formData.currentPassword ||
                    !formData.newPassword ||
                    !formData.confirmPassword
                  }
                  className="w-full bg-gradient-to-r from-sky-600 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-red-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-red-400/10 mt-6">
            <CardContent className="p-4">
              <h3 className="font-semibold text-red-800 mb-2 text-sm">
                Security Tips:
              </h3>
              <ul className="text-red-700 text-xs space-y-1">
                <li>• Change your password regularly</li>
                <li>• Don't share your password with anyone</li>
                <li>• Use a unique password for this account</li>
                <li>• Enable two-factor authentication if available</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangePassword;
