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
import { Eye, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { kycAPI, KycDocument } from "@/api/kyc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const KycPending: React.FC = () => {
  const [kycList, setKycList] = useState<KycDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKyc, setSelectedKyc] = useState<KycDocument | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchPendingKyc();
  }, [pagination.page]);

  const fetchPendingKyc = async () => {
    try {
      setLoading(true);
      const response = await kycAPI.getAllKyc(
        "pending",
        pagination.page,
        pagination.limit
      );
      if (response.success) {
        setKycList(response.data.kycList);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pagination.total,
          pages: response.data.pagination.pages,
        }));
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch pending KYC requests");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (kycId: string) => {
    try {
      const response = await kycAPI.getKycById(kycId);
      if (response.success) {
        setSelectedKyc(response.data);
        setIsDialogOpen(true);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch KYC details");
    }
  };

  const handleApprove = (kyc: KycDocument) => {
    setSelectedKyc(kyc);
    setAction("approve");
    setRejectionReason("");
    setIsDialogOpen(true);
  };

  const handleReject = (kyc: KycDocument) => {
    setSelectedKyc(kyc);
    setAction("reject");
    setRejectionReason("");
    setIsDialogOpen(true);
  };

  const handleSubmitAction = async () => {
    if (!selectedKyc) return;

    if (action === "reject" && !rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    try {
      setIsProcessing(true);
      const response = await kycAPI.updateKycStatus(selectedKyc._id, {
        status: action === "approve" ? "approved" : "rejected",
        rejectionReason: action === "reject" ? rejectionReason : undefined,
        adminNotes: adminNotes || undefined,
      });

      if (response.success) {
        toast.success(
          response.message ||
            `KYC ${action === "approve" ? "approved" : "rejected"} successfully`
        );
        setIsDialogOpen(false);
        setSelectedKyc(null);
        setAction(null);
        setRejectionReason("");
        setAdminNotes("");
        fetchPendingKyc();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update KYC status");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-sky-800">
            Pending KYC Requests
          </h1>
          <p className="text-sky-600 mt-1">
            Review and approve/reject KYC submissions
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Clock className="h-4 w-4 mr-2" />
          {pagination.total} Pending
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending KYC Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
            </div>
          ) : kycList.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No pending KYC requests</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kycList.map((kyc) => (
                      <TableRow key={kyc._id}>
                        <TableCell className="font-medium">
                          {kyc.userId?.name || "N/A"}
                        </TableCell>
                        <TableCell>{kyc.userId?.email || "N/A"}</TableCell>
                        <TableCell>{kyc.userId?.mobileNo || "N/A"}</TableCell>
                        <TableCell>{formatDate(kyc.submittedAt)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {kyc.aadharFront && (
                              <Badge variant="secondary" className="text-xs">
                                Aadhar
                              </Badge>
                            )}
                            {kyc.panCard && (
                              <Badge variant="secondary" className="text-xs">
                                PAN
                              </Badge>
                            )}
                            {kyc.profileImage && (
                              <Badge variant="secondary" className="text-xs">
                                Photo
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDetails(kyc._id)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="default"
                              className="bg-sky-600 hover:bg-sky-700"
                              onClick={() => handleApprove(kyc)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(kyc)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {pagination.pages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="outline"
                    disabled={pagination.page === 1}
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        page: prev.page - 1,
                      }))
                    }
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={pagination.page >= pagination.pages}
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        page: prev.page + 1,
                      }))
                    }
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* View/Approve/Reject Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {action === "approve"
                ? "Approve KYC"
                : action === "reject"
                ? "Reject KYC"
                : "KYC Details"}
            </DialogTitle>
            <DialogDescription>
              {selectedKyc &&
                `Review documents for ${selectedKyc.userId?.name || "User"}`}
            </DialogDescription>
          </DialogHeader>

          {selectedKyc && (
            <div className="space-y-6">
              {/* User Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold">User Name</Label>
                  <p className="text-sm">{selectedKyc.userId?.name || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Email</Label>
                  <p className="text-sm">
                    {selectedKyc.userId?.email || "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Mobile</Label>
                  <p className="text-sm">
                    {selectedKyc.userId?.mobileNo || "N/A"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Submitted At</Label>
                  <p className="text-sm">
                    {formatDate(selectedKyc.submittedAt)}
                  </p>
                </div>
                {selectedKyc.aadharNumber && (
                  <div>
                    <Label className="text-sm font-semibold">
                      Aadhar Number
                    </Label>
                    <p className="text-sm">{selectedKyc.aadharNumber}</p>
                  </div>
                )}
                {selectedKyc.panNumber && (
                  <div>
                    <Label className="text-sm font-semibold">PAN Number</Label>
                    <p className="text-sm">{selectedKyc.panNumber}</p>
                  </div>
                )}
              </div>

              {/* Documents */}
              <div className="grid grid-cols-2 gap-4">
                {selectedKyc.aadharFront && (
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">
                      Aadhar Card Front
                    </Label>
                    <img
                      src={selectedKyc.aadharFront}
                      alt="Aadhar Front"
                      className="w-full border rounded-lg"
                    />
                  </div>
                )}
                {selectedKyc.aadharBack && (
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">
                      Aadhar Card Back
                    </Label>
                    <img
                      src={selectedKyc.aadharBack}
                      alt="Aadhar Back"
                      className="w-full border rounded-lg"
                    />
                  </div>
                )}
                {selectedKyc.panCard && (
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">
                      PAN Card
                    </Label>
                    <img
                      src={selectedKyc.panCard}
                      alt="PAN Card"
                      className="w-full border rounded-lg"
                    />
                  </div>
                )}
                {selectedKyc.profileImage && (
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">
                      Profile Image
                    </Label>
                    <img
                      src={selectedKyc.profileImage}
                      alt="Profile"
                      className="w-full border rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Action Form */}
              {action && (
                <div className="space-y-4 border-t pt-4">
                  {action === "reject" && (
                    <div>
                      <Label htmlFor="rejectionReason">
                        Rejection Reason *
                      </Label>
                      <Textarea
                        id="rejectionReason"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Enter reason for rejection..."
                        rows={3}
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="adminNotes">Admin Notes (Optional)</Label>
                    <Textarea
                      id="adminNotes"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add any additional notes..."
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            {action && (
              <Button
                onClick={handleSubmitAction}
                disabled={
                  isProcessing ||
                  (action === "reject" && !rejectionReason.trim())
                }
                className={
                  action === "approve" ? "bg-sky-600 hover:bg-sky-700" : ""
                }
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {action === "approve" ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </>
                    )}
                  </>
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KycPending;
