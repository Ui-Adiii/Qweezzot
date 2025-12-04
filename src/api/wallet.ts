// const API_BASE_URL = 'http://localhost:5049';
const API_BASE_URL = 'https://api.mybyoliva.com';

export interface WalletTopupRequest {
  _id?: string;
  userId: string;
  amount: number;
  transactionId: string;
  screenshot: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewDate?: string;
  rejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateWalletTopupDto {
  amount: number;
  transactionId: string;
  screenshot: string; // Base64 string of the screenshot
}

export interface WalletTopupResponse {
  success: boolean;
  data: WalletTopupRequest | WalletTopupRequest[];
  message?: string;
}

export const walletAPI = {
  // Create wallet top-up request
  createTopupRequest: async (data: CreateWalletTopupDto): Promise<WalletTopupResponse> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/wallet/topup-request`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create top-up request');
    }
    
    return response.json();
  },

  // Get user's own top-up requests
  getUserTopupRequests: async (): Promise<WalletTopupResponse> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/wallet/topup/requests`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch top-up requests');
    }
    
    return response.json();
  },

  // Transfer amount between user's own wallets
  transferWallet: async (data: {
    fromWalletType: 'purchaseWallet' | 'earnedWallet' | 'referralWallet' | 'repurchaseWallet' | 'cashbackWallet';
    toWalletType: 'purchaseWallet' | 'earnedWallet' | 'referralWallet' | 'repurchaseWallet' | 'cashbackWallet';
    amount: number;
    reason?: string;
  }): Promise<{ success: boolean; message?: string; data?: any }> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/wallet/transfer`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to transfer wallet amount');
    }
    
    return response.json();
  },
};

export interface WalletRequestData {
  walletType: 'purchaseWallet' | 'earnedWallet' | 'referralWallet';
  amount: number;
  requestDetails?: string;
  paymentMethod: 'bank' | 'upi';
  transactionId?: string;
  screenshot: File | string;
}

export default walletAPI;
