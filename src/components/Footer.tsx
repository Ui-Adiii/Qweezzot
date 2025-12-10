import { Link } from "react-router-dom";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-full w-40 items-center justify-center rounded-lg bg-transparent">
                <img
                  className="self-center max-sm:h-[7vh]"
                  src="logo.png"
                  alt="logo"
                />
              </div>
              {/* <div className="flex flex-col">
                <span className="text-lg font-bold">Osfigo</span>
                <span className="text-xs opacity-80">(OPC) Pvt. Ltd</span>
              </div> */}
            </div>
            <p className="text-sm opacity-80 mb-4">
              Jharkhand's 1st Direct Selling Company
            </p>
            <p className="text-sm opacity-80">
              Committed to providing world-class Ayurvedic wellness products and
              an unmatched compensation plan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/join"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Join Now
                </Link>
              </li>
              <li>
                <Link
                  to="/ds-search"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  DS Search
                </Link>
              </li>
              <li>
                <Link
                  to="/de-list"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  DE List
                </Link>
              </li>
              <li>
                <Link
                  to="/legals"
                  className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-colors"
                >
                  Legal Certificates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm opacity-80">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Jharkhand, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-colors">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+911234567890">+91 123 456 7890</a>
              </li>
              <li className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-colors">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@osfigolife.com">info@osfigolife.com</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 hover:bg-gradient-primary transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 hover:bg-gradient-primary transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 hover:bg-gradient-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 hover:bg-gradient-primary transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
            <p>© {currentYear} Osfigo (OPC) Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-4">
              <Link
                to="/privacy"
                className="hover:opacity-100 transition-opacity"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:opacity-100 transition-opacity"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
