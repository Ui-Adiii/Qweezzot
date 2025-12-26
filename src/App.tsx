import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Brand from "./pages/Brand";

import NotFound from "./pages/NotFound";

// User Panel Pages
import UserLogin from "./pages/user/Login";
import UserRegister from "./pages/user/Register";
import UserDashboard from "./pages/user/Dashboard";
import AdvancedDashboard from "./pages/user/AdvancedDashboard";
import UserProfile from "./pages/user/Profile";
import UserWallet from "./pages/user/Wallet";
import MyReferrals from "./pages/user/Referrals";
import IncomeHistory from "./pages/user/Income";
import UserSettings from "./pages/user/Settings";
import UserPanel from "./pages/user/UserPanel";
import UserLayout from "./components/user-panel/UserLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import { CartProvider } from "./contexts/CartContext";

// Main Navigation Pages
import FirstPurchase from "./pages/user/FirstPurchase";
import Upgrade from "./pages/user/Upgrade";
import RePurchase from "./pages/user/RePurchase";
import MonthlyPurchase from "./pages/user/MonthlyPurchase";
import FastTrack from "./pages/user/FastTrack";
import NewMember from "./pages/user/NewMember";
import MyPurchase from "./pages/user/MyPurchase";
import OnlineOrders from "./pages/user/OnlineOrders";
import SelfRepurchase from "./pages/user/SelfRepurchase";
import GenerateTickets from "./pages/user/GenerateTickets";

// Submenu Pages
import DirectReferrals from "./pages/user/DirectReferrals";
import TeamStructure from "./pages/user/TeamStructure";
import MyTeam from "./pages/user/MyTeam";
import DirectTeam from "./pages/user/DirectTeam";
import TeamReport from "./pages/user/TeamReport";
import TeamPerformance from "./pages/user/TeamPerformance";
import TeamSales from "./pages/user/TeamSales";
import TeamIncome from "./pages/user/TeamIncome";
import TeamBonus from "./pages/user/TeamBonus";
import TeamRank from "./pages/user/TeamRank";
import TeamStatus from "./pages/user/TeamStatus";
import WalletBalance from "./pages/user/WalletBalance";
import Transactions from "./pages/user/Transactions";
import Withdraw from "./pages/user/Withdraw";
import IncomeHistoryDetails from "./pages/user/IncomeHistory";
import BonusDetails from "./pages/user/BonusDetails";
import EditProfile from "./pages/user/EditProfile";
import ChangePassword from "./pages/user/ChangePassword";
import UserProducts from "./pages/user/UserProducts";
import Checkout from "./pages/Checkout";
import MatchingBonus from "./pages/user/MatchingBonus";
import WelcomeBonus from "./pages/user/WelcomeBonus";
import AdditionalBonus from "./pages/user/AdditionalBonus";
import RoyaltyBonus from "./pages/user/RoyaltyBonus";
import MentorshipBonus from "./pages/user/MentorshipBonus";
import Cashback from "./pages/user/Cashback";
import Rewards from "./pages/user/Rewards";
import MonthlyPurchaseBonus from "./pages/user/MonthlyPurchaseBonus";
import RankSummary from "./pages/user/RankSummary";
import UpdateKyc from "./pages/user/UpdateKyc";
import WalletRequest from "./pages/user/WalletRequest";
import WalletTransfer from "./pages/user/WalletTransfer";
import Contact from "./pages/Contct";
import Legals from "./pages/Legals";
import Join from "./pages/Join";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/legal" element={<Legals />} />
              <Route path="/services" element={<Services />} />
              <Route path="/join" element={<Join />} />
              <Route path="/terms" element={<Terms/>} />
              <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                
          
              <Route path="/brand" element={<Brand />} />
              <Route path="/contact" element={<Contact />} />
              
            </Route>

            {/* User Panel Routes */}
            <Route path="/user" element={<UserPanel />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/register" element={<UserRegister />} />
            
            {/* Checkout Route */}
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Protected User Panel Routes with Layout */}
            <Route path="/user" element={<UserLayout />}>
              <Route path="dashboard" element={
                <ErrorBoundary>
                  <AdvancedDashboard />
                </ErrorBoundary>
              } />
              <Route path="dashboard-simple" element={<UserDashboard />} />
              
              {/* Main Navigation Pages */}
              <Route path="first-purchase" element={<FirstPurchase />} />
              <Route path="upgrade" element={<Upgrade />} />
              <Route path="repurchase" element={<RePurchase />} />
              <Route path="monthly-purchase" element={<MonthlyPurchase />} />
              <Route path="fast-track" element={<FastTrack />} />
              <Route path="new-member" element={<NewMember />} />
              <Route path="my-purchase" element={<MyPurchase />} />
              <Route path="online-orders" element={<OnlineOrders />} />
              <Route path="self-repurchase" element={<SelfRepurchase />} />
              <Route path="tickets" element={<GenerateTickets />} />
              
              {/* Existing Routes */}
              <Route path="profile" element={<UserProfile />} />
              <Route path="wallet" element={<UserWallet />} />
              <Route path="products" element={<UserProducts />} />
              <Route path="referrals" element={<MyReferrals />} />
              <Route path="income" element={<IncomeHistory />} />
              <Route path="settings" element={<UserSettings />} />
              
              {/* Submenu Pages */}
              <Route path="my-team" element={<MyTeam />} />
              <Route path="direct-team" element={<DirectTeam />} />
              <Route path="team-structure" element={<TeamStructure />} />
              <Route path="team-report" element={<TeamReport />} />
              <Route path="team-performance" element={<TeamPerformance />} />
              <Route path="team-sales" element={<TeamSales />} />
              <Route path="team-income" element={<TeamIncome />} />
              <Route path="team-bonus" element={<TeamBonus />} />
              <Route path="team-rank" element={<TeamRank />} />
              <Route path="team-status" element={<TeamStatus />} />
              <Route path="wallet-balance" element={<WalletBalance />} />
              <Route path="wallet-request" element={<WalletRequest />} />
              <Route path="wallet-transfer" element={<WalletTransfer />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="withdraw" element={<Withdraw />} />
              <Route path="income-history" element={<IncomeHistoryDetails />} />
              <Route path="bonus-details" element={<BonusDetails />} />
              <Route path="matching-bonus" element={<MatchingBonus />} />
              <Route path="welcome-bonus" element={<WelcomeBonus />} />
              <Route path="additional-bonus" element={<AdditionalBonus />} />
              <Route path="royalty-bonus" element={<RoyaltyBonus />} />
              <Route path="mentorship-bonus" element={<MentorshipBonus />} />
              <Route path="cashback" element={<Cashback />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="monthly-purchase-bonus" element={<MonthlyPurchaseBonus />} />
              <Route path="rank-summary" element={<RankSummary />} />
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="update-kyc" element={<UpdateKyc />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
