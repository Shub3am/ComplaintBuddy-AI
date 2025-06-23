import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  let param = await params;
  if (param.id) {
    let getComplain = await db.from("complains").select("*").eq("id", param.id);
    console.log(getComplain);
    if (getComplain.error == null && getComplain.data) {
      return NextResponse.json(getComplain.data);
    } else {
      return NextResponse.json({ error: getComplain.error }, { status: 404 });
    }
  } else {
    return NextResponse.json({ error: "Invalid Params" }, { status: 404 });
  }
  return NextResponse.json({});
}
