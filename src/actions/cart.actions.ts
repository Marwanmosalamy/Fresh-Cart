"use server";

import { checkoutSchemaType } from "@/schemas/checkout.schema";
import { getMyToken } from "@/utilities";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt"
export async function addToCart(productId: string) {
  const token = await getMyToken();

  // if (!token) {
  //   return { status: "error", message: "Please login first to add items to your cart" };
  // }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "POST",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
    body: JSON.stringify({ productId: productId }),
  });

  const data = await res.json();
  return data;
}

export async function getLoggedUserCart() {
  const token = await getMyToken();

  // if (!token) {
  //   return { status: "success", numOfCartItems: 0, cartId: "", data: { products: [], totalCartPrice: 0 } };
  // }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "GET",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}

export async function updateProductQuantity(productId: string, count: number) {
  const token = await getMyToken();

  // if (!token) {
  //   throw new Error("Please Login First");
  // }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({ count: count }),
    },
  );

  const data = await res.json();
  return data;
}

export async function RemoveProductFromCart(productId: string) {
  const token = await getMyToken();

  // if (!token) {
  //   throw new Error("please Login First..");
  // }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
    },
  );

  const data = await res.json();
  return data;
}

export async function createCashOrder(
  cartId: string,
  shippingAddress: { details: string; phone: string; city: string },
) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please Login First");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({ shippingAddress }),
    },
  );

  const data = await res.json();
  return data;
}

export async function onlinePayment(
  productId: string,
  url: string = process.env.NEXTAUTH_URL!,
  formValues: checkoutSchemaType,
) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("login first");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${productId}?url=${url}`,
    {
      method: "POST",
      headers: {
        token: token,
        "content-type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    },
  );
  const data = await res.json();
  return data;
}

export async function ClearAllCartProducts() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("please Login First..");
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "DELETE",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}
