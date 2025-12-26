import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  TrendingUp,
  RotateCcw,
  Calendar,
  Zap,
  UserPlus,
  Package,
  Globe,
  DollarSign,
  Users,
  Wallet,
  Award,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles,
  BarChart3,
  List,
  Handshake,
  Gift,
  Trophy,
  Star,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/user/dashboard",
    icon: LayoutDashboard,
    current: true,
  },
  {
    name: "First Purchase",
    href: "/user/first-purchase",
    icon: ShoppingCart,
    current: false,
  },
  {
    name: "Upgrade",
    href: "/user/upgrade",
    icon: TrendingUp,
    current: false,
  },
  {
    name: "Re Purchase",
    href: "/user/repurchase",
    icon: RotateCcw,
    current: false,
  },
  {
    name: "Monthly Purchase",
    href: "/user/monthly-purchase",
    icon: Calendar,
    current: false,
  },
  {
    name: "Fast Track",
    href: "/user/fast-track",
    icon: Zap,
    current: false,
  },
  {
    name: "New Member",
    href: "/user/new-member",
    icon: UserPlus,
    current: false,
    highlight: true,
  },
  {
    name: "My Purchase",
    href: "/user/my-purchase",
    icon: Package,
    current: false,
    submenu: true,
    children: [
      { name: "My Online Order(s)", href: "/user/online-orders", icon: Globe },
      {
        name: "Self Total Repurchase",
        href: "/user/self-repurchase",
        icon: RotateCcw,
      },
    ],
  },
  {
    name: "Team Members",
    href: "/user/team-members",
    icon: Users,
    current: false,
    submenu: true,
    children: [
      { name: "My Team", href: "/user/my-team", icon: Users },
      { name: "Direct Team", href: "/user/direct-team", icon: UserPlus },
      { name: "Team Structure", href: "/user/team-structure", icon: List },
      { name: "Team Report", href: "/user/team-report", icon: BarChart3 },
      {
        name: "Team Performance",
        href: "/user/team-performance",
        icon: Trophy,
      },
      { name: "Team Sales", href: "/user/team-sales", icon: TrendingUp },
      { name: "Team Income", href: "/user/team-income", icon: DollarSign },
      { name: "Team Bonus", href: "/user/team-bonus", icon: Gift },
      { name: "Team Rank", href: "/user/team-rank", icon: Star },
      { name: "Team Status", href: "/user/team-status", icon: Award },
    ],
  },
  {
    name: "E-Wallet",
    href: "/user/wallet",
    icon: Wallet,
    current: false,
    submenu: true,
    children: [
      { name: "Wallet Balance", href: "/user/wallet-balance" },
      { name: "Wallet Request", href: "/user/wallet-request" },
      {
        name: "Wallet Transfer",
        href: "/user/wallet-transfer",
        icon: ArrowRight,
      },
      { name: "Transactions", href: "/user/transactions" },
      { name: "Withdraw", href: "/user/withdraw" },
    ],
  },
  {
    name: "My Products",
    href: "/user/products",
    icon: Package,
    current: false,
  },
  {
    name: "My Payouts",
    href: "/user/income",
    icon: DollarSign,
    current: false,
    submenu: true,
    children: [
      { name: "Matching Bonus", href: "/user/matching-bonus", icon: BarChart3 },
      { name: "Welcome Bonus", href: "/user/welcome-bonus", icon: List },
      { name: "Additional Bonus", href: "/user/additional-bonus", icon: List },
      { name: "Royalty Bonus", href: "/user/royalty-bonus", icon: Handshake },
      {
        name: "Mentorship Bonus",
        href: "/user/mentorship-bonus",
        icon: Handshake,
      },
      { name: "Cashback", href: "/user/cashback", icon: List },
      { name: "Rewards", href: "/user/rewards", icon: BarChart3 },
      {
        name: "Monthly Purchase Bonus",
        href: "/user/monthly-purchase-bonus",
        icon: BarChart3,
      },
      { name: "Rank Summary", href: "/user/rank-summary", icon: BarChart3 },
    ],
  },
  {
    name: "Manage Profile",
    href: "/user/profile",
    icon: Settings,
    current: false,
    submenu: true,
    children: [
      { name: "Edit Profile", href: "/user/edit-profile" },
      { name: "Update KYC", href: "/user/update-kyc" },
      { name: "Change Password", href: "/user/change-password" },
    ],
  },
  {
    name: "Generate Tickets",
    href: "/user/tickets",
    icon: Award,
    current: false,
  },
];

