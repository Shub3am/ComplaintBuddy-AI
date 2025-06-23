import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";
export async function GET() {
  let getComplains = await db.from("complains").select("*");
  if (!getComplains.error && getComplains.data) {
    return NextResponse.json(getComplains.data);
  } else {
    return NextResponse.json({ error: getComplains.error }, { status: 404 });
  }
}
