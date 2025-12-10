import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Cart from "./Cart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Compensation Plan", path: "/compensation-plan" },
    { name: "Brand", path: "/brand" },
    { name: "Join Now", path: "/join" },
  ];

  const userMenuItems = [
    { name: "User Login", path: "/user/login" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="transition-transform hover:scale-105">
            <div className="relative flex h-full w-40 items-center justify-center rounded-lg bg-transparent">
              <img className="h-[7vh] w-auto max-sm:h-[7vh]" src="logo.png" alt="logo" />
            </div>

            
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative",
                  isActive(item.path) ? "text-primary" : "text-foreground"
                )}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Cart />
            <Button variant="outline" size="sm" asChild>
              <Link to="/user/login">User Login</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/join">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium py-2 px-4 rounded-md transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex justify-center mb-2">
                <Cart />
              </div>
              <Button variant="outline" size="sm" asChild className="w-full mb-2">
                <Link to="/user/login" onClick={() => setIsMenuOpen(false)}>User Login</Link>
              </Button>
              <Button variant="hero" size="sm" asChild className="w-full">
                <Link to="/join" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
