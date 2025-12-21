import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tx_ref = searchParams.get("tx_ref");

    if (!tx_ref) {
      return NextResponse.json(
        { status: "error", message: "Missing transaction reference" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.status !== "success" || data.data.status !== "successful") {
      return NextResponse.json(
        { status: "error", message: "Payment not successful" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: "success",
      amount: data.data.amount,
      currency: data.data.currency,
      email: data.data.customer.email,
      tx_ref: data.data.tx_ref,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Verification failed" },
      { status: 500 }
    );
  }
}
