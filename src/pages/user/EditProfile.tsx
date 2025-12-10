import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Camera, Save, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { authAPI } from "@/api/auth";
import { toast } from "sonner";

const EditProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    dateOfBirth: "",
    dateOfJoining: "",
    gender: "",
    country: "",
    state: "",
    district: "",
    city: "",
    address: "",
    pincode: "",
    accountNo: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    pancard: "",
    nomineeName: "",
    relation: "",
    age: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();
      if (response.success && response.data) {
        const data = response.data;
        setProfile(data);
        setProfileImagePreview(data.profileImage || null);

        // Parse date of birth
        let dob = "";
        if (data.dateOfBirth) {
          const dobDate = new Date(data.dateOfBirth);
          dob = dobDate.toISOString().split("T")[0];
        }

        // Parse date of joining (createdAt)
        let doj = "";
        if (data.createdAt || data.registrationDate) {
          const dojDate = new Date(data.createdAt || data.registrationDate);
          doj = dojDate.toISOString().split("T")[0];
        }

        setFormData({
          name: data.name || "",
          email: data.email || "",
          mobileNo: data.mobileNo || "",
          dateOfBirth: dob,
          dateOfJoining: doj,
          gender: data.gender || "",
          country: data.address?.country || "India",
          state: data.address?.state || "",
          district: data.address?.district || "",
          city: data.address?.city || "",
          address: data.address?.address || "",
          pincode: data.address?.pincode || "",
          accountNo: data.bankDetails?.accountNo || "",
          bankName: data.bankDetails?.bankName || "",
          branchName: data.bankDetails?.branchName || "",
          ifscCode: data.bankDetails?.ifscCode || "",
          pancard: data.bankDetails?.pancard || "",
          nomineeName: data.nomineeDetails?.nomineeName || "",
          relation: data.nomineeDetails?.relation || "",
          age: data.nomineeDetails?.age?.toString() || "",
        });
      }
    } catch (error: any) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const updateData: any = {
        name: formData.name,
        email: formData.email,
        mobileNo: formData.mobileNo,
        dateOfBirth: formData.dateOfBirth || undefined,
        gender: formData.gender || undefined,
        address: {
          country: formData.country || "India",
          state: formData.state || undefined,
          district: formData.district || undefined,
          city: formData.city || undefined,
          address: formData.address || undefined,
          pincode: formData.pincode || undefined,
        },
        bankDetails: {
          accountNo: formData.accountNo || undefined,
          bankName: formData.bankName || undefined,
          branchName: formData.branchName || undefined,
          ifscCode: formData.ifscCode || undefined,
          pancard: formData.pancard || undefined,
        },
        nomineeDetails: {
          nomineeName: formData.nomineeName || undefined,
          relation: formData.relation || undefined,
          age: formData.age ? parseInt(formData.age) : undefined,
        },
      };

      // If profile image is selected, upload it
      if (profileImageFile) {
        const formDataToSend = new FormData();
        formDataToSend.append("profileImage", profileImageFile);
        Object.keys(updateData).forEach((key) => {
          if (updateData[key] && typeof updateData[key] === "object") {
            formDataToSend.append(key, JSON.stringify(updateData[key]));
          } else if (updateData[key] !== undefined) {
            formDataToSend.append(key, updateData[key]);
          }
        });

        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://api.mybyoliva.com/users/profile",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update profile");
        }

        const result = await response.json();
        if (result.success) {
          toast.success("Profile updated successfully!");
          // Update preview with the uploaded image URL
          if (result.data && result.data.profileImage) {
            setProfileImagePreview(result.data.profileImage);
          }
          fetchProfile();
          setProfileImageFile(null);
        }
      } else {
        // No image upload, use regular API
        const response = await authAPI.updateProfile(updateData);
        if (response.success) {
          toast.success("Profile updated successfully!");
          fetchProfile();
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          Member Profile
        </h1>
      </motion.div>

      <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">
            PERSONAL DETAILS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-800">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobileNo" className="text-blue-800">
                Mobile No <span className="text-red-500">*</span>
              </Label>
              <Input
                id="mobileNo"
                value={formData.mobileNo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, mobileNo: e.target.value }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-blue-800">
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dateOfBirth: e.target.value,
                  }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfJoining" className="text-blue-800">
                Date of Joining
              </Label>
              <Input
                id="dateOfJoining"
                type="date"
                value={formData.dateOfJoining}
                disabled
                className="border-blue-200/50 bg-gray-100/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-800">
                Email Id
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-blue-800">
                Gender
              </Label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="w-full p-2 border border-blue-200/50 bg-white/80 backdrop-blur-sm rounded-md ring-1 ring-amber-400/10"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">
            COMMUNICATION DETAILS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-blue-800">
                Country
              </Label>
              <select
                id="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, country: e.target.value }))
                }
                className="w-full p-2 border border-blue-200/50 bg-white/80 backdrop-blur-sm rounded-md ring-1 ring-amber-400/10"
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-blue-800">
                State
              </Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, state: e.target.value }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="district" className="text-blue-800">
                District
              </Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, district: e.target.value }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-blue-800">
                City
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-blue-800">
                Address
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full p-3 border border-blue-200/50 bg-white/80 backdrop-blur-sm rounded-md h-20 ring-1 ring-amber-400/10"
                placeholder="Enter your address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode" className="text-blue-800">
                Pincode
              </Label>
              <Input
                id="pincode"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, pincode: e.target.value }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">
            BANK & PAN DETAILS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountNo" className="text-blue-800">
                Account No
              </Label>
              <Input
                id="accountNo"
                value={formData.accountNo}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    accountNo: e.target.value,
                  }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankName" className="text-blue-800">
                Bank Name
              </Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, bankName: e.target.value }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branchName" className="text-blue-800">
                Branch Name
              </Label>
              <Input
                id="branchName"
                value={formData.branchName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    branchName: e.target.value,
                  }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ifscCode" className="text-blue-800">
                IFSC Code
              </Label>
              <Input
                id="ifscCode"
                value={formData.ifscCode}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, ifscCode: e.target.value }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pancard" className="text-blue-800">
                Pancard
              </Label>
              <Input
                id="pancard"
                value={formData.pancard}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, pancard: e.target.value }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">
            NOMINEE DETAILS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomineeName" className="text-blue-800">
                Nominee Name
              </Label>
              <Input
                id="nomineeName"
                value={formData.nomineeName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nomineeName: e.target.value,
                  }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="relation" className="text-blue-800">
                Relation
              </Label>
              <Input
                id="relation"
                value={formData.relation}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, relation: e.target.value }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-blue-800">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, age: e.target.value }))
                }
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">
            PROFILE PICTURE
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-6">
            <div className="relative">
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-200/50 ring-2 ring-amber-400/20"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100/70 to-amber-100/50 rounded-full flex items-center justify-center backdrop-blur-sm ring-2 ring-amber-400/20">
                  <User className="h-16 w-16 text-blue-600" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="border-blue-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-blue-50/50"
              >
                <Upload className="h-4 w-4 mr-2" />
                {profileImageFile ? "Change Photo" : "Upload Photo"}
              </Button>
              {profileImageFile && (
                <p className="text-sm text-blue-700 mt-2">
                  {profileImageFile.name}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </motion.div>
    </div>
  );
};

export default EditProfile;
