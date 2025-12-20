import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { status: "error", message: "No reference provided" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!data.status || data.data.status !== "success") {
      return NextResponse.json(
        { status: "error", message: "Payment not successful" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: "success",
      amount: data.data.amount / 100,
      currency: data.data.currency,
      email: data.data.customer.email,
      reference: data.data.reference,
    });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: "Verification failed" },
      { status: 500 }
    );
  }
}
