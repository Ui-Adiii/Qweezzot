import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, Wallet, RefreshCw, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdvancedSidebar } from './AdvancedSidebar';
import { authAPI } from '@/api/auth';
import { Badge } from '@/components/ui/badge';

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [walletData, setWalletData] = useState({
    purchaseWallet: 0,
    commissionWallet: 0,
    referralWallet: 0
  });
  const [walletLoading, setWalletLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setWalletLoading(true);
      const response = await authAPI.getProfile();
      if (response.success && response.data && response.data.wallets) {
        setWalletData(response.data.wallets);
      }
    } catch (error: any) {
      console.error('Failed to load wallet data:', error);
    } finally {
      setWalletLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/user/login');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalBalance = walletData.purchaseWallet + walletData.commissionWallet + walletData.referralWallet;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen">
        <AdvancedSidebar onLogout={handleLogout} />
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="relative h-full">
          <AdvancedSidebar onLogout={handleLogout} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 text-white hover:bg-white/10 backdrop-blur-md z-10 border border-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Desktop Header with Glass Effect */}
        <header className="hidden lg:block sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-emerald-200/50 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-sm text-emerald-600/70 mt-0.5">Welcome back! Here's your overview</p>
              </div>
              
              {/* Right side actions */}
              <div className="flex items-center space-x-3">
                {/* Wallet Balance Cards with Glass Effect */}
                <div className="flex items-center space-x-3">
                  {/* Purchase Wallet */}
                  <div className="px-4 py-2.5 bg-white/60 backdrop-blur-md border border-emerald-200/50 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer group ring-1 ring-amber-400/10 hover:ring-amber-400/20">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-gradient-to-br from-emerald-500/30 to-amber-500/20 rounded-lg group-hover:from-emerald-500/40 group-hover:to-amber-500/30 transition-colors ring-1 ring-amber-400/20">
                        <Wallet className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-emerald-700/70 font-medium">Purchase</p>
                        {walletLoading ? (
                          <div className="h-4 w-16 bg-emerald-200/50 rounded animate-pulse mt-0.5"></div>
                        ) : (
                          <p className="text-sm font-bold text-emerald-700">
                            {formatCurrency(walletData.purchaseWallet)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Commission Wallet */}
                  <div className="px-4 py-2.5 bg-white/60 backdrop-blur-md border border-emerald-200/50 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer group ring-1 ring-amber-400/10 hover:ring-amber-400/20">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-gradient-to-br from-emerald-500/30 to-amber-500/20 rounded-lg group-hover:from-emerald-500/40 group-hover:to-amber-500/30 transition-colors ring-1 ring-amber-400/20">
                        <Wallet className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-emerald-700/70 font-medium">Commission</p>
                        {walletLoading ? (
                          <div className="h-4 w-16 bg-emerald-200/50 rounded animate-pulse mt-0.5"></div>
                        ) : (
                          <p className="text-sm font-bold text-emerald-700">
                            {formatCurrency(walletData.commissionWallet)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Referral Wallet */}
                  <div className="px-4 py-2.5 bg-white/60 backdrop-blur-md border border-emerald-200/50 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer group ring-1 ring-amber-400/10 hover:ring-amber-400/20">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-gradient-to-br from-emerald-500/30 to-amber-500/20 rounded-lg group-hover:from-emerald-500/40 group-hover:to-amber-500/30 transition-colors ring-1 ring-amber-400/20">
                        <Wallet className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-emerald-700/70 font-medium">Referral</p>
                        {walletLoading ? (
                          <div className="h-4 w-16 bg-emerald-200/50 rounded animate-pulse mt-0.5"></div>
                        ) : (
                          <p className="text-sm font-bold text-emerald-700">
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
                  className="bg-white/60 backdrop-blur-md border-emerald-200/50 hover:bg-white/80 text-emerald-700 ring-1 ring-amber-400/10 hover:ring-amber-400/20"
                >
                  <RefreshCw className={`h-4 w-4 ${walletLoading ? 'animate-spin' : ''}`} />
                </Button>

                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative bg-white/60 backdrop-blur-md border border-emerald-200/50 hover:bg-white/80 text-emerald-700 ring-1 ring-amber-400/10 hover:ring-amber-400/20"
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
                  className="bg-white/60 backdrop-blur-md border border-emerald-200/50 hover:bg-white/80 text-emerald-700 ring-1 ring-amber-400/10 hover:ring-amber-400/20"
                >
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-emerald-200/50 lg:hidden sticky top-0 z-30">
          <div className="h-16 flex items-center justify-between px-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="text-emerald-700 hover:bg-emerald-50"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                  Byoliva
                </h1>
                <p className="text-xs text-emerald-600/70">User Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchWalletData}
                disabled={walletLoading}
                className="text-emerald-700"
              >
                <RefreshCw className={`h-4 w-4 ${walletLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          
          {/* Mobile Wallet Balance */}
          <div className="px-4 pb-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 bg-white/60 backdrop-blur-md border border-emerald-200/50 rounded-lg text-center ring-1 ring-amber-400/10">
                <p className="text-xs text-emerald-700/70 font-medium mb-1">Purchase</p>
                {walletLoading ? (
                  <div className="h-3 w-12 bg-emerald-200/50 rounded animate-pulse mx-auto"></div>
                ) : (
                  <p className="text-xs font-bold text-emerald-700">
                    {formatCurrency(walletData.purchaseWallet)}
                  </p>
                )}
              </div>
              
              <div className="p-2.5 bg-white/60 backdrop-blur-md border border-emerald-200/50 rounded-lg text-center ring-1 ring-amber-400/10">
                <p className="text-xs text-emerald-700/70 font-medium mb-1">Commission</p>
                {walletLoading ? (
                  <div className="h-3 w-12 bg-emerald-200/50 rounded animate-pulse mx-auto"></div>
                ) : (
                  <p className="text-xs font-bold text-emerald-700">
                    {formatCurrency(walletData.commissionWallet)}
                  </p>
                )}
              </div>
              
              <div className="p-2.5 bg-white/60 backdrop-blur-md border border-emerald-200/50 rounded-lg text-center ring-1 ring-amber-400/10">
                <p className="text-xs text-emerald-700/70 font-medium mb-1">Referral</p>
                {walletLoading ? (
                  <div className="h-3 w-12 bg-emerald-200/50 rounded animate-pulse mx-auto"></div>
                ) : (
                  <p className="text-xs font-bold text-emerald-700">
                    {formatCurrency(walletData.referralWallet)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
