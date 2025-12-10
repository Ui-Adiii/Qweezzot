import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Star,
  Award,
  Shield,
  Clock,
  Truck,
  Leaf,
  ArrowRight,
  ShoppingBag,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import productsAPI, { Product } from "@/api/products";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProducts();
      if (response.success) {
        setFeaturedProducts(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching featured products:", error);
      toast.error("Failed to load featured products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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

  const getBadgeInfo = (index: number) => {
    const badges = [
      { badge: "BEST SELLER", color: "from-blue-500 to-teal-500" },
      { badge: "EDITOR'S CHOICE", color: "from-blue-500 to-blue-500" },
      { badge: "TRENDING", color: "from-teal-500 to-cyan-500" },
      { badge: "MOST TRUSTED", color: "from-lime-500 to-blue-500" },
    ];
    return badges[index % badges.length];
  };

  const getDiscountPercent = (price: number, discountPrice: number) => {
    return Math.round(((price - discountPrice) / price) * 100);
  };

  const benefits = [
    { icon: Shield, text: "100% Ayurvedic & Natural" },
    { icon: Award, text: "Quality Certified" },
    { icon: Truck, text: "Free Shipping Over ₹999" },
    { icon: Clock, text: "Fast Delivery" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-sm font-medium mb-6">
            <Award className="h-4 w-4" />
            Customer Favorites
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-br from-gray-900 to-blue-700 bg-clip-text text-transparent mb-6">
            Featured <span className="text-blue-600">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our most loved Ayurvedic solutions, trusted by thousands for their
            proven results
          </p>
        </motion.div>

        {/* Benefits Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-soft border border-blue-200/50 ring-1 ring-amber-400/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100/70 to-amber-100/50 text-blue-600 ring-1 ring-amber-300/20">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {benefit.text}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Products Carousel */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-none shadow-soft animate-pulse">
                <CardContent className="pt-6">
                  <div className="mb-4 h-48 rounded-lg bg-muted"></div>
                  <div className="mb-2 h-6 bg-muted rounded w-20"></div>
                  <div className="mb-2 h-6 bg-muted rounded w-3/4"></div>
                  <div className="mb-4 h-4 bg-muted rounded w-full"></div>
                  <div className="mb-4 flex gap-2">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-12"></div>
                  </div>
                  <div className="h-10 bg-muted rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="relative group/carousel">
            <Carousel
              opts={{
                align: "start",
                loop: false,
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredProducts.map((product, index) => {
                  const badgeInfo = getBadgeInfo(index);
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
                    <CarouselItem
                      key={product._id}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <Card
                          className="group relative bg-white/90 backdrop-blur-sm border border-blue-200/50 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full flex flex-col ring-1 ring-amber-400/10"
                          onClick={() => navigate(`/products/${product._id}`)}
                        >
                          {/* Product Badge */}
                          <div className="absolute top-4 left-4 z-20">
                            <Badge
                              className={`bg-gradient-to-r ${badgeInfo.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg ring-1 ring-white/30`}
                            >
                              {badgeInfo.badge}
                            </Badge>
                          </div>

                          {/* Discount Badge */}
                          {discountPercent > 0 && (
                            <div className="absolute top-4 right-4 z-20">
                              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg ring-1 ring-amber-300/30">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {discountPercent}% OFF
                              </Badge>
                            </div>
                          )}

                          {/* Product Image */}
                          <div className="relative h-48 bg-gradient-to-br from-blue-50 to-teal-50 overflow-hidden">
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
                                <Leaf className="h-16 w-16 text-blue-300" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>

                          <CardContent className="pt-6 pb-4 flex-1 flex flex-col">
                            {/* Category */}
                            <div className="text-xs font-semibold text-blue-600 mb-2">
                              {product.category.charAt(0).toUpperCase() +
                                product.category.slice(1)}
                            </div>

                            {/* Product Name */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                              {product.name}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
                              {product.description}
                            </p>

                            {/* Features */}
                            {product.features &&
                              product.features.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                  {product.features
                                    .slice(0, 2)
                                    .map((feature, idx) => (
                                      <Badge
                                        key={idx}
                                        className="text-xs bg-blue-100/70 text-blue-700 border border-blue-200/50 ring-1 ring-amber-400/10 backdrop-blur-sm"
                                      >
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        {feature}
                                      </Badge>
                                    ))}
                                  {product.features.length > 2 && (
                                    <Badge className="text-xs bg-blue-100/70 text-blue-700 border border-blue-200/50 ring-1 ring-amber-400/10 backdrop-blur-sm">
                                      +{product.features.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              )}

                            {/* Price & CTA */}
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xl font-bold text-gray-900">
                                  ₹{finalPrice.toLocaleString()}
                                </span>
                                {product.discountPrice &&
                                  product.discountPrice < product.price && (
                                    <span className="text-sm text-gray-500 line-through">
                                      ₹{product.price.toLocaleString()}
                                    </span>
                                  )}
                                {product.pv && (
                                  <Badge className="bg-gradient-to-r from-amber-500/90 to-yellow-500/90 text-white ring-1 ring-amber-300/30 backdrop-blur-sm text-xs">
                                    {product.pv} PV
                                  </Badge>
                                )}
                              </div>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Button
                                  size="sm"
                                  className="rounded-full bg-gradient-to-r from-blue-500 to-amber-500 hover:from-blue-600 hover:to-amber-600 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 border-0 ring-1 ring-amber-300/30"
                                  onClick={(e) => handleAddToCart(product, e)}
                                  disabled={!product.inStock}
                                >
                                  <ShoppingBag className="h-4 w-4 mr-1" />
                                  Add
                                </Button>
                              </motion.div>
                            </div>
                          </CardContent>

                          {/* Hover Effect */}
                          <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
                            <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                          </div>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/95 backdrop-blur-xl border-2 border-blue-200/50 text-blue-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-amber-500 hover:text-white hover:border-0 shadow-2xl ring-2 ring-amber-400/20 transition-all duration-300 z-30 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95" />
              <CarouselNext className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/95 backdrop-blur-xl border-2 border-blue-200/50 text-blue-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-amber-500 hover:text-white hover:border-0 shadow-2xl ring-2 ring-amber-400/20 transition-all duration-300 z-30 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95" />
            </Carousel>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No featured products available
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-blue-500 to-amber-500 hover:from-blue-600 hover:to-amber-600 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-white border-0 ring-1 ring-amber-300/30"
              onClick={() => navigate("/products")}
            >
              <Leaf className="h-5 w-5 mr-2" />
              Explore All Featured Products
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
