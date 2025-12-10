import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Heart,
  Zap,
  Baby,
  Star,
  ShoppingBag,
  Eye,
  Leaf,
  Sparkles,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import productsAPI, { Product } from "@/api/products";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

// Types
interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
}

const LatestProducts = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const { addItem } = useCart();

  const categories: Category[] = [
    {
      id: "all",
      name: "All Products",
      icon: Sparkles,
      color: "from-blue-500 to-teal-500",
    },
    {
      id: "health",
      name: "Health Care",
      icon: Heart,
      color: "from-blue-500 to-blue-500",
    },
    {
      id: "men",
      name: "Men's Care",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "women",
      name: "Women's Care",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "kids",
      name: "Kids Care",
      icon: Baby,
      color: "from-lime-500 to-blue-500",
    },
  ];

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProducts();
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching latest products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on active category
  const filteredLatestProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category.toLowerCase() === activeCategory);

  // Handle category filter click
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // Handle product quick view
  const handleQuickView = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingStates((prev) => ({ ...prev, [product._id]: true }));

    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [product._id]: false }));
      toast.info(`Quick view: ${product.name}`, {
        description: "Product details would open in a modal",
        action: {
          label: "View Full",
          onClick: () => handleProductClick(product),
        },
      });
    }, 1000);
  };

  // Handle add to cart
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) {
      toast.error("Product is out of stock");
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [product._id]: true }));

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

    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [product._id]: false }));
    }, 500);
  };

  // Handle product click (navigate to product detail)
  const handleProductClick = (product: Product) => {
    navigate(`/products/${product._id}`, {
      state: { product },
    });
  };

  // Handle explore product
  const handleExploreProduct = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    handleProductClick(product);
  };

  // Handle view all products
  const handleViewAllProducts = () => {
    navigate("/products");
  };

  const getDiscountPercent = (price: number, discountPrice: number) => {
    return Math.round(((price - discountPrice) / price) * 100);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            New Arrivals
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-br from-gray-900 to-blue-700 bg-clip-text text-transparent mb-6">
            Latest <span className="text-blue-600">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our newest Ayurvedic wellness solutions crafted with
            ancient wisdom and modern science
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <Button
                  variant={
                    activeCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => handleCategoryClick(category.id)}
                  className={cn(
                    "transition-all duration-300 rounded-full px-5 py-2.5 font-medium border-2",
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg border-transparent ring-2 ring-amber-400/30`
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

        {/* Products Carousel */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
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
        ) : filteredLatestProducts.length > 0 ? (
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
                {filteredLatestProducts.map((product, index) => {
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
                          className="group relative bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer h-full flex flex-col"
                          onMouseEnter={() => setHoveredProduct(product._id)}
                          onMouseLeave={() => setHoveredProduct(null)}
                          onClick={() => handleProductClick(product)}
                        >
                          {/* Popular Badge - Show for first few products */}
                          {index < 3 && (
                            <div className="absolute top-4 left-4 z-20">
                              <Badge className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg ring-1 ring-blue-300/30">
                                <Star className="h-3 w-3 mr-1 fill-current" />
                                Popular
                              </Badge>
                            </div>
                          )}

                          {/* Discount Badge */}
                          {discountPercent > 0 && (
                            <div className="absolute top-4 right-4 z-20">
                              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg ring-1 ring-amber-300/30">
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

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex gap-2">
                                <Button
                                  size="sm"
                                  className="rounded-full bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white border-0 shadow-lg"
                                  onClick={(e) => handleQuickView(product, e)}
                                  disabled={loadingStates[product._id]}
                                >
                                  {loadingStates[product._id] ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-800 border-t-transparent" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  className="rounded-full bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-lg"
                                  onClick={(e) => handleAddToCart(product, e)}
                                  disabled={
                                    loadingStates[product._id] ||
                                    !product.inStock
                                  }
                                >
                                  {loadingStates[product._id] ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                  ) : (
                                    <ShoppingBag className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>

                          <CardContent className="pt-6 pb-4 flex-1 flex flex-col">
                            {/* Category */}
                            <div className="mb-3">
                              <Badge
                                className={cn(
                                  "text-xs font-medium backdrop-blur-sm transition-all duration-300 cursor-pointer",
                                  product.category.toLowerCase() === "health" &&
                                    "bg-blue-100/70 text-blue-800 ring-1 ring-blue-300/30 hover:bg-gradient-to-r hover:from-blue-600 hover:to-amber-500 hover:text-white hover:ring-amber-400/30",
                                  product.category.toLowerCase() === "men" &&
                                    "bg-blue-100/70 text-blue-800 ring-1 ring-blue-300/30 hover:bg-gradient-to-r hover:from-blue-600 hover:to-amber-500 hover:text-white hover:ring-amber-400/30",
                                  product.category.toLowerCase() === "women" &&
                                    "bg-pink-100/70 text-pink-800 ring-1 ring-pink-300/30 hover:bg-gradient-to-r hover:from-blue-600 hover:to-amber-500 hover:text-white hover:ring-amber-400/30",
                                  product.category.toLowerCase() === "kids" &&
                                    "bg-lime-100/70 text-lime-800 ring-1 ring-lime-300/30 hover:bg-gradient-to-r hover:from-blue-600 hover:to-amber-500 hover:text-white hover:ring-amber-400/30",
                                  "bg-gray-100/70 text-gray-800 ring-1 ring-gray-300/30 hover:bg-gradient-to-r hover:from-blue-600 hover:to-amber-500 hover:text-white hover:ring-amber-400/30"
                                )}
                              >
                                {product.category.charAt(0).toUpperCase() +
                                  product.category.slice(1)}
                              </Badge>
                            </div>

                            {/* Product Name */}
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 mb-2 line-clamp-2 min-h-[3.5rem]">
                              {product.name}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
                              {product.description}
                            </p>

                            {/* Price */}
                            <div className="flex items-center justify-between mb-3 mt-auto">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-blue-700">
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
                            </div>

                            {/* CTA Button */}
                            <Button
                              size="sm"
                              className="w-full rounded-full bg-blue-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-amber-500 text-white border-0 group/btn transition-all duration-300"
                              onClick={(e) => handleExploreProduct(product, e)}
                            >
                              <span>Explore Product</span>
                              <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </Button>
                          </CardContent>
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
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Leaf className="h-12 w-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              We're constantly adding new products. Check back soon!
            </p>
            <Button
              variant="outline"
              onClick={() => handleCategoryClick("all")}
              className="rounded-full border-blue-200 text-blue-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-amber-500 hover:text-white hover:border-transparent transition-all duration-300"
            >
              View All Products
            </Button>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-2 border-blue-200 text-blue-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-amber-500 hover:text-white hover:border-transparent bg-white/80 backdrop-blur-sm ring-1 ring-amber-400/10 transition-all duration-300"
              onClick={handleViewAllProducts}
            >
              View All Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
