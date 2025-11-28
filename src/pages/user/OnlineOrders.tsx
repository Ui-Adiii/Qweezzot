import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Truck, Package, Clock, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import productsAPI from '@/api/products';
import { motion } from 'framer-motion';

interface Order {
  _id: string;
  orderNumber: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderStats {
  totalAmount: number;
  totalOrders: number;
  deliveredOrders: number;
  processingOrders: number;
}

const OnlineOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<OrderStats>({
    totalAmount: 0,
    totalOrders: 0,
    deliveredOrders: 0,
    processingOrders: 0
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getUserOrders();
      
      if (response.success) {
        const ordersData = response.data;
        setOrders(ordersData);
        
        // Calculate stats
        const totalAmount = ordersData.reduce((sum: number, order: Order) => sum + order.totalAmount, 0);
        const totalOrders = ordersData.length;
        const deliveredOrders = ordersData.filter((order: Order) => order.status === 'delivered').length;
        const processingOrders = ordersData.filter((order: Order) => 
          ['pending', 'confirmed', 'processing', 'shipped'].includes(order.status)
        ).length;
        
        setStats({
          totalAmount,
          totalOrders,
          deliveredOrders,
          processingOrders
        });
      }
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-500';
      case 'shipped': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      case 'confirmed': return 'bg-purple-500';
      case 'pending': return 'bg-orange-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
          <Globe className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
          My Online Orders
        </h1>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
            <CardContent className="p-4 text-center">
              <motion.div
                className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Package className="h-6 w-6 text-emerald-600" />
              </motion.div>
              <p className="text-2xl font-bold text-emerald-700">₹{stats.totalAmount.toLocaleString()}</p>
              <p className="text-sm text-emerald-800 font-medium">Total Orders Value</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
            <CardContent className="p-4 text-center">
              <motion.div
                className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <ShoppingCart className="h-6 w-6 text-emerald-600" />
              </motion.div>
              <p className="text-2xl font-bold text-emerald-700">{stats.totalOrders}</p>
              <p className="text-sm text-emerald-800 font-medium">Total Orders</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
            <CardContent className="p-4 text-center">
              <motion.div
                className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Package className="h-6 w-6 text-emerald-600" />
              </motion.div>
              <p className="text-2xl font-bold text-emerald-700">{stats.deliveredOrders}</p>
              <p className="text-sm text-emerald-800 font-medium">Delivered</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-400/10 hover:ring-amber-400/30">
            <CardContent className="p-4 text-center">
              <motion.div
                className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/30 w-fit mx-auto mb-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Clock className="h-6 w-6 text-emerald-600" />
              </motion.div>
              <p className="text-2xl font-bold text-emerald-700">{stats.processingOrders}</p>
              <p className="text-sm text-emerald-800 font-medium">Processing</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10">
          <CardHeader>
            <CardTitle className="text-xl text-emerald-900">Order History</CardTitle>
          </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="border-gray-200 animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      </div>
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No orders found</p>
              <p className="text-sm text-muted-foreground mt-2">Your orders will appear here once you make a purchase</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="border-emerald-200/50 bg-white/60 backdrop-blur-md shadow-md ring-1 ring-amber-400/10 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/30">
                            {getStatusIcon(order.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-bold text-emerald-900">Order #{order.orderNumber}</h3>
                              <Badge 
                                className={`text-white ${getStatusColor(order.status)} ring-1 ring-white/30 backdrop-blur-sm`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="space-y-1">
                              <p className="text-sm text-emerald-800">
                                Items: {order.items.map(item => `${item.productName} (${item.quantity})`).join(', ')}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-emerald-700">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                {order.trackingNumber && (
                                  <div className="flex items-center space-x-1">
                                    <Truck className="h-4 w-4" />
                                    <span>Tracking: {order.trackingNumber}</span>
                                  </div>
                                )}
                                <Badge 
                                  className={order.paymentStatus === 'paid' 
                                    ? 'bg-gradient-to-r from-emerald-600 to-amber-500 text-white ring-1 ring-amber-300/30 backdrop-blur-sm'
                                    : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white ring-1 ring-amber-300/30 backdrop-blur-sm'
                                  }
                                >
                                  Payment: {order.paymentStatus}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-bold text-lg text-emerald-700">₹{order.totalAmount.toLocaleString()}</p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-emerald-50/50 text-emerald-800"
                            >
                              View Details
                            </Button>
                            {order.trackingNumber && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-emerald-50/50 text-emerald-800"
                              >
                                <Truck className="h-4 w-4 mr-1" />
                                Track
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
};

export default OnlineOrders;
