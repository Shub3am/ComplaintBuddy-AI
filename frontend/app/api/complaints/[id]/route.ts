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

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  let param = await params;
  if (param.id) {
    let getComplain = await db.from("complains").select("*").eq("id", param.id);
    if (getComplain.error == null && getComplain.data) {
      let deleteComplain = await db
        .from("complains")
        .delete()
        .eq("id", getComplain.data[0].id);
      if (deleteComplain.error == null) {
        return NextResponse.json({ error: null, status: 200 });
      } else {
        return NextResponse.json(
          { error: deleteComplain.error },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json({ error: getComplain.error }, { status: 404 });
    }
  } else {
    return NextResponse.json({ error: "Invalid Params" }, { status: 404 });
  }
  return NextResponse.json({});
}
