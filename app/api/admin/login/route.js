import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "ADMIN_PASSWORD missing in .env.local" },
        { status: 500 }
      );
    }

    if (password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });

      response.cookies.set({
        name: "admin_auth",
        value: "logged_in",
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24
      });

      return response;
    }

    return NextResponse.json({ success: false });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
