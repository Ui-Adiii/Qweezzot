import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { kycAPI } from "@/api/kyc";
import { toast } from "sonner";

const UpdateKyc: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [kycData, setKycData] = useState<any>(null);

  const [formData, setFormData] = useState({
    aadharNumber: "",
    panNumber: "",
  });

  const [files, setFiles] = useState({
    aadharFront: null as File | null,
    aadharBack: null as File | null,
    panCard: null as File | null,
    profileImage: null as File | null,
  });

  const [previews, setPreviews] = useState({
    aadharFront: null as string | null,
    aadharBack: null as string | null,
    panCard: null as string | null,
    profileImage: null as string | null,
  });

  const fileInputRefs = {
    aadharFront: useRef<HTMLInputElement>(null),
    aadharBack: useRef<HTMLInputElement>(null),
    panCard: useRef<HTMLInputElement>(null),
    profileImage: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    fetchKycStatus();
  }, []);

  const fetchKycStatus = async () => {
    try {
      setLoading(true);
      const response = await kycAPI.getKycStatus();
      if (response.success && response.data) {
        setKycData(response.data);
        setFormData({
          aadharNumber: response.data.aadharNumber || "",
          panNumber: response.data.panNumber || "",
        });
        // Set previews for existing images
        setPreviews({
          aadharFront: response.data.aadharFront || null,
          aadharBack: response.data.aadharBack || null,
          panCard: response.data.panCard || null,
          profileImage: response.data.profileImage || null,
        });
      }
    } catch (error: any) {
      console.error("Failed to load KYC status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (
    field: keyof typeof files,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      setFiles((prev) => ({ ...prev, [field]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.aadharNumber && !formData.panNumber) {
        toast.error("Please enter at least Aadhar Number or PAN Number");
        return;
      }

      // Check if at least one document is being uploaded
      const hasNewFiles = Object.values(files).some((file) => file !== null);
      if (!hasNewFiles && !kycData) {
        toast.error("Please upload at least one document");
        return;
      }

      setSubmitting(true);

      const formDataToSend = new FormData();

      // Add files
      if (files.aadharFront) {
        formDataToSend.append("aadharFront", files.aadharFront);
      }
      if (files.aadharBack) {
        formDataToSend.append("aadharBack", files.aadharBack);
      }
      if (files.panCard) {
        formDataToSend.append("panCard", files.panCard);
      }
      if (files.profileImage) {
        formDataToSend.append("profileImage", files.profileImage);
      }

      // Add form data
      if (formData.aadharNumber) {
        formDataToSend.append("aadharNumber", formData.aadharNumber);
      }
      if (formData.panNumber) {
        formDataToSend.append("panNumber", formData.panNumber);
      }

      const response = await kycAPI.uploadDocuments(formDataToSend);

      if (response.success) {
        toast.success(
          "KYC documents submitted successfully! Your request is pending admin approval."
        );
        // Reset files
        setFiles({
          aadharFront: null,
          aadharBack: null,
          panCard: null,
          profileImage: null,
        });
        // Refresh KYC status
        fetchKycStatus();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit KYC documents");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return null;
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
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Update KYC Documents
          </h1>
        </div>
        {kycData && getStatusBadge(kycData.status)}
      </motion.div>

      {kycData && kycData.status === "approved" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-blue-200/50 bg-blue-50/50 backdrop-blur-xl shadow-lg ring-1 ring-blue-400/10">
            <CardContent className="p-4 flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <p className="text-blue-800">
                Your KYC has been approved. Contact admin if you need to update
                your documents.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {kycData && kycData.status === "rejected" && kycData.rejectionReason && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-red-200/50 bg-red-50/50 backdrop-blur-xl shadow-lg ring-1 ring-red-400/10">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800 mb-1">
                    KYC Rejected
                  </p>
                  <p className="text-red-700 text-sm">
                    {kycData.rejectionReason}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {kycData && kycData.status === "pending" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-yellow-200/50 bg-yellow-50/50 backdrop-blur-xl shadow-lg ring-1 ring-yellow-400/10">
            <CardContent className="p-4 flex items-center space-x-3">
              <Clock className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-800">
                Your KYC request is pending admin review. You can update your
                documents below.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">
            Document Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aadharNumber" className="text-blue-800">
                Aadhar Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="aadharNumber"
                value={formData.aadharNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    aadharNumber: e.target.value,
                  }))
                }
                placeholder="Enter 12-digit Aadhar Number"
                maxLength={12}
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="panNumber" className="text-blue-800">
                PAN Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="panNumber"
                value={formData.panNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    panNumber: e.target.value.toUpperCase(),
                  }))
                }
                placeholder="Enter PAN Number"
                maxLength={10}
                className="border-blue-200/50 bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aadhar Front */}
        <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              Aadhar Card (Front)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={fileInputRefs.aadharFront}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange("aadharFront", e)}
              className="hidden"
            />
            {previews.aadharFront ? (
              <div className="space-y-2">
                <img
                  src={previews.aadharFront}
                  alt="Aadhar Front"
                  className="w-full h-48 object-cover rounded-lg border-2 border-blue-200/50"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRefs.aadharFront.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Image
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => fileInputRefs.aadharFront.current?.click()}
                className="w-full h-48 border-dashed"
              >
                <Upload className="h-6 w-6 mr-2" />
                Upload Aadhar Front
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Aadhar Back */}
        <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              Aadhar Card (Back)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={fileInputRefs.aadharBack}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange("aadharBack", e)}
              className="hidden"
            />
            {previews.aadharBack ? (
              <div className="space-y-2">
                <img
                  src={previews.aadharBack}
                  alt="Aadhar Back"
                  className="w-full h-48 object-cover rounded-lg border-2 border-blue-200/50"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRefs.aadharBack.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Image
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => fileInputRefs.aadharBack.current?.click()}
                className="w-full h-48 border-dashed"
              >
                <Upload className="h-6 w-6 mr-2" />
                Upload Aadhar Back
              </Button>
            )}
          </CardContent>
        </Card>

        {/* PAN Card */}
        <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">PAN Card</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={fileInputRefs.panCard}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange("panCard", e)}
              className="hidden"
            />
            {previews.panCard ? (
              <div className="space-y-2">
                <img
                  src={previews.panCard}
                  alt="PAN Card"
                  className="w-full h-48 object-cover rounded-lg border-2 border-blue-200/50"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRefs.panCard.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Image
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => fileInputRefs.panCard.current?.click()}
                className="w-full h-48 border-dashed"
              >
                <Upload className="h-6 w-6 mr-2" />
                Upload PAN Card
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Profile Image */}
        <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              Profile Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={fileInputRefs.profileImage}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange("profileImage", e)}
              className="hidden"
            />
            {previews.profileImage ? (
              <div className="space-y-2">
                <img
                  src={previews.profileImage}
                  alt="Profile"
                  className="w-full h-48 object-cover rounded-lg border-2 border-blue-200/50"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRefs.profileImage.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Image
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => fileInputRefs.profileImage.current?.click()}
                className="w-full h-48 border-dashed"
              >
                <Upload className="h-6 w-6 mr-2" />
                Upload Profile Image
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
        >
          <Upload className="h-4 w-4 mr-2" />
          {submitting ? "Submitting..." : "Submit KYC Request"}
        </Button>
      </motion.div>

      {kycData && kycData.reviewedAt && (
        <Card className="border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              Review Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Reviewed At:</span>{" "}
              {new Date(kycData.reviewedAt).toLocaleString()}
            </p>
            {kycData.adminNotes && (
              <p>
                <span className="font-semibold">Admin Notes:</span>{" "}
                {kycData.adminNotes}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UpdateKyc;
