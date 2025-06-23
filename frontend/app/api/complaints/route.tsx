import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  let getComplains = await db.from("complains").select("*");
  if (!getComplains.error && getComplains.data) {
    return NextResponse.json(getComplains.data);
  } else {
    return NextResponse.json({ error: getComplains.error }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  let body = await request.json();
  console.log(body);
  if (body.complain) {
    console.log(body.complain);
    let complain: {
      title: string;
      company: string;
      product: string;
      description: string;
      progress: string;
      orderNumber: string;
      companyPhone: string;
      customerEmail: string;
      customerPhone: string;
      customerName: string;
      purchaseAmount: string;
    } = body.complain;
    let addComplain = await db.from("complains").insert({
      customer_name: complain.customerName,
      company_name: complain.company,
      company_phone: complain.companyPhone,
      description: complain.description,
      product: complain.product,
      purchase_amount: complain.purchaseAmount,
      order_number: complain.orderNumber,
      issue_title: complain.title,
      progress: "pending",
      customer_email: complain.customerEmail,
      customer_phone: complain.customerPhone,
    });
    if (!addComplain.error) {
      return NextResponse.json(addComplain);
    } else {
      return NextResponse.json({ error: addComplain.error }, { status: 404 });
    }
  }
}
