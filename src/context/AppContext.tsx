"use client";
import { getLoggedUserCart } from "@/actions/cart.actions";
import { getLoggedUserWishlist } from "@/app/wishlist/wishlist.actions";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AppContextType {
  cartCount: number;
  wishlistCount: number;
  refreshCart: () => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const refreshCart = async () => {
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        const totalQty: number =
          res.data?.products?.reduce(
            (sum: number, item: { count: number }) => sum + (item.count || 0),
            0
          ) ?? 0;
        setCartCount(totalQty);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      setCartCount(0);
    }
  };

  const refreshWishlist = async () => {
    try {
      const res = await getLoggedUserWishlist();
      if (res.status === "success") {
        setWishlistCount(res.count || res.data?.length || 0);
      } else {
        setWishlistCount(0);
      }
    } catch (error) {
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    refreshCart();
    refreshWishlist();
  }, []);

  return (
    <AppContext.Provider
      value={{ cartCount, wishlistCount, refreshCart, refreshWishlist }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
