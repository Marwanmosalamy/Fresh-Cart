import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaCreditCard
} from 'react-icons/fa';
import logo from "@/assets/images/freshcart-logo.49f1b44d.svg";
export default function Footer() {
  return (
    <footer className="bg-[#0b131f] w-full text-[#94a3b8] mt-auto">
      <div className="max-w-360 mx-auto px-6 lg:px-12 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          <div className="lg:col-span-4 pr-0 lg:pr-10">
            <div className="bg-white px-5 py-3 rounded-lg inline-flex items-center justify-center mb-8">
          <Image
            src={logo}
            alt="FreshCart"
            width={160}
            height={40}
            className="h-6 lg:h-7 w-auto object-contain"
          />
            </div>
            
            <p className="text-[15px] leading-relaxed mb-8">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-4 text-[15px]">
                <FaPhoneAlt className="text-[#0aad0a] text-lg" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-4 text-[15px]">
                <FaEnvelope className="text-[#0aad0a] text-lg" />
                <span>support@freshcart.com</span>
              </li>
              <li className="flex items-center gap-4 text-[15px]">
                <FaMapMarkerAlt className="text-[#0aad0a] text-lg" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </li>
            </ul>

            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:bg-[#0aad0a] hover:text-white transition-all duration-300">
                <FaFacebookF size={15} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:bg-[#0aad0a] hover:text-white transition-all duration-300">
                <FaTwitter size={15} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:bg-[#0aad0a] hover:text-white transition-all duration-300">
                <FaInstagram size={15} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:bg-[#0aad0a] hover:text-white transition-all duration-300">
                <FaYoutube size={15} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white text-[17px] font-semibold mb-8">Shop</h3>
            <ul className="flex flex-col space-y-4 text-[15px]">
              <li><Link href="/products" className="hover:text-[#0aad0a] transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-[#0aad0a] transition-colors">Categories</Link></li>
              <li><Link href="/brands" className="hover:text-[#0aad0a] transition-colors">Brands</Link></li>
              <li><Link href="/categories/electronics" className="hover:text-[#0aad0a] transition-colors">Electronics</Link></li>
              <li><Link href="/categories/mens-fashion" className="hover:text-[#0aad0a] transition-colors">Men's Fashion</Link></li>
              <li><Link href="/categories/womens-fashion" className="hover:text-[#0aad0a] transition-colors">Women's Fashion</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white text-[17px] font-semibold mb-8">Account</h3>
            <ul className="flex flex-col space-y-4 text-[15px]">
              <li><Link href="/profile" className="hover:text-[#0aad0a] transition-colors">My Account</Link></li>
              <li><Link href="/orders" className="hover:text-[#0aad0a] transition-colors">Order History</Link></li>
              <li><Link href="/wishlist" className="hover:text-[#0aad0a] transition-colors">Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-[#0aad0a] transition-colors">Shopping Cart</Link></li>
              <li><Link href="/Login" className="hover:text-[#0aad0a] transition-colors">Sign In</Link></li>
              <li><Link href="/Register" className="hover:text-[#0aad0a] transition-colors">Create Account</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white text-[17px] font-semibold mb-8">Support</h3>
            <ul className="flex flex-col space-y-4 text-[15px]">
              <li><Link href="/contact" className="hover:text-[#0aad0a] transition-colors">Contact Us</Link></li>
              <li><Link href="/help" className="hover:text-[#0aad0a] transition-colors">Help Center</Link></li>
              <li><Link href="/shipping" className="hover:text-[#0aad0a] transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-[#0aad0a] transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/track-order" className="hover:text-[#0aad0a] transition-colors">Track Order</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white text-[17px] font-semibold mb-8">Legal</h3>
            <ul className="flex flex-col space-y-4 text-[15px]">
              <li><Link href="/privacy" className="hover:text-[#0aad0a] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#0aad0a] transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-[#0aad0a] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-[#1e293b]">
        <div className="max-w-360 mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center py-8">
          <p className="text-[15px]">
            © 2026 FreshCart. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <FaCreditCard className="text-lg" />
              <span className="text-[14px]">Visa</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <FaCreditCard className="text-lg" />
              <span className="text-[14px]">Mastercard</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <FaCreditCard className="text-lg" />
              <span className="text-[14px]">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}