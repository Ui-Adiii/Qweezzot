import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X, Wallet, RefreshCw, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdvancedSidebar } from "./AdvancedSidebar";
import { authAPI } from "@/api/auth";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [walletData, setWalletData] = useState({
    purchaseWallet: 0,
    earnedWallet: 0,
    referralWallet: 0,
    repurchaseWallet: 0,
    cashbackWallet: 0,
  });
  const [userProfile, setUserProfile] = useState<any>(null);
  const [walletLoading, setWalletLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWalletData();
  }, []);

  // Close mobile sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchWalletData = async () => {
    try {
      setWalletLoading(true);
      const response = await authAPI.getProfile();
      if (response.success && response.data) {
        if (response.data.wallets) {
          setWalletData(response.data.wallets);
        }
        // Store user profile data for profile image
        setUserProfile(response.data);
      } else {
        // Set default empty wallets if no data
        setWalletData({
          purchaseWallet: 0,
          earnedWallet: 0,
          referralWallet: 0,
          repurchaseWallet: 0,
          cashbackWallet: 0,
        });
      }
    } catch (error: any) {
      // Only log if it's not a connection error
      if (
        error.message &&
        !error.message.includes("Failed to fetch") &&
        !error.message.includes("ERR_CONNECTION_REFUSED")
      ) {
        console.error("Failed to load wallet data:", error);
      }
      // Set default empty wallets on error
      setWalletData({
        purchaseWallet: 0,
        earnedWallet: 0,
        referralWallet: 0,
        repurchaseWallet: 0,
        cashbackWallet: 0,
      });
    } finally {
      setWalletLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/user/login");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalBalance =
    walletData.purchaseWallet +
    walletData.earnedWallet +
    walletData.referralWallet;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50/30">
      {/* Desktop Sidebar - Always visible on large screens */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen z-40">
        <AdvancedSidebar onLogout={handleLogout} />
      </div>

      {/* Mobile Sidebar - Controlled by sidebarOpen state */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-full w-72">
          <AdvancedSidebar
            onLogout={handleLogout}
            onLinkClick={() => setSidebarOpen(false)}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 text-white hover:bg-white/20 backdrop-blur-md z-10 border border-white/30 shadow-lg"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Overlay for mobile - Only show when sidebar is open */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Desktop Header with Glass Effect */}
        <header className="hidden lg:block sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-sky-200/50 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-sm text-sky-600/70 mt-0.5">
                  Welcome back! Here's your overview
                </p>
              </div>

              {/* Right side actions */}
              <div className="flex items-center space-x-3">
                {/* Wallet Balance Cards with Glass Effect */}
                <div className="flex items-center space-x-3">
                  {/* Shopping Wallet */}
                  <div className="px-4 py-2.5 bg-white/60 backdrop-blur-md border border-sky-200/50 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer group ring-1 ring-amber-400/10 hover:ring-amber-400/20">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-gradient-to-br from-sky-500/30 to-amber-500/20 rounded-lg group-hover:from-sky-500/40 group-hover:to-amber-500/30 transition-colors ring-1 ring-amber-400/20">
                        <Wallet className="h-4 w-4 text-sky-600" />
                      </div>
                      <div>
                        <p className="text-xs text-sky-700/70 font-medium">
                          Shopping
                        </p>
                        {walletLoading ? (
                          <div className="h-4 w-16 bg-sky-200/50 rounded animate-pulse mt-0.5"></div>
                        ) : (
                          <p className="text-sm font-bold text-sky-700">
                            {formatCurrency(walletData.purchaseWallet)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Earned Wallet */}
                  <div className="px-4 py-2.5 bg-white/60 backdrop-blur-md border border-sky-200/50 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer group ring-1 ring-amber-400/10 hover:ring-amber-400/20">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-gradient-to-br from-sky-500/30 to-amber-500/20 rounded-lg group-hover:from-sky-500/40 group-hover:to-amber-500/30 transition-colors ring-1 ring-amber-400/20">
                        <Wallet className="h-4 w-4 text-sky-600" />
                      </div>
                      <div>
                        <p className="text-xs text-sky-700/70 font-medium">
                          Earned
                        </p>
                        {walletLoading ? (
                          <div className="h-4 w-16 bg-sky-200/50 rounded animate-pulse mt-0.5"></div>
                        ) : (
                          <p className="text-sm font-bold text-sky-700">
                            {formatCurrency(walletData.earnedWallet)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Referral Wallet */}
                  <div className="px-4 py-2.5 bg-white/60 backdrop-blur-md border border-sky-200/50 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer group ring-1 ring-amber-400/10 hover:ring-amber-400/20">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-gradient-to-br from-sky-500/30 to-amber-500/20 rounded-lg group-hover:from-sky-500/40 group-hover:to-amber-500/30 transition-colors ring-1 ring-amber-400/20">
                        <Wallet className="h-4 w-4 text-sky-600" />
                      </div>
                      <div>
                        <p className="text-xs text-sky-700/70 font-medium">
                          Referral
                        </p>
                        {walletLoading ? (
                          <div className="h-4 w-16 bg-sky-200/50 rounded animate-pulse mt-0.5"></div>
                        ) : (
                          <p className="text-sm font-bold text-sky-700">
                            {formatCurrency(walletData.referralWallet)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchWalletData}
                  disabled={walletLoading}
                  className="bg-white/60 backdrop-blur-md border-sky-200/50 hover:bg-white/80 text-sky-700 ring-1 ring-amber-400/10 hover:ring-amber-400/20"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${walletLoading ? "animate-spin" : ""}`}
                  />
                </Button>

                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative bg-white/60 backdrop-blur-md border border-sky-200/50 hover:bg-white/80 text-sky-700 ring-1 ring-amber-400/10 hover:ring-amber-400/20"
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-2 border-white shadow-lg ring-1 ring-amber-300/50">
                    3
                  </Badge>
                </Button>

                {/* User Profile */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/60 backdrop-blur-md border border-sky-200/50 hover:bg-white/80 text-sky-700 ring-1 ring-amber-400/10 hover:ring-amber-400/20 p-1"
                  onClick={() => navigate("/user/profile")}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userProfile?.profileImage || undefined} />
                    <AvatarFallback className="bg-sky-600 text-white text-xs">
                      {userProfile?.name?.charAt(0) || (
                        <User className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-sky-200/50 lg:hidden sticky top-0 z-30">
          <div className="h-16 flex items-center justify-between px-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="text-sky-700 hover:bg-sky-50 p-2"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-sky-600 to-sky-700 bg-clip-text text-transparent">
                  Osfigo
                </h1>
                <p className="text-xs text-sky-600/70">User Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchWalletData}
                disabled={walletLoading}
                className="text-sky-700"
              >
                <RefreshCw
                  className={`h-4 w-4 ${walletLoading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>

          {/* Mobile Wallet Balance */}
          <div className="px-4 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <div className="p-2.5 bg-white/60 backdrop-blur-md border border-sky-200/50 rounded-lg text-center ring-1 ring-amber-400/10">
                <p className="text-xs text-sky-700/70 font-medium mb-1">
                  Shopping
                </p>
                {walletLoading ? (
                  <div className="h-3 w-12 bg-sky-200/50 rounded animate-pulse mx-auto"></div>
                ) : (
                  <p className="text-xs font-bold text-sky-700">
                    {formatCurrency(walletData.purchaseWallet)}
                  </p>
                )}
              </div>

              <div className="p-2.5 bg-white/60 backdrop-blur-md border border-sky-200/50 rounded-lg text-center ring-1 ring-amber-400/10">
                <p className="text-xs text-sky-700/70 font-medium mb-1">
                  Earned
                </p>
                {walletLoading ? (
                  <div className="h-3 w-12 bg-sky-200/50 rounded animate-pulse mx-auto"></div>
                ) : (
                  <p className="text-xs font-bold text-sky-700">
                    {formatCurrency(walletData.earnedWallet)}
                  </p>
                )}
              </div>

              <div className="p-2.5 bg-white/60 backdrop-blur-md border border-sky-200/50 rounded-lg text-center ring-1 ring-amber-400/10">
                <p className="text-xs text-sky-700/70 font-medium mb-1">
                  Referral
                </p>
                {walletLoading ? (
                  <div className="h-3 w-12 bg-sky-200/50 rounded animate-pulse mx-auto"></div>
                ) : (
                  <p className="text-xs font-bold text-sky-700">
                    {formatCurrency(walletData.referralWallet)}
                  </p>
                )}
              </div>

              <div className="p-2.5 bg-white/60 backdrop-blur-md border border-sky-200/50 rounded-lg text-center ring-1 ring-amber-400/10">
                <p className="text-xs text-sky-700/70 font-medium mb-1">
                  Repurchase
                </p>
                {walletLoading ? (
                  <div className="h-3 w-12 bg-sky-200/50 rounded animate-pulse mx-auto"></div>
                ) : (
                  <p className="text-xs font-bold text-sky-700">
                    {formatCurrency(walletData.repurchaseWallet || 0)}
                  </p>
                )}
              </div>

              <div className="p-2.5 bg-white/60 backdrop-blur-md border border-sky-200/50 rounded-lg text-center ring-1 ring-amber-400/10">
                <p className="text-xs text-sky-700/70 font-medium mb-1">
                  Cashback
                </p>
                {walletLoading ? (
                  <div className="h-3 w-12 bg-sky-200/50 rounded animate-pulse mx-auto"></div>
                ) : (
                  <p className="text-xs font-bold text-sky-700">
                    {formatCurrency(walletData.cashbackWallet || 0)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-sky-50/30 via-white to-sky-50/20">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
