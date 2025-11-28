import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Heart, Shield, Truck, Clock, Star, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import productsAPI, { Product } from "@/api/products";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProductById(id!);
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error: any) {
      toast.error("Failed to load product details");
      console.error("Error fetching product:", error);
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Stock check commented out temporarily
    // if (!product.inStock) {
    //   toast.error("Product is out of stock");
    //   return;
    // }

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-700 font-medium">Loading product details...</p>
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="border-emerald-200/50 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-amber-400/10 p-8">
            <h2 className="text-3xl font-bold mb-4 text-emerald-900">
              Product not found
            </h2>
            <Button
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  const discountPercent = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const finalPrice = product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price;
  const mainImage = product.images && product.images.length > 0 ? product.images[selectedImage] : null;
  const thumbnailImages = product.images && product.images.length > 1 ? product.images : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/20">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/products")}
            className="bg-white/70 backdrop-blur-sm border-emerald-200/50 ring-1 ring-amber-400/10 hover:bg-emerald-50/80 text-emerald-800 hover:text-emerald-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </motion.div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <Card className="border-emerald-200/50 bg-white/60 backdrop-blur-xl shadow-2xl ring-2 ring-amber-400/20 overflow-hidden group hover:shadow-3xl transition-all duration-300">
              <div className="aspect-square relative bg-gradient-to-br from-emerald-50/60 to-amber-50/40 overflow-hidden backdrop-blur-sm">
                {mainImage ? (
                  <motion.img
                    key={selectedImage}
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Heart className="h-24 w-24 text-emerald-300" />
                  </div>
                )}
                
                {/* Discount Badge */}
                {discountPercent > 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg ring-2 ring-amber-300/30">
                      {discountPercent}% OFF
                    </Badge>
                  </div>
                )}

                {/* Popular Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg ring-2 ring-emerald-300/30">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Popular
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Thumbnail Images */}
            {thumbnailImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {thumbnailImages.slice(0, 4).map((image, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300",
                      selectedImage === idx
                        ? "border-emerald-500 ring-2 ring-amber-400/30 shadow-lg"
                        : "border-emerald-200/50 hover:border-emerald-400/70"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <div>
              <Badge className="bg-emerald-100/80 text-emerald-900 ring-1 ring-emerald-300/40 backdrop-blur-sm text-sm font-bold px-3 py-1.5 hover:bg-emerald-200/90 hover:ring-emerald-400/50 transition-all duration-300 cursor-pointer">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl lg:text-3xl font-bold text-emerald-900 leading-tight">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Price Section */}
            <Card className="border-emerald-200/50 bg-white/60 backdrop-blur-xl shadow-xl ring-2 ring-amber-400/20 p-4 hover:shadow-2xl transition-all duration-300">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-2xl lg:text-3xl font-bold text-emerald-700">
                    ₹{finalPrice.toLocaleString()}
                  </span>
                  {product.discountPrice && product.discountPrice > 0 && product.discountPrice < product.price && (
                    <>
                      <span className="text-lg text-gray-500 line-through font-medium">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
                {product.pv && product.pv > 0 && (
                  <div>
                    <Badge className="bg-gradient-to-r from-amber-500/90 to-yellow-500/90 text-white ring-1 ring-amber-300/30 backdrop-blur-sm text-xs font-bold px-2.5 py-0.5">
                      <Sparkles className="h-3 w-3 mr-1" />
                      {product.pv} PV
                    </Badge>
                  </div>
                )}
              </div>
            </Card>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <Card className="border-emerald-200/50 bg-white/60 backdrop-blur-xl shadow-xl ring-2 ring-amber-400/20 p-6 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-600" />
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-1 p-1 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 ring-1 ring-amber-300/30">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-800 font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-emerald-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30 text-lg font-semibold py-6"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Card className="border-emerald-200/50 bg-white/60 backdrop-blur-xl shadow-xl ring-2 ring-amber-400/20 p-4 hover:shadow-2xl hover:ring-amber-400/30 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-amber-500/20 ring-1 ring-amber-400/20 backdrop-blur-sm">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900 text-base">100% Natural</p>
                    <p className="text-sm text-gray-600 font-medium">Ayurvedic ingredients</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border-emerald-200/50 bg-white/60 backdrop-blur-xl shadow-xl ring-2 ring-amber-400/20 p-4 hover:shadow-2xl hover:ring-amber-400/30 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-amber-500/20 ring-1 ring-amber-400/20 backdrop-blur-sm">
                    <Truck className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900 text-base">Free Shipping</p>
                    <p className="text-sm text-gray-600 font-medium">Over ₹999</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border-emerald-200/50 bg-white/60 backdrop-blur-xl shadow-xl ring-2 ring-amber-400/20 p-4 hover:shadow-2xl hover:ring-amber-400/30 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-amber-500/20 ring-1 ring-amber-400/20 backdrop-blur-sm">
                    <Clock className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900 text-base">Fast Delivery</p>
                    <p className="text-sm text-gray-600 font-medium">Quick shipping</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border-emerald-200/50 bg-white/60 backdrop-blur-xl shadow-xl ring-2 ring-amber-400/20 p-4 hover:shadow-2xl hover:ring-amber-400/30 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-amber-500/20 ring-1 ring-amber-400/20 backdrop-blur-sm">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900 text-base">30 Days Return</p>
                    <p className="text-sm text-gray-600 font-medium">Money back guarantee</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

