"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { getMyToken } from "@/utilities";

async function getMyUserId(): Promise<string | null> {
  const cookie = await cookies();
  const myToken = cookie.get("next-auth.session-token")?.value;
  const decodedToken = await decode({
    token: myToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  const userId =
    (decodedToken?.id as string) ??
    (decodedToken?._id as string) ??
    (decodedToken?.sub as string) ??
    null;
  return userId;
}

export async function getUserOrders() {
  const token = await getMyToken();
  const userId = await getMyUserId();

  if (!token) {
    throw new Error("Please Login First");
  }

  if (!userId) {
    throw new Error("Could not resolve user ID");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      method: "GET",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
      cache: "no-store",
    },
  );

  const data = await res.json();
  return data;
}
