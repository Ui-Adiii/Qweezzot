import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, RefreshCw, Package, ShoppingCart, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import productsAPI from '@/api/products';
import { useCart } from '@/contexts/CartContext';

interface OrderItem {
  productId: string | { _id: string; [key: string]: any };
  productName: string;
  quantity: number;
  price: number;
  pv?: number;
  bv?: number;
  rp?: number;
  mrp?: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  isFirstPurchase: boolean;
}

interface PurchasedProduct {
  productId: string;
  productName: string;
  lastPurchasedDate: string;
  lastOrderNumber: string;
  totalPurchased: number;
  lastPrice: number;
  product?: any; // Full product details if available
}

const RePurchase: React.FC = () => {
  const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [repurchasing, setRepurchasing] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => {
    fetchPurchasedProducts();
  }, []);

  const fetchPurchasedProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getUserOrders();
      
      if (response.success && response.data) {
        const orders: Order[] = response.data || [];
        
        console.log('Fetched orders:', orders.length);
        console.log('Sample order:', orders[0]);
        
        // Extract unique products from all orders (including first purchase orders)
        // This allows users to repurchase products they've bought before
        const productMap = new Map<string, PurchasedProduct>();
        
        orders
          .forEach(order => {
            order.items.forEach(item => {
              // Handle both string and object productId
              const productId = typeof item.productId === 'string' 
                ? item.productId 
                : (item.productId as any)?._id || (item.productId as any)?.id || '';
              
              if (!productId) {
                console.warn('Skipping item with invalid productId:', item);
                return;
              }
              
              const existing = productMap.get(productId);
              
              if (!existing || new Date(order.createdAt) > new Date(existing.lastPurchasedDate)) {
                productMap.set(productId, {
                  productId: productId,
                  productName: item.productName || (typeof item.productId === 'object' ? (item.productId as any)?.name : ''),
                  lastPurchasedDate: order.createdAt,
                  lastOrderNumber: order.orderNumber,
                  totalPurchased: (existing?.totalPurchased || 0) + item.quantity,
                  lastPrice: item.price,
                });
              } else {
                // Update total purchased count
                existing.totalPurchased += item.quantity;
              }
            });
          });
        
        // Convert map to array and fetch product details
        const productsArray = Array.from(productMap.values());
        
        console.log('Unique products found:', productsArray.length);
        
        // Fetch full product details for each
        const productsWithDetails = await Promise.all(
          productsArray.map(async (product) => {
            try {
              const productResponse = await productsAPI.getProductById(product.productId);
              if (productResponse.success && productResponse.data) {
                return {
                  ...product,
                  product: productResponse.data
                };
              }
            } catch (error) {
              console.error(`Failed to fetch product ${product.productId}:`, error);
            }
            return product;
          })
        );
        
        console.log('Products with details:', productsWithDetails.length);
        setPurchasedProducts(productsWithDetails);
      } else {
        setPurchasedProducts([]);
      }
    } catch (error: any) {
      console.error('Failed to load purchased products:', error);
      toast.error('Failed to load purchased products');
      setPurchasedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRepurchase = async (product: PurchasedProduct) => {
    try {
      setRepurchasing(product.productId);
      
      if (!product.product) {
        toast.error('Product details not available');
        return;
      }

      // Check if product is in stock
      if (product.product.inStock === false) {
        toast.error('Product is currently out of stock');
        return;
      }

      // Add to cart with quantity 1
      addItem({
        productId: product.productId,
        name: product.productName,
        price: product.product.repurchaseSellingPrice || 
               product.product.repurchaseRate || 
               product.product.sellingPrice || 
               product.product.discountPrice || 
               product.product.price,
        image: product.product.images?.[0] || '',
        inStock: product.product.inStock,
        repurchaseSellingPrice: product.product.repurchaseSellingPrice,
        repurchaseRate: product.product.repurchaseRate,
        pv: product.product.pv,
        bv: product.product.bv,
        rp: product.product.rp,
        quantity: 1
      });

      toast.success(`${product.productName} added to cart for repurchase`);
      
      // Navigate to checkout
      setTimeout(() => {
        navigate('/checkout');
      }, 500);
      
    } catch (error: any) {
      console.error('Failed to repurchase:', error);
      toast.error('Failed to add product to cart');
    } finally {
      setRepurchasing(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
            <RotateCcw className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
            Re Purchase
          </h1>
        </div>
        <Button 
          variant="outline" 
          onClick={fetchPurchasedProducts} 
          disabled={loading}
          className="border-emerald-200 hover:bg-emerald-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-xl text-emerald-900">Previously Purchased Products</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Repurchase products you've bought before (from any order) to maintain your active status and continue earning.
            </p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="border-gray-200 animate-pulse">
                    <CardContent className="p-6">
                      <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : purchasedProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600 mb-2">No Previous Purchases</p>
                <p className="text-sm text-gray-500 mb-4">
                  You haven't made any repurchase orders yet. Your previously purchased products will appear here.
                </p>
                <Button 
                  onClick={() => navigate('/products')}
                  className="bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Browse Products
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedProducts.map((product, index) => (
                  <motion.div
                    key={product.productId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30 h-full flex flex-col">
                      <CardContent className="p-6 flex flex-col flex-1">
                        {/* Product Image */}
                        <div className="w-full h-40 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                          {product.product?.images && product.product.images.length > 0 ? (
                            <img 
                              src={product.product.images[0]} 
                              alt={product.productName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="h-16 w-16 text-emerald-400" />
                          )}
                        </div>

                        {/* Product Name */}
                        <h3 className="text-lg font-bold text-emerald-900 mb-2 line-clamp-2">
                          {product.productName}
                        </h3>

                        {/* Product Info */}
                        <div className="space-y-2 mb-4 flex-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Last Purchased:</span>
                            <span className="font-medium">{formatDate(product.lastPurchasedDate)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Total Purchased:</span>
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                              {product.totalPurchased} times
                            </Badge>
                          </div>
                          {product.product && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Repurchase Price:</span>
                              <span className="font-bold text-emerald-700">
                                ₹{(
                                  product.product.repurchaseSellingPrice || 
                                  product.product.repurchaseRate || 
                                  product.product.sellingPrice || 
                                  product.product.discountPrice || 
                                  product.product.price || 
                                  0
                                ).toLocaleString()}
                              </span>
                            </div>
                          )}
                          {product.product && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Stock:</span>
                              <Badge 
                                variant={product.product.inStock ? "default" : "destructive"}
                                className={product.product.inStock ? "bg-green-600" : ""}
                              >
                                {product.product.inStock ? 'In Stock' : 'Out of Stock'}
                              </Badge>
                            </div>
                          )}
                        </div>

                        {/* Repurchase Button */}
                        <Button
                          className="w-full bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30 mt-auto"
                          onClick={() => handleRepurchase(product)}
                          disabled={repurchasing === product.productId || (product.product && !product.product.inStock)}
                        >
                          {repurchasing === product.productId ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            <>
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Repurchase
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Benefits Card */}
        {purchasedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-amber-200/50 bg-gradient-to-br from-amber-50/70 to-yellow-50/50 backdrop-blur-sm rounded-lg ring-1 ring-amber-400/10">
              <CardContent className="p-4">
                <h4 className="font-bold text-emerald-900 mb-2">Repurchase Benefits:</h4>
                <ul className="text-emerald-800 text-sm space-y-1">
                  <li>• Maintain active status and continue earning commissions</li>
                  <li>• Get package-specific cashback (₹4,200 - ₹20,000 based on your package)</li>
                  <li>• Qualify for monthly repurchase bonuses</li>
                  <li>• Access to repurchase pricing and discounts</li>
                  <li>• Build your business volume (BV) and points</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default RePurchase;
