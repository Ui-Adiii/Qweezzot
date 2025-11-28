import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Package, Edit, Trash2, Image as ImageIcon, DollarSign, ShoppingCart, Eye, Store, ArrowRight, Star, Sparkles, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import productsAPI, { Product } from '@/api/products';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

const UserProducts = () => {
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [allProductsLoading, setAllProductsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('my-products');
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 products initially
  const [myProductsVisibleCount, setMyProductsVisibleCount] = useState(6); // Show 6 products initially for My Products
  const productsPerPage = 6;
  const { addItem } = useCart();
  
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    features: '',
    images: '',
    stock: '',
    pv: '',
    dp: '',
    bv: '',
    mrp: ''
  });

  const categories = [
    'health',
    'men',
    'women',
    'kids',
    'supplements',
    'ayurvedic',
    'skincare',
    'haircare'
  ];

  useEffect(() => {
    fetchUserProducts();
    fetchAllProducts();
  }, []);

  const fetchUserProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getUserProducts();
      if (response.success) {
        setUserProducts(response.data);
      }
    } catch (error: any) {
      toast.error('Failed to load your products');
      console.error('Error fetching user products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      setAllProductsLoading(true);
      const response = await productsAPI.getProducts();
      if (response.success) {
        setAllProducts(response.data);
      }
    } catch (error: any) {
      toast.error('Failed to load all products');
      console.error('Error fetching all products:', error);
    } finally {
      setAllProductsLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      toast.error('Product is out of stock');
      return;
    }
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.images && product.images.length > 0 ? product.images[0] : undefined,
      pv: product.pv,
      inStock: product.inStock,
    });
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      discountPrice: '',
      category: '',
      features: '',
      images: '',
      stock: '',
      pv: '',
      dp: '',
      bv: '',
      mrp: ''
    });
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const featuresArray = productForm.features.split(',').map(f => f.trim()).filter(f => f);
      const imagesArray = productForm.images.split(',').map(img => img.trim()).filter(img => img);

      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        discountPrice: productForm.discountPrice ? parseFloat(productForm.discountPrice) : undefined,
        category: productForm.category,
        features: featuresArray,
        images: imagesArray,
        stock: parseInt(productForm.stock),
        pv: productForm.pv ? parseFloat(productForm.pv) : undefined,
        dp: productForm.dp ? parseFloat(productForm.dp) : undefined,
        bv: productForm.bv ? parseFloat(productForm.bv) : undefined,
        mrp: productForm.mrp ? parseFloat(productForm.mrp) : undefined,
      };

      const response = await productsAPI.createUserProduct(productData);
      
      if (response.success) {
        toast.success('Product created successfully!');
        setIsCreateDialogOpen(false);
        resetForm();
        fetchUserProducts();
        fetchAllProducts(); // Refresh all products list
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setIsSubmitting(true);

    try {
      const featuresArray = productForm.features.split(',').map(f => f.trim()).filter(f => f);
      const imagesArray = productForm.images.split(',').map(img => img.trim()).filter(img => img);

      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        discountPrice: productForm.discountPrice ? parseFloat(productForm.discountPrice) : undefined,
        category: productForm.category,
        features: featuresArray,
        images: imagesArray,
        stock: parseInt(productForm.stock),
        pv: productForm.pv ? parseFloat(productForm.pv) : undefined,
        dp: productForm.dp ? parseFloat(productForm.dp) : undefined,
        bv: productForm.bv ? parseFloat(productForm.bv) : undefined,
        mrp: productForm.mrp ? parseFloat(productForm.mrp) : undefined,
      };

      const response = await productsAPI.updateUserProduct(editingProduct._id, productData);
      
      if (response.success) {
        toast.success('Product updated successfully!');
        setIsEditDialogOpen(false);
        setEditingProduct(null);
        resetForm();
        fetchUserProducts();
        fetchAllProducts(); // Refresh all products list
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await productsAPI.deleteUserProduct(productId);
      
      if (response.success) {
        toast.success('Product deleted successfully!');
        fetchUserProducts();
        fetchAllProducts(); // Refresh all products list
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete product');
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      discountPrice: product.discountPrice?.toString() || '',
      category: product.category,
      features: product.features.join(', '),
      images: product.images.join(', '),
      stock: product.stock?.toString() || '0',
      pv: product.pv?.toString() || '',
      dp: product.dp?.toString() || '',
      bv: product.bv?.toString() || '',
      mrp: product.mrp?.toString() || ''
    });
    setIsEditDialogOpen(true);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };


  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your products and browse all available products</p>
        </div>
        
        {activeTab === 'my-products' && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog} className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your listings
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={productForm.name}
                    onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={productForm.category}
                    onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={productForm.description}
                  onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountPrice">Discount Price (₹)</Label>
                  <Input
                    id="discountPrice"
                    type="number"
                    value={productForm.discountPrice}
                    onChange={(e) => setProductForm(prev => ({ ...prev, discountPrice: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm(prev => ({ ...prev, stock: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pv">Product Value (PV)</Label>
                  <Input
                    id="pv"
                    type="number"
                    value={productForm.pv}
                    onChange={(e) => setProductForm(prev => ({ ...prev, pv: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dp">Direct Price (DP)</Label>
                  <Input
                    id="dp"
                    type="number"
                    value={productForm.dp}
                    onChange={(e) => setProductForm(prev => ({ ...prev, dp: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bv">Business Volume (BV)</Label>
                  <Input
                    id="bv"
                    type="number"
                    value={productForm.bv}
                    onChange={(e) => setProductForm(prev => ({ ...prev, bv: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mrp">MRP</Label>
                  <Input
                    id="mrp"
                    type="number"
                    value={productForm.mrp}
                    onChange={(e) => setProductForm(prev => ({ ...prev, mrp: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (comma separated)</Label>
                <Textarea
                  id="features"
                  value={productForm.features}
                  onChange={(e) => setProductForm(prev => ({ ...prev, features: e.target.value }))}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Image URLs (comma separated)</Label>
                <Textarea
                  id="images"
                  value={productForm.images}
                  onChange={(e) => setProductForm(prev => ({ ...prev, images: e.target.value }))}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  rows={2}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Creating...' : 'Create Product'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="my-products">
            <Package className="mr-2 h-4 w-4" />
            My Products ({userProducts.length})
          </TabsTrigger>
          <TabsTrigger value="all-products">
            <Store className="mr-2 h-4 w-4" />
            All Products ({allProducts.length})
          </TabsTrigger>
        </TabsList>

        {/* My Products Tab */}
        <TabsContent value="my-products" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userProducts.length}</div>
                <p className="text-xs text-muted-foreground">Products listed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Stock</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {userProducts.filter(p => p.inStock).length}
                </div>
                <p className="text-xs text-muted-foreground">Available products</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{userProducts.reduce((total, product) => total + product.price, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Combined product value</p>
              </CardContent>
            </Card>
          </div>

          {/* My Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProducts.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-emerald-700/70">
                    <Package className="mx-auto h-16 w-16 text-emerald-300 mb-4" />
                    <p className="text-lg font-medium">No products yet</p>
                    <p className="text-sm mb-4">Start by adding your first product</p>
                    <Button onClick={openCreateDialog} className="bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Product
                    </Button>
                  </div>
                ) : (
                  userProducts.slice(0, myProductsVisibleCount).map((product, index) => {
                    const discountPercent = product.discountPrice && product.discountPrice < product.price
                      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                      : 0;
                    const finalPrice = product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price;

                    return (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
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

                          {/* Stock Badge */}
                          <div className="absolute top-4 left-4 z-20">
                            <Badge className={product.inStock 
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg ring-1 ring-emerald-300/30"
                              : "bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm"
                            }>
                              {product.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </div>

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
                              <div className="flex items-center justify-center h-full">
                                <ImageIcon className="h-12 w-12 text-emerald-300" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg leading-tight text-emerald-900 line-clamp-2 min-h-[3.5rem]">{product.name}</CardTitle>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap mt-2">
                              <span className="text-2xl font-bold text-emerald-700">
                                ₹{finalPrice.toLocaleString()}
                              </span>
                              {product.discountPrice && product.discountPrice < product.price && (
                                <span className="text-sm text-emerald-600/70 line-through">₹{product.price.toLocaleString()}</span>
                              )}
                              {product.pv && (
                                <Badge className="bg-gradient-to-r from-amber-500/90 to-yellow-500/90 text-white ring-1 ring-amber-300/30 backdrop-blur-sm">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  {product.pv} PV
                                </Badge>
                              )}
                            </div>
                          </CardHeader>

                          <CardContent className="pt-0 flex-1 flex flex-col">
                            <p className="text-sm text-emerald-700/70 mb-3 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
                            
                            <div className="space-y-2 text-xs text-emerald-700/70 mb-4">
                              <div className="flex justify-between">
                                <span>Category:</span>
                                <Badge variant="outline" className="text-xs border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10">{product.category}</Badge>
                              </div>
                              {product.stock !== undefined && (
                                <div className="flex justify-between">
                                  <span>Stock:</span>
                                  <span className="font-medium">{product.stock} units</span>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2 mt-auto">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1"
                              >
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openEditDialog(product)}
                                  className="w-full border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-emerald-50/50"
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                              </motion.div>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteProduct(product._id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200/50"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Load More Button for My Products */}
              {userProducts.length > myProductsVisibleCount && (
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
                      onClick={() => setMyProductsVisibleCount(prev => prev + productsPerPage)}
                      size="lg"
                      className="bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30 px-8 py-6"
                    >
                      Load More Products
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {/* Products Count Info for My Products */}
              {userProducts.length > 0 && (
                <div className="text-center mt-4 text-emerald-700/70">
                  <p className="text-sm">
                    Showing {Math.min(myProductsVisibleCount, userProducts.length)} of {userProducts.length} products
                  </p>
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* All Products Tab */}
        <TabsContent value="all-products" className="space-y-6">
          {allProductsLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-emerald-700/70">
                    <Store className="mx-auto h-16 w-16 text-emerald-300 mb-4" />
                    <p className="text-lg font-medium">No products available</p>
                    <p className="text-sm">Check back later for new products</p>
                  </div>
                ) : (
                  allProducts.slice(0, visibleCount).map((product, index) => {
                    const discountPercent = product.discountPrice && product.discountPrice < product.price
                      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                      : 0;
                    const finalPrice = product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price;

                    return (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
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

                          <div className="relative h-56 bg-gradient-to-br from-emerald-50/70 to-amber-50/50 overflow-hidden flex-shrink-0">
                            {product.images && product.images.length > 0 ? (
                              <motion.img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                whileHover={{ scale: 1.1 }}
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <ImageIcon className="h-12 w-12 text-emerald-300" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg leading-tight text-emerald-900 line-clamp-2 min-h-[3.5rem]">{product.name}</CardTitle>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap mt-2">
                              <span className="text-2xl font-bold text-emerald-700">
                                ₹{finalPrice.toLocaleString()}
                              </span>
                              {product.discountPrice && product.discountPrice < product.price && (
                                <span className="text-sm text-emerald-600/70 line-through">₹{product.price.toLocaleString()}</span>
                              )}
                              {product.pv && (
                                <Badge className="bg-gradient-to-r from-amber-500/90 to-yellow-500/90 text-white ring-1 ring-amber-300/30 backdrop-blur-sm">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  {product.pv} PV
                                </Badge>
                              )}
                            </div>
                          </CardHeader>

                          <CardContent className="pt-0 flex-1 flex flex-col">
                            <p className="text-sm text-emerald-700/70 mb-3 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
                            
                            <div className="space-y-2 text-xs text-emerald-700/70 mb-4">
                              <div className="flex justify-between">
                                <span>Category:</span>
                                <Badge variant="outline" className="text-xs border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10">{product.category}</Badge>
                              </div>
                              {product.stock !== undefined && (
                                <div className="flex justify-between">
                                  <span>Stock:</span>
                                  <span className="font-medium">{product.stock} units</span>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2 mt-auto">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1"
                              >
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="w-full border-emerald-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-emerald-50/50"
                                  onClick={() => window.open(`/products/${product._id}`, '_blank')}
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                              </motion.div>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1"
                              >
                                <Button
                                  size="sm"
                                  className="w-full bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
                                  onClick={() => handleAddToCart(product)}
                                  disabled={!product.inStock}
                                >
                                  <ShoppingCart className="h-3 w-3 mr-1" />
                                  Add to Cart
                                </Button>
                              </motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Load More Button */}
              {allProducts.length > visibleCount && (
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
                      Load More Products
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {/* Products Count Info */}
              {allProducts.length > 0 && (
                <div className="text-center mt-4 text-emerald-700/70">
                  <p className="text-sm">
                    Showing {Math.min(visibleCount, allProducts.length)} of {allProducts.length} products
                  </p>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update your product information
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleEditProduct} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Product Name *</Label>
                <Input
                  id="edit-name"
                  value={productForm.name}
                  onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category *</Label>
                <Select
                  value={productForm.category}
                  onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                value={productForm.description}
                onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price (₹) *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-discountPrice">Discount Price (₹)</Label>
                <Input
                  id="edit-discountPrice"
                  type="number"
                  value={productForm.discountPrice}
                  onChange={(e) => setProductForm(prev => ({ ...prev, discountPrice: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-stock">Stock Quantity *</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm(prev => ({ ...prev, stock: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-pv">Product Value (PV)</Label>
                <Input
                  id="edit-pv"
                  type="number"
                  value={productForm.pv}
                  onChange={(e) => setProductForm(prev => ({ ...prev, pv: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-dp">Direct Price (DP)</Label>
                <Input
                  id="edit-dp"
                  type="number"
                  value={productForm.dp}
                  onChange={(e) => setProductForm(prev => ({ ...prev, dp: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-bv">Business Volume (BV)</Label>
                <Input
                  id="edit-bv"
                  type="number"
                  value={productForm.bv}
                  onChange={(e) => setProductForm(prev => ({ ...prev, bv: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-mrp">MRP</Label>
                <Input
                  id="edit-mrp"
                  type="number"
                  value={productForm.mrp}
                  onChange={(e) => setProductForm(prev => ({ ...prev, mrp: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-features">Features (comma separated)</Label>
              <Textarea
                id="edit-features"
                value={productForm.features}
                onChange={(e) => setProductForm(prev => ({ ...prev, features: e.target.value }))}
                placeholder="Feature 1, Feature 2, Feature 3"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-images">Image URLs (comma separated)</Label>
              <Textarea
                id="edit-images"
                value={productForm.images}
                onChange={(e) => setProductForm(prev => ({ ...prev, images: e.target.value }))}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                rows={2}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? 'Updating...' : 'Update Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProducts;
