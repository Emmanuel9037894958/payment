export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    // Parse request body ONCE
    const { password } = await request.json();

    // Ensure env hash exists
    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash) {
      return NextResponse.json(
        { success: false, error: "ADMIN_PASSWORD_HASH missing" },
        { status: 500 }
      );
    }

    // Clean user input
    const cleanPassword = password?.trim();

    // Compare password with hash
    const isValid = await bcrypt.compare(cleanPassword, hash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    // Success → set secure cookie
    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "admin_auth",
      value: "logged_in",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
