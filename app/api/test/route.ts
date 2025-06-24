import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const Body = await request.json();

  console.log(Body);

  return NextResponse.json({});
}
