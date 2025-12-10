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
import { Eye, CheckCircle, Loader2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";

const KycApproved: React.FC = () => {
  const [kycList, setKycList] = useState<KycDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKyc, setSelectedKyc] = useState<KycDocument | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchApprovedKyc();
  }, [pagination.page]);

  const fetchApprovedKyc = async () => {
    try {
      setLoading(true);
      const response = await kycAPI.getAllKyc(
        "approved",
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
      toast.error(error.message || "Failed to fetch approved KYC requests");
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
          <h1 className="text-3xl font-bold text-blue-800">
            Approved KYC Requests
          </h1>
          <p className="text-blue-600 mt-1">
            View all approved KYC submissions
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-lg px-4 py-2 bg-blue-50 text-blue-700 border-blue-200"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          {pagination.total} Approved
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Approved KYC Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : kycList.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No approved KYC requests</p>
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
                      <TableHead>Approved At</TableHead>
                      <TableHead>Reviewed By</TableHead>
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
                        <TableCell>
                          {kyc.reviewedAt ? formatDate(kyc.reviewedAt) : "N/A"}
                        </TableCell>
                        <TableCell>{kyc.reviewedBy?.name || "N/A"}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(kyc._id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
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

      {/* View Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>KYC Details</DialogTitle>
            <DialogDescription>
              {selectedKyc &&
                `View documents for ${selectedKyc.userId?.name || "User"}`}
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
                  <Label className="text-sm font-semibold">Approved At</Label>
                  <p className="text-sm">
                    {selectedKyc.reviewedAt
                      ? formatDate(selectedKyc.reviewedAt)
                      : "N/A"}
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
                {selectedKyc.adminNotes && (
                  <div className="col-span-2">
                    <Label className="text-sm font-semibold">Admin Notes</Label>
                    <p className="text-sm">{selectedKyc.adminNotes}</p>
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
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KycApproved;
