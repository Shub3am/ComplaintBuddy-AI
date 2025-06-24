import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  if (body.agent) {
    let getLogs = await fetch(
      `https://backend.omnidim.io/api/v1/calls/logs?agentid=${body.agent}`,
      {
        headers: { Authorization: `Bearer ${process.env.omnidim}` },
      }
    ).then((res) => res.json());
    return NextResponse.json({ error: null, data: getLogs });
  } else {
    return NextResponse.json({ error: "Credentials Missing" });
  }
}
