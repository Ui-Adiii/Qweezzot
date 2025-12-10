import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Heart,
  Zap,
  Baby,
  ShoppingCart,
  Star,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import productsAPI, { Product } from "@/api/products";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

const Products = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12); // Show 12 products initially
  const productsPerPage = 12;

  const [categories, setCategories] = useState([
    { id: "all", name: "All Products", icon: Heart },
    { id: "health", name: "Health Care", icon: Heart },
    { id: "men", name: "Men's Care", icon: Zap },
    { id: "women", name: "Women's Care", icon: Heart },
    { id: "kids", name: "Kids Care", icon: Baby },
  ]);

  const { addItem } = useCart();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Reset visible count when category changes
    setVisibleCount(12);
  }, [activeCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProducts();
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error: any) {
      toast.error("Failed to load products");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getCategories();
      if (response.success) {
        const dynamicCategories = response.data.map((cat: string) => ({
          id: cat.toLowerCase(),
          name: cat.charAt(0).toUpperCase() + cat.slice(1) + " Care",
          icon:
            cat === "health"
              ? Heart
              : cat === "men"
              ? Zap
              : cat === "women"
              ? Heart
              : Baby,
        }));
        setCategories([
          { id: "all", name: "All Products", icon: Heart },
          ...dynamicCategories,
        ]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      toast.error("Product is out of stock");
      return;
    }
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image:
        product.images && product.images.length > 0
          ? product.images[0]
          : undefined,
      pv: product.pv,
      inStock: product.inStock,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category.toLowerCase() === activeCategory);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + productsPerPage);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getDiscountPercent = (price: number, discountPrice: number) => {
    return Math.round(((price - discountPrice) / price) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Ayurvedic Products
            </h1>
            <p className="text-xl opacity-90">
              World-Class Wellness Products Backed by Ancient Wisdom
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guarantee Badge */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-blue-200/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-amber-500/20 rounded-lg backdrop-blur-sm ring-1 ring-amber-300/20">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-lg font-semibold text-blue-800">
              30 Days Money Back & Replacement Guarantee
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white/60 backdrop-blur-sm border-b border-blue-200/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <Button
                    variant={
                      activeCategory === category.id ? "default" : "outline"
                    }
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "transition-all duration-300 rounded-full px-5 py-2.5 font-medium border-2",
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white shadow-lg border-transparent ring-2 ring-amber-400/30"
                        : "bg-white/90 backdrop-blur-sm border-blue-300/50 text-blue-800 hover:border-blue-500/70 hover:bg-blue-50/80 hover:shadow-blue-500/30 hover:shadow-lg hover:-translate-y-1 hover:text-blue-600"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card
                  key={i}
                  className="border-blue-200/50 bg-white/60 backdrop-blur-sm animate-pulse"
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 h-48 rounded-lg bg-blue-200/50"></div>
                    <div className="mb-2 h-6 bg-blue-200/50 rounded w-20"></div>
                    <div className="mb-2 h-6 bg-blue-200/50 rounded w-3/4"></div>
                    <div className="mb-4 h-4 bg-blue-200/50 rounded w-full"></div>
                    <div className="mb-4 flex gap-2">
                      <div className="h-6 bg-blue-200/50 rounded w-16"></div>
                      <div className="h-6 bg-blue-200/50 rounded w-12"></div>
                    </div>
                    <div className="h-10 bg-blue-200/50 rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleProducts.map((product, index) => {
                  const discountPercent =
                    product.discountPrice &&
                    product.discountPrice < product.price
                      ? getDiscountPercent(product.price, product.discountPrice)
                      : 0;
                  const finalPrice =
                    product.discountPrice && product.discountPrice > 0
                      ? product.discountPrice
                      : product.price;

                  return (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <Card
                        className="group relative border-blue-200/50 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ring-1 ring-amber-400/10 cursor-pointer h-full flex flex-col"
                        onClick={() => navigate(`/products/${product._id}`)}
                      >
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
                            <Badge className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg ring-1 ring-blue-300/30">
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

                        <CardContent className="pt-6 p-0 flex-1 flex flex-col">
                          {/* Product Image */}
                          <div className="relative h-56 bg-gradient-to-br from-blue-50/70 to-amber-50/50 overflow-hidden flex-shrink-0">
                            {product.images && product.images.length > 0 ? (
                              <motion.img
                                src={product.images[0]}
                                alt={product.name}
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                whileHover={{ scale: 1.1 }}
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <Heart className="h-16 w-16 text-blue-300" />
                              </div>
                            )}
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>

                          <div className="p-4 space-y-3">
                            {/* Category Badge */}
                            <div>
                              <Badge className="bg-blue-100/70 text-blue-800 ring-1 ring-blue-300/30 backdrop-blur-sm text-xs transition-all duration-300 cursor-pointer hover:bg-gradient-to-r hover:from-blue-600 hover:to-amber-500 hover:text-white hover:ring-amber-400/30">
                                {product.category.charAt(0).toUpperCase() +
                                  product.category.slice(1)}
                              </Badge>
                            </div>

                            {/* Product Info */}
                            <h3 className="text-lg font-bold text-blue-900 line-clamp-2 min-h-[3.5rem]">
                              {product.name}
                            </h3>
                            <p className="text-sm text-blue-700/70 line-clamp-2 min-h-[2.5rem]">
                              {product.description}
                            </p>

                            {/* Price */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-2xl font-bold text-blue-700">
                                {formatCurrency(finalPrice)}
                              </span>
                              {product.discountPrice &&
                                product.discountPrice > 0 &&
                                product.discountPrice < product.price && (
                                  <span className="text-sm text-blue-600/70 line-through">
                                    {formatCurrency(product.price)}
                                  </span>
                                )}
                            </div>

                            {/* Retail Profit Display (MRP vs DP) */}
                            {product.mrp &&
                              product.dp &&
                              product.mrp > 0 &&
                              product.dp > 0 && (
                                <div className="space-y-1 p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200/50">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-600">MRP:</span>
                                    <span className="font-semibold text-gray-800">
                                      ₹{product.mrp.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-600">DP:</span>
                                    <span className="font-semibold text-gray-800">
                                      ₹{product.dp.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pt-1 border-t border-blue-200/50">
                                    <span className="text-xs font-bold text-blue-700">
                                      Retail Profit:
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-bold text-blue-600">
                                        ₹
                                        {(
                                          product.mrp - product.dp
                                        ).toLocaleString()}
                                      </span>
                                      <Badge className="bg-gradient-to-r from-blue-500 to-blue-500 text-white text-xs px-2 py-0.5">
                                        {Math.round(
                                          ((product.mrp - product.dp) /
                                            product.dp) *
                                            100
                                        )}
                                        %
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              )}

                            {/* PV Badge */}
                            {product.pv && product.pv > 0 && (
                              <div>
                                <Badge className="bg-gradient-to-r from-amber-500/90 to-yellow-500/90 text-white ring-1 ring-amber-300/30 backdrop-blur-sm">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  {product.pv} PV
                                </Badge>
                              </div>
                            )}

                            {/* Features */}
                            {product.features &&
                              product.features.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {product.features
                                    .slice(0, 2)
                                    .map((feature, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="outline"
                                        className="text-xs bg-white/60 backdrop-blur-sm border-blue-200/50 ring-1 ring-amber-400/10"
                                      >
                                        {feature}
                                      </Badge>
                                    ))}
                                  {product.features.length > 2 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-white/60 backdrop-blur-sm border-blue-200/50 ring-1 ring-amber-400/10"
                                    >
                                      +{product.features.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              )}

                            {/* CTAs */}
                            <div
                              className="flex gap-2 pt-2 mt-auto"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1"
                              >
                                <Button
                                  variant="outline"
                                  className="w-full border-blue-200/50 bg-white/60 backdrop-blur-sm ring-1 ring-amber-400/10 hover:bg-blue-50/50"
                                  onClick={() =>
                                    navigate(`/products/${product._id}`)
                                  }
                                >
                                  View
                                </Button>
                              </motion.div>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1"
                              >
                                <Button
                                  className="w-full bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30"
                                  onClick={() => handleAddToCart(product)}
                                  disabled={!product.inStock}
                                >
                                  <ShoppingCart className="h-4 w-4 mr-1" />
                                  Add
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* View More Button */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center mt-12"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={loadMore}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white shadow-lg ring-1 ring-amber-300/30 px-8 py-6 text-lg"
                    >
                      View More Products
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {/* Products Count Info */}
              {!loading && filteredProducts.length > 0 && (
                <div className="text-center mt-8 text-blue-700/70">
                  <p className="text-sm">
                    Showing {visibleProducts.length} of{" "}
                    {filteredProducts.length} products
                  </p>
                </div>
              )}
            </>
          )}

          {!loading && filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-blue-200/50 ring-1 ring-amber-400/10 inline-block">
                <p className="text-xl text-blue-800">
                  No products found in this category.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Product Benefits */}
      <section className="py-20 bg-white/60 backdrop-blur-sm border-t border-blue-200/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-12 text-blue-800">
              Why Choose Our Products?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "100% Natural",
                  desc: "Pure Ayurvedic ingredients with no harmful chemicals",
                },
                {
                  icon: Heart,
                  title: "Certified Quality",
                  desc: "All products are tested and certified for safety",
                },
                {
                  icon: Zap,
                  title: "Proven Results",
                  desc: "Backed by traditional wisdom and modern research",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/70 backdrop-blur-xl rounded-xl border border-blue-200/50 shadow-lg ring-1 ring-amber-400/10"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-amber-500/20 mx-auto ring-2 ring-amber-400/20">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-blue-800">
                    {benefit.title}
                  </h3>
                  <p className="text-blue-700/70">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our community and get access to premium Ayurvedic products
              with exclusive partner benefits.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-xl ring-2 ring-amber-300/30 px-8 py-6 text-lg"
              >
                Become a Partner
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
