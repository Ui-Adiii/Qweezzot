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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { authAPI } from "@/api/auth";
import { toast } from "sonner";
import { Settings, Lock, Bell, Shield, Eye, EyeOff, Save } from "lucide-react";
import { motion } from "framer-motion";

interface UserSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  twoFactorAuth: boolean;
  profileVisibility: "public" | "private";
}

const UserSettings = () => {
  const [loading, setLoading] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [settings, setSettings] = useState<UserSettings>({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    twoFactorAuth: false,
    profileVisibility: "private",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setSettingsLoading(true);
      const response = await authAPI.getUserSettings();
      if (response.success && response.data) {
        setSettings(response.data);
      }
    } catch (error: any) {
      console.error("Failed to load settings:", error);
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleSettingsChange = (
    key: keyof UserSettings,
    value: boolean | string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      const response = await authAPI.updateUserSettings(settings);
      if (response.success) {
        toast.success("Settings saved successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (response.success) {
        toast.success("Password changed successfully!");
        setPasswordForm({
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
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-gradient-to-br from-sky-50/30 via-white to-sky-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
            <Settings className="h-8 w-8 text-sky-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
            Settings
          </h1>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={saveSettings}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-800">
                <Bell className="h-5 w-5 text-sky-600" />
                Notifications
              </CardTitle>
              <CardDescription className="text-sky-700/70">
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  key: "emailNotifications",
                  label: "Email Notifications",
                  desc: "Receive updates via email",
                },
                {
                  key: "smsNotifications",
                  label: "SMS Notifications",
                  desc: "Receive updates via SMS",
                },
                {
                  key: "marketingEmails",
                  label: "Marketing Emails",
                  desc: "Receive promotional content",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <Label className="text-sky-800">{item.label}</Label>
                    <p className="text-sm text-sky-700/70">{item.desc}</p>
                  </div>
                  <Switch
                    checked={
                      settings[item.key as keyof UserSettings] as boolean
                    }
                    onCheckedChange={(checked) =>
                      handleSettingsChange(
                        item.key as keyof UserSettings,
                        checked
                      )
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-800">
                <Shield className="h-5 w-5 text-sky-600" />
                Security & Privacy
              </CardTitle>
              <CardDescription className="text-sky-700/70">
                Manage your security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sky-800">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-sky-700/70">
                    Add extra security to your account
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    handleSettingsChange("twoFactorAuth", checked)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sky-800">Profile Visibility</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="private"
                      name="visibility"
                      checked={settings.profileVisibility === "private"}
                      onChange={() =>
                        handleSettingsChange("profileVisibility", "private")
                      }
                      className="text-sky-600"
                    />
                    <Label htmlFor="private" className="text-sky-800">
                      Private (Only you can see your profile)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="public"
                      name="visibility"
                      checked={settings.profileVisibility === "public"}
                      onChange={() =>
                        handleSettingsChange("profileVisibility", "public")
                      }
                      className="text-sky-600"
                    />
                    <Label htmlFor="public" className="text-sky-800">
                      Public (Visible to other members)
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Change Password */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="border-sky-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-800">
                <Lock className="h-5 w-5 text-sky-600" />
                Change Password
              </CardTitle>
              <CardDescription className="text-sky-700/70">
                Update your account password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-sky-800">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      placeholder="Enter current password"
                      className="border-sky-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-sky-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-sky-600" />
                      )}
                    </Button>
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
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      placeholder="Enter new password"
                      className="border-sky-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-sky-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-sky-600" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sky-800">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    placeholder="Confirm new password"
                    className="border-sky-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
                  />
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4"
              >
                <Button
                  onClick={changePassword}
                  disabled={
                    loading ||
                    !passwordForm.currentPassword ||
                    !passwordForm.newPassword ||
                    !passwordForm.confirmPassword
                  }
                  className="bg-gradient-to-r from-sky-600 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
                >
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border-red-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-red-400/10">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription className="text-red-700/70">
                Actions that cannot be undone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-red-200/50 bg-red-50/30 backdrop-blur-sm rounded-lg ring-1 ring-red-300/20">
                  <div>
                    <h4 className="font-medium text-red-600">
                      Deactivate Account
                    </h4>
                    <p className="text-sm text-red-700/70">
                      Temporarily disable your account
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-200/50 hover:bg-red-50/50 backdrop-blur-sm ring-1 ring-red-300/20"
                  >
                    Deactivate
                  </Button>
                </div>

                <div className="flex justify-between items-center p-4 border border-red-200/50 bg-red-50/30 backdrop-blur-sm rounded-lg ring-1 ring-red-300/20">
                  <div>
                    <h4 className="font-medium text-red-600">Delete Account</h4>
                    <p className="text-sm text-red-700/70">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 ring-1 ring-red-300/30"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UserSettings;
