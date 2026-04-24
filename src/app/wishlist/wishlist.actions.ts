"use server";

import { getMyToken } from "@/utilities";

export async function AddProductToWishlist(productId: string) {
  const token = await getMyToken();

  if (!token) {
    return { status: "error", message: "Please login first" };
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "POST",
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  const data = await res.json();
  return data;
}

export async function getLoggedUserWishlist() {
  const token = await getMyToken();

  if (!token) {
    return { status: "success", count: 0, data: [] };
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export async function RemoveProductFromWishlist(productId: string) {
  const token = await getMyToken();

  if (!token) {
    return { status: "error", message: "Please login first" };
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
}
