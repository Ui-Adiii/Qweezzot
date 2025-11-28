import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, CreditCard, Loader2, AlertCircle, Sparkles, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import productsAPI, { Product } from '@/api/products';
import { authAPI } from '@/api/auth';
import { motion } from 'framer-motion';

const FirstPurchase: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 products initially
  const productsPerPage = 6;
  const [walletData, setWalletData] = useState({
    purchaseWallet: 0,
    commissionWallet: 0,
    referralWallet: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchWalletData();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProducts();
      if (response.success && response.data) {
        setProducts(response.data || []);
      } else {
        setProducts([]);
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWalletData = async () => {
    try {
      const response = await authAPI.getProfile();
      if (response.success && response.data && response.data.wallets) {
        setWalletData(response.data.wallets);
      }
    } catch (error: any) {
      console.error('Failed to load wallet data:', error);
    }
  };

  const handlePurchase = async (product: Product) => {
    try {
      setPurchasing(product._id);
      
      const finalPrice = product.discountPrice || product.price;
      
      if (walletData.purchaseWallet < finalPrice) {
        toast.error(`Insufficient wallet balance. You need ₹${(finalPrice - walletData.purchaseWallet).toFixed(2)} more.`);
        navigate('/user/wallet');
        return;
      }

      navigate('/checkout', { 
        state: { 
          products: [{ ...product, quantity: 1 }],
          isFirstPurchase: true
        } 
      });
      
    } catch (error: any) {
      console.error('Purchase error:', error);
      toast.error(error.message || 'Failed to process purchase');
    } finally {
      setPurchasing(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getDiscountPercent = (price: number, discountPrice: number) => {
    return Math.round(((price - discountPrice) / price) * 100);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20 min-h-screen">
      {/* Wallet Balance Banner with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-emerald-200/50 bg-gradient-to-br from-emerald-600/90 to-emerald-700/90 backdrop-blur-xl shadow-xl ring-2 ring-amber-400/20 overflow-hidden relative">
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm font-medium mb-1">Available Purchase Wallet Balance</p>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-white"
                >
                  {formatCurrency(walletData.purchaseWallet)}
                </motion.p>
              </div>
              {walletData.purchaseWallet === 0 && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2"
                >
                  <AlertCircle className="h-5 w-5 text-amber-300" />
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-amber-400/30 backdrop-blur-sm ring-1 ring-amber-400/20"
                    onClick={() => navigate('/user/wallet')}
                  >
                    Add Funds
                  </Button>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <ShoppingCart className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">First Purchase</h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-xl text-emerald-800 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-600" />
              Make Your First Purchase
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-emerald-700/70">
              Welcome to Byoliva! Complete your first purchase to activate your account and start earning.
            </p>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="border-emerald-200/50 bg-white/60 backdrop-blur-sm animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 bg-emerald-200/50 rounded-lg mx-auto mb-4"></div>
                      <div className="h-6 bg-emerald-200/50 rounded w-3/4 mx-auto mb-2"></div>
                      <div className="h-8 bg-emerald-200/50 rounded w-1/2 mx-auto mb-4"></div>
                      <div className="h-10 bg-emerald-200/50 rounded w-full"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 text-emerald-700/70">
                <Package className="h-16 w-16 text-emerald-300 mx-auto mb-4" />
                <p className="text-lg font-medium">No products available</p>
                <p className="text-sm">Products will appear here once they are added</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.slice(0, visibleCount).map((product, index) => {
                  const finalPrice = product.discountPrice || product.price;
                  const hasEnoughBalance = walletData.purchaseWallet >= finalPrice;
                  const isPurchasing = purchasing === product._id;
                  const discountPercent = product.discountPrice && product.discountPrice < product.price
                    ? getDiscountPercent(product.price, product.discountPrice)
                    : 0;

                  return (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <Card className="group relative border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ring-1 ring-amber-400/10 h-full flex flex-col">
                        {/* Discount Badge */}
                        {discountPercent > 0 && (
                          <div className="absolute top-4 right-4 z-20">
                            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg ring-1 ring-amber-300/30">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {discountPercent}% OFF
                            </Badge>
                          </div>
                        )}

                        {/* Popular Badge for first 3 products */}
                        {index < 3 && (
                          <div className="absolute top-4 left-4 z-20">
                            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg ring-1 ring-emerald-300/30">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Popular
                            </Badge>
                          </div>
                        )}

                        {/* Stock Badge */}
                        {!product.inStock && (
                          <div className="absolute top-4 left-4 z-20">
                            <Badge className="bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                              Out of Stock
                            </Badge>
                          </div>
                        )}

                        <CardContent className="p-0">
                          {/* Product Image */}
                          <div className="relative h-56 bg-gradient-to-br from-emerald-50/70 to-amber-50/50 overflow-hidden flex-shrink-0">
                            {product.images && product.images.length > 0 ? (
                              <motion.img
                                src={product.images[0]} 
                                alt={product.name}
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                whileHover={{ scale: 1.1 }}
                              />
                            ) : (
                              <div className="flex justify-center h-full items-center">
                                <div className="p-3 bg-gradient-to-br from-emerald-100/70 to-amber-100/50 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
                                  <Package className="h-12 w-12 text-emerald-600" />
                                </div>
                              </div>
                            )}
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>

                          <div className="p-6 space-y-3 flex-1 flex flex-col">
                            {/* Category Badge */}
                            <div>
                              <Badge className="bg-emerald-100/70 text-emerald-800 ring-1 ring-emerald-300/30 backdrop-blur-sm text-xs">
                                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                              </Badge>
                            </div>
                          
                            <h3 className="text-lg font-semibold text-emerald-800 line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
                            
                            {product.description && (
                              <p className="text-sm text-emerald-700/70 line-clamp-2 min-h-[2.5rem]">
                                {product.description}
                              </p>
                            )}
                            
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-2xl font-bold text-emerald-700">
                                {formatCurrency(finalPrice)}
                              </span>
                              {product.discountPrice && product.discountPrice < product.price && (
                                <span className="text-sm text-emerald-600/70 line-through">
                                  {formatCurrency(product.price)}
                                </span>
                              )}
                            </div>

                            {product.pv && (
                              <Badge className="bg-gradient-to-r from-amber-500/90 to-yellow-500/90 text-white ring-1 ring-amber-300/30 backdrop-blur-sm w-fit">
                                <Sparkles className="h-3 w-3 mr-1" />
                                PV: {product.pv}
                              </Badge>
                            )}

                            {!hasEnoughBalance && (
                              <div className="p-2 bg-red-50/70 backdrop-blur-sm border border-red-200/50 rounded text-xs text-red-700 ring-1 ring-red-300/20 w-fit">
                                Insufficient balance
                              </div>
                            )}

                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="mt-auto"
                            >
                              <Button 
                                className="w-full bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
                                onClick={() => handlePurchase(product)}
                                disabled={isPurchasing || !hasEnoughBalance}
                              >
                                {isPurchasing ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Processing...
                                  </>
                                ) : (
                                  <>
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    Purchase Now
                                  </>
                                )}
                              </Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                  })}
                </div>

                {/* Load More Button */}
                {products.length > visibleCount && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mt-8"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => setVisibleCount(prev => prev + productsPerPage)}
                        size="lg"
                        className="bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30 px-8 py-6"
                      >
                        View More Products
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {/* Products Count Info */}
                {products.length > 0 && (
                  <div className="text-center mt-4 text-emerald-700/70">
                    <p className="text-sm">
                      Showing {Math.min(visibleCount, products.length)} of {products.length} products
                    </p>
                  </div>
                )}
              </>
            )}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 bg-gradient-to-br from-amber-50/70 to-yellow-50/50 backdrop-blur-sm rounded-lg border border-amber-200/50 ring-1 ring-amber-400/10"
            >
              <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Important Note:
              </h4>
              <p className="text-amber-700 text-sm">
                Your first purchase activates your account and qualifies you for the compensation plan. 
                Choose the package that best fits your goals and budget. You can pay using your purchase wallet balance.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FirstPurchase;
