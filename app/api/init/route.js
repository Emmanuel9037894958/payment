import { NextResponse } from "next/server";

// 🔒 Set your exchange rate here (update anytime)
const EUR_TO_NGN_RATE = 1700; // example rate

export async function POST(req) {
  try {
    const { email, amount } = await req.json();

    if (!email || !amount || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Invalid payment data" },
        { status: 400 }
      );
    }

    // ✅ Convert EUR → NGN
    const amountInNGN = Math.round(Number(amount) * EUR_TO_NGN_RATE);

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amountInNGN * 100, // kobo
          currency: "NGN",
          callback_url: "https://www.zentra-pay.com/success",
          metadata: {
            display_currency: "EUR",
            display_amount: amount,
            exchange_rate: EUR_TO_NGN_RATE,
          },
        }),
      }
    );

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }

    return NextResponse.json(data.data);
  } catch (err) {
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
