import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, CreditCard, MapPin, User, Wallet, RefreshCw, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import productsAPI from '@/api/products';
import { authAPI } from '@/api/auth';

const Checkout: React.FC = () => {
  const { items, clearCart, addItem, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'wallet'>('cod');
  const [isFirstPurchase, setIsFirstPurchase] = useState(false);
  
  // Calculate totals based on first purchase or repurchase
  const { totalAmount, totalPV, totalBV, totalRP } = useMemo(() => {
    let totalAmount = 0;
    let totalPV = 0;
    let totalBV = 0;
    let totalRP = 0;

    items.forEach(item => {
      const unitPrice = isFirstPurchase 
        ? (item.sellingPrice || item.discountPrice || item.price)
        : (item.repurchaseSellingPrice || item.sellingPrice || item.discountPrice || item.price);
      
      totalAmount += unitPrice * item.quantity;
      totalPV += (item.pv || 0) * item.quantity;
      
      const bv = isFirstPurchase ? (item.firstPurchaseBV || item.bv || 0) : (item.bv || 0);
      const rp = isFirstPurchase ? (item.firstPurchaseRP || item.rp || 0) : (item.rp || 0);
      
      totalBV += bv * item.quantity;
      totalRP += rp * item.quantity;
    });

    return { totalAmount, totalPV, totalBV, totalRP };
  }, [items, isFirstPurchase]);
  const [walletData, setWalletData] = useState<{
    purchaseWallet: number;
    earnedWallet: number;
    referralWallet: number;
  } | null>(null);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  // Use ref to track if products from state have been added
  const productsAddedRef = useRef(false);

  useEffect(() => {
    // Check if this is first purchase from location state
    const state = location.state as any;
    if (state?.isFirstPurchase) {
      setIsFirstPurchase(true);
      setPaymentMethod('wallet'); // Force wallet payment for first purchase
    }

    // Check first purchase status from API
    const checkFirstPurchaseStatus = async () => {
      try {
        const response = await productsAPI.checkFirstPurchase();
        if (response.success && !response.data.hasMadeFirstPurchase) {
          setIsFirstPurchase(true);
          setPaymentMethod('wallet');
        }
      } catch (error) {
        console.error('Failed to check first purchase status:', error);
      }
    };

    checkFirstPurchaseStatus();

    // If products are passed from FirstPurchase page, add them to cart (only once)
    if (state?.products && Array.isArray(state.products) && !productsAddedRef.current) {
      state.products.forEach((product: any) => {
        // Add to cart if not already present
        const exists = items.find(item => String(item.productId) === String(product._id));
        if (!exists) {
          addItem({
            productId: String(product._id),
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            sellingPrice: product.sellingPrice,
            quantity: product.quantity || 1,
            image: product.images?.[0],
            pv: product.pv,
            bv: product.bv,
            rp: product.rp,
            firstPurchaseBV: product.firstPurchaseBV,
            firstPurchaseRP: product.firstPurchaseRP,
            repurchaseSellingPrice: product.repurchaseSellingPrice,
            inStock: product.inStock !== false
          });
        }
      });
      productsAddedRef.current = true; // Mark as added
    }

    // Don't redirect here - let the separate useEffect handle it with proper delay
    // This prevents blank page when items are removed

    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/user/login');
      return;
    }
  }, [navigate, location]); // Removed items and addItem from dependencies to prevent re-running on cart changes

  // Fetch wallet data once on mount
  useEffect(() => {
    fetchWalletData();
  }, []); // Run only once on mount

  // Separate useEffect to handle cart empty redirect (with delay to prevent blank page)
  useEffect(() => {
    if (items.length === 0) {
      const state = location.state as any;
      if (!state?.products) {
        // Add a small delay to show empty cart message before redirecting
        const redirectTimer = setTimeout(() => {
          navigate('/products');
        }, 1500);
        
        return () => clearTimeout(redirectTimer);
      }
    }
  }, [items.length, navigate, location]);

  const fetchWalletData = async () => {
    try {
      setWalletLoading(true);
      const response = await authAPI.getProfile();
      if (response.success && response.data.wallets) {
        setWalletData(response.data.wallets);
      }
    } catch (error: any) {
      console.error('Failed to load wallet data:', error);
    } finally {
      setWalletLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const required = ['name', 'phone', 'address', 'city', 'state', 'pincode'];
    for (const field of required) {
      if (!shippingAddress[field as keyof typeof shippingAddress]) {
        toast.error(`Please fill in ${field.charAt(0).toUpperCase() + field.slice(1)}`);
        return false;
      }
    }

    // Basic phone validation
    if (!/^\d{10}$/.test(shippingAddress.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }

    // Basic pincode validation
    if (!/^\d{6}$/.test(shippingAddress.pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    // Check wallet balance if wallet payment is selected
    if (paymentMethod === 'wallet') {
      if (!walletData || walletData.purchaseWallet < totalAmount) {
        toast.error('Insufficient wallet balance. Please add funds to your wallet or choose COD.');
        return;
      }
    }

    setLoading(true);
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shippingAddress: {
          fullName: shippingAddress.name,
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          pincode: shippingAddress.pincode,
          phone: shippingAddress.phone
        }
      };

      let response;
      if (paymentMethod === 'wallet') {
        response = await productsAPI.createWalletOrder({
          ...orderData,
          isFirstPurchase: isFirstPurchase
        });
      } else {
        response = await productsAPI.createOrder({
          ...orderData,
          paymentMethod: 'COD',
          isFirstPurchase: isFirstPurchase
        });
      }
      
      if (response.success) {
        clearCart();
        const successMessage = isFirstPurchase && response.isFirstPurchase
          ? 'Order placed successfully! Your account has been activated. Payment deducted from wallet.'
          : `Order placed successfully! ${paymentMethod === 'wallet' ? 'Payment deducted from wallet.' : 'You will pay on delivery.'}`;
        
        toast.success(successMessage);
        
        if (isFirstPurchase && response.isFirstPurchase) {
          // Redirect to dashboard after first purchase
          setTimeout(() => {
            navigate('/user/dashboard');
          }, 2000);
        } else {
          navigate('/user/online-orders');
        }
        
        // Refresh wallet data if wallet payment was used
        if (paymentMethod === 'wallet') {
          fetchWalletData();
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  // Show empty cart message instead of blank page
  if (items.length === 0) {
    const state = location.state as any;
    if (!state?.products) {
      return (
        <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Redirecting you to products page...
              </p>
              <Button onClick={() => navigate('/products')}>
                Go to Products
              </Button>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-primary">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Order Items ({items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => {
                  const unitPrice = isFirstPurchase 
                    ? (item.sellingPrice || item.discountPrice || item.price)
                    : (item.repurchaseSellingPrice || item.sellingPrice || item.discountPrice || item.price);
                  const bv = isFirstPurchase ? (item.firstPurchaseBV || item.bv || 0) : (item.bv || 0);
                  const rp = isFirstPurchase ? (item.firstPurchaseRP || item.rp || 0) : (item.rp || 0);
                  
                  return (
                    <div key={item.productId} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-primary font-semibold">
                            ₹{unitPrice.toFixed(2)}
                          </span>
                          <div className="flex items-center gap-1">
                            {item.pv && (
                              <Badge variant="secondary" className="text-xs">
                                {item.pv} PV
                              </Badge>
                            )}
                            {bv > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {bv} BV
                              </Badge>
                            )}
                            {rp > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {rp} RP
                              </Badge>
                            )}
                          </div>
                        </div>
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1 border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (item.quantity > 1) {
                                  updateQuantity(String(item.productId), item.quantity - 1);
                                } else {
                                  removeItem(String(item.productId));
                                }
                              }}
                              type="button"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-2 py-1 text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateQuantity(String(item.productId), item.quantity + 1);
                              }}
                              type="button"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('[Checkout] Remove button clicked for:', {
                                productId: item.productId,
                                productIdType: typeof item.productId,
                                name: item.name
                              });
                              removeItem(String(item.productId));
                            }}
                            type="button"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-lg">
                          ₹{(unitPrice * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} × ₹{unitPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={shippingAddress.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      placeholder="Enter 10-digit phone number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    placeholder="House no, Building name, Street, Area"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={shippingAddress.pincode}
                      onChange={handleInputChange}
                      placeholder="6-digit pincode"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                  {isFirstPurchase && (
                    <Badge className="bg-amber-500 text-white ml-2">First Purchase</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isFirstPurchase && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                    <p className="text-sm text-amber-800">
                      <strong>First Purchase:</strong> This purchase will activate your account. Payment must be made using wallet balance.
                    </p>
                  </div>
                )}
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={(value) => {
                    if (!isFirstPurchase) {
                      setPaymentMethod(value as 'cod' | 'wallet');
                    }
                  }}
                  disabled={isFirstPurchase}
                >
                  {/* Cash on Delivery Option */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="p-3 border rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Cash on Delivery (COD)</p>
                            <p className="text-sm text-muted-foreground">Pay when your order is delivered</p>
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>

                  {/* Wallet Payment Option */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                      <div className={`p-3 border rounded-lg ${
                        walletData && walletData.purchaseWallet >= totalAmount 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Wallet className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Pay with Wallet</p>
                              {walletLoading ? (
                                <div className="flex items-center gap-2">
                                  <RefreshCw className="h-3 w-3 animate-spin" />
                                  <span className="text-sm text-muted-foreground">Loading wallet...</span>
                                </div>
                              ) : walletData ? (
                                <p className="text-sm text-muted-foreground">
                                  Available: ₹{walletData.purchaseWallet.toLocaleString()}
                                </p>
                              ) : (
                                <p className="text-sm text-red-600">Unable to load wallet balance</p>
                              )}
                            </div>
                          </div>
                          {walletData && walletData.purchaseWallet < totalAmount && (
                            <Badge variant="destructive" className="text-xs">
                              Insufficient Balance
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'wallet' && walletData && walletData.purchaseWallet < totalAmount && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Insufficient wallet balance!</strong><br />
                      You need ₹{(totalAmount - walletData.purchaseWallet).toFixed(2)} more in your purchase wallet.
                      <br />
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-red-600 underline" 
                        onClick={() => navigate('/user/wallet')}
                      >
                        Add funds to wallet
                      </Button>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Total */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total PV</span>
                    <span>{totalPV} PV</span>
                  </div>
                  {totalBV > 0 && (
                    <div className="flex justify-between">
                      <span>Total BV</span>
                      <span>{totalBV} BV</span>
                    </div>
                  )}
                  {totalRP > 0 && (
                    <div className="flex justify-between">
                      <span>Total RP</span>
                      <span>{totalRP} RP</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>COD Charges</span>
                    <span className="text-green-600">₹0</span>
                  </div>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>

                <Button 
                  className="w-full" 
                  onClick={handlePlaceOrder}
                  disabled={loading || (paymentMethod === 'wallet' && (!walletData || walletData.purchaseWallet < totalAmount))}
                >
                  {loading ? 'Placing Order...' : 
                   paymentMethod === 'wallet' ? 'Pay with Wallet' : 'Place Order (COD)'}
                </Button>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>✓ Free shipping on all orders</p>
                  <p>✓ 30-day return policy</p>
                  <p>✓ Secure checkout</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
