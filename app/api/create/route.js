import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { amount, currency, description } = await request.json();

    const res = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: currency,
        order_description: description,
        success_url: "https://yourdomain.com/success",
        cancel_url: "https://yourdomain.com/cancel",
      }),
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("NOWPayments Error:", error);
    return NextResponse.json({ error: true, message: "Server error" });
  }
}
