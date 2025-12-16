import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!process.env.NOWPAYMENTS_API_KEY) {
      return NextResponse.json(
        { error: "NOWPAYMENTS_API_KEY not set" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: body.amount,
        price_currency: body.currency,
        order_id: "order_" + Date.now(),
        order_description: body.description,

        // ⚠️ These MUST be real URLs on YOUR site
        success_url: "https://yourdomain.com/success",
        cancel_url: "https://yourdomain.com/cancel",
      }),
    });

    const data = await res.json();

    // 🔴 If NOWPayments failed, return the error
    if (!res.ok || !data.invoice_url) {
      return NextResponse.json(
        { error: data.message || "NOWPayments error" },
        { status: 400 }
      );
    }

    // ✅ SUCCESS: return invoice URL
    return NextResponse.json({
      url: data.invoice_url,
    });

  } catch (err) {
    console.error("NOWPayments error:", err);
    return NextResponse.json(
      { error: true, message: "Payment creation failed" },
      { status: 500 }
    );
  }
}
