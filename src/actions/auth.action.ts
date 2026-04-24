"use server";

import {
  LoginType,
  RegisterSchemaType,
  ChangePasswordType,
  UpdateProfileType,
} from "@/schemas/auth.schemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth/authOptions";


async function getToken(): Promise<string> {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.routeToken as string | undefined;
  if (!token) throw new Error("You must be logged in to perform this action.");
  return token;
}

export async function UserRegister(data: RegisterSchemaType) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      },
    );
    const result = await res.json();
    return res.ok;
  } catch (err) {}
}

export async function UserLogin(data: LoginType) {}

export async function changeMyPassword(data: ChangePasswordType) {
  const token = await getToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
    {
      method: "PUT",
      body: JSON.stringify({
        currentPassword: data.currentPassword,
        password: data.password,
        rePassword: data.rePassword,
      }),
      headers: {
        "content-type": "application/json",
        token,
      },
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to change password");
  }

  return result;
}

export async function updateMyProfile(data: UpdateProfileType) {
  const token = await getToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
    {
      method: "PUT",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
      }),
      headers: {
        "content-type": "application/json",
        token,
      },
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update profile");
  }

  return result;
}

export async function forgotPassword(email: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
    {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "content-type": "application/json" },
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to send reset code");
  }

  return result;
}

export async function verifyResetCode(resetCode: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
    {
      method: "POST",
      body: JSON.stringify({ resetCode }),
      headers: { "content-type": "application/json" },
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Invalid or expired reset code");
  }

  return result;
}

export async function resetPassword(email: string, newPassword: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
    {
      method: "PUT",
      body: JSON.stringify({ email, newPassword }),
      headers: { "content-type": "application/json" },
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to reset password");
  }

  return result;
}
