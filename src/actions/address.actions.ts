"use server";

import { getMyToken } from "@/utilities";

export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddAddressPayload {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export async function getLoggedUserAddresses(): Promise<Address[]> {
  const token = await getMyToken();
  if (!token) throw new Error("Please login first");

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    method: "GET",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (data?.status === "success") {
    return data.data as Address[];
  }
  throw new Error(data?.message ?? "Failed to fetch addresses");
}

export async function getSpecificAddress(addressId: string): Promise<Address> {
  const token = await getMyToken();
  if (!token) throw new Error("Please login first");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
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

  if (data?.status === "success") {
    return data.data as Address;
  }
  throw new Error(data?.message ?? "Failed to fetch address");
}

export async function addAddress(payload: AddAddressPayload): Promise<Address[]> {
  const token = await getMyToken();
  if (!token) throw new Error("Please login first");

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    method: "POST",
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (data?.status === "success") {
    return data.data as Address[];
  }
  throw new Error(data?.message ?? "Failed to add address");
}

export async function deleteAddress(addressId: string): Promise<Address[]> {
  const token = await getMyToken();
  if (!token) throw new Error("Please login first");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
    },
  );

  const data = await res.json();

  if (data?.status === "success") {
    return data.data as Address[];
  }
  throw new Error(data?.message ?? "Failed to delete address");
}
