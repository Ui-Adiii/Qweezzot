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
import {
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Filter,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const KycTotal: React.FC = () => {
  const [kycList, setKycList] = useState<KycDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKyc, setSelectedKyc] = useState<KycDocument | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchAllKyc();
  }, [pagination.page, statusFilter]);

  const fetchStats = async () => {
    try {
      const response = await kycAPI.getKycStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error: any) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const fetchAllKyc = async () => {
    try {
      setLoading(true);
      const status = statusFilter === "all" ? undefined : statusFilter;
      const response = await kycAPI.getAllKyc(
        status,
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
      toast.error(error.message || "Failed to fetch KYC requests");
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-blue-600">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">All KYC Requests</h1>
          <p className="text-blue-600 mt-1">
            View and manage all KYC submissions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total KYC</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Badge variant="outline" className="text-lg">
                Total
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.approved}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All KYC Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : kycList.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No KYC requests found</p>
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
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Reviewed At</TableHead>
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
                        <TableCell>{getStatusBadge(kyc.status)}</TableCell>
                        <TableCell>{formatDate(kyc.submittedAt)}</TableCell>
                        <TableCell>
                          {kyc.reviewedAt ? formatDate(kyc.reviewedAt) : "-"}
                        </TableCell>
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
                  <Label className="text-sm font-semibold">Status</Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedKyc.status)}
                  </div>
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
                {selectedKyc.rejectionReason && (
                  <div className="col-span-2">
                    <Label className="text-sm font-semibold">
                      Rejection Reason
                    </Label>
                    <p className="text-sm text-red-600">
                      {selectedKyc.rejectionReason}
                    </p>
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

export default KycTotal;
