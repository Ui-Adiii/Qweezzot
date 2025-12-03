// const API_BASE_URL = 'http://localhost:5049';
const API_BASE_URL = 'https://api.mybyoliva.com';

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  isActive: boolean;
}

export interface UpiAccount {
  upiId: string;
  name: string;
  qrCode?: string;
  isActive: boolean;
}

export interface PaymentSettings {
  _id?: string;
  bankAccounts?: BankAccount[];
  upiAccounts?: UpiAccount[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  // Legacy flat fields for backward compatibility
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  accountHolderName?: string;
  upiId?: string;
  upiQrCode?: string;
}

export interface PaymentSettingsResponse {
  success: boolean;
  data: PaymentSettings | { bankAccounts: BankAccount[]; upiAccounts: UpiAccount[] };
  message?: string;
}

export const paymentSettingsAPI = {
  // Get active payment methods (public endpoint)
  getPaymentSettings: async (): Promise<PaymentSettingsResponse> => {
    const response = await fetch(`${API_BASE_URL}/payment-settings/active`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch payment settings');
    }
    
    return response.json();
  },
};

export default paymentSettingsAPI;
