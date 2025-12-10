import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db", "payments.json");

// GET → return all payments
export async function GET() {
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const payments = JSON.parse(fileData);
    return NextResponse.json(payments);
  } catch (err) {
    return NextResponse.json(
      { error: "Could not read payments file." },
      { status: 500 }
    );
  }
}

// POST → save new payment
export async function POST(req) {
  try {
    const body = await req.json();

    const fileData = fs.readFileSync(filePath, "utf8");
    const payments = JSON.parse(fileData);

    const newPayment = {
      id: "pay_" + Date.now(),
      amount: body.amount,
      currency: body.currency,
      status: body.status,
      invoice_id: body.invoice_id,
      timestamp: new Date().toISOString(),
    };

    payments.push(newPayment);

    fs.writeFileSync(filePath, JSON.stringify(payments, null, 2));

    return NextResponse.json({ success: true, payment: newPayment });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save payment: " + err.message },
      { status: 500 }
    );
  }
}