interface AdvancedSidebarProps {
  onLogout: () => void;
  onLinkClick?: () => void; // Callback to close mobile sidebar when link is clicked
}

export const AdvancedSidebar: React.FC<AdvancedSidebarProps> = ({
  onLogout,
  onLinkClick,
}) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <aside className="fixed top-0 left-0 z-40 w-72 h-screen">
      {/* Glass Background */}
      <div className="h-full bg-gradient-to-b from-sky-600/95 via-sky-600/95 to-sky-600/95 backdrop-blur-xl border-r border-sky-700/30 shadow-2xl">
        <div className="h-full px-4 py-6 overflow-y-auto">
          {/* Logo/Brand Section with Glass Effect */}
          <div className="mb-8 px-3 pt-4">
            <div className="flex items-center justify-center mb-3 px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-lg border border-amber-400/30 shadow-lg ring-1 ring-amber-400/20">
              {/* <div className="p-1 bg-white/20 rounded-xl shadow-lg ring-2 ring-amber-300/40 backdrop-blur-sm"> */}
              <img
                src="/logo.png"
                alt="Osfigo Logo"
                className="h-40 w-40 object-contain brightness-200 contrast-180"
              />
              {/* </div> */}
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.children &&
                  item.children.some(
                    (child) => location.pathname === child.href
                  ));
              const hasSubmenu = item.submenu && item.children;
              const isSubmenuOpen = openSubmenu === item.name;

              return (
                <div key={item.name}>
                  {hasSubmenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group",
                        isActive
                          ? "bg-white/20 backdrop-blur-md text-white shadow-lg border border-white/20"
                          : "text-sky-100/80 hover:bg-white/10 hover:text-white backdrop-blur-sm border border-transparent"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon
                          className={cn(
                            "h-5 w-5 transition-transform group-hover:scale-110",
                            isActive ? "text-white" : "text-sky-200/70"
                          )}
                        />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          isSubmenuOpen ? "transform rotate-180" : "",
                          isActive ? "text-white" : "text-sky-200/70"
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative",
                        isActive
                          ? "bg-white/20 backdrop-blur-md text-white shadow-lg border border-amber-400/30 ring-1 ring-amber-400/20"
                          : "text-sky-100/80 hover:bg-white/10 hover:text-white backdrop-blur-sm border border-transparent",
                        item.highlight &&
                          "ring-2 ring-amber-400/60 bg-amber-500/15 border-amber-400/30"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 mr-3 transition-transform group-hover:scale-110",
                          isActive ? "text-white" : "text-sky-200/70"
                        )}
                      />
                      <span className="flex-1">{item.name}</span>
                      {item.highlight && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-white rounded-full shadow-lg ring-1 ring-amber-300/50">
                          NEW
                        </span>
                      )}
                      {isActive && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full shadow-lg"></div>
                      )}
                    </Link>
                  )}

                  {/* Submenu with Glass Effect */}
                  {hasSubmenu && isSubmenuOpen && (
                    <div className="ml-6 mt-2 space-y-1 border-l-2 border-sky-500/30 pl-4">
                      {item.children?.map((child) => {
                        const isChildActive = location.pathname === child.href;
                        const ChildIcon = (child as any).icon;
                        return (
                          <Link
                            key={child.name}
                            to={child.href}
                            onClick={handleLinkClick}
                            className={cn(
                              "block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 backdrop-blur-sm",
                              isChildActive
                                ? "bg-white/15 text-white border border-white/20 font-semibold shadow-md"
                                : "text-sky-100/70 hover:bg-white/5 hover:text-white border border-transparent"
                            )}
                          >
                            <span className="flex items-center">
                              {ChildIcon ? (
                                <ChildIcon
                                  className={cn(
                                    "h-4 w-4 mr-3",
                                    isChildActive
                                      ? "text-white"
                                      : "text-sky-200/70"
                                  )}
                                />
                              ) : (
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mr-3 shadow-sm"></span>
                              )}
                              {child.name}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Logout Button with Glass Effect */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-sky-900/50 backdrop-blur-xl border-t border-amber-400/20">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all duration-300 shadow-lg border border-amber-400/30 hover:border-amber-400/50 ring-1 ring-amber-400/20 hover:ring-amber-400/40 transform hover:scale-[1.02]"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
